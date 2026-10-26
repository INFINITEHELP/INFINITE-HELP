import React, { useState, useEffect, useMemo } from 'react';
import { LOCAL_SURAHS, MASNOON_DUAS, Surah, Dua } from './data/quranData';
import { SIX_KALIMAS } from './data/kalimasData';
import { ASMA_UL_HUSNA } from './data/asmaUlHusnaData';
import {
  filterSurahs,
  filterDuas,
  TypographySettings,
  DEFAULT_TYPOGRAPHY,
  toggleBookmark,
} from './utils/filterAndFormat';
import {
  MonetizationSettings,
  getMonetizationSettings,
  DEFAULT_MONETIZATION_SETTINGS,
} from './utils/monetizationConfig';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { TabNav, MainTab } from './components/TabNav';
import { SurahCard } from './components/SurahCard';
import { DuaCard } from './components/DuaCard';
import { KalimasView } from './components/KalimasView';
import { AsmaUlHusnaView } from './components/AsmaUlHusnaView';
import { SurahDetailModal } from './components/SurahDetailModal';
import { SideDrawer } from './components/SideDrawer';
import { CloudSurahsModal } from './components/CloudSurahsModal';
import { TasbeehModal } from './components/TasbeehModal';
import { ExportModal } from './components/ExportModal';
import { GuideModal } from './components/GuideModal';
import { PrayerTimesModal } from './components/PrayerTimesModal';
import { AdMobBanner } from './components/AdMobBanner';
import { MonetizationDashboardModal } from './components/MonetizationDashboardModal';
import { AdSimulationModal } from './components/AdSimulationModal';
import { ApkExportModal } from './components/ApkExportModal';
import { BattleRoyaleApp } from './game/BattleRoyaleApp';
import { BookOpen, Sparkles, Filter, BookmarkX, Gamepad2 } from 'lucide-react';

