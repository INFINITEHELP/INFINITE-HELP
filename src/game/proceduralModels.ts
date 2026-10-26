import * as THREE from 'three';
import { WeaponId } from './types';

// Materials cache to avoid recreation
const materials = {
  skin: new THREE.MeshStandardMaterial({ color: 0xd2a679, roughness: 0.7, metalness: 0.05 }),
  pantsDesert: new THREE.MeshStandardMaterial({ color: 0x8a7350, roughness: 0.85, metalness: 0.0 }),
  pantsUrban: new THREE.MeshStandardMaterial({ color: 0x222629, roughness: 0.85, metalness: 0.0 }),
  vestKevlar: new THREE.MeshStandardMaterial({ color: 0x1f2421, roughness: 0.5, metalness: 0.2 }),
  boots: new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.9, metalness: 0.1 }),
  helmetGreen: new THREE.MeshStandardMaterial({ color: 0x2d3a27, roughness: 0.4, metalness: 0.4 }),
  helmetBlack: new THREE.MeshStandardMaterial({ color: 0x181818, roughness: 0.35, metalness: 0.6 }),
  visorGlass: new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.1, metalness: 0.9 }),
  panMetal: new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.85 }),
  gunMetal: new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3, metalness: 0.8 }),
  gunWood: new THREE.MeshStandardMaterial({ color: 0x5a2d0c, roughness: 0.7, metalness: 0.0 }),
  scopeLens: new THREE.MeshStandardMaterial({ color: 0x00ffff, roughness: 0.1, metalness: 0.9, emissive: 0x003344, emissiveIntensity: 0.4 }),
};

/**
 * Creates a composite procedural 3D character (10-12 parts)
 */
export function createCharacterMesh(isBot: boolean = false, botName: string = ''): THREE.Group {
  const character = new THREE.Group();
  character.name = isBot ? `bot_${botName}` : 'player_character';

  const uniformMat = isBot
    ? (Math.random() > 0.5 ? materials.pantsDesert : materials.pantsUrban)
    : materials.pantsUrban;

  // 1. Torso / Combat Shirt
  const torsoGeo = new THREE.BoxGeometry(0.5, 0.65, 0.3);
  const torso = new THREE.Mesh(torsoGeo, uniformMat);
  torso.position.y = 1.05;
  torso.castShadow = true;
  character.add(torso);

  // 2. Tactical Armor Vest
  const vestGeo = new THREE.BoxGeometry(0.54, 0.5, 0.34);
  const vest = new THREE.Mesh(vestGeo, materials.vestKevlar);
  vest.position.set(0, 1.08, 0);
  vest.castShadow = true;
  character.add(vest);

  // 3. Chest Pouches (3 small ammo pouches)
  for (let i = -1; i <= 1; i++) {
    const pouchGeo = new THREE.BoxGeometry(0.12, 0.15, 0.08);
    const pouch = new THREE.Mesh(pouchGeo, materials.boots);
    pouch.position.set(i * 0.15, 1.02, 0.2);
    character.add(pouch);
  }

  // 4. Head & Neck
  const headGeo = new THREE.BoxGeometry(0.26, 0.28, 0.28);
  const head = new THREE.Mesh(headGeo, materials.skin);
  head.position.set(0, 1.55, 0);
  head.castShadow = true;
  character.add(head);

  // 5. Military Helmet (Level 3 Spetsnaz style)
  const helmetGeo = new THREE.CylinderGeometry(0.17, 0.19, 0.22, 12);
  const helmet = new THREE.Mesh(helmetGeo, isBot ? materials.helmetGreen : materials.helmetBlack);
  helmet.position.set(0, 1.68, -0.02);
  helmet.castShadow = true;
  character.add(helmet);

  // Visor slot
  const visorGeo = new THREE.BoxGeometry(0.24, 0.06, 0.08);
  const visor = new THREE.Mesh(visorGeo, materials.visorGlass);
  visor.position.set(0, 1.63, 0.12);
  character.add(visor);

  // 6. Left Leg & Knee Pad
  const legGeo = new THREE.BoxGeometry(0.2, 0.65, 0.22);
  const leftLeg = new THREE.Mesh(legGeo, uniformMat);
  leftLeg.position.set(-0.15, 0.45, 0);
  leftLeg.castShadow = true;
  character.add(leftLeg);

  // 7. Right Leg
  const rightLeg = new THREE.Mesh(legGeo, uniformMat);
  rightLeg.position.set(0.15, 0.45, 0);
  rightLeg.castShadow = true;
  character.add(rightLeg);

  // Knee pads
  const padGeo = new THREE.BoxGeometry(0.18, 0.12, 0.08);
  const leftPad = new THREE.Mesh(padGeo, materials.boots);
  leftPad.position.set(-0.15, 0.45, 0.12);
  character.add(leftPad);

  const rightPad = new THREE.Mesh(padGeo, materials.boots);
  rightPad.position.set(0.15, 0.45, 0.12);
  character.add(rightPad);

  // 8. Boots
  const bootGeo = new THREE.BoxGeometry(0.21, 0.16, 0.28);
  const leftBoot = new THREE.Mesh(bootGeo, materials.boots);
  leftBoot.position.set(-0.15, 0.08, 0.03);
  leftBoot.castShadow = true;
  character.add(leftBoot);

  const rightBoot = new THREE.Mesh(bootGeo, materials.boots);
  rightBoot.position.set(0.15, 0.08, 0.03);
  rightBoot.castShadow = true;
  character.add(rightBoot);

  // 9. Arms & Hands
  const armGeo = new THREE.BoxGeometry(0.14, 0.55, 0.14);
  const leftArm = new THREE.Mesh(armGeo, uniformMat);
  leftArm.position.set(-0.35, 1.05, 0.05);
  leftArm.castShadow = true;
  character.add(leftArm);

  const rightArm = new THREE.Mesh(armGeo, uniformMat);
  rightArm.position.set(0.35, 1.05, 0.15);
  rightArm.castShadow = true;
  character.add(rightArm);

  // 10. Iconic PUBG Frying Pan on the back
  const panHandleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.22, 6);
  const panHandle = new THREE.Mesh(panHandleGeo, materials.panMetal);
  panHandle.position.set(0, 0.88, -0.22);
  panHandle.rotation.z = Math.PI * 0.15;
  character.add(panHandle);

  const panBodyGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.05, 16);
  const panBody = new THREE.Mesh(panBodyGeo, materials.panMetal);
  panBody.position.set(0, 1.02, -0.22);
  panBody.rotation.x = Math.PI * 0.5;
  panBody.castShadow = true;
  character.add(panBody);

  // 11. Held Weapon Mount
  const weaponMount = new THREE.Group();
  weaponMount.name = 'weapon_mount';
  weaponMount.position.set(0.28, 1.0, 0.35);
  character.add(weaponMount);

  // Attach default gun to mount
  const gunMesh = createWeaponMesh(isBot ? 'akm' : 'm416');
  weaponMount.add(gunMesh);

  return character;
}

