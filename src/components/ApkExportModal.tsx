import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Download,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Globe,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface ApkExportModalProps {
  onClose: () => void;
  onOpenSingleHtml?: () => void;
}

export const ApkExportModal: React.FC<ApkExportModalProps> = ({
  onClose,
  onOpenSingleHtml,
}) => {
  const { isInstalled, isIOS, canPromptDirectly, triggerInstall } = usePWAInstall();
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCapacitor, setCopiedCapacitor] = useState(false);
  const [activeTab, setActiveTab] = useState<'pwabuilder' | 'direct' | 'capacitor'>('pwabuilder');

  const appUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://ais-pre-rcda6f54v7yjernayz6dql-983938049841.asia-east1.run.app';

  const pwabuilderUrl = `https://www.pwabuilder.com?url=${encodeURIComponent(appUrl)}`;

  const capacitorCommands = `# 1. Install Capacitor Android packages
npm install @capacitor/core @capacitor/android

# 2. Initialize Capacitor project
npx cap init "Al-Quran & Duas Pro" "com.alquran.pro" --web-dir dist

# 3. Build production web bundle
npm run build

# 4. Add Android platform & open in Android Studio
npx cap add android
npx cap open android

# 5. In Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyCapacitor = () => {
    navigator.clipboard.writeText(capacitorCommands);
    setCopiedCapacitor(true);
    setTimeout(() => setCopiedCapacitor(false), 2000);
  };

  const isUrdu = lang === 'ur';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Android APK Generator Guide"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
    >
      <div
        dir={isUrdu ? 'rtl' : 'ltr'}
        className={`w-full max-w-2xl bg-[#052918] border-2 border-[#D4AF37] rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden ${
          isUrdu ? 'text-right font-urdu' : 'text-left font-sans'
        }`}
      >
        {/* Header with Language Switcher */}
        <div className="bg-[#0A5C36] p-4 border-b-2 border-[#D4AF37] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#052918] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center font-bold text-lg shadow shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                {isUrdu ? 'اینڈرائیڈ APK فائل بنائیں' : 'Build Android APK & Install'}
              </h2>
              <span className="text-[11px] text-emerald-200 font-ui block">
                Google Play Store Ready • 1-Click APK Generator • 100% Free
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="inline-flex rounded-xl bg-[#052918]/80 p-0.5 border border-[#D4AF37]/60 text-xs">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#D4AF37] text-[#0A5C36] shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('ur')}
                className={`px-2.5 py-1 rounded-lg font-urdu font-bold transition-all cursor-pointer ${
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
              className="p-1.5 rounded-lg bg-[#052918]/60 border border-[#D4AF37]/50 text-emerald-200 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-1 p-2 bg-[#052918] border-b border-[#0A5C36]">
          <button
            onClick={() => setActiveTab('pwabuilder')}
            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pwabuilder'
                ? 'bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37] shadow-sm'
                : 'text-emerald-200 hover:bg-[#0A5C36]/30'
            }`}
          >
            {isUrdu ? '۱. ایک کلک APK (PWABuilder)' : '1. 1-Click APK'}
          </button>
          <button
            onClick={() => setActiveTab('direct')}
            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'direct'
                ? 'bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37] shadow-sm'
                : 'text-emerald-200 hover:bg-[#0A5C36]/30'
            }`}
          >
            {isUrdu ? '۲. فون میں فوری انسٹال' : '2. Instant Phone Install'}
          </button>
          <button
            onClick={() => setActiveTab('capacitor')}
            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'capacitor'
                ? 'bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37] shadow-sm'
                : 'text-emerald-200 hover:bg-[#0A5C36]/30'
            }`}
          >
            {isUrdu ? '۳. اینڈرائیڈ اسٹوڈیو سورس کوڈ' : '3. Android Studio Code'}
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* TAB 1: PWABUILDER (EASIEST FOR ZERO KNOWLEDGE USER) */}
          {activeTab === 'pwabuilder' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0A5C36]/50 via-[#0A5C36]/30 to-[#0A5C36]/50 border border-[#D4AF37] text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-bold text-base text-[#D4AF37]">
                    {isUrdu
                      ? 'سب سے آسان طریقہ: 1-Click میں APK ڈاؤنلوڈ کریں'
                      : 'Recommended: Generate Signed .APK & .AAB in 1-Click'}
                  </h3>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  {isUrdu ? (
                    <>
                      گوگل اور مائیکروسافٹ کا آفیشل اور مفت ٹول <strong>PWABuilder</strong> آپ کی ایپ کا مکمل دستخط شدہ (Signed) اینڈرائیڈ <strong>.APK</strong> اور پلے اسٹور کے لیے <strong>.AAB</strong> پیکج چند سیکنڈ میں بنا دیتا ہے۔
                    </>
                  ) : (
                    <>
                      <strong>PWABuilder</strong> (backed by Microsoft & Google) packages your web application into an official signed Android <strong>.APK</strong> file (for direct device installation) and <strong>.AAB</strong> package (for Google Play Store upload) completely free.
                    </>
                  )}
                </p>
              </div>

              {/* 3 Simple Steps */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#0A5C36]/20 border border-[#0A5C36] flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0A5C36] font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      {isUrdu ? 'PWABuilder کھولیں:' : 'Open PWABuilder with your preloaded App URL:'}
                    </h4>
                    <p className="text-xs text-emerald-300 mt-0.5">
                      {isUrdu
                        ? 'نیچے دیے گئے سنہرے بٹن پر کلک کریں۔ آپ کی ایپ کا لائیو ایڈریس خود بخود درج ہوگا۔'
                        : 'Click the golden button below. Your live app URL is automatically passed to the builder.'}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#0A5C36]/20 border border-[#0A5C36] flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0A5C36] font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      {isUrdu ? '"Package for Android" کا بٹن دبائیں:' : 'Click "Package for Android":'}
                    </h4>
                    <p className="text-xs text-emerald-300 mt-0.5">
                      {isUrdu
                        ? 'ٹول تمام آئیکونز اور ایڈموب سیٹنگز کے ساتھ اصلی اینڈرائیڈ پیکیج بنا دے گا۔'
                        : 'PWABuilder validates your manifest, icons, and offline service worker, then compiles the Android package.'}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#0A5C36]/20 border border-[#0A5C36] flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0A5C36] font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      {isUrdu ? '.APK ڈاؤنلوڈ کر کے فون میں انسٹال کریں:' : 'Download .APK and install on any phone:'}
                    </h4>
                    <p className="text-xs text-emerald-300 mt-0.5">
                      {isUrdu
                        ? 'فائل ڈاؤنلوڈ ہو جائے گی، اسے اپنے یا دوستوں کے کسی بھی فون میں بھیجیں اور انسٹال کر لیں!'
                        : 'Transfer the .apk to your phone (via USB or WhatsApp/Telegram), tap it, and click "Install".'}
                    </p>
                  </div>
                </div>
              </div>

              {/* App URL Box */}
              <div className="p-3 rounded-2xl bg-[#052918] border border-[#D4AF37]/50 flex items-center justify-between gap-2">
                <div className="overflow-hidden">
                  <span className="text-[10px] text-emerald-300 font-ui block">
                    {isUrdu ? 'آپ کی لائیو ایپ کا ایڈریس (App URL):' : 'Your Live App URL:'}
                  </span>
                  <span className="text-xs text-[#D4AF37] font-mono truncate block">
                    {appUrl}
                  </span>
                </div>
                <button
                  onClick={handleCopyUrl}
                  className="px-3 py-1.5 rounded-xl bg-[#0A5C36] text-white border border-[#D4AF37] text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  <span>{copiedUrl ? (isUrdu ? 'کاپی ہو گیا' : 'Copied!') : (isUrdu ? 'لنک کاپی' : 'Copy URL')}</span>
                </button>
              </div>

              {/* Action Button: Open PWABuilder */}
              <a
                href={pwabuilderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F4E08B] to-[#D4AF37] text-[#0A5C36] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:brightness-105 transition-all cursor-pointer"
              >
                <span>{isUrdu ? 'PWABuilder پر جائیں اور APK حاصل کریں' : 'Open PWABuilder & Download APK'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* TAB 2: DIRECT INSTALL (WEBAPK) */}
          {activeTab === 'direct' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0A5C36]/30 border border-[#D4AF37] text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#0A5C36] border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37] shadow">
                  <Smartphone className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-white">
                  {isUrdu
                    ? 'فون میں بغیر فائل ڈاؤنلوڈ کیے انسٹال کریں (WebAPK)'
                    : 'Direct Phone Install (Native WebAPK)'}
                </h3>
                <p className="text-xs text-emerald-200 leading-relaxed max-w-md mx-auto">
                  {isUrdu ? (
                    <>
                      اینڈرائیڈ میں گوگل کروم خود بخود ایپ کو اصلی <strong>WebAPK</strong> میں تبدیل کر کے آپ کے فون کے ہوم اسکرین پر انسٹال کر دیتا ہے۔ یہ انٹرنیٹ کے بغیر بھی 100% چلے گی!
                    </>
                  ) : (
                    <>
                      Google Chrome on Android automatically generates a native <strong>WebAPK</strong> with an app drawer icon, splash screen, and full offline caching. No external download required!
                    </>
                  )}
                </p>

                {isInstalled ? (
                  <div className="inline-flex items-center gap-2 p-2.5 px-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>
                      {isUrdu
                        ? 'یہ ایپ آپ کے ڈیوائس پر پہلے سے انسٹال شدہ ہے!'
                        : 'This app is already installed on your device!'}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={async () => {
                      const success = await triggerInstall();
                      if (success) onClose();
                    }}
                    className="w-full max-w-sm mx-auto py-3 px-5 rounded-2xl bg-[#D4AF37] text-[#0A5C36] font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-[#F4E08B] cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {isUrdu ? 'ابھی اپنے فون میں انسٹال کریں' : 'Install Directly to Phone Now'}
                    </span>
                  </button>
                )}
              </div>

              {/* Instructions if install banner not showing */}
              <div className="p-4 rounded-2xl bg-[#0A5C36]/20 border border-[#0A5C36] space-y-2 text-xs">
                <span className="font-bold text-[#D4AF37] block text-sm">
                  {isUrdu ? 'اگر انسٹال بٹن نظر نہ آئے:' : 'Manual Installation (if prompt does not appear):'}
                </span>
                {isUrdu ? (
                  <ol className="list-decimal list-inside space-y-1 text-emerald-200 font-urdu">
                    <li>موبائل کے گوگل کروم (Chrome) میں اوپر تین ڈاٹس (⋮) پر ٹیپ کریں۔</li>
                    <li><strong>"Add to Home screen"</strong> یا <strong>"Install app"</strong> پر کلک کریں۔</li>
                    <li>ایپ آپ کے فون کے مینو میں اصلی ایپ کی طرح شامل ہو جائے گی۔</li>
                  </ol>
                ) : (
                  <ol className="list-decimal list-inside space-y-1.5 text-emerald-200">
                    <li>Open this URL in Google Chrome or Samsung Internet on Android.</li>
                    <li>Tap the <strong>three dots menu (⋮)</strong> in the top-right corner.</li>
                    <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                    <li>The app will install as a native standalone app with offline capabilities.</li>
                  </ol>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CAPACITOR / ANDROID STUDIO CODE */}
          {activeTab === 'capacitor' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0A5C36]/30 border border-[#0A5C36] text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#D4AF37] font-ui">
                    Capacitor Native Android CLI
                  </span>
                  <button
                    onClick={handleCopyCapacitor}
                    className="text-xs text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCapacitor ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCapacitor ? (isUrdu ? 'کاپی ہو گیا' : 'Copied!') : (isUrdu ? 'کمانڈز کاپی کریں' : 'Copy Commands')}</span>
                  </button>
                </div>
                <p className="text-xs text-emerald-200">
                  {isUrdu
                    ? 'اگر آپ اینڈرائیڈ اسٹوڈیو میں کوڈ کھول کر اصلی ڈیبگ یا ریلیز APK بنانا چاہتے ہیں، تو یہ کمانڈز چلائیں:'
                    : 'To build a custom signed release APK in Android Studio, execute these terminal commands in the project directory:'}
                </p>
                <pre className="p-3 rounded-xl bg-[#052918] text-[#D4AF37] text-xs font-mono overflow-x-auto border border-[#0A5C36]">
                  {capacitorCommands}
                </pre>
              </div>

              {onOpenSingleHtml && (
                <div className="p-3 rounded-2xl bg-[#0A5C36]/20 border border-[#D4AF37]/40 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-white block">
                      {isUrdu ? 'سنگل فائل HTML بھی دستیاب ہے' : 'Single-File HTML Export Available'}
                    </span>
                    <span className="text-[11px] text-emerald-300">
                      {isUrdu
                        ? 'جسے آپ کسی بھی Cordova یا WebView ایپ میں استعمال کر سکتے ہیں۔'
                        : 'Ready to convert with Website 2 APK Builder, Appilix, or WebViewGold.'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSingleHtml();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37] text-xs font-bold hover:bg-[#0A5C36]/80 cursor-pointer"
                  >
                    {isUrdu ? 'HTML فائل حاصل کریں' : 'Export Single HTML'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0A5C36]/30 border-t border-[#0A5C36] flex items-center justify-between text-xs text-emerald-200">
          <span>
            {isUrdu
              ? '100% فری اور محفوظ • تمام اینڈرائیڈ ورژنز پر سپورٹڈ'
              : '100% Free & Secure • Supported on all Android versions'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]/50 font-bold hover:bg-[#0A5C36]/80 cursor-pointer"
          >
            {isUrdu ? 'بند کریں' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
