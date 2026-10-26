import { Surah, Dua } from '../data/quranData';

export type FontPreset = 'small' | 'medium' | 'large' | 'xlarge';

export interface TypographySettings {
  preset: FontPreset;
  showUrdu: boolean;
  showTransliteration: boolean;
  arabicFontSize: number; // in px
  urduFontSize: number; // in px
}

export const DEFAULT_TYPOGRAPHY: TypographySettings = {
  preset: 'medium',
  showUrdu: true,
  showTransliteration: false,
  arabicFontSize: 28,
  urduFontSize: 18,
};

export function getPresetFontSizes(preset: FontPreset): { arabic: number; urdu: number } {
  switch (preset) {
    case 'small':
      return { arabic: 22, urdu: 15 };
    case 'medium':
      return { arabic: 28, urdu: 18 };
    case 'large':
      return { arabic: 34, urdu: 21 };
    case 'xlarge':
      return { arabic: 40, urdu: 25 };
  }
}

export function normalizeArabic(text: string): string {
  return text
    // Remove Arabic diacritics (harakat/tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Normalize Alefs
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize Taa Marbuta
    .replace(/ة/g, 'ه')
    // Normalize Yaa
    .replace(/[ىي]/g, 'ی')
    .trim()
    .toLowerCase();
}

export function filterSurahs(surahs: Surah[], query: string): Surah[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return surahs;
  const normQuery = normalizeArabic(clean);

  return surahs.filter((surah) => {
    const matchId = surah.id.toString() === clean;
    const matchArabic = normalizeArabic(surah.nameArabic).includes(normQuery);
    const matchUrdu = surah.nameUrdu.toLowerCase().includes(clean);
    const matchEnglish = surah.nameEnglish.toLowerCase().includes(clean);
    const matchAyahs = surah.ayahs.some(
      (a) =>
        normalizeArabic(a.arabic).includes(normQuery) ||
        a.urdu.toLowerCase().includes(clean)
    );

    return matchId || matchArabic || matchUrdu || matchEnglish || matchAyahs;
  });
}

export function filterDuas(duas: Dua[], query: string, category?: string): Dua[] {
  let result = duas;
  if (category && category !== 'سب' && category !== 'all') {
    result = result.filter((d) => d.category === category);
  }

  const clean = query.trim().toLowerCase();
  if (!clean) return result;
  const normQuery = normalizeArabic(clean);

  return result.filter((dua) => {
    const matchTitleUrdu = dua.titleUrdu.toLowerCase().includes(clean);
    const matchTitleArabic = normalizeArabic(dua.titleArabic).includes(normQuery);
    const matchArabic = normalizeArabic(dua.arabic).includes(normQuery);
    const matchUrdu = dua.urdu.toLowerCase().includes(clean);
    const matchRef = dua.reference.toLowerCase().includes(clean);
    const matchBenefit = dua.benefit.toLowerCase().includes(clean);

    return matchTitleUrdu || matchTitleArabic || matchArabic || matchUrdu || matchRef || matchBenefit;
  });
}

export function toggleBookmark(list: string[], id: string): string[] {
  if (list.includes(id)) {
    return list.filter((item) => item !== id);
  }
  return [...list, id];
}

export function formatTasbeeh(count: number, target: number): { text: string; percent: number; isComplete: boolean } {
  const validTarget = Math.max(1, target);
  const percent = Math.min(100, Math.round((count / validTarget) * 100));
  return {
    text: `${count} / ${validTarget}`,
    percent,
    isComplete: count >= validTarget,
  };
}
