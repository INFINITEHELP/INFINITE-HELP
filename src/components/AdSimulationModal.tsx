import React, { useState, useEffect } from 'react';
import { X, Play, Award, Volume2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AdSimulationModalProps {
  type: 'interstitial' | 'rewarded';
  onClose: () => void;
  onRewardGranted?: () => void;
}

export const AdSimulationModal: React.FC<AdSimulationModalProps> = ({
  type,
  onClose,
  onRewardGranted,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(type === 'rewarded' ? 5 : 3);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          if (type === 'rewarded' && onRewardGranted) {
            onRewardGranted();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [type, onRewardGranted]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Google AdMob Test Ad"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-md bg-[#052918] border-2 border-[#D4AF37] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* AdMob Bar */}
        <div className="bg-[#0A5C36] px-4 py-2 border-b border-[#D4AF37]/50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-[#D4AF37] text-[#0A5C36] font-bold px-2 py-0.5 rounded text-[10px] uppercase font-ui">
              AdMob {type === 'rewarded' ? 'Rewarded Ad' : 'Interstitial Ad'}
            </span>
            <span className="text-emerald-200 text-[11px] font-mono">Test Mode</span>
          </div>

          <div>
            {canSkip ? (
              <button
                onClick={onClose}
                className="flex items-center gap-1 bg-[#052918] text-[#D4AF37] border border-[#D4AF37] px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-[#D4AF37] hover:text-[#0A5C36] transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>اشتہار بند کریں (Close)</span>
              </button>
            ) : (
              <span className="text-emerald-300 font-mono text-xs">
                بند کرنے میں {secondsLeft} سیکنڈ...
              </span>
            )}
          </div>
        </div>

        {/* Ad Creative Graphic */}
        <div className="p-6 text-center space-y-4 bg-gradient-to-b from-[#0A5C36]/30 to-[#052918]">
          <div className="w-16 h-16 rounded-2xl bg-[#0A5C36] border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37] shadow-lg">
            {type === 'rewarded' ? (
              <Award className="w-8 h-8 text-[#D4AF37]" />
            ) : (
              <Play className="w-8 h-8 text-[#D4AF37]" />
            )}
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-emerald-300/80 font-ui font-semibold">
              AdMob Live Ad Simulation
            </span>
            <h3 className="font-urdu text-lg font-bold text-white mt-1">
              {type === 'rewarded'
                ? 'ثواب و انعام ایڈ ٹیسٹ (Rewarded Video Ad)'
                : 'فل اسکرین اشتہار (Interstitial Full Screen Ad)'}
            </h3>
            <p className="text-xs text-emerald-200/90 font-urdu mt-1.5 leading-relaxed">
              یہ لائیو اشتہار کا ٹیسٹ پریویو ہے۔ جب آپ کی ایپ گوگل پلے اسٹور پر ہوگی، تو صارفین کو یہ ویڈیو دکھائی دے گی جس پر گوگل آپ کو ڈالر ادا کرے گا۔
            </p>
          </div>

          {/* Ad Creative Showcase Box */}
          <div className="p-4 rounded-2xl bg-[#0A5C36]/40 border border-[#D4AF37]/50 text-left font-ui">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#D4AF37]">Sponsored Showcase</span>
              <span className="text-[10px] bg-emerald-900 text-emerald-200 px-1.5 py-0.5 rounded">
                Verified Advertiser
              </span>
            </div>
            <p className="text-xs text-white font-medium">
              Islamic Educational & Charity Foundation
            </p>
            <p className="text-[11px] text-emerald-300 mt-1">
              Learn Quran with Tajweed & Support Masnoon Duas Worldwide.
            </p>
          </div>

          {canSkip && type === 'rewarded' && (
            <div className="flex items-center justify-center gap-2 p-2 bg-emerald-950/80 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-urdu animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>مبارک ہو! ویڈیو مکمل ہو گئی اور آمدنی کریڈٹ ہو گئی ہے۔</span>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={onClose}
              disabled={!canSkip}
              className={`w-full py-2.5 rounded-xl font-urdu font-bold text-sm transition-all cursor-pointer ${
                canSkip
                  ? 'bg-[#D4AF37] text-[#0A5C36] hover:bg-[#F4E08B] shadow-lg'
                  : 'bg-[#0A5C36]/30 text-emerald-500 border border-[#0A5C36] cursor-not-allowed'
              }`}
            >
              {canSkip ? 'ایپ پر واپس جائیں (Continue to App)' : `انتظار فرمائیں (${secondsLeft}s)...`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
