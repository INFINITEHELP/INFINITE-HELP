import * as THREE from 'three';
import { BotEntity, WeaponId } from './types';
import { createCharacterMesh, createLootItemMesh } from './proceduralModels';
import { soundEngine } from './audio';
import { WorldManager } from './world';

export class BotManager {
  public scene: THREE.Scene;
  public world: WorldManager;
  public bots: (BotEntity & { mesh: THREE.Group })[] = [];

  private botNames = [
    'ShadowSniper',
    'CyberReaper',
    'ViperX',
    'GhostHunter',
    'AlphaCommando',
    'Falcon99',
    'ApexPredator',
    'NoobDestroyer',
    'TitanSlayer',
    'DesertFox',
    'IronFist',
    'BlazeStriker',
    'StormBringer',
    'VenomShot',
    'PhantomElite',
  ];

  constructor(scene: THREE.Scene, world: WorldManager) {
    this.scene = scene;
    this.world = world;
  }

  public spawnBots(count: number = 12) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const dist = 35 + Math.random() * 65;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const y = this.world.getTerrainHeight(x, z);

      const weaponList: WeaponId[] = ['akm', 'm416', 'shotgun', 'awm'];
      const weapon = weaponList[Math.floor(Math.random() * weaponList.length)];

      const name = this.botNames[i % this.botNames.length];
      const mesh = createCharacterMesh(true, name);
      mesh.position.set(x, y, z);
      this.scene.add(mesh);

      this.bots.push({
        id: `bot_${i}_${Date.now()}`,
        name,
        x,
        y,
        z,
        rotation: Math.random() * Math.PI * 2,
        health: 100,
        maxHealth: 100,
        isAlive: true,
        weapon,
        state: 'patrol',
        targetX: x + (Math.random() - 0.5) * 20,
        targetZ: z + (Math.random() - 0.5) * 20,
        lastShotTime: 0,
        shootCooldown: 1200 + Math.random() * 800,
        team: 2,
        mesh,
      });
    }
  }

  public updateBots(
    delta: number,
    playerX: number,
    playerZ: number,
    onPlayerHit: (dmg: number, botName: string) => void,
    onBotKilledBot: (killer: string, victim: string, weapon: string) => void
  ) {
    const now = Date.now();

    for (let i = 0; i < this.bots.length; i++) {
      const bot = this.bots[i];
      if (!bot.isAlive) continue;

      const dx = playerX - bot.x;
      const dz = playerZ - bot.z;
      const distToPlayer = Math.sqrt(dx * dx + dz * dz);

      // AI Decision Logic
      if (distToPlayer < 45) {
        // Attack Player
        bot.state = 'attack';
        const angleToPlayer = Math.atan2(dx, dz);
        bot.rotation = angleToPlayer;
        bot.mesh.rotation.y = angleToPlayer;

        // Move closer if too far, or strafe
        if (distToPlayer > 15) {
          const speed = 2.8 * delta;
          bot.x += Math.sin(angleToPlayer) * speed;
          bot.z += Math.cos(angleToPlayer) * speed;
        }

        // Fire at player
        if (now - bot.lastShotTime > bot.shootCooldown) {
          bot.lastShotTime = now;
          soundEngine.playGunshot(bot.weapon, false);

          // Accuracy check based on distance
          const hitChance = Math.max(0.2, 0.7 - distToPlayer * 0.012);
          if (Math.random() < hitChance) {
            const dmg = Math.floor(10 + Math.random() * 15);
            onPlayerHit(dmg, bot.name);
          }
        }
      } else {
        // Patrol & simulate combat against other bots
        bot.state = 'patrol';
        const tdx = bot.targetX - bot.x;
        const tdz = bot.targetZ - bot.z;
        const tdist = Math.sqrt(tdx * tdx + tdz * tdz);

        if (tdist < 3) {
          // Pick new patrol point within safe zone
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * (this.world.safeZoneRadius * 0.7);
          bot.targetX = this.world.safeZoneCenter.x + Math.cos(angle) * r;
          bot.targetZ = this.world.safeZoneCenter.y + Math.sin(angle) * r;
        } else {
          const moveAngle = Math.atan2(tdx, tdz);
          bot.rotation = moveAngle;
          bot.mesh.rotation.y = moveAngle;
          const speed = 2.2 * delta;
          bot.x += Math.sin(moveAngle) * speed;
          bot.z += Math.cos(moveAngle) * speed;
        }

        // Random bot-on-bot ambient fight simulation in distance
        if (Math.random() < 0.0008 && this.getAliveCount() > 3) {
          const otherAlive = this.bots.filter((b) => b.isAlive && b.id !== bot.id);
          if (otherAlive.length > 0) {
            const victim = otherAlive[Math.floor(Math.random() * otherAlive.length)];
            victim.health -= 50;
            if (victim.health <= 0) {
              victim.isAlive = false;
              this.scene.remove(victim.mesh);
              onBotKilledBot(bot.name, victim.name, bot.weapon.toUpperCase());
            }
          }
        }
      }

      // Keep bot grounded on terrain
      bot.y = this.world.getTerrainHeight(bot.x, bot.z);
      bot.mesh.position.set(bot.x, bot.y, bot.z);
    }
  }

  public damageBot(
    botId: string,
    damage: number,
    isHeadshot: boolean
  ): { killed: boolean; botName: string } {
    const bot = this.bots.find((b) => b.id === botId);
    if (!bot || !bot.isAlive) return { killed: false, botName: '' };

    bot.health -= damage;

    // Damage flash red on bot
    bot.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if ('color' in child.material) {
          const original = child.material.color.clone();
          child.material.color.setHex(0xff0000);
          setTimeout(() => {
            if (child.material && 'color' in child.material) {
              child.material.color.copy(original);
            }
          }, 100);
        }
      }
    });

    if (bot.health <= 0) {
      bot.isAlive = false;
      this.scene.remove(bot.mesh);

      // Drop death loot crate at bot location
      const lootMesh = createLootItemMesh('ammo', isHeadshot ? 'legendary' : 'rare');
      lootMesh.position.set(bot.x, bot.y, bot.z);
      this.scene.add(lootMesh);

      this.world.lootItems.push({
        id: `bot_drop_${bot.id}`,
        type: 'weapon',
        weaponId: bot.weapon,
        name: `${bot.name}'s Death Crate (${bot.weapon.toUpperCase()})`,
        rarity: isHeadshot ? 'legendary' : 'epic',
        x: bot.x,
        y: bot.y,
        z: bot.z,
        amount: 1,
        mesh: lootMesh,
      });

      return { killed: true, botName: bot.name };
    }

    return { killed: false, botName: bot.name };
  }

  public getAliveCount(): number {
    return this.bots.filter((b) => b.isAlive).length;
  }
}
