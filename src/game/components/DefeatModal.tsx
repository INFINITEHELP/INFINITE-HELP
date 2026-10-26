import React from 'react';
import { PlayerStats, GameTheme } from '../types';
import { Skull, RotateCcw, Zap, Target } from 'lucide-react';

interface DefeatModalProps {
  stats: PlayerStats;
  theme: GameTheme;
  onPlayAgain: () => void;
}

export const DefeatModal: React.FC<DefeatModalProps> = ({ stats, theme, onPlayAgain }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Match Eliminated Screen"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-lg bg-gradient-to-b from-[#1a0808] via-[#0d0d0d] to-black border-2 border-red-600/70 rounded-3xl shadow-[0_0_80px_rgba(220,38,38,0.5)] p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
        {/* Skull Icon */}
        <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-500 flex items-center justify-center text-red-500 mb-3 shadow-lg">
          <Skull className="w-9 h-9" />
        </div>

        <h1 className="text-3xl font-black text-red-500 font-mono tracking-tight">
          {theme === 'pubg' ? 'BETTER LUCK NEXT TIME!' : 'DEFEATED!'}
        </h1>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-widest mt-1">
          You were eliminated in combat
        </p>

        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-3 w-full my-6 font-mono">
          <div className="p-3 rounded-2xl bg-black/60 border border-red-500/30 flex flex-col items-center">
            <span className="text-xl font-black text-white">{stats.kills}</span>
            <span className="text-[10px] text-gray-400 uppercase">Kills</span>
          </div>

          <div className="p-3 rounded-2xl bg-black/60 border border-red-500/30 flex flex-col items-center">
            <span className="text-xl font-black text-white">{stats.damageDealt}</span>
            <span className="text-[10px] text-gray-400 uppercase">Damage</span>
          </div>

          <div className="p-3 rounded-2xl bg-black/60 border border-red-500/30 flex flex-col items-center">
            <span className="text-xl font-black text-white">{stats.headshots}</span>
            <span className="text-[10px] text-gray-400 uppercase">Headshots</span>
          </div>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:brightness-110 active:scale-95 transition-all cursor-pointer font-mono"
        >
          <RotateCcw className="w-4 h-4" />
          <span>PLAY AGAIN</span>
        </button>
      </div>
    </div>
  );
};