/**
 * Creates a composite procedural 3D weapon
 */
export function createWeaponMesh(weaponId: WeaponId): THREE.Group {
  const gun = new THREE.Group();
  gun.name = `weapon_${weaponId}`;

  // 1. Receiver / Main Body
  const bodyGeo = new THREE.BoxGeometry(0.08, 0.12, 0.55);
  const body = new THREE.Mesh(bodyGeo, materials.gunMetal);
  body.castShadow = true;
  gun.add(body);

  // 2. Barrel
  const barrelLen = weaponId === 'awm' ? 0.75 : weaponId === 'm416' ? 0.55 : 0.5;
  const barrelGeo = new THREE.CylinderGeometry(0.02, 0.02, barrelLen, 8);
  const barrel = new THREE.Mesh(barrelGeo, materials.gunMetal);
  barrel.rotation.x = Math.PI * 0.5;
  barrel.position.set(0, 0.03, barrelLen / 2 + 0.25);
  barrel.castShadow = true;
  gun.add(barrel);

  // Muzzle muzzle flash attach point
  const muzzlePoint = new THREE.Object3D();
  muzzlePoint.name = 'muzzle_point';
  muzzlePoint.position.set(0, 0.03, barrelLen + 0.3);
  gun.add(muzzlePoint);

  // 3. Stock
  const stockMat = weaponId === 'akm' ? materials.gunWood : materials.gunMetal;
  const stockGeo = new THREE.BoxGeometry(0.07, 0.14, 0.35);
  const stock = new THREE.Mesh(stockGeo, stockMat);
  stock.position.set(0, -0.02, -0.35);
  stock.castShadow = true;
  gun.add(stock);

  // 4. Magazine
  const magMat = weaponId === 'akm' ? materials.gunWood : materials.gunMetal;
  const magGeo = new THREE.BoxGeometry(0.06, 0.24, 0.12);
  const mag = new THREE.Mesh(magGeo, magMat);
  mag.position.set(0, -0.15, 0.05);
  mag.rotation.x = weaponId === 'akm' ? 0.25 : 0; // Curved for AKM
  gun.add(mag);

  // 5. Optics / Scope
  if (weaponId === 'awm') {
    // Heavy 8x Sniper Scope
    const scopeGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.35, 12);
    const scope = new THREE.Mesh(scopeGeo, materials.gunMetal);
    scope.rotation.x = Math.PI * 0.5;
    scope.position.set(0, 0.12, 0);
    gun.add(scope);

    // Front lens
    const lensGeo = new THREE.CircleGeometry(0.04, 12);
    const lens = new THREE.Mesh(lensGeo, materials.scopeLens);
    lens.position.set(0, 0.12, 0.18);
    gun.add(lens);
  } else if (weaponId === 'm416') {
    // 4x Holographic Sight
    const sightGeo = new THREE.BoxGeometry(0.06, 0.08, 0.16);
    const sight = new THREE.Mesh(sightGeo, materials.gunMetal);
    sight.position.set(0, 0.09, 0.05);
    gun.add(sight);

    const reticleGeo = new THREE.PlaneGeometry(0.04, 0.04);
    const reticle = new THREE.Mesh(reticleGeo, materials.scopeLens);
    reticle.position.set(0, 0.09, 0.12);
    gun.add(reticle);
  } else {
    // Iron sights
    const ironGeo = new THREE.BoxGeometry(0.02, 0.04, 0.04);
    const rear = new THREE.Mesh(ironGeo, materials.gunMetal);
    rear.position.set(0, 0.08, -0.15);
    gun.add(rear);

    const front = new THREE.Mesh(ironGeo, materials.gunMetal);
    front.position.set(0, 0.06, 0.35);
    gun.add(front);
  }

  // Pistol grip
  const gripGeo = new THREE.BoxGeometry(0.05, 0.18, 0.07);
  const grip = new THREE.Mesh(gripGeo, materials.boots);
  grip.position.set(0, -0.12, -0.12);
  grip.rotation.x = -0.3;
  gun.add(grip);

  gun.scale.set(0.8, 0.8, 0.8);
  return gun;
}

