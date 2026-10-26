import React from 'react';
import { TypographySettings, FontPreset, getPresetFontSizes } from '../utils/filterAndFormat';
import {
  X,
  Type,
  Cloud,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Download,
  Info,
  HelpCircle,
  ShieldCheck,
  Smartphone,
  Eye,
  Sliders,
  DollarSign,
  Coins
} from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  typography: TypographySettings;
  onUpdateTypography: (updated: Partial<TypographySettings>) => void;
  onOpenCloudSurahs: () => void;
  onOpenTasbeeh: () => void;
  onFilterBookmarks: () => void;
  bookmarksCount: number;
  onOpenExportModal: () => void;
  onOpenGuide: () => void;
  onOpenPrayerTimes: () => void;
  onSelectKalimas: () => void;
  onSelectAsma: () => void;
  onOpenMonetization: () => void;
  onOpenApkModal: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  typography,
  onUpdateTypography,
  onOpenCloudSurahs,
  onOpenTasbeeh,
  onFilterBookmarks,
  bookmarksCount,
  onOpenExportModal,
  onOpenGuide,
  onOpenPrayerTimes,
  onSelectKalimas,
  onSelectAsma,
  onOpenMonetization,
  onOpenApkModal,
}) => {
  if (!isOpen) return null;

  const fontPresets: { id: FontPreset; label: string; urduLabel: string }[] = [
    { id: 'small', label: 'A-', urduLabel: 'چھوٹا' },
    { id: 'medium', label: 'Default', urduLabel: 'معمول' },
    { id: 'large', label: 'A+', urduLabel: 'بڑا' },
    { id: 'xlarge', label: 'A++', urduLabel: 'بہت بڑا' },
  ];

  const handleSelectPreset = (preset: FontPreset) => {
    const sizes = getPresetFontSizes(preset);
    onUpdateTypography({
      preset,
      arabicFontSize: sizes.arabic,
      urduFontSize: sizes.urdu,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu Drawer"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Drawer Container */}
      <div className="relative w-full max-w-xs sm:max-w-sm h-full bg-[#052918] border-r-2 border-[#D4AF37] shadow-2xl flex flex-col z-10 overflow-y-auto animate-fade-in">
        {/* Drawer Header */}
        <div className="p-4 bg-[#0A5C36] border-b-2 border-[#D4AF37] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#052918] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-lg shadow">
              📖
            </div>
            <div>
              <h2 className="font-urdu font-bold text-white text-base leading-tight">
                القرآن & دعائیں پرو
              </h2>
              <span className="text-[11px] text-emerald-200 font-ui block mt-0.5">
                Al-Quran & Duas Pro v2.4
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Drawer"
            className="p-2 rounded-lg bg-[#052918]/60 border border-[#D4AF37]/50 text-emerald-200 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offline Status Badge */}
        <div className="mx-4 mt-4 p-3 rounded-xl bg-[#0A5C36]/30 border border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-urdu font-bold text-white">
              آف لائن اسٹیٹس: 100% فعال
            </span>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-600/50 font-ui">
            NO INTERNET NEEDED
          </span>
        </div>

        {/* Navigation & Tools List */}
        <div className="p-4 space-y-5 flex-1">
          {/* SECTION: FONT RESIZE & TYPOGRAPHY */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-ui">
              <Type className="w-4 h-4" />
              <span>فونٹ سائز ایڈجسٹمنٹ (Font Resize)</span>
            </div>

            {/* Preset Buttons */}
            <div className="grid grid-cols-4 gap-1.5 bg-[#0A5C36]/20 p-1.5 rounded-xl border border-[#0A5C36]">
              {fontPresets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p.id)}
                  className={`py-1.5 px-1 rounded-lg text-xs font-ui font-bold transition-all cursor-pointer ${
                    typography.preset === p.id
                      ? 'bg-[#D4AF37] text-[#0A5C36] shadow-sm'
                      : 'text-emerald-200 hover:bg-[#0A5C36]/50'
                  }`}
                >
                  <div>{p.label}</div>
                  <div className="text-[9px] font-urdu font-normal opacity-90">{p.urduLabel}</div>
                </button>
              ))}
            </div>

            {/* Arabic Font Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-emerald-200 font-urdu">
                <span>عربی رسم الخط سائز: {typography.arabicFontSize}px</span>
              </div>
              <input
                type="range"
                min="20"
                max="44"
                value={typography.arabicFontSize}
                onChange={(e) =>
                  onUpdateTypography({ arabicFontSize: Number(e.target.value) })
                }
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
            </div>

            {/* Urdu Font Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-emerald-200 font-urdu">
                <span>اردو ترجمہ سائز: {typography.urduFontSize}px</span>
              </div>
              <input
                type="range"
                min="14"
                max="30"
                value={typography.urduFontSize}
                onChange={(e) =>
                  onUpdateTypography({ urduFontSize: Number(e.target.value) })
                }
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
            </div>

            {/* Toggle Urdu Translation */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A5C36]/20 border border-[#0A5C36] cursor-pointer">
              <span className="font-urdu text-xs text-white">اردو ترجمہ دکھائیں</span>
              <input
                type="checkbox"
                checked={typography.showUrdu}
                onChange={(e) =>
                  onUpdateTypography({ showUrdu: e.target.checked })
                }
                className="w-4 h-4 accent-[#0A5C36] cursor-pointer"
              />
            </label>

            {/* Toggle Transliteration */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A5C36]/20 border border-[#0A5C36] cursor-pointer">
              <span className="font-urdu text-xs text-white">انگلش تلفظ (Transliteration)</span>
              <input
                type="checkbox"
                checked={typography.showTransliteration}
                onChange={(e) =>
                  onUpdateTypography({ showTransliteration: e.target.checked })
                }
                className="w-4 h-4 accent-[#0A5C36] cursor-pointer"
              />
            </label>
          </div>

          <hr className="border-[#0A5C36]" />

          {/* SECTION: MONETIZATION & EARNINGS (PROMINENT FOR USER) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-ui block mb-1">
              کمائی اور مالی معاونت (Monetization Hub)
            </span>

            <button
              onClick={() => {
                onClose();
                onOpenMonetization();
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 via-[#0A5C36]/50 to-[#D4AF37]/20 border border-[#D4AF37] text-white font-urdu text-sm font-bold transition-all cursor-pointer shadow-md group hover:from-[#D4AF37]/30"
            >
              <div className="flex items-center gap-2.5">
                <Coins className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span className="text-[#D4AF37]">ایڈموب اور کمائی ڈیش بورڈ</span>
              </div>
              <span className="text-[10px] bg-[#D4AF37] text-[#0A5C36] font-bold px-2 py-0.5 rounded font-ui">
                EARN
              </span>
            </button>
          </div>

          <hr className="border-[#0A5C36]" />

          {/* SECTION: NAVIGATION ITEMS */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-ui block mb-2">
              ایپ نیویگیشن (Navigation)
            </span>

            {/* 1. Online Cloud 114 Surahs link (Strict requirement) */}
            <button
              onClick={() => {
                onClose();
                onOpenCloudSurahs();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0A5C36]/40 hover:bg-[#0A5C36] border border-[#D4AF37]/50 text-white font-urdu text-sm transition-all cursor-pointer shadow-sm group"
            >
              <div className="flex items-center gap-2.5">
                <Cloud className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span>تمام ۱۱۴ سورتیں (Online Cloud 114 Surahs)</span>
              </div>
              <span className="text-[10px] bg-[#052918] text-[#D4AF37] px-2 py-0.5 rounded font-ui">
                114
              </span>
            </button>

            {/* Prayer Times & Qibla Guide */}
            <button
              onClick={() => {
                onClose();
                onOpenPrayerTimes();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0A5C36]/30 hover:bg-[#0A5C36] border border-[#0A5C36] hover:border-[#D4AF37] text-white font-urdu text-sm transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🕌</span>
                <span>اوقاتِ نماز و قبلہ رخ (Prayer Times)</span>
              </div>
              <span className="text-[10px] text-amber-300 font-ui font-bold">
                QIBLA
              </span>
            </button>

            {/* 2. Six Kalimas Quick Nav */}
            <button
              onClick={() => {
                onClose();
                onSelectKalimas();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0A5C36]/30 hover:bg-[#0A5C36] border border-[#0A5C36] hover:border-[#D4AF37] text-white font-urdu text-sm transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">📜</span>
                <span>اسلام کے چھ کلمے (Six Kalimas)</span>
              </div>
              <span className="text-[10px] text-emerald-300 font-ui">
                6
              </span>
            </button>

            {/* 3. 99 Names of Allah Quick Nav */}
            <button
              onClick={() => {
                onClose();
                onSelectAsma();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0A5C36]/30 hover:bg-[#0A5C36] border border-[#0A5C36] hover:border-[#D4AF37] text-white font-urdu text-sm transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">✨</span>
                <span>اسماء الحسنیٰ (99 Names of Allah)</span>
              </div>
              <span className="text-[10px] text-emerald-300 font-ui">
                99
              </span>
            </button>

            {/* 2. Digital Tasbeeh Counter */}
            <button
              onClick={() => {
                onClose();
                onOpenTasbeeh();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0A5C36]/30 hover:bg-[#0A5C36] border border-[#0A5C36] hover:border-[#D4AF37] text-white font-urdu text-sm transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>ڈیجیٹل تسبیح کاؤنٹر</span>
              </div>
              <span className="text-[10px] text-emerald-300 font-ui">
                ذکر
              </span>
            </button>

            {/* 3. Bookmarks View */}
            <button
              onClick={() => {
                onClose();
                onFilterBookmarks();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0A5C36]/30 hover:bg-[#0A5C36] border border-[#0A5C36] hover:border-[#D4AF37] text-white font-urdu text-sm transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-[#D4AF37]" />
                <span>محفوظات (Bookmarks)</span>
              </div>
              <span className="text-xs bg-[#D4AF37] text-[#0A5C36] font-bold px-2 py-0.5 rounded font-ui">
                {bookmarksCount}
              </span>
            </button>

            {/* User Guide for Beginners */}
            <button
              onClick={() => {
                onClose();
                onOpenGuide();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0A5C36]/30 hover:bg-[#0A5C36] border border-[#0A5C36] hover:border-[#D4AF37] text-white font-urdu text-sm transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>نئے صارفین کے لیے گائیڈ (User Guide)</span>
              </div>
              <span className="text-[10px] text-emerald-300 font-ui font-bold">
                HELP
              </span>
            </button>

            {/* Android APK Builder (Requested by user) */}
            <button
              onClick={() => {
                onClose();
                onOpenApkModal();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/50 text-white font-urdu text-sm transition-all cursor-pointer shadow-sm group"
            >
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>اینڈرائیڈ APK فائل بنائیں (APK Builder)</span>
              </div>
              <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded font-ui font-bold">
                APK
              </span>
            </button>

            {/* 4. Single-File HTML Export / Copy (Requested by user) */}
            <button
              onClick={() => {
                onClose();
                onOpenExportModal();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37] text-[#D4AF37] font-urdu text-sm font-bold transition-all cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <Download className="w-4 h-4 text-[#D4AF37]" />
                <span>سنگل فائل HTML حاصل کریں (Export)</span>
              </div>
              <span className="text-[10px] bg-[#D4AF37] text-[#0A5C36] px-1.5 py-0.5 rounded font-ui font-bold">
                HTML
              </span>
            </button>
          </div>
        </div>

        {/* Drawer Footer with Monetization / AdMob & App Info */}
        <div className="p-4 bg-[#0A5C36]/30 border-t border-[#0A5C36] text-center text-xs text-emerald-200/80 font-ui">
          <p className="font-bold text-[#D4AF37] font-quran text-sm">
            صدقہ جاریہ • Al-Quran & Duas Pro
          </p>
          <p className="text-[11px] mt-1 text-emerald-300/70">
            AdMob Monetization Ready • 100% Offline PWA
          </p>
        </div>
      </div>
    </div>
  );
};
