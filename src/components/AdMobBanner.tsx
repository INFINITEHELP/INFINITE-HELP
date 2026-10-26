import React, { useState } from 'react';
import { Sparkles, Info, Shield, ExternalLink, Coins } from 'lucide-react';

interface AdMobBannerProps {
  onOpenMonetization?: () => void;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({ onOpenMonetization }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <aside
      aria-label="Google AdMob Advertisement Space"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#052918] border-t-2 border-[#D4AF37] shadow-[0_-4px_15px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-4xl mx-auto px-2 py-1.5 flex flex-col items-center">
        {/* AdMob Reserved Header Strip */}
        <div className="w-full flex items-center justify-between px-2 text-[10px] text-emerald-300 font-ui mb-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#D4AF37] uppercase tracking-wider">
              Google AdMob Banner
            </span>
            <span className="text-emerald-400/80">• Live Monetization Slot</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-urdu text-emerald-200">اشتہار برائے آمدنی (Monetization)</span>
            {onOpenMonetization && (
              <button
                onClick={onOpenMonetization}
                className="text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-0.5 font-bold"
                title="ایڈموب سیٹنگز کھولیں"
              >
                <Coins className="w-3 h-3" />
                <span>سیٹنگز</span>
              </button>
            )}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-emerald-300 hover:text-white cursor-pointer"
              title="AdMob integration details"
            >
              <Info className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Ad Placement Container (Standard Banner 320x50 / Responsive Smart Banner) */}
        <div
          id="admob-banner-container"
          onClick={onOpenMonetization}
          className="w-full max-w-[728px] h-[52px] sm:h-[60px] bg-gradient-to-r from-[#0A5C36]/80 via-[#052918] to-[#0A5C36]/80 border border-[#D4AF37]/50 rounded-xl flex items-center justify-between px-3 relative overflow-hidden shadow-inner group cursor-pointer hover:border-[#D4AF37] transition-all"
        >
          {/* Islamic Subtle Accent */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#052918] border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] font-bold text-xs font-ui shadow-sm group-hover:scale-105 transition-transform">
              Ad
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold text-white font-ui leading-tight flex items-center gap-1.5">
                Google AdMob Active Banner
                <span className="text-[9px] bg-emerald-900 text-emerald-200 px-1 py-0.2 rounded border border-emerald-600">
                  Ready
                </span>
              </span>
              <span className="text-[10px] text-emerald-300 font-mono">
                ca-app-pub-3940256099942544/6300978111
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[11px] font-urdu text-emerald-100 bg-[#0A5C36] px-2.5 py-1 rounded-md border border-[#D4AF37]/40">
              گوگل ایڈموب بینر اشتہار
            </span>
            <div className="px-2.5 py-1 rounded-lg bg-[#D4AF37] text-[#0A5C36] text-[10px] font-bold font-ui uppercase tracking-wider shadow group-hover:bg-[#F4E08B] transition-colors">
              Manage / کمائیں
            </div>
          </div>
        </div>

        {/* Expandable AdMob Configuration Helper */}
        {showInfo && (
          <div className="w-full max-w-2xl mt-2 p-3 rounded-xl bg-[#0A5C36]/90 border border-[#D4AF37] text-xs text-white space-y-1 font-ui animate-fade-in">
            <div className="flex justify-between items-center text-[#D4AF37] font-bold">
              <span>Google AdMob Integration Information</span>
              <button
                onClick={() => setShowInfo(false)}
                className="text-white hover:text-[#D4AF37] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-emerald-100 text-[11px]">
              This fixed bottom space is pre-configured with Google AdMob Banner layout (320x50 / Adaptive Banner). To show live ads in your Android APK (via Cordova, Capacitor, or WebView):
            </p>
            <code className="block bg-[#052918] p-1.5 rounded text-[10px] text-amber-200 font-mono">
              window.admob.banner.show({'{'} id: 'ca-app-pub-YOUR_ID/YOUR_UNIT' {'}'})
            </code>
          </div>
        )}
      </div>
    </aside>
  );
};
