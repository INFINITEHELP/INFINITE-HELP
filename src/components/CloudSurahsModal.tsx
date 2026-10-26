import React, { useState } from 'react';
import { ALL_114_SURAHS, CloudSurahSummary, LOCAL_SURAHS, Surah } from '../data/quranData';
import { fetchOnlineSurah } from '../services/quranApiService';
import { X, Search, Cloud, CheckCircle2, Loader2, Wifi, Volume2 } from 'lucide-react';

interface CloudSurahsModalProps {
  onClose: () => void;
  onSelectLocalSurah: (surah: Surah) => void;
}

export const CloudSurahsModal: React.FC<CloudSurahsModalProps> = ({
  onClose,
  onSelectLocalSurah,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [loadingSurahId, setLoadingSurahId] = useState<number | null>(null);

  const filteredSurahs = ALL_114_SURAHS.filter((s) => {
    const q = filterQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      s.id.toString() === q ||
      s.nameArabic.includes(q) ||
      s.nameUrdu.toLowerCase().includes(q) ||
      s.nameEnglish.toLowerCase().includes(q)
    );
  });

  const handleSurahClick = async (item: CloudSurahSummary) => {
    // 1. If embedded local
    const local = LOCAL_SURAHS.find((s) => s.id === item.id);
    if (local) {
      onSelectLocalSurah(local);
      onClose();
      return;
    }

    // 2. If online cloud fetch
    try {
      setLoadingSurahId(item.id);
      const onlineSurah = await fetchOnlineSurah(item.id);
      onSelectLocalSurah(onlineSurah);
      onClose();
    } catch (err) {
      console.error('Failed to load online surah:', err);
    } finally {
      setLoadingSurahId(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Online Cloud 114 Surahs Directory"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="w-full max-w-2xl bg-[#052918] border-2 border-[#D4AF37] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0A5C36] px-5 py-4 border-b-2 border-[#D4AF37] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#052918] border border-[#D4AF37] text-[#D4AF37] shadow">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-quran text-xl font-bold text-[#D4AF37]">
                فہرست تمام ۱۱۴ سورتیں (Cloud Index)
              </h2>
              <p className="text-xs text-emerald-200 font-ui">
                114 Surahs Directory • 14 Offline Built-in & 100 Live Cloud Surahs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="بند کریں"
            className="p-2 rounded-lg bg-[#052918]/60 border border-[#D4AF37]/50 text-emerald-200 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-[#052918] border-b border-[#0A5C36]">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-3 text-[#D4AF37]" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="سورت کا نام یا نمبر تلاش کریں (1-114)..."
              dir="rtl"
              className="w-full bg-[#0A5C36]/30 text-white placeholder-emerald-300/50 pr-9 pl-4 py-2 rounded-xl border border-[#0A5C36] focus:border-[#D4AF37] text-sm font-urdu focus:outline-none"
            />
          </div>
        </div>

        {/* List of 114 Surahs */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredSurahs.map((surah) => {
            const isLocal = LOCAL_SURAHS.some((ls) => ls.id === surah.id);
            const isLoadingThis = loadingSurahId === surah.id;

            return (
              <div
                key={surah.id}
                onClick={() => !isLoadingThis && handleSurahClick(surah)}
                className={`p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  isLocal
                    ? 'bg-[#0A5C36]/30 border-[#D4AF37]/60 hover:bg-[#0A5C36]/50 shadow-sm'
                    : 'bg-[#052918]/70 border-[#0A5C36]/80 hover:border-[#D4AF37]/60 hover:bg-[#0A5C36]/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center font-bold font-ui text-xs">
                    {surah.id}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-urdu font-bold text-white text-base">
                        {surah.nameUrdu}
                      </span>
                      <span className="text-xs text-emerald-300 font-ui">
                        ({surah.nameEnglish})
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-ui">
                      {surah.revelationPlace} • {surah.totalAyahs} آیات
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-quran text-lg text-[#D4AF37] font-semibold">
                    سُورَةُ {surah.nameArabic}
                  </span>

                  {isLoadingThis ? (
                    <span className="flex items-center gap-1.5 text-xs text-[#D4AF37] bg-[#0A5C36] px-3 py-1 rounded-full border border-[#D4AF37]">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span className="font-urdu">لوڈ ہو رہا ہے...</span>
                    </span>
                  ) : isLocal ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-[#0A5C36] px-2 py-0.5 rounded-full border border-emerald-500/50">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      آف لائن محفوظ
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-600/40 font-urdu hover:bg-amber-900/60">
                      <Wifi className="w-3 h-3" />
                      کلاؤڈ سے پڑھیں
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#0A5C36]/30 border-t border-[#0A5C36] flex items-center justify-between text-xs text-emerald-300 font-ui">
          <span>کل فہرست: 114 سورتیں • کسی بھی سورت پر کلک کر کے تلاوت سنیں</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37]/50 font-bold hover:bg-[#0A5C36]/80 cursor-pointer"
          >
            بند کریں
          </button>
        </div>
      </div>
    </div>
  );
};
