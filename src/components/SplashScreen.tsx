import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
  autostart?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, autostart = false }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (autostart) {
      onComplete();
      return;
    }

    const duration = 2500; // 2.5 seconds requirement
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentPercent = Math.min(100, Math.round((currentStep / steps) * 100));
      setProgress(currentPercent);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsFading(true);
        setTimeout(() => {
          onComplete();
        }, 350); // smooth fade transition
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [autostart, onComplete]);

  if (autostart) return null;

  return (
    <div
      role="dialog"
      aria-label="Starting Splash Screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#052918] via-[#0A5C36] to-[#041d11] text-white transition-opacity duration-300 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Islamic Geometric Pattern Glow */}
      <div className="w-full flex justify-between items-center opacity-70 pt-4">
        <span className="text-xs tracking-widest text-[#D4AF37] uppercase font-ui">
          Al-Quran & Duas Pro
        </span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-[#052918]/60 border border-[#D4AF37]/40 text-[#D4AF37]">
          100% Offline
        </span>
      </div>

      {/* Main Center Content: Bismillah Calligraphy & Medallion */}
      <div className="flex flex-col items-center text-center max-w-md px-4 my-auto">
        {/* Islamic Medallion with Crescent & Star */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.35)] bg-[#052918]/80 animate-pulse">
            <svg
              className="w-14 h-14 text-[#D4AF37]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Crescent and Star */}
              <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c.44-.06.9-.1 1.36-.1h-2.72Z" fill="#D4AF37" fillOpacity="0.2" />
              <polygon points="17 4 17.8 6.5 20.4 6.5 18.3 8 19.1 10.5 17 9 14.9 10.5 15.7 8 13.6 6.5 16.2 6.5" fill="#D4AF37" />
            </svg>
          </div>
          {/* Decorative outer orbital ring */}
          <div className="absolute inset-[-8px] rounded-full border border-dashed border-[#D4AF37]/40 animate-spin" style={{ animationDuration: '20s' }} />
        </div>

        {/* Bismillah Text (Required Strict Text) */}
        <h1
          dir="rtl"
          className="font-quran text-2xl sm:text-3xl md:text-4xl text-[#D4AF37] mb-4 font-bold tracking-wide drop-shadow-md leading-relaxed"
        >
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </h1>

        <p className="font-urdu text-lg text-emerald-100/90 mb-2">
          القرآن الكريم و الأدعية المأثورة
        </p>
        <p className="text-xs text-[#D4AF37]/80 font-ui tracking-wider uppercase">
          Holy Quran & Masnoon Duas • Pro Edition
        </p>
      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="w-full max-w-xs flex flex-col items-center pb-6">
        <div className="w-full bg-[#052918] border border-[#D4AF37]/40 h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4E08B] rounded-full transition-all duration-75 shadow-[0_0_10px_#D4AF37]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="w-full flex justify-between items-center text-[12px] text-emerald-200 font-urdu mt-2">
          <span>تیار ہو رہا ہے... ({progress}%)</span>
          <button
            onClick={onComplete}
            className="text-[#D4AF37] hover:underline focus:outline-none cursor-pointer font-urdu"
          >
            داخل ہوں &larr;
          </button>
        </div>
      </div>
    </div>
  );
};
