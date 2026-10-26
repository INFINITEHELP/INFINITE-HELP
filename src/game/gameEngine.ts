import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  CameraMode,
  GameTheme,
  InventoryWeapon,
  KillfeedEntry,
  LootItem,
  PlayerStats,
  WeaponId,
} from './types';
import { WEAPONS_DATA } from './weaponsData';
import { soundEngine } from './audio';
import { WorldManager } from './world';
import { BotManager } from './botAI';
import { createCharacterMesh, createWeaponMesh } from './proceduralModels';

export interface GameEngineCallbacks {
  onStatsChange: (stats: PlayerStats) => void;
  onActiveWeaponChange: (weapon: InventoryWeapon) => void;
  onKillfeedAdd: (entry: KillfeedEntry) => void;
  onHitmarker: (isHeadshot: boolean) => void;
  onDamageTaken: () => void;
  onNearbyLootChange: (loot: LootItem[]) => void;
  onMatchEnd: (victory: boolean, stats: PlayerStats) => void;
  onAliveCountChange: (alive: number) => void;
}

export class GameEngine {
  private container: HTMLElement;
  private callbacks: GameEngineCallbacks;

  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public world: WorldManager;
  public botManager: BotManager;

  // Player state
  public playerMesh: THREE.Group;
  public playerWeaponInHand: THREE.Group;
  public fpsGunMesh: THREE.Group;
  public playerPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public playerVel: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public playerRotY: number = 0;
  public playerPitch: number = 0;
  public isGrounded: boolean = true;
  public isCrouched: boolean = false;
  public isSprinting: boolean = false;
  public isScoping: boolean = false;
  public isReloading: boolean = false;
  public cameraMode: CameraMode = 'fps';
  public theme: GameTheme = 'pubg';

  // Stats
  public stats: PlayerStats = {
    health: 100,
    maxHealth: 100,
    armor: 100,
    helmet: 100,
    energy: 50,
    medkits: 2,
    energyDrinks: 3,
    kills: 0,
    damageDealt: 0,
    headshots: 0,
    shotsFired: 0,
    shotsHit: 0,
  };

  // Inventory
  public inventory: InventoryWeapon[] = [
    { id: 'm416', currentAmmo: 30, reserveAmmo: 120 },
    { id: 'akm', currentAmmo: 30, reserveAmmo: 90 },
  ];
  public activeWeaponIndex: number = 0;
  public lastShotTime: number = 0;
  public reloadEndTime: number = 0;

  // Controls state
  public keys: Record<string, boolean> = {};
  public joystickVector: { x: number; y: number } = { x: 0, y: 0 };
  public mouseLookDelta: { x: number; y: number } = { x: 0, y: 0 };
  public isFiring: boolean = false;

  // Recoil
  public currentRecoilPitch: number = 0;
  public currentRecoilYaw: number = 0;

  // Muzzle flash light
  private muzzleLight: THREE.PointLight;

  // Animation loop
  private animationFrameId: number = 0;
  private lastTime: number = 0;
  private isDestroyed: boolean = false;
  public isGameOver: boolean = false;

  constructor(container: HTMLElement, callbacks: GameEngineCallbacks) {
    this.container = container;
    this.callbacks = callbacks;

    // Detect software GL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // PUBG Sky blue
    this.scene.fog = new THREE.FogExp2(0x87ceeb, 0.007);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      600
    );

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = !isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(this.renderer.domElement);

    // 4. Studio Environment
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    // 5. Lighting: Warm Key Light + Cool Hemisphere Fill
    const hemiLight = new THREE.HemisphereLight(0xfff7e6, 0x4a5d3e, 0.85);
    this.scene.add(hemiLight);

    const sun = new THREE.DirectionalLight(0xfffaed, 1.8);
    sun.position.set(60, 100, 40);
    sun.castShadow = !isSoftwareGl;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 250;
    const d = 80;
    sun.shadow.camera.left = -d;
    sun.shadow.camera.right = d;
    sun.shadow.camera.top = d;
    sun.shadow.camera.bottom = -d;
    sun.shadow.bias = -0.0005;
    this.scene.add(sun);

    // 6. World & Bots
    this.world = new WorldManager(this.scene);
    this.world.buildWorld();

    this.botManager = new BotManager(this.scene, this.world);
    this.botManager.spawnBots(16);

    // 7. Player Character Model
    this.playerMesh = createCharacterMesh(false);
    this.scene.add(this.playerMesh);

    // TPS Weapon in hand
    this.playerWeaponInHand = this.playerMesh.getObjectByName('weapon_mount') as THREE.Group;

