import React, { useState } from 'react';
import { ASMA_UL_HUSNA, AsmaName } from '../data/asmaUlHusnaData';
import { TypographySettings, normalizeArabic } from '../utils/filterAndFormat';
import { Search, Volume2, Sparkles, Heart } from 'lucide-react';

interface AsmaUlHusnaViewProps {
  typography: TypographySettings;
}

export const AsmaUlHusnaView: React.FC<AsmaUlHusnaViewProps> = ({ typography }) => {
  const [search, setSearch] = useState('');
  const [counts, setCounts] = useState<{ [id: number]: number }>({});
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  const filtered = ASMA_UL_HUSNA.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const norm = normalizeArabic(q);
    return (
      item.id.toString() === q ||
      normalizeArabic(item.arabic).includes(norm) ||
      item.urdu.toLowerCase().includes(q) ||
      item.transliteration.toLowerCase().includes(q) ||
      item.benefit.toLowerCase().includes(q)
    );
  });

  const handleIncrement = (id: number) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }
  };

  const handleSpeak = (item: AsmaName) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (speakingId === item.id) {
      setSpeakingId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(item.arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(item.id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-4">
      {/* Intro Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0A5C36] via-[#052918] to-[#0A5C36] border border-[#D4AF37]/50 text-center shadow-lg">
        <h2 className="font-urdu text-xl font-bold text-[#D4AF37] mb-1">
          اسماء الحسنیٰ (99 Names of Allah)
        </h2>
        <p className="font-urdu text-xs text-emerald-100">
          اللہ تبارک و تعالیٰ کے ۹۹ صفاتی و با برکت نام مع اردو معنی و فضائل۔
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute right-3.5 top-3 text-[#D4AF37]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="اللہ کا نام یا فضیلت تلاش کریں..."
          dir="rtl"
          className="w-full bg-[#0A5C36]/30 text-white placeholder-emerald-300/50 pr-10 pl-4 py-2.5 rounded-xl border border-[#0A5C36] focus:border-[#D4AF37] text-sm font-urdu focus:outline-none"
        />
      </div>

      {/* Grid of 99 Names */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map((item) => {
          const count = counts[item.id] || 0;

          return (
            <div
              key={item.id}
              className="bg-[#052918] border-2 border-[#0A5C36] hover:border-[#D4AF37] rounded-2xl p-3.5 sm:p-4 transition-all shadow-md flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#0A5C36]/60">
                <span className="w-7 h-7 rounded-lg bg-[#0A5C36] text-[#D4AF37] font-bold font-ui text-xs flex items-center justify-center border border-[#D4AF37]/40">
                  {item.id}
                </span>
                <span className="text-[11px] text-emerald-300 font-ui font-semibold">
                  {item.transliteration}
                </span>
                <button
                  onClick={() => handleSpeak(item)}
                  className={`p-1 rounded-md text-xs cursor-pointer border transition-colors ${
                    speakingId === item.id
                      ? 'bg-[#D4AF37] text-[#0A5C36] border-[#D4AF37]'
                      : 'bg-[#0A5C36]/40 border-[#0A5C36] text-emerald-200 hover:text-[#D4AF37]'
                  }`}
                  title="تلفظ سنیں"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Arabic Name */}
              <div className="text-center my-2">
                <p
                  dir="rtl"
                  className="font-quran text-[#D4AF37] font-bold leading-none py-1"
                  style={{ fontSize: `${Math.max(26, typography.arabicFontSize + 2)}px` }}
                >
                  {item.arabic}
                </p>
                <p
                  dir="rtl"
                  className="font-urdu text-emerald-100 font-semibold text-sm mt-1"
                >
                  {item.urdu}
                </p>
              </div>

              {/* Benefit & Tap Counter */}
              <div className="mt-2 pt-2 border-t border-[#0A5C36]/50 space-y-2">
                <p
                  dir="rtl"
                  className="text-[11px] font-urdu text-emerald-300/90 leading-relaxed bg-[#0A5C36]/20 p-2 rounded-lg"
                >
                  {item.benefit}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="w-full py-1.5 px-3 rounded-xl bg-[#0A5C36] hover:bg-[#08482a] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] text-xs font-urdu font-bold flex items-center justify-between cursor-pointer active:scale-95 transition-all shadow-sm"
                  >
                    <span>ورد کریں +1</span>
                    <span className="bg-[#052918] px-2 py-0.5 rounded text-white font-ui font-bold">
                      {count}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