/**
 * Creates an iconic PUBG/Free Fire Airdrop Crate
 */
export function createAirdropMesh(): THREE.Group {
  const airdrop = new THREE.Group();
  airdrop.name = 'airdrop_crate';

  // 1. Red steel crate
  const crateMat = new THREE.MeshStandardMaterial({ color: 0xb22222, roughness: 0.4, metalness: 0.6 });
  const crateGeo = new THREE.BoxGeometry(2.4, 1.8, 2.4);
  const crate = new THREE.Mesh(crateGeo, crateMat);
  crate.position.y = 0.9;
  crate.castShadow = true;
  crate.receiveShadow = true;
  airdrop.add(crate);

  // 2. Yellow hazard corner trim
  const trimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.8 });
  for (let x = -1; x <= 1; x += 2) {
    for (let z = -1; z <= 1; z += 2) {
      const colGeo = new THREE.BoxGeometry(0.2, 1.82, 0.2);
      const col = new THREE.Mesh(colGeo, trimMat);
      col.position.set(x * 1.15, 0.9, z * 1.15);
      airdrop.add(col);
    }
  }

  // 3. Blue draped tarp on top
  const tarpMat = new THREE.MeshStandardMaterial({ color: 0x1e3f8a, roughness: 0.8, metalness: 0.0 });
  const tarpGeo = new THREE.BoxGeometry(2.5, 0.3, 2.5);
  const tarp = new THREE.Mesh(tarpGeo, tarpMat);
  tarp.position.y = 1.85;
  airdrop.add(tarp);

  // 4. Red smoke signal emitter beacon
  const beaconGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 8);
  const beaconMat = new THREE.MeshStandardMaterial({
    color: 0xff2222,
    emissive: 0xff0000,
    emissiveIntensity: 0.8,
  });
  const beacon = new THREE.Mesh(beaconGeo, beaconMat);
  beacon.position.set(0, 2.1, 0);
  airdrop.add(beacon);

  return airdrop;
}

/**
 * Creates a Military Shipping Container
 */