export default function App() {
  const [appMode, setAppMode] = useState<'game' | 'quran'>('game');
  // Query parameter support: ?autostart=1 skips splash directly (vital for testing and quick loads)
  const isAutoStart = useMemo(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  }, []);

  const [splashFinished, setSplashFinished] = useState(isAutoStart);
  const [activeTab, setActiveTab] = useState<MainTab>('quran');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuaCategory, setSelectedDuaCategory] = useState<string>('سب');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Modals state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [isCloudSurahsOpen, setIsCloudSurahsOpen] = useState(false);
  const [isTasbeehOpen, setIsTasbeehOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isPrayerTimesOpen, setIsPrayerTimesOpen] = useState(false);
  const [isMonetizationOpen, setIsMonetizationOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [activeAdSimulation, setActiveAdSimulation] = useState<'interstitial' | 'rewarded' | null>(null);

  // Persistent Typography Settings
  const [typography, setTypography] = useState<TypographySettings>(() => {
    try {
      const saved = localStorage.getItem('al_quran_typography');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_TYPOGRAPHY;
  });

  const handleUpdateTypography = (updated: Partial<TypographySettings>) => {
    setTypography((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem('al_quran_typography', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Persistent Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('al_quran_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const updated = toggleBookmark(prev, id);
      try {
        localStorage.setItem('al_quran_bookmarks', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const isItemBookmarked = (id: string) => bookmarks.includes(id);

  // Monetization Settings
  const [monetizationSettings, setMonetizationSettings] = useState<MonetizationSettings>(() => {
    return getMonetizationSettings();
  });

  // Filtered Surahs
  const filteredSurahs = useMemo(() => {
    let list = filterSurahs(LOCAL_SURAHS, searchQuery);
    if (showBookmarksOnly) {
      list = list.filter((s) => isItemBookmarked(`surah-${s.id}`));
    }
    return list;
  }, [searchQuery, showBookmarksOnly, bookmarks]);

  // Filtered Duas
  const filteredDuas = useMemo(() => {
    let list = filterDuas(MASNOON_DUAS, searchQuery, selectedDuaCategory);
    if (showBookmarksOnly) {
      list = list.filter((d) => isItemBookmarked(`dua-${d.id}`));
    }
    return list;
  }, [searchQuery, selectedDuaCategory, showBookmarksOnly, bookmarks]);

  const duaCategories = ['سب', 'صبح و شام', 'روزمرہ', 'نماز و طہارت', 'حفاظت و استغفار', 'خیر و برکت'];

  if (appMode === 'game') {
    return (
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        {/* Floating Mode Switcher */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1 rounded-2xl bg-black/90 border border-amber-500/70 shadow-2xl">
          <button
            onClick={() => setAppMode('game')}
            className="px-3 py-1 rounded-xl text-xs font-black font-mono bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <span>🎮 PUBG / FREE FIRE 3D</span>
          </button>
          <button
            onClick={() => setAppMode('quran')}
            className="px-3 py-1 rounded-xl text-xs font-bold font-urdu text-emerald-200 hover:text-white cursor-pointer"
          >
            📖 قرآن & دعائیں
          </button>
        </div>

        <BattleRoyaleApp />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#052918] text-white flex flex-col font-ui antialiased selection:bg-[#D4AF37] selection:text-[#0A5C36]">
      {/* Top Banner to launch Battle Royale Game */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 p-2 text-black flex items-center justify-between px-4 text-xs font-bold font-mono">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 animate-bounce" />
          <span>BATTLE ROYALE 3D GAME IS ACTIVE (PUBG / FREE FIRE)!</span>
        </div>
        <button
          onClick={() => setAppMode('game')}
          className="px-3 py-1 rounded-lg bg-black text-amber-400 font-mono font-black text-xs hover:bg-gray-900 cursor-pointer shadow"
        >
          PLAY GAME NOW ➔
        </button>
      </div>
      {/* 1. Animated Splash Screen (2.5s duration) */}
      {!splashFinished && (
        <SplashScreen
          autostart={isAutoStart}
          onComplete={() => setSplashFinished(true)}
        />
      )}

      {/* 2. Top Header & Instant Search Bar */}
      <Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenMonetization={() => setIsMonetizationOpen(true)}
        onOpenApkModal={() => setIsApkModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        bookmarksCount={bookmarks.length}
        showBookmarksOnly={showBookmarksOnly}
        onToggleBookmarksFilter={() => setShowBookmarksOnly((prev) => !prev)}
      />

      {/* 3. Distinct Tabs */}
      <TabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        quranCount={filteredSurahs.length}
        duasCount={filteredDuas.length}
        kalimasCount={SIX_KALIMAS.length}
        asmaCount={ASMA_UL_HUSNA.length}
      />

      {/* Bookmarks Filter Notification Banner */}
      {showBookmarksOnly && (
        <div className="bg-[#D4AF37] text-[#0A5C36] px-4 py-2 flex items-center justify-between text-xs font-bold font-urdu">
          <span>صرف آپ کے محفوظ کردہ آئٹمز (محفوظات) دکھائے جا رہے ہیں</span>
          <button
            onClick={() => setShowBookmarksOnly(false)}
            className="flex items-center gap-1 bg-[#052918] text-white px-2.5 py-1 rounded-lg cursor-pointer hover:bg-[#0A5C36]"
          >
            <BookmarkX className="w-3.5 h-3.5" />
            <span>فلٹر ختم کریں</span>
          </button>
        </div>
      )}

      {/* Dua Category Filter Bar (Only when on Duas tab) */}
      {activeTab === 'duas' && (
        <div className="bg-[#052918] px-4 py-2.5 border-b border-[#0A5C36]/60">
          <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs text-emerald-300 font-urdu shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
              اقسام:
            </span>
            {duaCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedDuaCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-urdu font-bold whitespace-nowrap border transition-all cursor-pointer ${
                  selectedDuaCategory === cat
                    ? 'bg-[#0A5C36] text-[#D4AF37] border-[#D4AF37] shadow-sm'
                    : 'bg-[#0A5C36]/20 text-emerald-200 border-[#0A5C36] hover:border-[#D4AF37]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. Main App Content Workspace (tailored for mobile responsiveness) */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-4 pb-28 space-y-4">
        {/* Quran Tab Content */}
        {activeTab === 'quran' && (
          <div className="space-y-4">
            {filteredSurahs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSurahs.map((surah) => (
                  <SurahCard
                    key={surah.id}
                    surah={surah}
                    onSelect={setSelectedSurah}
                    typography={typography}
                    isBookmarked={isItemBookmarked(`surah-${surah.id}`)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-[#0A5C36]/15 rounded-3xl border border-[#0A5C36]">
                <BookOpen className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 opacity-60" />
                <h3 className="font-urdu text-lg text-white font-bold mb-1">
                  کوئی سورت تلاش کے مطابق نہیں ملی
                </h3>
                <p className="text-xs text-emerald-300 font-urdu mb-4">
                  براہ کرم تلاش کا لفظ تبدیل کریں یا کلاؤڈ لسٹ چیک کریں۔
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowBookmarksOnly(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37] text-xs font-urdu font-bold hover:bg-[#0A5C36]/80 cursor-pointer"
                >
                  تمام سورتیں دکھائیں
                </button>
              </div>
            )}
          </div>
        )}

        {/* Duas Tab Content */}
        {activeTab === 'duas' && (
          <div className="space-y-4">
            {filteredDuas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDuas.map((dua) => (
                  <DuaCard
                    key={dua.id}
                    dua={dua}
                    typography={typography}
                    isBookmarked={isItemBookmarked(`dua-${dua.id}`)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-[#0A5C36]/15 rounded-3xl border border-[#0A5C36]">
                <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 opacity-60" />
                <h3 className="font-urdu text-lg text-white font-bold mb-1">
                  کوئی دعا تلاش کے مطابق نہیں ملی
                </h3>
                <p className="text-xs text-emerald-300 font-urdu mb-4">
                  براہ کرم تلاش کا لفظ یا کیٹیگری تبدیل کریں۔
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDuaCategory('سب');
                    setShowBookmarksOnly(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0A5C36] text-[#D4AF37] border border-[#D4AF37] text-xs font-urdu font-bold hover:bg-[#0A5C36]/80 cursor-pointer"
                >
                  تمام دعائیں دکھائیں
                </button>
              </div>
            )}
          </div>
        )}

        {/* Kalimas Tab Content */}
        {activeTab === 'kalimas' && (
          <KalimasView
            typography={typography}
            isBookmarked={isItemBookmarked}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* Asma-ul-Husna Tab Content */}
        {activeTab === 'asma' && (
          <AsmaUlHusnaView typography={typography} />
        )}
      </main>

      {/* 5. Fixed Bottom AdMob Monetization Banner */}
      <AdMobBanner onOpenMonetization={() => setIsMonetizationOpen(true)} />

      {/* Modals & Drawers */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        typography={typography}
        onUpdateTypography={handleUpdateTypography}
        onOpenCloudSurahs={() => setIsCloudSurahsOpen(true)}
        onOpenTasbeeh={() => setIsTasbeehOpen(true)}
        onFilterBookmarks={() => setShowBookmarksOnly(true)}
        bookmarksCount={bookmarks.length}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenPrayerTimes={() => setIsPrayerTimesOpen(true)}
        onSelectKalimas={() => setActiveTab('kalimas')}
        onSelectAsma={() => setActiveTab('asma')}
        onOpenMonetization={() => setIsMonetizationOpen(true)}
        onOpenApkModal={() => setIsApkModalOpen(true)}
      />

      {selectedSurah && (
        <SurahDetailModal
          surah={selectedSurah}
          onClose={() => setSelectedSurah(null)}
          typography={typography}
          isBookmarked={isItemBookmarked}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {isCloudSurahsOpen && (
        <CloudSurahsModal
          onClose={() => setIsCloudSurahsOpen(false)}
          onSelectLocalSurah={(surah) => {
            setSelectedSurah(surah);
          }}
        />
      )}

      {isTasbeehOpen && (
        <TasbeehModal onClose={() => setIsTasbeehOpen(false)} />
      )}

      {isExportModalOpen && (
        <ExportModal onClose={() => setIsExportModalOpen(false)} />
      )}

      {isGuideOpen && (
        <GuideModal
          onClose={() => setIsGuideOpen(false)}
          onOpenExport={() => setIsExportModalOpen(true)}
        />
      )}

      {isPrayerTimesOpen && (
        <PrayerTimesModal onClose={() => setIsPrayerTimesOpen(false)} />
      )}

      {isMonetizationOpen && (
        <MonetizationDashboardModal
          settings={monetizationSettings}
          onUpdateSettings={setMonetizationSettings}
          onClose={() => setIsMonetizationOpen(false)}
          onTriggerTestAd={(type) => {
            setActiveAdSimulation(type);
          }}
        />
      )}

      {isApkModalOpen && (
        <ApkExportModal
          onClose={() => setIsApkModalOpen(false)}
          onOpenSingleHtml={() => setIsExportModalOpen(true)}
        />
      )}

      {activeAdSimulation && (
        <AdSimulationModal
          type={activeAdSimulation}
          onClose={() => setActiveAdSimulation(null)}
          onRewardGranted={() => {
            // Reward feedback
          }}
        />
      )}
    </div>
  );
}
