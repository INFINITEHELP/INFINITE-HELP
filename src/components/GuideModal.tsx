import React, { useState } from 'react';
import { X, Smartphone, Download, BookOpen, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

interface GuideModalProps {
  onClose: () => void;
  onOpenExport: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose, onOpenExport }) => {
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const isUrdu = lang === 'ur';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Beginner User Guide"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        dir={isUrdu ? 'rtl' : 'ltr'}
        className={`w-full max-w-lg bg-[#052918] border-2 border-[#D4AF37] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden ${
          isUrdu ? 'text-right font-urdu' : 'text-left font-sans'
        }`}
      >
        {/* Header */}
        <div className="bg-[#0A5C36] p-4 border-b-2 border-[#D4AF37] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#052918] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold shrink-0">
              ℹ️
            </div>
            <div>
              <h2 className="font-bold text-white text-base leading-tight">
                {isUrdu ? 'نئے صارفین کے لیے آسان گائیڈ' : 'User Guide for Beginners'}
              </h2>
              <span className="text-[11px] text-emerald-200 font-ui block">
                {isUrdu ? 'زیرو نالج • مکمل مرحلہ وار رہنمائی' : 'Zero Coding Required • Step-by-Step Instructions'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl bg-[#052918]/80 p-0.5 border border-[#D4AF37]/60 text-xs">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#D4AF37] text-[#0A5C36] shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('ur')}
                className={`px-2 py-0.5 rounded-lg font-urdu font-bold transition-all cursor-pointer ${
                  lang === 'ur'
                    ? 'bg-[#D4AF37] text-[#0A5C36] shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                اردو
              </button>
            </div>

            <button
              onClick={onClose}
              aria-label={isUrdu ? 'بند کریں' : 'Close'}
              className="p-1.5 rounded-lg bg-[#052918]/60 text-emerald-200 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Welcome Card */}
          <div className="p-3.5 rounded-2xl bg-[#0A5C36]/30 border border-[#D4AF37]/40 text-emerald-100 text-xs sm:text-sm leading-relaxed">
            <p className="font-bold text-[#D4AF37] text-base mb-1">
              {isUrdu
                ? 'خوش آمدید! آپ کو کچھ بھی کوڈنگ کرنے کی ضرورت نہیں ہے۔'
                : 'Welcome! No technical coding skills required.'}
            </p>
            <p>
              {isUrdu
                ? 'آپ کی "Al-Quran & Duas Pro" ایپ مکمل تیار ہے۔ ذیل میں دیے گئے ۴ آسان اقدامات دیکھ کر آپ اسے باآسانی استعمال کر سکتے ہیں:'
                : 'Your "Al-Quran & Duas Pro" application is 100% production-ready. Follow these 4 simple steps to explore all features:'}
            </p>
          </div>

          {/* Step 1 */}
          <div className="p-3 rounded-xl bg-[#0A5C36]/20 border border-[#0A5C36] flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37] font-bold text-xs flex items-center justify-center shrink-0 font-ui">
              1
            </span>
            <div className="text-xs text-emerald-100 leading-relaxed">
              <span className="font-bold text-[#D4AF37] text-sm block">
                {isUrdu ? 'قرآن مجید اور مسنون دعائیں پڑھیں' : 'Read Quran Surahs & Daily Masnoon Duas'}
              </span>
              {isUrdu
                ? 'اوپر موجود دو ٹیبز "القرآن مجید" اور "مسنون دعائیں" کے ذریعے سورتیں اور دعائیں کھولیں۔ کسی بھی سورت کے بٹن "مکمل تلاوت پڑھیں" پر کلک کریں تو پوری سورت عربی و اردو ترجمے کے ساتھ کھل جائے گی۔'
                : 'Use the main navigation tabs to switch between Surahs and Duas. Click "Read Full Surah" on any card to view Arabic text, Urdu & English translations, and verse-by-verse recitation.'}
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-3 rounded-xl bg-[#0A5C36]/20 border border-[#0A5C36] flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37] font-bold text-xs flex items-center justify-center shrink-0 font-ui">
              2
            </span>
            <div className="text-xs text-emerald-100 leading-relaxed">
              <span className="font-bold text-[#D4AF37] text-sm block">
                {isUrdu ? 'آڈیو سنیں اور کاپی کریں' : 'Listen to Audio & Share Anywhere'}
              </span>
              {isUrdu
                ? 'ہر آیت اور دعا کے ساتھ آڈیو تلاوت کا بٹن ہے جس سے آپ صحیح تلفظ سن سکتے ہیں، اور کاپی کے بٹن سے دوستوں کو واٹس ایپ پر بھیج سکتے ہیں۔'
                : 'Each verse and supplication features an audio recitation button with tajweed pronunciation, plus a 1-click copy button to share on WhatsApp, Telegram, or social media.'}
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-3 rounded-xl bg-[#0A5C36]/20 border border-[#0A5C36] flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37] font-bold text-xs flex items-center justify-center shrink-0 font-ui">
              3
            </span>
            <div className="text-xs text-emerald-100 leading-relaxed">
              <span className="font-bold text-[#D4AF37] text-sm block">
                {isUrdu ? 'فونٹ چھوٹا یا بڑا کریں (Font Resize)' : 'Customize Arabic & Urdu Font Sizes'}
              </span>
              {isUrdu
                ? 'اوپر بائیں جانب ☰ مینو کا بٹن دبائیں اور فونٹ سائز اپنی مرضی کے مطابق چھوٹا یا بڑا کر لیں۔'
                : 'Tap the top-left menu (☰) to adjust font size presets (Normal, Large, Extra Large) or customize Arabic and Urdu typography to your reading preference.'}
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-3 rounded-xl bg-[#0A5C36]/20 border border-[#0A5C36] flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37] font-bold text-xs flex items-center justify-center shrink-0 font-ui">
              4
            </span>
            <div className="text-xs text-emerald-100 leading-relaxed">
              <span className="font-bold text-[#D4AF37] text-sm block">
                {isUrdu ? 'اینڈرائیڈ APK حاصل کریں یا فون میں انسٹال کریں' : 'Generate Android APK or Install to Phone'}
              </span>
              {isUrdu
                ? 'اوپر موجود "APK" بٹن پر کلک کریں تاکہ آپ 1-Click میں دستخط شدہ اینڈرائیڈ APK حاصل کر سکیں یا ڈیوائس پر ڈائریکٹ انسٹال کر سکیں۔'
                : 'Click the "APK" button in the header to generate a signed Android APK file via PWABuilder, or install it directly to your phone as a native WebAPK with full offline support.'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#052918] border-t border-[#0A5C36] flex items-center justify-between gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenExport();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] text-[#0A5C36] font-ui font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Single HTML</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]/50 font-bold hover:bg-[#0A5C36]/80 cursor-pointer text-xs"
          >
            {isUrdu ? 'سمجھ گیا (بند کریں)' : 'Got it (Close)'}
          </button>
        </div>
      </div>
    </div>
  );
};
