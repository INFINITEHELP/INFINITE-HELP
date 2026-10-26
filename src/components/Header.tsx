import React from 'react';
import { Menu, Search, X, BookOpen, Bookmark, Coins, HelpCircle, Smartphone } from 'lucide-react';

interface HeaderProps {
  onOpenDrawer: () => void;
  onOpenGuide: () => void;
  onOpenMonetization: () => void;
  onOpenApkModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  bookmarksCount: number;
  showBookmarksOnly: boolean;
  onToggleBookmarksFilter: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  onOpenGuide,
  onOpenMonetization,
  onOpenApkModal,
  searchQuery,
  onSearchChange,
  bookmarksCount,
  showBookmarksOnly,
  onToggleBookmarksFilter,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0A5C36] border-b-2 border-[#D4AF37] shadow-lg">
      {/* Top Banner Row */}
      <div className="max-w-4xl mx-auto px-2.5 sm:px-4 py-2.5 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Drawer Menu Button (☰) */}
        <button
          onClick={onOpenDrawer}
          aria-label="Open Navigation Menu"
          className="p-2 rounded-xl bg-[#052918]/60 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#052918] active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand & Calligraphy Emblem */}
        <div className="flex-1 flex items-center justify-center text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-[#D4AF37] font-bold text-base sm:text-xl tracking-wide font-quran drop-shadow">
                القرآن & الأدعية
              </span>
              <span className="text-[9px] sm:text-[10px] bg-[#D4AF37] text-[#0A5C36] font-bold px-1.5 py-0.5 rounded font-ui tracking-wider">
                PRO
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-emerald-100/90 font-ui hidden sm:inline-block">
              Al-Quran & Duas Pro • 100% Offline
            </span>
          </div>
        </div>

        {/* Action Buttons: APK + Monetization + Guide + Bookmarks */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* APK Modal Button */}
          <button
            onClick={onOpenApkModal}
            aria-label="Android APK حاصل کریں"
            className="px-2 py-1.5 sm:px-2.5 rounded-xl bg-[#052918] border border-emerald-400/60 text-emerald-200 hover:text-white hover:border-[#D4AF37] transition-all flex items-center gap-1 cursor-pointer shadow-sm text-xs font-urdu font-bold"
            title="اینڈرائیڈ APK فائل اور انسٹالیشن (Android APK)"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-ui text-[11px] font-bold text-emerald-300">APK</span>
          </button>

          {/* Monetization / Earning Hub shortcut */}
          <button
            onClick={onOpenMonetization}
            aria-label="کمائی اور ایڈموب سیٹ اپ (Monetization & AdMob)"
            className="px-2 py-1.5 sm:px-2.5 rounded-xl bg-[#052918] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A5C36] transition-all flex items-center gap-1 cursor-pointer shadow-sm text-xs font-urdu font-bold"
            title="کمائی کا طریقہ کار اور ایڈموب (Monetization)"
          >
            <Coins className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">آمدنی</span>
          </button>

          <button
            onClick={onOpenGuide}
            aria-label="رہنمائی اور مدد (Help Guide)"
            className="p-2 rounded-xl bg-[#052918]/60 border border-[#D4AF37]/50 text-emerald-200 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm"
            title="مدد اور رہنمائی (User Guide)"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleBookmarksFilter}
            aria-label={showBookmarksOnly ? "Show All Items" : "Show Bookmarks Only"}
            className={`p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
              showBookmarksOnly
                ? 'bg-[#D4AF37] text-[#0A5C36] border-[#F4E08B] font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'bg-[#052918]/60 border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#052918]'
            }`}
            title="محفوظات (Bookmarks)"
          >
            <Bookmark className={`w-4 h-4 ${bookmarksCount > 0 ? 'fill-current' : ''}`} />
            {bookmarksCount > 0 && (
              <span className="mr-1 text-xs font-bold font-ui">
                {bookmarksCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Top Search Bar */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-2.5">
        <div className="relative flex items-center">
          <div className="absolute right-3 text-[#D4AF37] pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="تلاش کریں: سورت، آیت، دعا، ترجمہ یا نام..."
            aria-label="تلاش کریں"
            dir="rtl"
            className="w-full bg-[#052918] text-white placeholder-emerald-300/60 pr-9 pl-9 py-2 rounded-xl border border-[#D4AF37]/60 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-sm font-urdu focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="تلاش ختم کریں"
              className="absolute left-3 text-emerald-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