export function createContainerMesh(colorHex: number): THREE.Group {
  const container = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5, metalness: 0.4 });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6, metalness: 0.7 });

  // Main box
  const mainGeo = new THREE.BoxGeometry(5.8, 2.6, 2.4);
  const main = new THREE.Mesh(mainGeo, mat);
  main.position.y = 1.3;
  main.castShadow = true;
  main.receiveShadow = true;
  container.add(main);

  // Edge frame
  const frameGeo = new THREE.BoxGeometry(5.85, 2.65, 0.15);
  const frameFront = new THREE.Mesh(frameGeo, frameMat);
  frameFront.position.set(0, 1.3, 1.2);
  container.add(frameFront);

  const frameBack = new THREE.Mesh(frameGeo, frameMat);
  frameBack.position.set(0, 1.3, -1.2);
  container.add(frameBack);

  return container;
}

/**
 * Creates a Military Concrete Bunker / Sandbag Fort
 */
export function createBunkerMesh(): THREE.Group {
  const bunker = new THREE.Group();
  const concreteMat = new THREE.MeshStandardMaterial({ color: 0x6e706e, roughness: 0.9, metalness: 0.1 });
  const sandbagMat = new THREE.MeshStandardMaterial({ color: 0xb59e75, roughness: 0.95, metalness: 0.0 });

  // Concrete roof
  const roofGeo = new THREE.BoxGeometry(6.0, 0.4, 5.0);
  const roof = new THREE.Mesh(roofGeo, concreteMat);
  roof.position.y = 2.4;
  roof.castShadow = true;
  bunker.add(roof);

  // Pillars
  const pillarGeo = new THREE.BoxGeometry(0.8, 2.2, 0.8);
  for (let x = -2.4; x <= 2.4; x += 4.8) {
    for (let z = -2.0; z <= 2.0; z += 4.0) {
      const pillar = new THREE.Mesh(pillarGeo, concreteMat);
      pillar.position.set(x, 1.1, z);
      pillar.castShadow = true;
      bunker.add(pillar);
    }
  }

  // Sandbag front wall
  const bagGeo = new THREE.BoxGeometry(0.7, 0.35, 0.35);
  for (let row = 0; row < 3; row++) {
    for (let i = -2; i <= 2; i++) {
      const bag = new THREE.Mesh(bagGeo, sandbagMat);
      bag.position.set(i * 0.75, row * 0.35 + 0.18, 2.1);
      bag.castShadow = true;
      bunker.add(bag);
    }
  }

  return bunker;
}

/**
 * Creates an acacia/desert combat tree
 */
export function createTreeMesh(scale: number = 1): THREE.Group {
  const tree = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3424, roughness: 0.9, metalness: 0.05 });
  const foliageMat = new THREE.MeshStandardMaterial({ color: 0x3d5a2d, roughness: 0.7, metalness: 0.0 });

  // Trunk
  const trunkGeo = new THREE.CylinderGeometry(0.25 * scale, 0.45 * scale, 3.5 * scale, 8);
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = 1.75 * scale;
  trunk.castShadow = true;
  tree.add(trunk);

  // Canopy layers
  const canopy1Geo = new THREE.ConeGeometry(2.4 * scale, 2.0 * scale, 8);
  const canopy1 = new THREE.Mesh(canopy1Geo, foliageMat);
  canopy1.position.y = 3.6 * scale;
  canopy1.castShadow = true;
  tree.add(canopy1);

  const canopy2Geo = new THREE.ConeGeometry(1.8 * scale, 1.8 * scale, 8);
  const canopy2 = new THREE.Mesh(canopy2Geo, foliageMat);
  canopy2.position.y = 4.8 * scale;
  canopy2.castShadow = true;
  tree.add(canopy2);

  return tree;
}

/**
 * Creates a glowing loot item / death crate on the ground
 */
export function createLootItemMesh(type: string, rarity: 'common' | 'rare' | 'epic' | 'legendary'): THREE.Group {
  const group = new THREE.Group();

  const colorMap = {
    common: 0x4ade80, // Green
    rare: 0x38bdf8, // Cyan
    epic: 0xa855f7, // Purple
    legendary: 0xfacc15, // Golden
  };
  const color = colorMap[rarity] || 0x4ade80;

  // Box / Crate
  const boxGeo = new THREE.BoxGeometry(0.7, 0.4, 0.5);
  const boxMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.4, metalness: 0.8 });
  const box = new THREE.Mesh(boxGeo, boxMat);
  box.position.y = 0.2;
  box.castShadow = true;
  group.add(box);

  // Glowing beacon light beam pointing upward
  const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.5, 6);
  const beamMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.65,
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.position.y = 1.95;
  group.add(beam);

  // Rarity light
  const light = new THREE.PointLight(color, 2, 4);
  light.position.y = 0.8;
  group.add(light);

  return group;
}
