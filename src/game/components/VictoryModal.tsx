import React from 'react';
import { GameTheme, PlayerStats } from '../types';
import { Trophy, Flame, RotateCcw, Skull, Target, Award, Zap } from 'lucide-react';

interface VictoryModalProps {
  stats: PlayerStats;
  theme: GameTheme;
  onPlayAgain: () => void;
  onToggleTheme: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  stats,
  theme,
  onPlayAgain,
  onToggleTheme,
}) => {
  const accuracy =
    stats.shotsFired > 0 ? Math.round((stats.shotsHit / stats.shotsFired) * 100) : 0;

  const isPubg = theme === 'pubg';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Match Victory Screen"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-xl bg-gradient-to-b from-[#1c1809] via-[#0d0d0d] to-black border-2 border-amber-400 rounded-3xl shadow-[0_0_80px_rgba(245,158,11,0.5)] p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
        {/* Shimmering background accent */}
        <div className="absolute -top-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Victory Emblem */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-2xl mb-4 animate-bounce">
          <div className="w-full h-full bg-black/80 rounded-[22px] flex items-center justify-center text-amber-300">
            {isPubg ? <Trophy className="w-10 h-10" /> : <Flame className="w-10 h-10 text-orange-400" />}
          </div>
        </div>

        {/* Victory Main Title */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500 font-mono drop-shadow">
          {isPubg ? 'WINNER WINNER CHICKEN DINNER! 🍗' : 'BOOYAH! 🏆🔥'}
        </h1>
        <p className="text-sm font-bold text-amber-200/80 mt-1 uppercase tracking-widest font-mono">
          {isPubg ? '#1 / 100 ALIVE • CONQUEROR RANK' : '#1 SURVIVOR • GRANDMASTER TIER'}
        </p>

        {/* Match Statistics Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full my-6">
          <div className="p-3 rounded-2xl bg-black/60 border border-amber-500/30 flex flex-col items-center">
            <Skull className="w-5 h-5 text-red-400 mb-1" />
            <span className="text-2xl font-black text-white font-mono">{stats.kills}</span>
            <span className="text-[10px] text-gray-400 uppercase font-mono">Kills</span>
          </div>

          <div className="p-3 rounded-2xl bg-black/60 border border-amber-500/30 flex flex-col items-center">
            <Zap className="w-5 h-5 text-amber-400 mb-1" />
            <span className="text-2xl font-black text-white font-mono">{stats.damageDealt}</span>
            <span className="text-[10px] text-gray-400 uppercase font-mono">Damage</span>
          </div>

          <div className="p-3 rounded-2xl bg-black/60 border border-amber-500/30 flex flex-col items-center">
            <Target className="w-5 h-5 text-cyan-400 mb-1" />
            <span className="text-2xl font-black text-white font-mono">{stats.headshots}</span>
            <span className="text-[10px] text-gray-400 uppercase font-mono">Headshots</span>
          </div>

          <div className="p-3 rounded-2xl bg-black/60 border border-amber-500/30 flex flex-col items-center">
            <Award className="w-5 h-5 text-emerald-400 mb-1" />
            <span className="text-2xl font-black text-white font-mono">{accuracy}%</span>
            <span className="text-[10px] text-gray-400 uppercase font-mono">Accuracy</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={onPlayAgain}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:brightness-110 active:scale-95 transition-all cursor-pointer font-mono"
          >
            <RotateCcw className="w-5 h-5" />
            <span>PLAY AGAIN (DROP IN)</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all active:scale-95 font-mono"
          >
            Switch to {isPubg ? 'Free Fire (BOOYAH!)' : 'PUBG (Chicken Dinner)'}
          </button>
        </div>
      </div>
    </div>
  );
};
