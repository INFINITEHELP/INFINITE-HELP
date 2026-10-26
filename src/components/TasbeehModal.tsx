import React, { useState } from 'react';
import { X, RotateCcw, Award, Check } from 'lucide-react';

interface TasbeehModalProps {
  onClose: () => void;
}

const PRESET_DHIKRS = [
  { arabic: "سُبْحَانَ اللَّهِ", urdu: "اللہ پاک ہے", target: 33 },
  { arabic: "الْحَمْدُ لِلَّهِ", urdu: "تمام تعریفیں اللہ کے لیے ہیں", target: 33 },
  { arabic: "اللَّهُ أَكْبَرُ", urdu: "اللہ سب سے بڑا ہے", target: 34 },
  { arabic: "لَا إِلٰهَ إِلَّا اللَّهُ", urdu: "اللہ کے سوا کوئی معبود نہیں", target: 100 },
  { arabic: "أَسْتَغْفِرُ اللَّهَ", urdu: "میں اللہ سے بخشش مانگتا ہوں", target: 100 },
  { arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ", urdu: "درودِ پاک", target: 100 },
];

export const TasbeehModal: React.FC<TasbeehModalProps> = ({ onClose }) => {
  const [selectedDhikrIndex, setSelectedDhikrIndex] = useState(0);
  const [count, setCount] = useState(0);

  const activeDhikr = PRESET_DHIKRS[selectedDhikrIndex];

  const handleTap = () => {
    setCount((prev) => prev + 1);
    if ('vibrate' in navigator) {
      navigator.vibrate(35);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const isCompleted = count >= activeDhikr.target;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Digital Tasbeeh Counter"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-md bg-[#052918] border-2 border-[#D4AF37] rounded-3xl shadow-2xl p-5 flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-[#0A5C36]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#0A5C36] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] text-xs font-bold font-ui">
              📿
            </span>
            <h2 className="font-urdu text-lg font-bold text-white">
              ڈیجیٹل تسبیح کاؤنٹر
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="بند کریں"
            className="p-1.5 rounded-lg bg-[#0A5C36]/50 text-emerald-200 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dhikr Selector Chips */}
        <div className="w-full flex gap-1.5 overflow-x-auto py-3 no-scrollbar">
          {PRESET_DHIKRS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedDhikrIndex(idx);
                setCount(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-urdu whitespace-nowrap border transition-all cursor-pointer ${
                selectedDhikrIndex === idx
                  ? 'bg-[#0A5C36] text-[#D4AF37] border-[#D4AF37] font-bold shadow'
                  : 'bg-[#052918] text-emerald-200 border-[#0A5C36]'
              }`}
            >
              {item.arabic}
            </button>
          ))}
        </div>

        {/* Current Dhikr Display */}
        <div className="w-full p-4 rounded-2xl bg-[#0A5C36]/30 border border-[#0A5C36] text-center my-2">
          <p className="font-quran text-2xl sm:text-3xl text-[#D4AF37] font-bold mb-1">
            {activeDhikr.arabic}
          </p>
          <p className="font-urdu text-emerald-200 text-sm">
            {activeDhikr.urdu}
          </p>
          <p className="text-xs text-emerald-400 font-ui mt-1">
            ہدف تعداد: {activeDhikr.target}
          </p>
        </div>

        {/* Massive Tappable Counter Button */}
        <button
          onClick={handleTap}
          aria-label={`تسبیح کاؤنٹر شمار: ${count}`}
          className={`w-44 h-44 my-4 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl transition-all active:scale-90 cursor-pointer select-none ${
            isCompleted
              ? 'bg-gradient-to-b from-[#0A5C36] to-[#041d11] border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.5)]'
              : 'bg-gradient-to-b from-[#0A5C36] to-[#052918] border-[#D4AF37]/60 hover:border-[#D4AF37]'
          }`}
        >
          <span className="font-ui text-5xl font-extrabold text-white tracking-wider drop-shadow-md">
            {count}
          </span>
          <span className="text-xs font-urdu text-[#D4AF37] mt-1 font-bold">
            شمار کے لیے دبائیں
          </span>
        </button>

        {isCompleted && (
          <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-bold font-urdu bg-[#0A5C36] px-3 py-1 rounded-full border border-[#D4AF37] animate-bounce mb-2">
            <Check className="w-4 h-4" />
            <span>ماشاء اللہ! {activeDhikr.target} مرتبہ مکمل ہوا</span>
          </div>
        )}

        {/* Reset and controls */}
        <div className="w-full flex items-center justify-between pt-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A5C36]/40 border border-[#0A5C36] text-xs font-urdu text-emerald-200 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ری سیٹ (صفر)</span>
          </button>

          <span className="text-xs text-emerald-400 font-ui">
            باقی: {Math.max(0, activeDhikr.target - count)}
          </span>
        </div>
      </div>
    </div>
  );
};
