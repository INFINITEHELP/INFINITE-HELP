import React from 'react';
import { Surah } from '../data/quranData';
import { TypographySettings } from '../utils/filterAndFormat';
import { BookOpen, Bookmark, ChevronLeft, Volume2 } from 'lucide-react';

interface SurahCardProps {
  surah: Surah;
  onSelect: (surah: Surah) => void;
  typography: TypographySettings;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const SurahCard: React.FC<SurahCardProps> = ({
  surah,
  onSelect,
  typography,
  isBookmarked,
  onToggleBookmark,
}) => {
  const firstAyah = surah.ayahs[0];

  return (
    <div className="bg-[#052918] border-2 border-[#0A5C36] hover:border-[#D4AF37] rounded-2xl p-4 sm:p-5 transition-all shadow-md hover:shadow-xl hover:shadow-[#0A5C36]/30 flex flex-col justify-between group">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-[#0A5C36] pb-3 mb-3">
        {/* Number & Name Tag */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0A5C36] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold font-ui text-sm shadow-inner group-hover:scale-105 transition-transform">
            {surah.id}
          </div>
          <div>
            <h3 className="font-urdu font-bold text-base sm:text-lg text-white group-hover:text-[#D4AF37] transition-colors">
              {surah.nameUrdu}
            </h3>
            <p className="text-xs text-emerald-300 font-urdu">
              {surah.nameEnglish} • {surah.revelationPlace} • {surah.totalAyahs} آیات
            </p>
          </div>
        </div>

        {/* Right Arabic Calligraphic Title & Bookmark */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(`surah-${surah.id}`);
            }}
            aria-label={isBookmarked ? `محفوظات سے ہٹائیں ${surah.nameUrdu}` : `محفوظ کریں ${surah.nameUrdu}`}
            className={`p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
              isBookmarked
                ? 'bg-[#D4AF37] text-[#0A5C36] border-[#F4E08B]'
                : 'bg-[#0A5C36]/50 border-[#0A5C36] text-emerald-200 hover:text-[#D4AF37]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <div className="font-quran text-xl sm:text-2xl text-[#D4AF37] font-bold">
            {surah.nameArabic}
          </div>
        </div>
      </div>

      {/* Preview Arabic & Urdu Content */}
      <div className="my-2 p-3 rounded-xl bg-[#0A5C36]/20 border border-[#0A5C36]/60">
        <p
          dir="rtl"
          className="font-quran text-right text-white font-medium line-clamp-2"
          style={{ fontSize: `${Math.max(18, typography.arabicFontSize - 4)}px` }}
        >
          {firstAyah.arabic}
        </p>
        {typography.showUrdu && (
          <p
            dir="rtl"
            className="font-urdu text-right text-emerald-200/90 text-xs sm:text-sm mt-1.5 line-clamp-2"
            style={{ fontSize: `${Math.max(13, typography.urduFontSize - 3)}px` }}
          >
            {firstAyah.urdu}
          </p>
        )}
      </div>

      {/* Card Action Button */}
      <div className="mt-3 pt-2 flex items-center justify-between">
        <span className="text-[11px] text-emerald-400 font-urdu bg-[#0A5C36]/40 px-2.5 py-1 rounded-full border border-[#0A5C36]">
          پارہ نمبر {surah.juzNumber}
        </span>
        <button
          onClick={() => onSelect(surah)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A5C36] hover:bg-[#08482a] border border-[#D4AF37] text-[#D4AF37] hover:text-white font-urdu text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <span>مکمل تلاوت پڑھیں</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
