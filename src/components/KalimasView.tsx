import React, { useState } from 'react';
import { SIX_KALIMAS, Kalima } from '../data/kalimasData';
import { TypographySettings } from '../utils/filterAndFormat';
import { Volume2, Copy, Check, Bookmark, Sparkles } from 'lucide-react';

interface KalimasViewProps {
  typography: TypographySettings;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

export const KalimasView: React.FC<KalimasViewProps> = ({
  typography,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const handleCopy = (kalima: Kalima) => {
    const text = `${kalima.nameUrdu} (${kalima.nameArabic})\n\n${kalima.arabic}\n\n${kalima.urdu}\n\n[ترجمہ و مفہوم: ${kalima.meaningSummary}]`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(kalima.number);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSpeak = (kalima: Kalima) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (speakingIndex === kalima.number) {
      setSpeakingIndex(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(kalima.arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    setSpeakingIndex(kalima.number);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-4">
      {/* Intro Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0A5C36] via-[#052918] to-[#0A5C36] border border-[#D4AF37]/50 text-center shadow-lg">
        <h2 className="font-urdu text-xl font-bold text-[#D4AF37] mb-1">
          اسلام کے چھ بنیادی کلمے (Six Kalimas of Islam)
        </h2>
        <p className="font-urdu text-xs text-emerald-100">
          ہر مسلمان کے لیے عقیدہ و ایمان کی بنیادی اساس، مکمل عربی متن اور اردو مفہوم کے ساتھ۔
        </p>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SIX_KALIMAS.map((k) => {
          const bookmarked = isBookmarked(`kalima-${k.number}`);

          return (
            <div
              key={k.number}
              className="bg-[#052918] border-2 border-[#0A5C36] hover:border-[#D4AF37] rounded-2xl p-4 sm:p-5 transition-all shadow-md hover:shadow-xl flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#0A5C36] pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0A5C36] border border-[#D4AF37] text-[#D4AF37] font-bold font-ui text-xs flex items-center justify-center shadow">
                    {k.number}
                  </div>
                  <div>
                    <h3 className="font-urdu font-bold text-base text-white">
                      {k.nameUrdu}
                    </h3>
                    <span className="text-[11px] text-emerald-300 font-ui">
                      {k.nameEnglish}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSpeak(k)}
                    className={`p-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      speakingIndex === k.number
                        ? 'bg-[#D4AF37] text-[#0A5C36] border-[#D4AF37]'
                        : 'bg-[#0A5C36]/50 border-[#0A5C36] text-emerald-200 hover:text-[#D4AF37]'
                    }`}
                    title="تلفظ سنیں"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCopy(k)}
                    className="p-1.5 rounded-lg bg-[#0A5C36]/50 border border-[#0A5C36] text-emerald-200 hover:text-[#D4AF37] cursor-pointer"
                    title="کاپی کریں"
                  >
                    {copiedIndex === k.number ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => onToggleBookmark(`kalima-${k.number}`)}
                    className={`p-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      bookmarked
                        ? 'bg-[#D4AF37] text-[#0A5C36] border-[#D4AF37]'
                        : 'bg-[#0A5C36]/50 border-[#0A5C36] text-emerald-200 hover:text-[#D4AF37]'
                    }`}
                    title="محفوظ کریں"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Arabic Content */}
              <div className="p-3.5 rounded-xl bg-[#0A5C36]/25 border border-[#0A5C36] my-2">
                <p
                  dir="rtl"
                  className="font-quran text-right text-white font-medium select-text tracking-wide"
                  style={{ fontSize: `${Math.max(22, typography.arabicFontSize - 2)}px` }}
                >
                  {k.arabic}
                </p>

                {/* Transliteration */}
                {typography.showTransliteration && (
                  <p className="text-xs text-amber-200/80 font-ui mt-2 text-left italic">
                    {k.transliteration}
                  </p>
                )}

                {/* Urdu Translation */}
                {typography.showUrdu && (
                  <div
                    dir="rtl"
                    className="font-urdu text-right text-emerald-100/95 mt-3 pt-2.5 border-t border-[#0A5C36]/60 select-text"
                    style={{ fontSize: `${typography.urduFontSize}px` }}
                  >
                    {k.urdu}
                  </div>
                )}
              </div>

              {/* Meaning Summary / Lesson */}
              <div className="mt-2 p-2.5 rounded-lg bg-[#052918] border border-emerald-900/60 text-xs text-emerald-200/90 font-urdu flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{k.meaningSummary}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
