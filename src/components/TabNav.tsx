export type MainTab = 'quran' | 'duas' | 'kalimas' | 'asma';

interface TabNavProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  quranCount: number;
  duasCount: number;
  kalimasCount: number;
  asmaCount: number;
}

export const TabNav: React.FC<TabNavProps> = ({
  activeTab,
  onTabChange,
  quranCount,
  duasCount,
  kalimasCount,
  asmaCount,
}) => {
  const tabs: { id: MainTab; label: string; count: number }[] = [
    { id: 'quran', label: 'القرآن مجید', count: quranCount },
    { id: 'duas', label: 'مسنون دعائیں', count: duasCount },
    { id: 'kalimas', label: 'چھ کلمے', count: kalimasCount },
    { id: 'asma', label: 'اسماء الحسنیٰ', count: asmaCount },
  ];

  return (
    <div className="bg-[#052918] border-b border-[#0A5C36] px-3 py-2 sticky top-[105px] z-30">
      <div className="max-w-xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-[#0A5C36]/30 p-1.5 rounded-2xl border border-[#D4AF37]/30 shadow-inner">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              className={`flex-1 min-w-[105px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-urdu text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37] shadow-[0_2px_10px_rgba(10,92,54,0.6)]'
                  : 'text-emerald-100 hover:text-[#D4AF37] hover:bg-[#0A5C36]/30'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-ui ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#0A5C36] font-bold'
                    : 'bg-[#052918] text-emerald-300'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
