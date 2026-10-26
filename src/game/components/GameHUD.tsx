import React, { useState } from 'react';
import {
  InventoryWeapon,
  KillfeedEntry,
  LootItem,
  PlayerStats,
  GameTheme,
  CameraMode,
  WeaponId,
} from '../types';
import { WEAPONS_DATA } from '../weaponsData';
import {
  Crosshair,
  Shield,
  Heart,
  Zap,
  Target,
  RefreshCw,
  Skull,
  Eye,
  Radio,
  Flame,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface GameHUDProps {
  stats: PlayerStats;
  activeWeapon: InventoryWeapon;
  inventory: InventoryWeapon[];
  killfeed: KillfeedEntry[];
  aliveCount: number;
  hitmarker: { active: boolean; isHeadshot: boolean };
  damageFlash: boolean;
  nearbyLoot: LootItem[];
  isScoping: boolean;
  cameraMode: CameraMode;
  theme: GameTheme;
  isMuted: boolean;
  onToggleMute: () => void;
  onSwitchWeapon: (idx: number) => void;
  onReload: () => void;
  onPickupLoot: () => void;
  onUseMedkit: () => void;
  onUseEnergyDrink: () => void;
  onToggleScope: () => void;
  onToggleCameraMode: () => void;
  onToggleTheme: () => void;
  onFireStart: () => void;
  onFireEnd: () => void;
  onJump: () => void;
  onCrouch: () => void;
  onJoystickMove: (x: number, y: number) => void;
  onOpenGuide: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  stats,
  activeWeapon,
  inventory,
  killfeed,
  aliveCount,
  hitmarker,
  damageFlash,
  nearbyLoot,
  isScoping,
  cameraMode,
  theme,
  isMuted,
  onToggleMute,
  onSwitchWeapon,
  onReload,
  onPickupLoot,
  onUseMedkit,
  onUseEnergyDrink,
  onToggleScope,
  onToggleCameraMode,
  onToggleTheme,
  onFireStart,
  onFireEnd,
  onJump,
  onCrouch,
  onJoystickMove,
  onOpenGuide,
}) => {
  const [touchOrigin, setTouchOrigin] = useState<{ x: number; y: number } | null>(null);
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(null);

  const weaponDef = WEAPONS_DATA[activeWeapon.id];
  const isAwmScope = isScoping && activeWeapon.id === 'awm';

  // Virtual joystick touch handlers
  const handleJoystickTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setTouchOrigin({ x: centerX, y: centerY });
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleJoystickTouchMove = (e: React.TouchEvent) => {
    if (!touchOrigin) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchOrigin.x;
    const dy = touch.clientY - touchOrigin.y;
    const dist = Math.min(45, Math.sqrt(dx * dx + dy * dy));
    const angle = Math.atan2(dy, dx);
    const normX = (Math.cos(angle) * dist) / 45;
    const normY = (Math.sin(angle) * dist) / 45;
    setTouchPos({ x: touchOrigin.x + normX * 45, y: touchOrigin.y + normY * 45 });
    onJoystickMove(normX, normY);
  };

  const handleJoystickTouchEnd = () => {
    setTouchOrigin(null);
    setTouchPos(null);
    onJoystickMove(0, 0);
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden font-sans">
      {/* Damage Flash Red Vignette */}
      {damageFlash && (
        <div className="absolute inset-0 bg-red-600/35 border-8 border-red-600 animate-pulse pointer-events-none z-10" />
      )}

      {/* 8x Sniper Scope Overlay (PUBG / Free Fire AWM Style) */}
      {isAwmScope ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {/* Black outer mask */}
          <div className="w-[85vmin] h-[85vmin] rounded-full border-[80px] sm:border-[160px] border-black/95 relative shadow-[0_0_80px_rgba(0,0,0,1)] flex items-center justify-center">
            {/* Crosshair mil-dot lines */}
            <div className="absolute w-full h-[1.5px] bg-black/90" />
            <div className="absolute h-full w-[1.5px] bg-black/90" />
            {/* Range markings */}
            <div className="absolute w-12 h-[1px] bg-black top-[40%]" />
            <div className="absolute w-8 h-[1px] bg-black top-[45%]" />
            <div className="absolute w-16 h-[1px] bg-black top-[55%]" />
            <div className="absolute w-20 h-[1px] bg-black top-[60%]" />
            <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span className="absolute bottom-6 text-[10px] text-emerald-400 font-mono tracking-widest bg-black/70 px-2 py-0.5 rounded">
              8X HD SCOPE • 300 MAG
            </span>
          </div>
        </div>
      ) : (
        /* Standard Dynamic Crosshair */
        !isScoping && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute w-3 h-0.5 bg-white/90 -top-2 rounded-full shadow-sm" />
              <div className="absolute w-3 h-0.5 bg-white/90 -bottom-2 rounded-full shadow-sm" />
              <div className="absolute h-3 w-0.5 bg-white/90 -left-2 rounded-full shadow-sm" />
              <div className="absolute h-3 w-0.5 bg-white/90 -right-2 rounded-full shadow-sm" />
              <div className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            </div>
          </div>
        )
      )}

      {/* Hitmarker Flash (Tick / Headshot) */}
      {hitmarker.active && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div
            className={`w-10 h-10 border-4 ${
              hitmarker.isHeadshot
                ? 'border-red-500 scale-125 shadow-[0_0_20px_#ef4444]'
                : 'border-white'
            } rotate-45 animate-ping`}
          />
        </div>
      )}

      {/* TOP BAR: Theme Title, Alive Count, Kills, Audio Mute, Settings */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-30">
        {/* Alive & Kill Counters */}
        <div className="flex items-center gap-2">
          {/* Alive badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 border border-amber-500/50 backdrop-blur-sm text-white shadow-lg">
            <span className="text-[10px] text-amber-400 font-bold tracking-wider uppercase font-mono">
              ALIVE
            </span>
            <span className="text-lg font-black text-white font-mono leading-none">
              {aliveCount}
            </span>
          </div>

          {/* Kills badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/80 border border-red-500/60 backdrop-blur-sm text-white shadow-lg">
            <Skull className="w-4 h-4 text-red-400" />
            <span className="text-lg font-black text-red-200 font-mono leading-none">
              {stats.kills}
            </span>
          </div>

          {/* Theme switch button */}
          <button
            onClick={onToggleTheme}
            className="pointer-events-auto px-2.5 py-1.5 rounded-xl bg-black/75 border border-emerald-400/50 text-[11px] font-bold text-emerald-300 hover:text-white flex items-center gap-1 shadow cursor-pointer transition-all active:scale-95"
            title="Switch UI Theme"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{theme === 'pubg' ? 'PUBG MOBILE' : 'FREE FIRE'}</span>
          </button>

          {/* Camera FPS/TPS switch */}
          <button
            onClick={onToggleCameraMode}
            className="pointer-events-auto px-2.5 py-1.5 rounded-xl bg-black/75 border border-cyan-400/50 text-[11px] font-bold text-cyan-300 hover:text-white flex items-center gap-1 shadow cursor-pointer transition-all active:scale-95"
            title="Toggle First Person / Third Person View"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>{cameraMode.toUpperCase()}</span>
          </button>

          {/* Guide / Controls button */}
          <button
            onClick={onOpenGuide}
            className="pointer-events-auto px-2.5 py-1.5 rounded-xl bg-black/75 border border-amber-400/50 text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-1 shadow cursor-pointer transition-all active:scale-95"
            title="View Controls & Weapons Guide"
          >
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            <span>HELP</span>
          </button>
        </div>

        {/* Right side: Minimap Radar & Kill Feed */}
        <div className="flex flex-col items-end gap-2">
          {/* Tactical Radar Minimap */}
          <div className="relative w-24 h-24 rounded-full bg-black/85 border-2 border-emerald-500/70 shadow-2xl overflow-hidden flex items-center justify-center">
            {/* Radar scan grid */}
            <div className="absolute inset-0 rounded-full border border-emerald-500/30" />
            <div className="absolute w-14 h-14 rounded-full border border-emerald-500/20" />
            <div className="absolute w-full h-[1px] bg-emerald-500/20" />
            <div className="absolute h-full w-[1px] bg-emerald-500/20" />

            {/* Safe zone circle on radar */}
            <div className="absolute w-16 h-16 rounded-full border-2 border-cyan-400/80 bg-cyan-400/10 animate-pulse" />

            {/* Center player indicator arrow */}
            <div className="w-3 h-3 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-amber-400" />

            {/* Audio ping indicators */}
            <span className="absolute top-1 text-[8px] text-emerald-300 font-mono tracking-tighter">
              ZONE SAFE
            </span>
          </div>

          {/* Kill Feed Streaming */}
          <div className="flex flex-col items-end gap-1 max-w-[240px]">
            {killfeed.slice(-4).map((entry) => (
              <div
                key={entry.id}
                className={`text-[10px] px-2 py-0.5 rounded-lg backdrop-blur-sm border flex items-center gap-1 font-mono animate-fade-in ${
                  entry.isPlayerKiller
                    ? 'bg-amber-950/80 border-amber-400 text-amber-200 font-bold'
                    : 'bg-black/75 border-white/20 text-gray-300'
                }`}
              >
                <span className="font-bold text-white">{entry.killer}</span>
                <span className="text-[9px] px-1 bg-black/60 rounded text-amber-400">
                  [{entry.weapon}]
                </span>
                {entry.isHeadshot && <span className="text-red-400">🎯</span>}
                <span className="text-gray-400">eliminated</span>
                <span className="font-bold text-red-300">{entry.victim}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proximity Loot Popup (Iconic PUBG Loot List) */}
      {nearbyLoot.length > 0 && (
        <div className="absolute left-4 top-1/3 z-30 flex flex-col gap-1.5 pointer-events-auto max-w-[220px]">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-black/80 px-2 py-0.5 rounded font-mono border border-amber-400/40">
            NEARBY LOOT [E]
          </span>
          {nearbyLoot.slice(0, 3).map((item) => (
            <button
              key={item.id}
              onClick={onPickupLoot}
              className="px-3 py-1.5 rounded-xl bg-black/85 border border-emerald-400/60 hover:border-amber-400 text-left transition-all active:scale-95 shadow-lg flex items-center justify-between cursor-pointer"
            >
              <div>
                <span className="text-xs font-bold text-white block truncate">
                  {item.name}
                </span>
                <span className="text-[9px] text-emerald-300 font-mono">
                  {item.rarity.toUpperCase()}
                </span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/40 font-mono">
                PICK UP
              </span>
            </button>
          ))}
        </div>
      )}

      {/* BOTTOM CENTER: Health, Armor, Helmet, Quick Meds */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 w-full max-w-md px-4">
        {/* Quick Meds Bar */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onUseMedkit}
            className="px-3 py-1 rounded-xl bg-black/80 border border-emerald-500/50 hover:border-emerald-400 text-xs text-white font-bold flex items-center gap-1.5 cursor-pointer shadow active:scale-95"
            title="Use First Aid / Medkit"
          >
            <Heart className="w-3.5 h-3.5 text-emerald-400" />
            <span>Medkit ({stats.medkits})</span>
          </button>
          <button
            onClick={onUseEnergyDrink}
            className="px-3 py-1 rounded-xl bg-black/80 border border-amber-500/50 hover:border-amber-400 text-xs text-white font-bold flex items-center gap-1.5 cursor-pointer shadow active:scale-95"
            title="Drink Energy Booster"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Boost ({stats.energyDrinks})</span>
          </button>
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-xl bg-black/80 border border-gray-600 text-gray-300 hover:text-white cursor-pointer"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>

        {/* Armor & Helmet status indicators */}
        <div className="flex items-center gap-4 text-[11px] font-mono font-bold text-gray-300">
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>VEST: {Math.max(0, Math.floor(stats.armor))}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>HELMET: {Math.max(0, Math.floor(stats.helmet))}%</span>
          </div>
        </div>

        {/* Health Bar (PUBG green bar) */}
        <div className="w-full bg-black/80 rounded-xl p-1 border border-white/20 shadow-2xl relative">
          <div
            className="h-3 rounded-lg bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 transition-all duration-150"
            style={{ width: `${Math.max(0, Math.min(100, stats.health))}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white font-mono drop-shadow">
            {Math.max(0, Math.floor(stats.health))} / 100 HP
          </span>
        </div>
      </div>

      {/* BOTTOM RIGHT: Weapon Arsenal, Ammo, Reload & Scope Buttons */}
      <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2 z-30 pointer-events-auto">
        {/* Inventory switch slots */}
        <div className="flex items-center gap-1.5">
          {inventory.map((inv, idx) => {
            const def = WEAPONS_DATA[inv.id];
            const isActive = activeWeapon.id === inv.id;
            return (
              <button
                key={inv.id}
                onClick={() => onSwitchWeapon(idx)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-105'
                    : 'bg-black/75 text-gray-300 border-white/20 hover:bg-black/90'
                }`}
              >
                {def.name.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Active Weapon Card */}
        <div className="p-3.5 rounded-2xl bg-black/85 border-2 border-amber-500/60 shadow-2xl backdrop-blur-md flex items-center gap-4 min-w-[200px]">
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block font-mono">
              {theme === 'pubg' ? weaponDef.themeName.pubg : weaponDef.themeName.freefire}
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-black text-white font-mono leading-none">
                {activeWeapon.currentAmmo}
              </span>
              <span className="text-sm font-bold text-gray-400 font-mono">
                / {activeWeapon.reserveAmmo}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <button
              onClick={onReload}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 border border-amber-400/60 text-amber-300 hover:text-white text-[11px] font-bold font-mono flex items-center gap-1 cursor-pointer transition-all active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RELOAD</span>
            </button>
            <button
              onClick={onToggleScope}
              className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold font-mono flex items-center gap-1 cursor-pointer transition-all active:scale-95 ${
                isScoping
                  ? 'bg-red-600 text-white border-red-400 shadow-[0_0_10px_#dc2626]'
                  : 'bg-black/60 text-cyan-300 border-cyan-400/50'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>{isScoping ? 'UNSCOPE' : 'SCOPE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE / TOUCH CONTROLS (Only visible on small touch screens or when active) */}
      <div className="sm:hidden absolute inset-0 pointer-events-none z-20">
        {/* Virtual Joystick (Left) */}
        <div
          onTouchStart={handleJoystickTouchStart}
          onTouchMove={handleJoystickTouchMove}
          onTouchEnd={handleJoystickTouchEnd}
          className="absolute bottom-8 left-6 w-28 h-28 rounded-full border-2 border-white/30 bg-black/40 pointer-events-auto flex items-center justify-center touch-none"
        >
          <div
            className="w-12 h-12 rounded-full bg-amber-400/80 border-2 border-white shadow-lg pointer-events-none transition-transform duration-75"
            style={{
              transform: touchPos && touchOrigin
                ? `translate(${touchPos.x - touchOrigin.x}px, ${touchPos.y - touchOrigin.y}px)`
                : 'translate(0px, 0px)',
            }}
          />
        </div>

        {/* Fire Trigger Button (Right) */}
        <button
          onTouchStart={onFireStart}
          onTouchEnd={onFireEnd}
          className="absolute bottom-24 right-6 w-16 h-16 rounded-full bg-red-600/90 border-4 border-amber-400 text-white font-black text-sm flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.7)] pointer-events-auto active:scale-90 transition-transform"
        >
          FIRE
        </button>

        {/* Jump & Crouch Buttons */}
        <div className="absolute bottom-8 right-24 flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onCrouch}
            className="w-11 h-11 rounded-full bg-black/70 border border-white/40 text-white text-xs font-bold flex items-center justify-center active:scale-90"
          >
            CROUCH
          </button>
          <button
            onClick={onJump}
            className="w-12 h-12 rounded-full bg-emerald-600/80 border-2 border-white/60 text-white text-xs font-bold flex items-center justify-center active:scale-90 shadow"
          >
            JUMP
          </button>
        </div>
      </div>
    </div>
  );
};
