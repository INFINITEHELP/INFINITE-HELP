import { Ayah, Surah, LOCAL_SURAHS, ALL_114_SURAHS } from '../data/quranData';

export interface OnlineSurahResponse {
  surah: Surah;
  fromCache: boolean;
  audioReciterUrl?: string;
}

export async function fetchOnlineSurah(surahNumber: number): Promise<Surah> {
  // 1. Check if already embedded offline
  const local = LOCAL_SURAHS.find((s) => s.id === surahNumber);
  if (local) {
    return local;
  }

  // 2. Check local storage cache
  const cacheKey = `online_surah_cache_${surahNumber}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // ignore
  }

  // 3. Fetch from Al-Quran Cloud API (Uthmani Arabic + Fateh Muhammad Jalandhry Urdu Translation)
  const meta = ALL_114_SURAHS.find((s) => s.id === surahNumber);
  const surahNameArabic = meta ? `سُورَةُ ${meta.nameArabic}` : `سورة ${surahNumber}`;
  const surahNameUrdu = meta ? meta.nameUrdu : `سورۃ ${surahNumber}`;
  const surahNameEnglish = meta ? meta.nameEnglish : `Surah ${surahNumber}`;
  const place = meta && meta.revelationPlace.includes('مدنی') ? 'مدنی' : 'مکی';

  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,ur.jalandhry`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const json = await response.json();
    const arabicData = json.data[0];
    const urduData = json.data[1];

    const ayahs: Ayah[] = arabicData.ayahs.map((item: any, idx: number) => {
      return {
        number: item.numberInSurah,
        arabic: item.text,
        urdu: urduData.ayahs[idx]?.text || 'ترجمہ دستیاب نہیں',
      };
    });

    const parsedSurah: Surah = {
      id: surahNumber,
      nameArabic: arabicData.name || surahNameArabic,
      nameUrdu: surahNameUrdu,
      nameEnglish: arabicData.englishName || surahNameEnglish,
      revelationPlace: place,
      totalAyahs: ayahs.length,
      juzNumber: arabicData.ayahs[0]?.juz || 1,
      bismillahPre: surahNumber !== 1 && surahNumber !== 9,
      ayahs,
    };

    // Save to cache so next time it is offline
    try {
      localStorage.setItem(cacheKey, JSON.stringify(parsedSurah));
    } catch {
      // ignore
    }

    return parsedSurah;
  } catch (err) {
    console.warn('Network fetch failed, generating fallback preview:', err);
    // Return a structured offline preview placeholder if network is offline
    return {
      id: surahNumber,
      nameArabic: surahNameArabic,
      nameUrdu: surahNameUrdu,
      nameEnglish: surahNameEnglish,
      revelationPlace: place,
      totalAyahs: meta ? meta.totalAyahs : 1,
      juzNumber: 1,
      bismillahPre: surahNumber !== 1 && surahNumber !== 9,
      ayahs: [
        {
          number: 1,
          arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          urdu: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ (آن لائن کلاؤڈ کنکشن فعال کریں)",
        }
      ],
    };
  }
}

// Return audio URL for full Surah from Mishary Rashid Alafasy
export function getOnlineSurahAudioUrl(surahNumber: number): string {
  const padded = surahNumber.toString().padStart(3, '0');
  return `https://server8.mp3quran.net/afs/${padded}.mp3`;
}
