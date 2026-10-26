import React, { useState } from 'react';
import { Dua } from '../data/quranData';
import { TypographySettings, formatTasbeeh } from '../utils/filterAndFormat';
import { Bookmark, Copy, Check, Volume2, RotateCcw, Award } from 'lucide-react';

interface DuaCardProps {
  dua: Dua;
  typography: TypographySettings;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const DuaCard: React.FC<DuaCardProps> = ({
  dua,
  typography,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const tasbeeh = formatTasbeeh(count, dua.recommendedCount);

  const handleCopy = () => {
    const textToCopy = `${dua.titleUrdu} (${dua.titleArabic})\n\n${dua.arabic}\n\n${dua.urdu}\n\n[حوالہ: ${dua.reference}]`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(dua.arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  const handleResetCount = () => {
    setCount(0);
  };

  return (
    <div className="bg-[#052918] border-2 border-[#0A5C36] hover:border-[#D4AF37] rounded-2xl p-4 sm:p-5 transition-all shadow-md hover:shadow-xl hover:shadow-[#0A5C36]/30 flex flex-col justify-between">
      {/* Top Meta Header */}
      <div className="flex items-center justify-between border-b border-[#0A5C36] pb-3 mb-3">
        {/* Title and Category */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-ui font-bold px-2.5 py-0.5 rounded-full bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]/40">
              {dua.category}
            </span>
            <span className="text-xs text-emerald-300 font-ui">
              {dua.reference}
            </span>
          </div>
          <h3 className="font-urdu font-bold text-base sm:text-lg text-white">
            {dua.titleUrdu}
          </h3>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleSpeak}
            aria-label={`دعا سنیں ${dua.titleUrdu}`}
            className={`p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
              isSpeaking
                ? 'bg-[#D4AF37] text-[#0A5C36] border-[#D4AF37]'
                : 'bg-[#0A5C36]/40 border-[#0A5C36] text-emerald-200 hover:text-[#D4AF37]'
            }`}
            title="تلفظ / آڈیو سنیں"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopy}
            aria-label={`دعا کاپی کریں ${dua.titleUrdu}`}
            className="p-2 rounded-lg bg-[#0A5C36]/40 border border-[#0A5C36] text-emerald-200 hover:text-[#D4AF37] cursor-pointer transition-colors"
            title="کاپی کریں"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onToggleBookmark(`dua-${dua.id}`)}
            aria-label={isBookmarked ? `محفوظات سے ہٹائیں ${dua.titleUrdu}` : `محفوظ کریں ${dua.titleUrdu}`}
            className={`p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
              isBookmarked
                ? 'bg-[#D4AF37] text-[#0A5C36] border-[#F4E08B]'
                : 'bg-[#0A5C36]/40 border-[#0A5C36] text-emerald-200 hover:text-[#D4AF37]'
            }`}
            title="محفوظ کریں"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Arabic Calligraphy Content */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-[#0A5C36]/25 border border-[#0A5C36] my-2">
        <p
          dir="rtl"
          className="font-quran text-right text-white font-medium select-text tracking-wide"
          style={{ fontSize: `${typography.arabicFontSize}px` }}
        >
          {dua.arabic}
        </p>

        {/* Transliteration */}
        {typography.showTransliteration && dua.transliteration && (
          <p className="text-xs text-amber-200/80 font-ui mt-2 text-left italic">
            {dua.transliteration}
          </p>
        )}

        {/* Urdu Translation */}
        {typography.showUrdu && (
          <div
            dir="rtl"
            className="font-urdu text-right text-emerald-100/95 mt-3 pt-2.5 border-t border-[#0A5C36]/60 select-text"
            style={{ fontSize: `${typography.urduFontSize}px` }}
          >
            {dua.urdu}
          </div>
        )}
      </div>

      {/* Benefits & Virtues note */}
      {dua.benefit && (
        <div className="mt-2 p-2.5 rounded-lg bg-[#052918] border border-emerald-900/60 text-xs text-emerald-200/90 font-urdu flex items-start gap-2">
          <Award className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <span>{dua.benefit}</span>
        </div>
      )}

      {/* Recitation Counter / Tasbeeh Strip */}
      <div className="mt-4 pt-3 border-t border-[#0A5C36] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleIncrement}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold font-ui cursor-pointer transition-all active:scale-95 ${
              tasbeeh.isComplete
                ? 'bg-[#D4AF37] text-[#0A5C36] border-[#F4E08B] shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                : 'bg-[#0A5C36] text-white border-[#D4AF37]/50 hover:border-[#D4AF37]'
            }`}
          >
            <span>پڑھیں +1</span>
            <span className="bg-[#052918]/60 px-2 py-0.5 rounded text-white">
              {tasbeeh.text}
            </span>
          </button>

          {count > 0 && (
            <button
              onClick={handleResetCount}
              aria-label="ری سیٹ کریں"
              className="p-1.5 rounded-lg bg-[#052918] border border-[#0A5C36] text-emerald-300 hover:text-white cursor-pointer"
              title="کاؤنٹر ری سیٹ کریں"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {tasbeeh.isComplete ? (
          <span className="text-xs font-urdu font-bold text-[#D4AF37] animate-pulse">
            ماشاء اللہ! مکمل ہوا
          </span>
        ) : (
          <span className="text-[11px] font-urdu text-emerald-300/80">
            مستحب تعداد: {dua.recommendedCount} مرتبہ
          </span>
        )}
      </div>
    </div>
  );
};
