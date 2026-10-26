import * as THREE from 'three';
import {
  createAirdropMesh,
  createBunkerMesh,
  createContainerMesh,
  createTreeMesh,
  createLootItemMesh,
} from './proceduralModels';
import { LootItem, WeaponId } from './types';

export interface WorldObstacle {
  x: number;
  z: number;
  radius: number;
}

export class WorldManager {
  public scene: THREE.Scene;
  public obstacles: WorldObstacle[] = [];
  public lootItems: (LootItem & { mesh: THREE.Group })[] = [];
  public airdropMesh: THREE.Group | null = null;
  public safeZoneCenter: THREE.Vector2 = new THREE.Vector2(0, 0);
  public safeZoneRadius: number = 160;
  public targetSafeZoneRadius: number = 160;
  public safeZoneMesh: THREE.Mesh | null = null;
  public airdropSmokeParticles: THREE.Points | null = null;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  public getTerrainHeight(x: number, z: number): number {
    // Gentle rolling hills with flat compounds
    const distFromOrigin = Math.sqrt(x * x + z * z);
    if (distFromOrigin < 40) return 0; // Flat central military base
    return (
      Math.sin(x * 0.035) * Math.cos(z * 0.035) * 2.2 +
      Math.sin(x * 0.015) * 1.5 +
      Math.cos(z * 0.02) * 1.2
    );
  }

  public buildWorld() {
    this.createTerrain();
    this.createMilitaryBase();
    this.createNaturalFoliage();
    this.createSafeZone();
    this.spawnInitialLoot();
    this.spawnAirdrop(15, 25);
  }

