import React, { useState } from 'react';
import {
  MonetizationSettings,
  saveMonetizationSettings,
  calculateEstimatedEarnings,
} from '../utils/monetizationConfig';
import {
  X,
  DollarSign,
  TrendingUp,
  Settings,
  Check,
  Shield,
  HelpCircle,
  Copy,
  ExternalLink,
  Sparkles,
  Play,
  Award,
} from 'lucide-react';

interface MonetizationDashboardModalProps {
  settings: MonetizationSettings;
  onUpdateSettings: (updated: MonetizationSettings) => void;
  onClose: () => void;
  onTriggerTestAd: (type: 'interstitial' | 'rewarded') => void;
}

export const MonetizationDashboardModal: React.FC<MonetizationDashboardModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
  onTriggerTestAd,
}) => {
  const [formData, setFormData] = useState<MonetizationSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [calcImpressions, setCalcImpressions] = useState(10000);
  const [activeSubTab, setActiveSubTab] = useState<'setup' | 'calculator' | 'guide'>('setup');

  const earnings = calculateEstimatedEarnings(calcImpressions, 1.8);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveMonetizationSettings(formData);
    onUpdateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Monetization and Earning Setup"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm"
    >
      <div className="w-full max-w-2xl bg-[#052918] border-2 border-[#D4AF37] rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0A5C36] p-4 border-b-2 border-[#D4AF37] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#052918] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center font-bold text-lg shadow">
              💰
            </div>
            <div>
              <h2 className="font-urdu text-lg font-bold text-white">
                کمائی اور اشتہارات کا سیٹ اپ (Earning & Monetization)
              </h2>
              <span className="text-[11px] text-emerald-200 font-ui">
                Google AdMob • AdSense • In-App Ads & Revenue
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="بند کریں"
            className="p-1.5 rounded-lg bg-[#052918]/60 text-emerald-200 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-nav tabs */}
        <div className="grid grid-cols-3 gap-1 p-2 bg-[#052918] border-b border-[#0A5C36]">
          <button
            onClick={() => setActiveSubTab('setup')}
            className={`py-2 text-xs font-urdu font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'setup'
                ? 'bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]'
                : 'text-emerald-200 hover:bg-[#0A5C36]/30'
            }`}
          >
            اشتہارات کی سیٹنگز (AdMob Setup)
          </button>
          <button
            onClick={() => setActiveSubTab('calculator')}
            className={`py-2 text-xs font-urdu font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'calculator'
                ? 'bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]'
                : 'text-emerald-200 hover:bg-[#0A5C36]/30'
            }`}
          >
            آمدنی کا تخمینہ (Earnings Calculator)
          </button>
          <button
            onClick={() => setActiveSubTab('guide')}
            className={`py-2 text-xs font-urdu font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'guide'
                ? 'bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]'
                : 'text-emerald-200 hover:bg-[#0A5C36]/30'
            }`}
          >
            پیسے کمانے کا طریقہ (Guide)
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: SETUP FORM */}
          {activeSubTab === 'setup' && (
            <form onSubmit={handleSave} className="space-y-4 font-urdu">
              {/* Test Mode Switch */}
              <div className="p-3.5 rounded-2xl bg-[#0A5C36]/30 border border-[#0A5C36] flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-sm block">
                    گوگل ایڈموب ٹیسٹ اشتہارات (Test Ads Mode)
                  </span>
                  <span className="text-[11px] text-emerald-300">
                    شروع میں ہمیشہ ٹیسٹ اشتہارات آن رکھیں تاکہ اکاؤنٹ محفوظ رہے۔
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isTestMode}
                    onChange={(e) =>
                      setFormData({ ...formData, isTestMode: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]" />
                </label>
              </div>

              {/* AdMob App ID */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#D4AF37] font-ui block">
                  Google AdMob App ID
                </label>
                <input
                  type="text"
                  value={formData.adMobAppId}
                  onChange={(e) =>
                    setFormData({ ...formData, adMobAppId: e.target.value })
                  }
                  placeholder="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"
                  dir="ltr"
                  className="w-full bg-[#052918] border border-[#0A5C36] text-white p-2.5 rounded-xl font-mono text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>

              {/* Banner Unit ID */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#D4AF37] font-ui block">
                  Banner Ad Unit ID (نیچے فکسڈ بینر)
                </label>
                <input
                  type="text"
                  value={formData.bannerAdUnitId}
                  onChange={(e) =>
                    setFormData({ ...formData, bannerAdUnitId: e.target.value })
                  }
                  placeholder="ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX"
                  dir="ltr"
                  className="w-full bg-[#052918] border border-[#0A5C36] text-white p-2.5 rounded-xl font-mono text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>

              {/* Interstitial Ad Unit ID */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#D4AF37] font-ui block">
                  Interstitial Ad Unit ID (فل اسکرین اشتہار)
                </label>
                <input
                  type="text"
                  value={formData.interstitialAdUnitId}
                  onChange={(e) =>
                    setFormData({ ...formData, interstitialAdUnitId: e.target.value })
                  }
                  placeholder="ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX"
                  dir="ltr"
                  className="w-full bg-[#052918] border border-[#0A5C36] text-white p-2.5 rounded-xl font-mono text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>

              {/* Test Ad Buttons */}
              <div className="p-3.5 rounded-2xl bg-[#0A5C36]/20 border border-[#0A5C36] space-y-2">
                <span className="font-bold text-[#D4AF37] text-xs block">
                  اشتہارات لائیو ٹیسٹ کریں (Interactive Ad Simulator)
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onTriggerTestAd('interstitial')}
                    className="flex-1 py-2 rounded-xl bg-[#0A5C36] hover:bg-[#08482a] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>فل اسکرین اشتہار ٹیسٹ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onTriggerTestAd('rewarded')}
                    className="flex-1 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-[#0A5C36] text-xs font-bold cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>انعامی ویڈیو اشتہار ٹیسٹ</span>
                  </button>
                </div>
              </div>

              {/* Sadaqah Jariyah & Support Details */}
              <div className="p-3.5 rounded-2xl bg-[#0A5C36]/20 border border-[#0A5C36] space-y-2">
                <span className="font-bold text-[#D4AF37] text-xs block">
                  ایزی پیسہ / جاز کیش سپورٹ (Direct User Support)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.supportEasyPaisa}
                    onChange={(e) =>
                      setFormData({ ...formData, supportEasyPaisa: e.target.value })
                    }
                    placeholder="EasyPaisa نمبر"
                    className="bg-[#052918] border border-[#0A5C36] text-white p-2 rounded-xl text-xs font-ui"
                  />
                  <input
                    type="text"
                    value={formData.supportJazzCash}
                    onChange={(e) =>
                      setFormData({ ...formData, supportJazzCash: e.target.value })
                    }
                    placeholder="JazzCash نمبر"
                    className="bg-[#052918] border border-[#0A5C36] text-white p-2 rounded-xl text-xs font-ui"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4E08B] text-[#0A5C36] font-urdu font-bold text-base cursor-pointer shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {savedSuccess ? <Check className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                <span>{savedSuccess ? 'سیٹنگز محفوظ ہو گئیں!' : 'سیٹنگز محفوظ کریں (Save Settings)'}</span>
              </button>
            </form>
          )}

          {/* TAB 2: CALCULATOR */}
          {activeSubTab === 'calculator' && (
            <div className="space-y-4 font-urdu">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0A5C36] via-[#052918] to-[#0A5C36] border border-[#D4AF37] text-center shadow-lg">
                <span className="text-xs text-emerald-200">تخمینی ماہانہ آمدنی (Estimated Revenue)</span>
                <div className="flex items-center justify-center gap-3 my-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] font-ui">
                    ${earnings.totalUsd}
                  </span>
                  <span className="text-lg text-emerald-300 font-ui">
                    ≈ Rs. {earnings.totalPkr}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-300/80">
                  (اوسطاً $1.80 eCPM کے حساب سے گوگل ایڈموب کا تخمینہ)
                </p>
              </div>

              {/* Slider for impressions */}
              <div className="p-4 rounded-2xl bg-[#0A5C36]/20 border border-[#0A5C36] space-y-2">
                <div className="flex justify-between items-center text-xs text-emerald-100">
                  <span>روزانہ صارفین / صفحات کے مناظر (Impressions):</span>
                  <span className="font-bold text-[#D4AF37] font-ui text-sm">
                    {calcImpressions.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  value={calcImpressions}
                  onChange={(e) => setCalcImpressions(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-emerald-400 font-ui">
                  <span>1,000 views</span>
                  <span>50,000 views</span>
                  <span>200,000 views</span>
                </div>
              </div>

              {/* Breakdown metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-[#052918] border border-[#0A5C36] text-center">
                  <span className="text-emerald-300 block mb-1">بینر اشتہارات (Banner)</span>
                  <span className="font-bold text-[#D4AF37] font-ui text-base">
                    ${((calcImpressions / 1000) * 0.8).toFixed(2)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#052918] border border-[#0A5C36] text-center">
                  <span className="text-emerald-300 block mb-1">انعامی اشتہارات (Rewarded)</span>
                  <span className="font-bold text-[#D4AF37] font-ui text-base">
                    ${((calcImpressions / 1000) * 1.5).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STEP-BY-STEP EARNING GUIDE */}
          {activeSubTab === 'guide' && (
            <div className="space-y-3 font-urdu text-xs sm:text-sm text-emerald-100 leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-[#0A5C36]/30 border border-[#D4AF37]/50 text-emerald-100">
                <p className="font-bold text-[#D4AF37] text-base mb-1">
                  ایپ سے پیسے کمانے کے ۴ آسان اقدامات:
                </p>
                <p className="text-xs">
                  آپ کے لیے مکمل ایڈموب سلاٹ تیار ہے، بس یہ مراحل فالو کریں:
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0A5C36]/20 border border-[#0A5C36] flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#0A5C36] text-[#D4AF37] font-bold font-ui text-xs flex items-center justify-center shrink-0 border border-[#D4AF37]">
                  1
                </span>
                <div>
                  <strong className="text-white block">گوگل ایڈموب پر فری اکاؤنٹ بنائیں</strong>
                  گوگل پر <strong>admob.google.com</strong> سرچ کریں اور اپنے جی میل اکاؤنٹ سے سائن ان کریں۔
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0A5C36]/20 border border-[#0A5C36] flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#0A5C36] text-[#D4AF37] font-bold font-ui text-xs flex items-center justify-center shrink-0 border border-[#D4AF37]">
                  2
                </span>
                <div>
                  <strong className="text-white block">اشتہار کی آئی ڈی (Ad Unit ID) حاصل کریں</strong>
                  ایڈموب ڈیش بورڈ میں جا کر <em>"Add Ad Unit"</em> پر کلک کریں اور <strong>"Banner"</strong> منتخب کریں۔ آپ کو ایک آئی ڈی ملے گی جیسے <code>ca-app-pub-xxx/yyy</code>۔
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0A5C36]/20 border border-[#0A5C36] flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#0A5C36] text-[#D4AF37] font-bold font-ui text-xs flex items-center justify-center shrink-0 border border-[#D4AF37]">
                  3
                </span>
                <div>
                  <strong className="text-white block">آئی ڈی یہاں پیسٹ کر کے محفوظ کریں</strong>
                  پہلے ٹیب میں اپنی آئی ڈی لکھیں اور محفوظ کریں۔ آپ کے لائیو اشتہارات فوری نظر آنا شروع ہو جائیں گے۔
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0A5C36]/20 border border-[#0A5C36] flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#0A5C36] text-[#D4AF37] font-bold font-ui text-xs flex items-center justify-center shrink-0 border border-[#D4AF37]">
                  4
                </span>
                <div>
                  <strong className="text-white block">گوگل پلے اسٹور پر اپلوڈ کریں</strong>
                  جیسے ہی لوگ اس ایپ کو ڈاؤنلوڈ کر کے تلاوت کریں گے، گوگل آپ کے بینک اکاؤنٹ میں ماہانہ ڈالر/روپے خود بھیجے گا۔
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#052918] border-t border-[#0A5C36] flex justify-between items-center text-xs text-emerald-300">
          <span>AdMob Monetization Engine • 100% Ready</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]/50 font-bold hover:bg-[#0A5C36]/80 cursor-pointer"
          >
            بند کریں
          </button>
        </div>
      </div>
    </div>
  );
};
