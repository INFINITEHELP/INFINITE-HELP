import React, { useEffect, useRef, useState } from 'react';
import { GameEngine } from './gameEngine';
import { GameHUD } from './components/GameHUD';
import { VictoryModal } from './components/VictoryModal';
import { DefeatModal } from './components/DefeatModal';
import {
  CameraMode,
  GameTheme,
  InventoryWeapon,
  KillfeedEntry,
  LootItem,
  PlayerStats,
} from './types';
import { soundEngine } from './audio';
import { Crosshair, HelpCircle, X, Shield, Award, Sparkles } from 'lucide-react';

export const BattleRoyaleApp: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);

  // React state synced from engine
  const [stats, setStats] = useState<PlayerStats>({
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
  });

  const [activeWeapon, setActiveWeapon] = useState<InventoryWeapon>({
    id: 'm416',
    currentAmmo: 30,
    reserveAmmo: 120,
  });

  const [inventory, setInventory] = useState<InventoryWeapon[]>([
    { id: 'm416', currentAmmo: 30, reserveAmmo: 120 },
    { id: 'akm', currentAmmo: 30, reserveAmmo: 90 },
  ]);

  const [killfeed, setKillfeed] = useState<KillfeedEntry[]>([]);
  const [aliveCount, setAliveCount] = useState<number>(17);
  const [hitmarker, setHitmarker] = useState<{ active: boolean; isHeadshot: boolean }>({
    active: false,
    isHeadshot: false,
  });
  const [damageFlash, setDamageFlash] = useState<boolean>(false);
  const [nearbyLoot, setNearbyLoot] = useState<LootItem[]>([]);
  const [isScoping, setIsScoping] = useState<boolean>(false);
  const [cameraMode, setCameraMode] = useState<CameraMode>('fps');
  const [theme, setTheme] = useState<GameTheme>('pubg');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals
  const [matchResult, setMatchResult] = useState<'victory' | 'defeat' | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Initialize Engine
  useEffect(() => {
    if (!mountRef.current) return;

    const engine = new GameEngine(mountRef.current, {
      onStatsChange: (newStats) => setStats(newStats),
      onActiveWeaponChange: (w) => setActiveWeapon({ ...w }),
      onKillfeedAdd: (entry) => {
        setKillfeed((prev) => [...prev.slice(-6), entry]);
      },
      onHitmarker: (isHeadshot) => {
        setHitmarker({ active: true, isHeadshot });
        setTimeout(() => setHitmarker({ active: false, isHeadshot: false }), 120);
      },
      onDamageTaken: () => {
        setDamageFlash(true);
        setTimeout(() => setDamageFlash(false), 220);
      },
      onNearbyLootChange: (loot) => setNearbyLoot(loot),
      onMatchEnd: (victory) => {
        setMatchResult(victory ? 'victory' : 'defeat');
      },
      onAliveCountChange: (alive) => setAliveCount(alive),
    });

    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // Sync scoping & inventory state
  useEffect(() => {
    const checkLoop = setInterval(() => {
      if (engineRef.current) {
        setIsScoping(engineRef.current.isScoping);
        setInventory([...engineRef.current.inventory]);
      }
    }, 100);
    return () => clearInterval(checkLoop);
  }, []);

  const handleRestart = () => {
    setMatchResult(null);
    if (engineRef.current && mountRef.current) {
      engineRef.current.destroy();
      const engine = new GameEngine(mountRef.current, {
        onStatsChange: (newStats) => setStats(newStats),
        onActiveWeaponChange: (w) => setActiveWeapon({ ...w }),
        onKillfeedAdd: (entry) => setKillfeed((prev) => [...prev.slice(-6), entry]),
        onHitmarker: (isHeadshot) => {
          setHitmarker({ active: true, isHeadshot });
          setTimeout(() => setHitmarker({ active: false, isHeadshot: false }), 120);
        },
        onDamageTaken: () => {
          setDamageFlash(true);
          setTimeout(() => setDamageFlash(false), 220);
        },
        onNearbyLootChange: (loot) => setNearbyLoot(loot),
        onMatchEnd: (victory) => setMatchResult(victory ? 'victory' : 'defeat'),
        onAliveCountChange: (alive) => setAliveCount(alive),
      });
      engineRef.current = engine;
    }
  };

  const handleToggleTheme = () => {
    const nextTheme: GameTheme = theme === 'pubg' ? 'freefire' : 'pubg';
    setTheme(nextTheme);
    if (engineRef.current) {
      engineRef.current.theme = nextTheme;
    }
  };

  const handleToggleCamera = () => {
    if (engineRef.current) {
      engineRef.current.toggleCameraMode();
      setCameraMode(engineRef.current.cameraMode);
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans select-none">
      {/* 3D WebGL Canvas Mount (Isolated from React DOM) */}
      <div ref={mountRef} className="absolute inset-0 z-0 cursor-crosshair" />

      {/* Battle Royale Tactical HUD */}
      <GameHUD
        stats={stats}
        activeWeapon={activeWeapon}
        inventory={inventory}
        killfeed={killfeed}
        aliveCount={aliveCount}
        hitmarker={hitmarker}
        damageFlash={damageFlash}
        nearbyLoot={nearbyLoot}
        isScoping={isScoping}
        cameraMode={cameraMode}
        theme={theme}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onSwitchWeapon={(idx) => engineRef.current?.switchWeapon(idx)}
        onReload={() => engineRef.current?.reloadWeapon()}
        onPickupLoot={() => engineRef.current?.pickupNearestLoot()}
        onUseMedkit={() => engineRef.current?.useMedkit()}
        onUseEnergyDrink={() => engineRef.current?.useEnergyDrink()}
        onToggleScope={() => {
          if (engineRef.current) {
            engineRef.current.isScoping = !engineRef.current.isScoping;
            setIsScoping(engineRef.current.isScoping);
          }
        }}
        onToggleCameraMode={handleToggleCamera}
        onToggleTheme={handleToggleTheme}
        onFireStart={() => {
          if (engineRef.current) engineRef.current.isFiring = true;
        }}
        onFireEnd={() => {
          if (engineRef.current) engineRef.current.isFiring = false;
        }}
        onJump={() => {
          if (engineRef.current && engineRef.current.isGrounded) {
            engineRef.current.playerVel.y = 7.5;
            engineRef.current.isGrounded = false;
          }
        }}
        onCrouch={() => {
          if (engineRef.current) {
            engineRef.current.isCrouched = !engineRef.current.isCrouched;
          }
        }}
        onJoystickMove={(x, y) => {
          if (engineRef.current) {
            engineRef.current.joystickVector = { x, y };
          }
        }}
        onOpenGuide={() => setShowGuide(true)}
      />

      {/* Controls & Weapons Guide Modal */}
      {showGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Controls and Weapons Guide"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
        >
          <div className="w-full max-w-lg bg-gradient-to-b from-[#14181b] to-black border-2 border-amber-500 rounded-3xl p-6 shadow-2xl text-white font-mono space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎮</span>
                <h2 className="text-lg font-black text-amber-400">
                  BATTLE ROYALE CONTROLS
                </h2>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1 rounded-lg bg-white/10 text-gray-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-2xl bg-black/60 border border-amber-500/30 space-y-1.5">
                <span className="text-amber-300 font-bold block text-sm">
                  PC Keyboard & Mouse:
                </span>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li><strong>Click on Game Screen</strong> to lock mouse aim cursor</li>
                  <li><strong>WASD</strong>: Move (Shift: Sprint, Space: Jump, C: Crouch)</li>
                  <li><strong>Left Click</strong>: Fire Weapon (automatic recoil simulation)</li>
                  <li><strong>Right Click</strong>: Aim Down Sights (ADS) / 8x Sniper Scope</li>
                  <li><strong>R</strong>: Reload magazine</li>
                  <li><strong>1 / 2</strong>: Switch Primary & Secondary weapons</li>
                  <li><strong>E</strong>: Pick up nearby loot, ammo, weapons, or airdrop crates</li>
                  <li><strong>V</strong>: Switch First Person (FPS) & Third Person (TPS)</li>
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-1.5">
                <span className="text-emerald-300 font-bold block text-sm">
                  Mobile Touch Controls:
                </span>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li><strong>Left Thumbstick</strong>: 360° virtual joystick for movement</li>
                  <li><strong>FIRE Button</strong>: Quick shoot trigger with muzzle flash</li>
                  <li><strong>SCOPE Button</strong>: Zoom into 4x / 8x reticle</li>
                  <li><strong>JUMP / CROUCH</strong>: Tactical stance controls</li>
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-1.5">
                <span className="text-cyan-300 font-bold block text-sm">
                  Arsenal & Tactics:
                </span>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li><strong>AWM Sniper</strong>: One-shot headshot with 8x Scope!</li>
                  <li><strong>M416 Tactical</strong>: Ultra low recoil automatic rifle</li>
                  <li><strong>AKM 7.62mm</strong>: High stopping power assault rifle</li>
                  <li><strong>Blue Electric Zone</strong>: Stay inside the circle to survive!</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-wider transition-all cursor-pointer"
            >
              RETURN TO BATTLE (DROP IN)
            </button>
          </div>
        </div>
      )}

      {/* Victory Celebration Modal (Winner Winner Chicken Dinner / Booyah!) */}
      {matchResult === 'victory' && (
        <VictoryModal
          stats={stats}
          theme={theme}
          onPlayAgain={handleRestart}
          onToggleTheme={handleToggleTheme}
        />
      )}

      {/* Defeat Screen */}
      {matchResult === 'defeat' && (
        <DefeatModal stats={stats} theme={theme} onPlayAgain={handleRestart} />
      )}
    </div>
  );
};
