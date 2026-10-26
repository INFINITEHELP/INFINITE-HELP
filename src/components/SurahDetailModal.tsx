import React, { useState, useEffect } from 'react';
import { Surah, Ayah } from '../data/quranData';
import { TypographySettings } from '../utils/filterAndFormat';
import { X, Volume2, Copy, Check, Bookmark, Play, Pause, RotateCcw } from 'lucide-react';

interface SurahDetailModalProps {
  surah: Surah;
  onClose: () => void;
  typography: TypographySettings;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

export const SurahDetailModal: React.FC<SurahDetailModalProps> = ({
  surah,
  onClose,
  typography,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [copiedAyahNumber, setCopiedAyahNumber] = useState<number | null>(null);
  const [readingAyah, setReadingAyah] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopyAyah = (ayah: Ayah) => {
    const textToCopy = `${ayah.arabic}\n\n${ayah.urdu}\n[${surah.nameUrdu} - آیت ${ayah.number}]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyahNumber(ayah.number);
    setTimeout(() => setCopiedAyahNumber(null), 2000);
  };

  const handleSpeakAyah = (ayah: Ayah) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlayingAll(false);

    if (readingAyah === ayah.number) {
      setReadingAyah(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(ayah.arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => setReadingAyah(null);
    utterance.onerror = () => setReadingAyah(null);

    setReadingAyah(ayah.number);
    window.speechSynthesis.speak(utterance);
  };

  const playAyahSequentially = (index: number) => {
    if (index >= surah.ayahs.length) {
      setIsPlayingAll(false);
      setReadingAyah(null);
      return;
    }

    const ayah = surah.ayahs[index];
    setReadingAyah(ayah.number);

    const utterance = new SpeechSynthesisUtterance(ayah.arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => {
      playAyahSequentially(index + 1);
    };
    utterance.onerror = () => {
      setIsPlayingAll(false);
      setReadingAyah(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleTogglePlayAll = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAll) {
      window.speechSynthesis.cancel();
      setIsPlayingAll(false);
      setReadingAyah(null);
    } else {
      window.speechSynthesis.cancel();
      setIsPlayingAll(true);
      playAyahSequentially(0);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={surah.nameUrdu}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div className="w-full max-w-2xl bg-[#052918] border-2 border-[#0A5C36] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header Bar */}
        <div className="bg-[#0A5C36] px-4 py-3 border-b-2 border-[#D4AF37] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#D4AF37] bg-[#052918] flex items-center justify-center font-bold text-[#D4AF37] font-ui text-sm shadow">
              {surah.id}
            </div>
            <div>
              <h2 className="text-[#D4AF37] font-quran text-xl font-bold leading-none">
                {surah.nameArabic}
              </h2>
              <p className="text-xs text-emerald-200 font-urdu mt-0.5">
                {surah.nameUrdu} • {surah.revelationPlace} • {surah.totalAyahs} آیات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Play All Button */}
            <button
              onClick={handleTogglePlayAll}
              aria-label={isPlayingAll ? "تلاوت روکیں" : "پوری سورت سنیں"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-urdu font-bold cursor-pointer transition-all ${
                isPlayingAll
                  ? 'bg-[#D4AF37] text-[#0A5C36] border-[#F4E08B] animate-pulse'
                  : 'bg-[#052918] text-[#D4AF37] border-[#D4AF37]/50 hover:bg-[#0A5C36]'
              }`}
            >
              {isPlayingAll ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingAll ? 'تلاوت روکیں' : 'پوری سورت سنیں'}</span>
            </button>

            <button
              onClick={() => onToggleBookmark(`surah-${surah.id}`)}
              aria-label={isBookmarked(`surah-${surah.id}`) ? "Remove Bookmark" : "Bookmark Surah"}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isBookmarked(`surah-${surah.id}`)
                  ? 'bg-[#D4AF37] text-[#0A5C36] border-[#F4E08B]'
                  : 'bg-[#052918]/60 border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#052918]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked(`surah-${surah.id}`) ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close Surah View"
              className="p-2 rounded-lg bg-[#052918]/60 border border-[#D4AF37]/50 text-emerald-200 hover:text-white hover:bg-[#052918] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bismillah Header (if required for Surah) */}
        {surah.bismillahPre && (
          <div className="text-center py-4 bg-[#0A5C36]/30 border-b border-[#0A5C36]">
            <p className="font-quran text-2xl text-[#D4AF37] drop-shadow font-semibold">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            {typography.showUrdu && (
              <p className="font-urdu text-xs text-emerald-200/90 mt-1">
                شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے
              </p>
            )}
          </div>
        )}

        {/* Verses Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {surah.ayahs.map((ayah) => {
            const ayahKey = `surah-${surah.id}-ayah-${ayah.number}`;
            const bookmarked = isBookmarked(ayahKey);

            return (
              <div
                key={ayah.number}
                className={`rounded-xl p-4 transition-all duration-300 border ${
                  readingAyah === ayah.number
                    ? 'bg-[#0A5C36]/50 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-[1.01]'
                    : 'bg-[#0A5C36]/20 border-[#0A5C36] hover:border-[#D4AF37]/70 hover:bg-[#0A5C36]/30'
                }`}
              >
                {/* Verse Action Strip */}
                <div className="flex items-center justify-between border-b border-[#0A5C36]/50 pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold font-ui flex items-center justify-center">
                      {ayah.number}
                    </span>
                    <span className="text-[11px] text-emerald-300 font-ui">
                      آیت نمبر {ayah.number}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Audio Pronunciation */}
                    <button
                      onClick={() => handleSpeakAyah(ayah)}
                      aria-label={`تلاوت سنیں آیت ${ayah.number}`}
                      className={`p-1.5 rounded-md border text-xs cursor-pointer transition-colors ${
                        readingAyah === ayah.number
                          ? 'bg-[#D4AF37] text-[#0A5C36] border-[#D4AF37]'
                          : 'bg-[#052918] border-[#0A5C36] text-emerald-200 hover:text-[#D4AF37]'
                      }`}
                      title="آڈیو تلاوت سنیں"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopyAyah(ayah)}
                      aria-label={`کاپی کریں آیت ${ayah.number}`}
                      className="p-1.5 rounded-md bg-[#052918] border border-[#0A5C36] text-emerald-200 hover:text-[#D4AF37] transition-colors cursor-pointer text-xs"
                      title="آیت اور ترجمہ کاپی کریں"
                    >
                      {copiedAyahNumber === ayah.number ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Bookmark Ayah */}
                    <button
                      onClick={() => onToggleBookmark(ayahKey)}
                      aria-label={`محفوظ کریں آیت ${ayah.number}`}
                      className={`p-1.5 rounded-md border text-xs cursor-pointer transition-colors ${
                        bookmarked
                          ? 'bg-[#D4AF37] text-[#0A5C36] border-[#D4AF37]'
                          : 'bg-[#052918] border-[#0A5C36] text-emerald-200 hover:text-[#D4AF37]'
                      }`}
                      title="آیت کو محفوظ کریں"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Arabic Ayah Text */}
                <div
                  dir="rtl"
                  className="font-quran text-right text-white font-medium mb-3 select-text"
                  style={{ fontSize: `${typography.arabicFontSize}px` }}
                >
                  {ayah.arabic}{' '}
                  <span className="text-[#D4AF37] font-bold text-lg select-none">
                    ﴿{ayah.number}﴾
                  </span>
                </div>

                {/* Transliteration if enabled */}
                {typography.showTransliteration && ayah.transliteration && (
                  <p className="text-xs text-amber-200/80 font-ui mb-2 text-left italic">
                    {ayah.transliteration}
                  </p>
                )}

                {/* Urdu Translation */}
                {typography.showUrdu && (
                  <div
                    dir="rtl"
                    className="font-urdu text-right text-emerald-100/90 border-t border-[#0A5C36]/40 pt-2 select-text"
                    style={{ fontSize: `${typography.urduFontSize}px` }}
                  >
                    {ayah.urdu}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-[#052918] p-3 border-t border-[#0A5C36] flex items-center justify-between text-xs text-emerald-300">
          <span>سورت مکمل ہوئی • الحمد للہ</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]/50 font-bold hover:bg-[#0A5C36]/80 cursor-pointer"
          >
            بند کریں
          </button>
        </div>
      </div>
    </div>
  );
};
