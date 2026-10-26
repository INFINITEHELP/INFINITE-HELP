export type GameTheme = 'pubg' | 'freefire';
export type CameraMode = 'fps' | 'tps';

export type WeaponId = 'akm' | 'm416' | 'awm' | 'shotgun';

export interface WeaponDef {
  id: WeaponId;
  name: string;
  category: 'AR' | 'Sniper' | 'Shotgun';
  damage: number;
  headshotMultiplier: number;
  fireRateMs: number; // delay between shots
  reloadTimeMs: number;
  magazineSize: number;
  maxAmmo: number;
  range: number;
  recoilVertical: number;
  recoilHorizontal: number;
  spread: number;
  scopeMagnification: number; // 1 = ironsight, 2 = red dot, 4 = 4x, 8 = 8x
  color: string;
  themeName: {
    pubg: string;
    freefire: string;
  };
}

export interface InventoryWeapon {
  id: WeaponId;
  currentAmmo: number;
  reserveAmmo: number;
}

export interface PlayerStats {
  health: number;
  maxHealth: number;
  armor: number; // 0 to 100
  helmet: number; // 0 to 100
  energy: number; // 0 to 100
  medkits: number;
  energyDrinks: number;
  kills: number;
  damageDealt: number;
  headshots: number;
  shotsFired: number;
  shotsHit: number;
}

export interface BotEntity {
  id: string;
  name: string;
  x: number;
  z: number;
  y: number;
  rotation: number;
  health: number;
  maxHealth: number;
  isAlive: boolean;
  weapon: WeaponId;
  state: 'patrol' | 'chase' | 'attack' | 'flee';
  targetX: number;
  targetZ: number;
  lastShotTime: number;
  shootCooldown: number;
  team: number;
}

export interface LootItem {
  id: string;
  type: 'weapon' | 'ammo' | 'medkit' | 'armor' | 'helmet' | 'airdrop';
  weaponId?: WeaponId;
  name: string;
  x: number;
  y: number;
  z: number;
  amount: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface KillfeedEntry {
  id: string;
  killer: string;
  victim: string;
  weapon: string;
  isHeadshot: boolean;
  isPlayerKiller: boolean;
  timestamp: number;
}

export interface DamagePopup {
  id: string;
  x: number; // screen coords or 3D
  y: number;
  damage: number;
  isHeadshot: boolean;
  timestamp: number;
}
