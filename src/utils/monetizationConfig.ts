export interface MonetizationSettings {
  isTestMode: boolean;
  adMobAppId: string;
  bannerAdUnitId: string;
  interstitialAdUnitId: string;
  rewardedAdUnitId: string;
  adSenseClientId: string;
  supportEasyPaisa: string;
  supportJazzCash: string;
  supportBank: string;
  supportTitle: string;
  showRewardedSupport: boolean;
}

export const DEFAULT_MONETIZATION: MonetizationSettings = {
  isTestMode: true,
  adMobAppId: 'ca-app-pub-3940256099942544~3347511713', // Google AdMob official sample app ID
  bannerAdUnitId: 'ca-app-pub-3940256099942544/6300978111', // Official test banner ID
  interstitialAdUnitId: 'ca-app-pub-3940256099942544/1033173712', // Official test interstitial
  rewardedAdUnitId: 'ca-app-pub-3940256099942544/5224354917', // Official test rewarded
  adSenseClientId: 'ca-pub-3940256099942544',
  supportEasyPaisa: '0300-1234567',
  supportJazzCash: '0300-7654321',
  supportBank: 'Meezan Bank: PK00MEZN00012345678901',
  supportTitle: 'صدقہ جاریہ و ایپ سپورٹ',
  showRewardedSupport: true,
};

export const DEFAULT_MONETIZATION_SETTINGS = DEFAULT_MONETIZATION;

export function loadMonetizationSettings(): MonetizationSettings {
  try {
    const saved = localStorage.getItem('al_quran_monetization');
    if (saved) return { ...DEFAULT_MONETIZATION, ...JSON.parse(saved) };
  } catch {
    // ignore
  }
  return DEFAULT_MONETIZATION;
}

export const getMonetizationSettings = loadMonetizationSettings;

export function saveMonetizationSettings(settings: MonetizationSettings): void {
  try {
    localStorage.setItem('al_quran_monetization', JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function calculateEstimatedEarnings(impressions: number, ecpm: number = 1.5): {
  totalUsd: string;
  totalPkr: string;
} {
  const usd = (impressions / 1000) * ecpm;
  const pkr = usd * 278; // approx PKR rate
  return {
    totalUsd: usd.toFixed(2),
    totalPkr: Math.round(pkr).toLocaleString('en-US'),
  };
}