    // FPS Gun in front of camera
    this.fpsGunMesh = createWeaponMesh('m416');
    this.fpsGunMesh.position.set(0.24, -0.22, -0.45);
    this.camera.add(this.fpsGunMesh);
    this.scene.add(this.camera);

    // Muzzle flash light
    this.muzzleLight = new THREE.PointLight(0xffaa22, 0, 12);
    this.scene.add(this.muzzleLight);

    // Initial position
    this.playerPos.set(0, 0, 0);

    // Bind controls
    this.setupEventListeners();

    // Notify initial state
    this.callbacks.onStatsChange({ ...this.stats });
    this.callbacks.onActiveWeaponChange(this.getActiveWeapon());
    this.callbacks.onAliveCountChange(this.botManager.getAliveCount() + 1);

    // Start Loop
    this.lastTime = performance.now();
    this.animate();
  }

  private setupEventListeners() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('resize', this.handleResize);

    const canvas = this.renderer.domElement;
    canvas.addEventListener('click', this.handleCanvasClick);
    document.addEventListener('mousemove', this.handleMouseMove);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    canvas.addEventListener('mousedown', this.handleMouseDown);
    canvas.addEventListener('mouseup', this.handleMouseUp);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    this.keys[e.code] = true;

    if (e.code === 'KeyR') {
      this.reloadWeapon();
    } else if (e.code === 'Digit1') {
      this.switchWeapon(0);
    } else if (e.code === 'Digit2') {
      this.switchWeapon(1);
    } else if (e.code === 'KeyE') {
      this.pickupNearestLoot();
    } else if (e.code === 'KeyV') {
      this.toggleCameraMode();
    } else if (e.code === 'KeyC') {
      this.isCrouched = !this.isCrouched;
    } else if (e.code === 'Space') {
      if (this.isGrounded) {
        this.playerVel.y = 7.5;
        this.isGrounded = false;
      }
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    this.keys[e.code] = false;
  };

  private handleResize = () => {
    if (!this.container || this.isDestroyed) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private handleCanvasClick = () => {
    if (document.pointerLockElement !== this.renderer.domElement) {
      this.renderer.domElement.requestPointerLock();
    }
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (document.pointerLockElement === this.renderer.domElement) {
      const sens = this.isScoping ? 0.001 : 0.0022;
      this.playerRotY -= e.movementX * sens;
      this.playerPitch -= e.movementY * sens;
      this.playerPitch = Math.max(-Math.PI * 0.42, Math.min(Math.PI * 0.42, this.playerPitch));
    }
  };

  private handleMouseDown = (e: MouseEvent) => {
    if (e.button === 0) {
      this.isFiring = true;
    } else if (e.button === 2) {
      // Right click scope / ADS
      this.isScoping = !this.isScoping;
    }
  };

  private handleMouseUp = (e: MouseEvent) => {
    if (e.button === 0) {
      this.isFiring = false;
    }
  };

  public getActiveWeapon(): InventoryWeapon {
    return this.inventory[this.activeWeaponIndex] || this.inventory[0];
  }

  public switchWeapon(index: number) {
    if (index >= 0 && index < this.inventory.length) {
      this.activeWeaponIndex = index;
      const w = this.getActiveWeapon();
      this.updateWeaponModels(w.id);
      this.callbacks.onActiveWeaponChange(w);
      soundEngine.playReload();
    }
  }

  public updateWeaponModels(weaponId: WeaponId) {
    // Replace FPS gun
    this.camera.remove(this.fpsGunMesh);
    this.fpsGunMesh = createWeaponMesh(weaponId);
    this.fpsGunMesh.position.set(0.24, -0.22, -0.45);
    this.camera.add(this.fpsGunMesh);

    // Replace TPS gun
    if (this.playerWeaponInHand) {
      while (this.playerWeaponInHand.children.length > 0) {
        this.playerWeaponInHand.remove(this.playerWeaponInHand.children[0]);
      }
      const tpsGun = createWeaponMesh(weaponId);
      this.playerWeaponInHand.add(tpsGun);
    }
  }

  public reloadWeapon() {
    const w = this.getActiveWeapon();
    const def = WEAPONS_DATA[w.id];
    if (w.currentAmmo === def.magazineSize || w.reserveAmmo <= 0 || this.isReloading) {
      return;
    }

    this.isReloading = true;
    soundEngine.playReload();
    setTimeout(() => {
      if (this.isDestroyed) return;
      const needed = def.magazineSize - w.currentAmmo;
      const take = Math.min(needed, w.reserveAmmo);
      w.currentAmmo += take;
      w.reserveAmmo -= take;
      this.isReloading = false;
      this.callbacks.onActiveWeaponChange(w);
    }, def.reloadTimeMs);
  }

  public fireCurrentWeapon() {
    const now = Date.now();
    const w = this.getActiveWeapon();
    const def = WEAPONS_DATA[w.id];

    if (this.isReloading) return;

    if (w.currentAmmo <= 0) {
      this.reloadWeapon();
      return;
    }

    if (now - this.lastShotTime < def.fireRateMs) return;

    this.lastShotTime = now;
    w.currentAmmo--;
    this.stats.shotsFired++;
    this.callbacks.onActiveWeaponChange(w);

    // Audio & Recoil
    soundEngine.playGunshot(def.id, true);
    this.currentRecoilPitch += def.recoilVertical;
    this.currentRecoilYaw += (Math.random() - 0.5) * def.recoilHorizontal;

    // Flash light at gun muzzle
    this.muzzleLight.intensity = 5;
    this.muzzleLight.position.copy(this.camera.position).add(this.camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(1.2));
    setTimeout(() => {
      this.muzzleLight.intensity = 0;
    }, 45);

    // Raycast hitscan bullet
    this.performShootRaycast(def);

    // Auto reload if empty
    if (w.currentAmmo === 0 && w.reserveAmmo > 0) {
      this.reloadWeapon();
    }
  }

  private performShootRaycast(def: typeof WEAPONS_DATA[WeaponId]) {
    const raycaster = new THREE.Raycaster();
    const spreadAngle = this.isScoping ? def.spread * 0.25 : def.spread;
    const spreadX = (Math.random() - 0.5) * spreadAngle;
    const spreadY = (Math.random() - 0.5) * spreadAngle;

    const screenCenter = new THREE.Vector2(spreadX, spreadY);
    raycaster.setFromCamera(screenCenter, this.camera);
    raycaster.far = def.range;

    // Collect bot meshes
    const botMeshes: THREE.Object3D[] = [];
    this.botManager.bots.forEach((b) => {
      if (b.isAlive) botMeshes.push(b.mesh);
    });

    const intersects = raycaster.intersectObjects(botMeshes, true);
    if (intersects.length > 0) {
      const hit = intersects[0];
      // Find top bot group
      let botGroup: THREE.Object3D | null = hit.object;
      while (botGroup && !botGroup.name.startsWith('bot_')) {
        botGroup = botGroup.parent;
      }

      if (botGroup) {
        const botName = botGroup.name.replace('bot_', '');
        const targetBot = this.botManager.bots.find((b) => b.name === botName && b.isAlive);
        if (targetBot) {
          this.stats.shotsHit++;
          // Check if headshot: hit point height > 1.45 relative to bot feet
          const isHeadshot = hit.point.y - targetBot.y > 1.45;
          const dmg = Math.floor(def.damage * (isHeadshot ? def.headshotMultiplier : 1.0));

          this.stats.damageDealt += dmg;
          if (isHeadshot) this.stats.headshots++;

          soundEngine.playHitmarker(isHeadshot);
          this.callbacks.onHitmarker(isHeadshot);

          const result = this.botManager.damageBot(targetBot.id, dmg, isHeadshot);
          if (result.killed) {
            this.stats.kills++;
            soundEngine.playKillSound();

            const entry: KillfeedEntry = {
              id: `kill_${Date.now()}`,
              killer: 'YOU',
              victim: targetBot.name,
              weapon: def.name,
              isHeadshot,
              isPlayerKiller: true,
              timestamp: Date.now(),
            };
            this.callbacks.onKillfeedAdd(entry);
            this.callbacks.onAliveCountChange(this.botManager.getAliveCount() + 1);

            // Check Victory!
            if (this.botManager.getAliveCount() === 0) {
              this.triggerVictory();
            }
          }
          this.callbacks.onStatsChange({ ...this.stats });
        }
      }
    }
  }

  public useMedkit() {
    if (this.stats.medkits > 0 && this.stats.health < this.stats.maxHealth) {
      this.stats.medkits--;
      this.stats.health = Math.min(this.stats.maxHealth, this.stats.health + 50);
      soundEngine.playHeal();
      this.callbacks.onStatsChange({ ...this.stats });
    }
  }

  public useEnergyDrink() {
    if (this.stats.energyDrinks > 0 && this.stats.energy < 100) {
      this.stats.energyDrinks--;
      this.stats.energy = Math.min(100, this.stats.energy + 40);
      soundEngine.playHeal();
      this.callbacks.onStatsChange({ ...this.stats });
    }
  }

  public pickupNearestLoot() {
    const nearby = this.getNearbyLoot();
    if (nearby.length > 0) {
      const item = nearby[0];
      soundEngine.playLootPickup();

      if (item.type === 'weapon' && item.weaponId) {
        // Equip weapon
        const existing = this.inventory.find((w) => w.id === item.weaponId);
        if (!existing) {
          this.inventory.push({
            id: item.weaponId,
            currentAmmo: WEAPONS_DATA[item.weaponId].magazineSize,
            reserveAmmo: WEAPONS_DATA[item.weaponId].magazineSize * 3,
          });
          this.switchWeapon(this.inventory.length - 1);
        } else {
          existing.reserveAmmo += WEAPONS_DATA[item.weaponId].magazineSize * 2;
          this.callbacks.onActiveWeaponChange(this.getActiveWeapon());
        }
      } else if (item.type === 'ammo') {
        const active = this.getActiveWeapon();
        active.reserveAmmo += 60;
        this.callbacks.onActiveWeaponChange(active);
      } else if (item.type === 'medkit') {
        this.stats.medkits += 1;
        this.callbacks.onStatsChange({ ...this.stats });
      } else if (item.type === 'armor') {
        this.stats.armor = 100;
        this.callbacks.onStatsChange({ ...this.stats });
      } else if (item.type === 'helmet') {
        this.stats.helmet = 100;
        this.callbacks.onStatsChange({ ...this.stats });
      }

      this.world.removeLootItem(item.id);
      this.callbacks.onNearbyLootChange(this.getNearbyLoot());
    }
  }

  private getNearbyLoot(): LootItem[] {
    return this.world.lootItems.filter((item) => {
      const dx = item.x - this.playerPos.x;
      const dz = item.z - this.playerPos.z;
      return Math.sqrt(dx * dx + dz * dz) < 3.8;
    });
  }

  public toggleCameraMode() {
    this.cameraMode = this.cameraMode === 'fps' ? 'tps' : 'fps';
    this.fpsGunMesh.visible = this.cameraMode === 'fps';
    this.playerMesh.visible = this.cameraMode === 'tps';
  }

  private triggerVictory() {
    this.isGameOver = true;
    soundEngine.playVictoryFanfare(this.theme);
    this.callbacks.onMatchEnd(true, { ...this.stats });
  }

  private triggerDefeat() {
    this.isGameOver = true;
    this.callbacks.onMatchEnd(false, { ...this.stats });
  }

  private animate = () => {
    if (this.isDestroyed) return;
    this.animationFrameId = requestAnimationFrame(this.animate);

    const now = performance.now();
    const delta = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    if (this.isGameOver) {
      this.renderer.render(this.scene, this.camera);
      return;
    }

    // 1. Player Movement Calculation
    let moveForward = 0;
    let moveRight = 0;

    if (this.keys['KeyW'] || this.keys['ArrowUp']) moveForward += 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) moveForward -= 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) moveRight -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) moveRight += 1;

    // Mobile joystick input
    if (Math.abs(this.joystickVector.y) > 0.1) moveForward -= this.joystickVector.y;
    if (Math.abs(this.joystickVector.x) > 0.1) moveRight += this.joystickVector.x;

    this.isSprinting = !!this.keys['ShiftLeft'] || !!this.keys['ShiftRight'];
    let speed = this.isCrouched ? 2.5 : this.isSprinting ? 8.2 : 5.0;
    if (this.isScoping) speed *= 0.55;

    // Movement direction vector
    const moveDir = new THREE.Vector3(moveRight, 0, -moveForward).normalize();
    moveDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.playerRotY);

    if (moveDir.lengthSq() > 0.01) {
      this.playerPos.x += moveDir.x * speed * delta;
      this.playerPos.z += moveDir.z * speed * delta;

      // Obstacle collision check
      this.world.obstacles.forEach((obs) => {
        const dx = this.playerPos.x - obs.x;
        const dz = this.playerPos.z - obs.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        const minDist = obs.radius + 0.6;
        if (dist < minDist) {
          const pushX = (dx / dist) * (minDist - dist);
          const pushZ = (dz / dist) * (minDist - dist);
          this.playerPos.x += pushX;
          this.playerPos.z += pushZ;
        }
      });
    }

    // Gravity & Ground Height
    const groundY = this.world.getTerrainHeight(this.playerPos.x, this.playerPos.z);
    this.playerVel.y -= 18.0 * delta; // Gravity
    this.playerPos.y += this.playerVel.y * delta;

    if (this.playerPos.y <= groundY) {
      this.playerPos.y = groundY;
      this.playerVel.y = 0;
      this.isGrounded = true;
    }

    // Recoil recovery
    this.currentRecoilPitch *= Math.exp(-12 * delta);
    this.currentRecoilYaw *= Math.exp(-12 * delta);

    // Continuous fire if mouse is down
    if (this.isFiring) {
      this.fireCurrentWeapon();
    }

    // 2. Camera Positioning
    const eyeHeight = this.isCrouched ? 1.1 : 1.7;
    const finalPitch = this.playerPitch + this.currentRecoilPitch;
    const finalYaw = this.playerRotY + this.currentRecoilYaw;

    if (this.cameraMode === 'fps') {
      this.camera.position.set(this.playerPos.x, this.playerPos.y + eyeHeight, this.playerPos.z);
      this.camera.rotation.set(finalPitch, finalYaw, 0, 'YXZ');
      this.playerMesh.visible = false;
      this.fpsGunMesh.visible = true;

      // Scope ADS zoom
      const targetFov = this.isScoping ? 30 : 70;
      this.camera.fov += (targetFov - this.camera.fov) * (delta * 14);
      this.camera.updateProjectionMatrix();

      // Gun bobbing / breath sway
      const bobbing = Math.sin(now * 0.008) * (moveDir.lengthSq() > 0.01 ? 0.015 : 0.003);
      this.fpsGunMesh.position.y = -0.22 + bobbing;
    } else {
      // Third-Person Over-the-Shoulder Camera
      const camDist = 3.2;
      const camOffset = new THREE.Vector3(0.65, eyeHeight + 0.3, camDist);
      camOffset.applyAxisAngle(new THREE.Vector3(1, 0, 0), finalPitch);
      camOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), finalYaw);

      this.camera.position.copy(this.playerPos).add(camOffset);
      this.camera.lookAt(this.playerPos.x, this.playerPos.y + eyeHeight, this.playerPos.z);

      this.playerMesh.position.set(this.playerPos.x, this.playerPos.y, this.playerPos.z);
      this.playerMesh.rotation.y = finalYaw;
      this.playerMesh.visible = true;
      this.fpsGunMesh.visible = false;
    }

    // 3. Update Bots
    this.botManager.updateBots(
      delta,
      this.playerPos.x,
      this.playerPos.z,
      (dmg, botName) => {
        // Player takes damage
        let remaining = dmg;
        if (this.stats.armor > 0) {
          const absorbed = Math.min(this.stats.armor, dmg * 0.6);
          this.stats.armor -= absorbed;
          remaining -= absorbed;
        }
        this.stats.health -= remaining;
        this.callbacks.onDamageTaken();
        this.callbacks.onStatsChange({ ...this.stats });

        if (this.stats.health <= 0) {
          this.triggerDefeat();
        }
      },
      (killer, victim, weapon) => {
        // Bot killed bot
        const entry: KillfeedEntry = {
          id: `kill_${Date.now()}_${Math.random()}`,
          killer,
          victim,
          weapon,
          isHeadshot: Math.random() > 0.6,
          isPlayerKiller: false,
          timestamp: Date.now(),
        };
        this.callbacks.onKillfeedAdd(entry);
        this.callbacks.onAliveCountChange(this.botManager.getAliveCount() + 1);
      }
    );

    // 4. Update Safe Zone
    this.world.updateSafeZone(delta);
    const distToCenter = Math.sqrt(
      (this.playerPos.x - this.world.safeZoneCenter.x) ** 2 +
      (this.playerPos.z - this.world.safeZoneCenter.y) ** 2
    );
    if (distToCenter > this.world.safeZoneRadius) {
      // Outside Blue Electric Safe Zone! Take poison damage
      this.stats.health -= delta * 4;
      this.callbacks.onDamageTaken();
      this.callbacks.onStatsChange({ ...this.stats });
      if (this.stats.health <= 0) {
        this.triggerDefeat();
      }
    }

    // 5. Update Nearby Loot for HUD
    const nearby = this.getNearbyLoot();
    this.callbacks.onNearbyLootChange(nearby);

    // Render Scene
    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animationFrameId);

    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('resize', this.handleResize);

    const canvas = this.renderer.domElement;
    canvas.removeEventListener('click', this.handleCanvasClick);
    document.removeEventListener('mousemove', this.handleMouseMove);
    canvas.removeEventListener('mousedown', this.handleMouseDown);
    canvas.removeEventListener('mouseup', this.handleMouseUp);

    this.renderer.dispose();
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