  private createTerrain() {
    // Realistic military island terrain with custom vertex heights
    const size = 400;
    const segments = 100;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);
      const vy = this.getTerrainHeight(vx, vz);
      pos.setY(i, vy);
    }
    geo.computeVertexNormals();

    // Procedural terrain texture via canvas
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#4a5b3a'; // Military green / dirt
      ctx.fillRect(0, 0, 512, 512);

      // Desert sand patches & dirt tracks
      ctx.fillStyle = '#6e6347';
      for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * 512,
          Math.random() * 512,
          30 + Math.random() * 40,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16);
    texture.colorSpace = THREE.SRGBColorSpace;

    const terrainMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.9,
      metalness: 0.05,
    });

    const terrain = new THREE.Mesh(geo, terrainMat);
    terrain.receiveShadow = true;
    this.scene.add(terrain);
  }

  private createMilitaryBase() {
    // Shipping Containers in tactical military layouts
    const containerLayouts = [
      { x: -15, z: -12, rot: 0, color: 0x2b4c7e }, // Navy blue
      { x: -15, z: -9, rot: 0, color: 0x8a3324 }, // Rust red
      { x: 12, z: -15, rot: Math.PI / 2, color: 0x3d5a2d }, // Military green
      { x: 16, z: -15, rot: Math.PI / 2, color: 0x2b4c7e },
      { x: -22, z: 18, rot: 0.4, color: 0x8a3324 },
      { x: 25, z: 22, rot: -0.6, color: 0x3d5a2d },
      { x: 0, z: 32, rot: 0, color: 0x2b4c7e },
    ];

    containerLayouts.forEach((c) => {
      const mesh = createContainerMesh(c.color);
      const y = this.getTerrainHeight(c.x, c.z);
      mesh.position.set(c.x, y, c.z);
      mesh.rotation.y = c.rot;
      this.scene.add(mesh);

      this.obstacles.push({ x: c.x, z: c.z, radius: 3.2 });
    });

    // Concrete Bunkers & Sandbag Forts
    const bunkerSpots = [
      { x: 0, z: -25 },
      { x: -35, z: -5 },
      { x: 35, z: 5 },
    ];

    bunkerSpots.forEach((b) => {
      const mesh = createBunkerMesh();
      const y = this.getTerrainHeight(b.x, b.z);
      mesh.position.set(b.x, y, b.z);
      this.scene.add(mesh);

      this.obstacles.push({ x: b.x, z: b.z, radius: 4.5 });
    });
  }

  private createNaturalFoliage() {
    // Scattered trees and rocks across the battleground
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 110;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const y = this.getTerrainHeight(x, z);

      const tree = createTreeMesh(0.8 + Math.random() * 0.5);
      tree.position.set(x, y, z);
      this.scene.add(tree);

      this.obstacles.push({ x, z, radius: 1.0 });
    }
  }

  private createSafeZone() {
    // Shimmering blue electric cylinder representing the PUBG/Free Fire safe zone circle
    const geo = new THREE.CylinderGeometry(this.safeZoneRadius, this.safeZoneRadius, 80, 48, 1, true);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x00b4d8,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
      wireframe: false,
    });
    this.safeZoneMesh = new THREE.Mesh(geo, mat);
    this.safeZoneMesh.position.set(this.safeZoneCenter.x, 20, this.safeZoneCenter.y);
    this.scene.add(this.safeZoneMesh);
  }

  public updateSafeZone(delta: number) {
    if (!this.safeZoneMesh) return;

    // Smoothly shrink radius towards target
    if (this.safeZoneRadius > this.targetSafeZoneRadius) {
      this.safeZoneRadius -= delta * 1.8;
      const scale = this.safeZoneRadius / 160;
      this.safeZoneMesh.scale.set(scale, 1, scale);
    }
  }

  public spawnInitialLoot() {
    const lootSpawns: Array<{
      type: LootItem['type'];
      weaponId?: WeaponId;
      name: string;
      rarity: LootItem['rarity'];
      x: number;
      z: number;
    }> = [
      { type: 'weapon', weaponId: 'akm', name: 'AKM 7.62mm', rarity: 'rare', x: -12, z: -8 },
      { type: 'weapon', weaponId: 'm416', name: 'M416 5.56mm', rarity: 'epic', x: 10, z: -12 },
      { type: 'weapon', weaponId: 'awm', name: 'AWM Sniper (.300 Mag)', rarity: 'legendary', x: 0, z: -22 },
      { type: 'weapon', weaponId: 'shotgun', name: 'M1887 Shotgun', rarity: 'rare', x: 22, z: 20 },
      { type: 'medkit', name: 'First Aid Kit (+50 HP)', rarity: 'common', x: -16, z: -14 },
      { type: 'medkit', name: 'Medkit Full (+100 HP)', rarity: 'epic', x: 0, z: 28 },
      { type: 'armor', name: 'Level 3 Military Vest', rarity: 'legendary', x: 14, z: -17 },
      { type: 'helmet', name: 'Level 3 Spetsnaz Helmet', rarity: 'legendary', x: -33, z: -3 },
      { type: 'ammo', name: '5.56mm Ammo (60 rounds)', rarity: 'common', x: 12, z: -10 },
      { type: 'ammo', name: '7.62mm Ammo (60 rounds)', rarity: 'common', x: -10, z: -6 },
    ];

    lootSpawns.forEach((item, idx) => {
      const y = this.getTerrainHeight(item.x, item.z);
      const mesh = createLootItemMesh(item.type, item.rarity);
      mesh.position.set(item.x, y, item.z);
      this.scene.add(mesh);

      this.lootItems.push({
        id: `loot_${idx}`,
        type: item.type,
        weaponId: item.weaponId,
        name: item.name,
        rarity: item.rarity,
        x: item.x,
        y,
        z: item.z,
        amount: 1,
        mesh,
      });
    });
  }

  public spawnAirdrop(x: number, z: number) {
    const y = this.getTerrainHeight(x, z);
    const airdrop = createAirdropMesh();
    airdrop.position.set(x, y, z);
    this.scene.add(airdrop);
    this.airdropMesh = airdrop;
    this.obstacles.push({ x, z, radius: 2.2 });

    // Legendary AWM + Level 3 Armor loot right at the airdrop!
    const airdropLootMesh = createLootItemMesh('weapon', 'legendary');
    airdropLootMesh.position.set(x + 1.8, y, z);
    this.scene.add(airdropLootMesh);

    this.lootItems.push({
      id: `loot_airdrop_${Date.now()}`,
      type: 'weapon',
      weaponId: 'awm',
      name: 'Airdrop AWM Magnum + 8x Scope',
      rarity: 'legendary',
      x: x + 1.8,
      y,
      z,
      amount: 1,
      mesh: airdropLootMesh,
    });
  }

  public removeLootItem(id: string) {
    const idx = this.lootItems.findIndex((l) => l.id === id);
    if (idx !== -1) {
      const item = this.lootItems[idx];
      this.scene.remove(item.mesh);
      this.lootItems.splice(idx, 1);
    }
  }
}
