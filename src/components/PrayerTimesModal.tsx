import React from 'react';
import { X, Clock, Compass, Sun, Moon, Sunrise, Sunset, MapPin } from 'lucide-react';

interface PrayerTimesModalProps {
  onClose: () => void;
}

const PRAYERS = [
  { nameUrdu: "فجر (Fajr)", time: "صبح صادق تا طلوعِ آفتاب", rakats: "2 سنت، 2 فرض (کل: 4)", icon: Sunrise },
  { nameUrdu: "ظہر (Dhuhr)", time: "زوالِ آفتاب تا مثلِ اول/ثانی", rakats: "4 سنت، 4 فرض، 2 سنت، 2 نفل (کل: 12)", icon: Sun },
  { nameUrdu: "عصر (Asr)", time: "مثلِ اول/ثانی تا غروبِ آفتاب", rakats: "4 سنت غیر مؤکدہ، 4 فرض (کل: 8)", icon: Sun },
  { nameUrdu: "مغرب (Maghrib)", time: "غروبِ آفتاب تا شفقِ احمر", rakats: "3 فرض، 2 سنت، 2 نفل (کل: 7)", icon: Sunset },
  { nameUrdu: "عشاء (Isha)", time: "شفق کے غائب ہونے تا نصف شب", rakats: "4 سنت، 4 فرض، 2 سنت، 2 نفل، 3 وتر، 2 نفل (کل: 17)", icon: Moon },
  { nameUrdu: "تہجد (Tahajjud)", time: "بعد از نمازِ عشاء تا قبل از فجر", rakats: "کم از کم 2، زیادہ سے زیادہ 8 یا 12 نفل", icon: Moon },
];

export const PrayerTimesModal: React.FC<PrayerTimesModalProps> = ({ onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="مواقیت الصلوٰۃ و قبلہ گائیڈ"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-xl bg-[#052918] border-2 border-[#D4AF37] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0A5C36] p-4 border-b-2 border-[#D4AF37] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#052918] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center font-bold">
              🕌
            </div>
            <div>
              <h2 className="font-urdu text-lg font-bold text-white">
                اوقاتِ نماز و قبلہ رخ گائیڈ (Prayer Times)
              </h2>
              <span className="text-[11px] text-emerald-200 font-ui">
                Daily 5 Prayers • Rakats Breakdown • Qibla Reference
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Qibla Direction Reference Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0A5C36] via-[#052918] to-[#0A5C36] border border-[#D4AF37] flex items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#052918] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] animate-pulse">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-urdu text-base font-bold text-[#D4AF37]">
                  قبلہ رخ (مکہ مکرمہ، خانہ کعبہ)
                </h3>
                <p className="font-urdu text-xs text-emerald-100">
                  پاکستان و بھارت سے قبلہ مغرب تا جنوب مغرب (تقریباً 260° WSW) کی سمت ہے۔
                </p>
              </div>
            </div>
          </div>

          {/* Prayers List */}
          <div className="space-y-2.5">
            {PRAYERS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#0A5C36]/25 border border-[#0A5C36] hover:border-[#D4AF37] flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]/40">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-urdu font-bold text-white text-base">
                        {p.nameUrdu}
                      </h4>
                      <p className="font-urdu text-xs text-emerald-300">
                        وقت: {p.time}
                      </p>
                    </div>
                  </div>

                  <div className="text-left font-urdu text-xs bg-[#052918] px-3 py-1.5 rounded-lg border border-[#0A5C36] text-amber-200">
                    {p.rakats}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#052918] border-t border-[#0A5C36] flex justify-between items-center text-xs text-emerald-300 font-urdu">
          <span>نماز مومن کی معراج اور دین کا ستون ہے۔</span>
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
