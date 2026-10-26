export function getStandaloneSingleFileHtml(): string {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Al-Quran & Duas Pro</title>
  <meta name="theme-color" content="#0A5C36">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;700&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    :root {
      --islamic-green: #0A5C36;
      --islamic-dark: #052918;
      --islamic-gold: #D4AF37;
      --islamic-gold-light: #F4E08B;
      --arabic-font-size: 28px;
      --urdu-font-size: 18px;
    }
    body {
      background-color: var(--islamic-dark);
      color: #ffffff;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      overflow-x: hidden;
      min-height: 100vh;
      padding-bottom: 75px; /* space for fixed AdMob banner */
    }
    .font-quran {
      font-family: 'Amiri Quran', 'Amiri', serif;
      line-height: 2.2;
    }
    .font-urdu {
      font-family: 'Noto Nastaliq Urdu', 'Amiri', serif;
      line-height: 2.1;
    }
    /* Animated Splash Screen */
    #splash-screen {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: radial-gradient(circle at center, #0A5C36 0%, #052918 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 30px 20px;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }
    #splash-screen.fade-out {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .splash-medallion {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid var(--islamic-gold);
      box-shadow: 0 0 25px rgba(212, 175, 55, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 25px;
      animation: pulse 2s infinite ease-in-out;
      background: rgba(5, 41, 24, 0.8);
    }
    .splash-title {
      font-size: 30px;
      color: var(--islamic-gold);
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      margin-bottom: 12px;
    }
    .progress-bar-container {
      width: 100%;
      max-width: 280px;
      height: 8px;
      background: rgba(5, 41, 24, 0.8);
      border: 1px solid rgba(212, 175, 55, 0.5);
      border-radius: 999px;
      overflow: hidden;
      padding: 1px;
    }
    .progress-bar-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--islamic-gold), var(--islamic-gold-light));
      border-radius: 999px;
      transition: width 0.05s linear;
    }
    /* Top Header */
    header {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: var(--islamic-green);
      border-bottom: 2px solid var(--islamic-gold);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }
    .header-bar {
      max-width: 800px;
      margin: 0 auto;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .drawer-btn {
      background: rgba(5, 41, 24, 0.6);
      border: 1px solid rgba(212, 175, 55, 0.5);
      color: var(--islamic-gold);
      font-size: 20px;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .app-title-box {
      text-align: center;
    }
    .app-title {
      font-size: 20px;
      font-weight: bold;
      color: var(--islamic-gold);
      letter-spacing: 0.5px;
    }
    .search-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 16px 10px;
    }
    .search-input {
      width: 100%;
      background: var(--islamic-dark);
      border: 1px solid rgba(212, 175, 55, 0.6);
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 12px;
      font-size: 14px;
      font-family: 'Noto Nastaliq Urdu', system-ui;
      outline: none;
    }
    .search-input:focus {
      border-color: var(--islamic-gold);
      box-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
    }
    /* Tabs */
    .tabs-wrap {
      background: var(--islamic-dark);
      border-bottom: 1px solid var(--islamic-green);
      padding: 8px 16px;
      position: sticky;
      top: 96px;
      z-index: 90;
    }
    .tabs-inner {
      max-width: 480px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      background: rgba(10, 92, 54, 0.4);
      padding: 4px;
      border-radius: 14px;
      border: 1px solid rgba(212, 175, 55, 0.3);
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: #d1fae5;
      padding: 10px;
      border-radius: 10px;
      font-family: 'Noto Nastaliq Urdu', system-ui;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .tab-btn.active {
      background: var(--islamic-green);
      color: var(--islamic-gold);
      border: 1px solid var(--islamic-gold);
      box-shadow: 0 2px 8px rgba(10, 92, 54, 0.6);
    }
    /* Main Content */
    .content-area {
      max-width: 800px;
      margin: 16px auto;
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    /* Cards */
    .islamic-card {
      background-color: var(--islamic-dark);
      border: 2px solid var(--islamic-green);
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transition: border-color 0.2s, transform 0.15s;
    }
    .islamic-card:hover {
      border-color: var(--islamic-gold);
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--islamic-green);
      padding-bottom: 8px;
      margin-bottom: 12px;
    }
    .badge {
      background: var(--islamic-green);
      color: var(--islamic-gold);
      border: 1px solid rgba(212, 175, 55, 0.4);
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: bold;
    }
    .arabic-text {
      font-size: var(--arabic-font-size);
      color: #ffffff;
      text-align: right;
      margin-bottom: 10px;
      line-height: 2.2;
    }
    .urdu-text {
      font-size: var(--urdu-font-size);
      color: #d1fae5;
      text-align: right;
      border-top: 1px solid rgba(10, 92, 54, 0.5);
      padding-top: 8px;
      line-height: 2.1;
    }
    .card-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
      padding-top: 8px;
      border-top: 1px solid var(--islamic-green);
    }
    .action-btn {
      background: var(--islamic-green);
      border: 1px solid rgba(212, 175, 55, 0.5);
      color: var(--islamic-gold);
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
    }
    .action-btn:active {
      transform: scale(0.96);
    }
    /* Side Drawer */
    #drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(3px);
      z-index: 1000;
      display: none;
    }
    #side-drawer {
      position: fixed;
      top: 0;
      right: -320px;
      width: 300px;
      height: 100%;
      background: var(--islamic-dark);
      border-left: 2px solid var(--islamic-gold);
      z-index: 1001;
      transition: right 0.3s ease;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    #side-drawer.open {
      right: 0;
    }
    .drawer-header {
      background: var(--islamic-green);
      padding: 16px;
      border-bottom: 2px solid var(--islamic-gold);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .drawer-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .control-group {
      background: rgba(10, 92, 54, 0.2);
      border: 1px solid var(--islamic-green);
      padding: 12px;
      border-radius: 12px;
    }
    .control-label {
      font-size: 12px;
      font-weight: bold;
      color: var(--islamic-gold);
      margin-bottom: 8px;
      display: block;
    }
    .preset-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
    }
    .preset-btn {
      background: rgba(5, 41, 24, 0.7);
      border: 1px solid var(--islamic-green);
      color: #ffffff;
      padding: 6px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: bold;
      cursor: pointer;
    }
    .preset-btn.active {
      background: var(--islamic-gold);
      color: var(--islamic-green);
    }
    /* Fixed Bottom AdMob Space */
    #admob-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--islamic-dark);
      border-top: 2px solid var(--islamic-gold);
      padding: 6px 12px;
      z-index: 200;
      text-align: center;
    }
    .admob-inner {
      max-width: 728px;
      height: 50px;
      margin: 0 auto;
      background: linear-gradient(90deg, rgba(10,92,54,0.8), rgba(5,41,24,0.9), rgba(10,92,54,0.8));
      border: 1px dashed rgba(212, 175, 55, 0.6);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      font-size: 11px;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.85; }
    }
  </style>
</head>
<body>

  <!-- 1. ANIMATED SPLASH INTERFACE -->
  <div id="splash-screen">
    <div style="font-size: 11px; color: var(--islamic-gold); letter-spacing: 1px;">AL-QURAN & DUAS PRO • 100% OFFLINE</div>
    <div style="text-align: center; margin: auto 0;">
      <div class="splash-medallion">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.5">
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c.44-.06.9-.1 1.36-.1h-2.72Z" fill="#D4AF37" fill-opacity="0.2"/>
        </svg>
      </div>
      <h1 class="splash-title font-quran">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
      <p class="font-urdu" style="color: #a7f3d0; font-size: 16px;">القرآن الكريم والأدعية المأثورة</p>
    </div>
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
      <div class="progress-bar-container">
        <div id="splash-progress" class="progress-bar-fill"></div>
      </div>
      <div style="font-size: 10px; color: #a7f3d0; margin-top: 6px;">لوڈنگ ہو رہی ہے... (Loading 100% Offline)</div>
    </div>
  </div>

  <!-- 2. SIDE DRAWER OVERLAY & MENU -->
  <div id="drawer-overlay" onclick="toggleDrawer(false)"></div>
  <div id="side-drawer">
    <div class="drawer-header">
      <span class="font-urdu" style="font-size: 16px; font-weight: bold; color: #ffffff;">القرآن & دعائیں مینو</span>
      <button class="drawer-btn" onclick="toggleDrawer(false)">✕</button>
    </div>
    <div class="drawer-body">
      <div class="control-group">
        <span class="control-label">فونٹ سائز ایڈجسٹمنٹ (Font Resize)</span>
        <div class="preset-grid">
          <button class="preset-btn" onclick="setFontSize(22, 15, this)">چھوٹا</button>
          <button class="preset-btn active" onclick="setFontSize(28, 18, this)">معمول</button>
          <button class="preset-btn" onclick="setFontSize(34, 21, this)">بڑا</button>
          <button class="preset-btn" onclick="setFontSize(40, 24, this)">بہت بڑا</button>
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">آن لائن کلاؤڈ سورتیں (Online Cloud 114 Surahs)</span>
        <p style="font-size: 11px; color: #a7f3d0; margin-bottom: 8px;">مکمل قرآن مجید کی 114 سورتوں کی تفصیلی فہرست کلاؤڈ لنک۔</p>
        <button class="action-btn" style="width: 100%;" onclick="openCloud114Surahs()">114 سورتیں کلاؤڈ فہرست کھولیں</button>
      </div>
      <div class="control-group">
        <span class="control-label">ایپ خصوصیات</span>
        <p style="font-size: 11px; color: #a7f3d0;">✓ 100% آف لائن بغیر انٹرنیٹ کے کام کرتا ہے<br>✓ مستند عربی متن مع اردو ترجمہ<br>✓ گوگل ایڈموب آمدنی انٹیگریشن سپورٹ</p>
      </div>
    </div>
  </div>

  <!-- 3. TOP HEADER & SEARCH -->
  <header>
    <div class="header-bar">
      <button class="drawer-btn" aria-label="Menu" onclick="toggleDrawer(true)">☰</button>
      <div class="app-title-box">
        <div class="app-title font-quran">القرآن & الأدعية</div>
        <div style="font-size: 10px; color: #a7f3d0;">Al-Quran & Duas Pro</div>
      </div>
      <button class="action-btn" onclick="toggleVoiceRecitation()">🔊 تلاوت</button>
    </div>
    <div class="search-container">
      <input type="search" id="search-input" class="search-input" placeholder="تلاش کریں: سورت، آیت، دعا یا ترجمہ..." oninput="onSearchInput()">
    </div>
  </header>

  <!-- 4. TWO DISTINCT TABS -->
  <div class="tabs-wrap">
    <div class="tabs-inner">
      <button id="tab-quran" class="tab-btn active" onclick="switchTab('quran')">القرآن مجید</button>
      <button id="tab-duas" class="tab-btn" onclick="switchTab('duas')">مسنون دعائیں</button>
    </div>
  </div>

  <!-- 5. MAIN WORKSPACE CONTENT CONTAINER -->
  <main id="content-container" class="content-area">
    <!-- Populated dynamically via embedded JavaScript array -->
  </main>

  <!-- 6. FIXED BOTTOM ADMOB AD BANNER -->
  <footer id="admob-banner">
    <div style="font-size: 9px; color: var(--islamic-gold); margin-bottom: 2px;">GOOGLE ADMOB BANNER • RESERVED AD SPACE (اشتہار)</div>
    <div class="admob-inner">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="background: var(--islamic-green); border: 1px solid var(--islamic-gold); color: var(--islamic-gold); font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: bold;">Ad</span>
        <span style="font-size: 11px; color: #ffffff;">Google AdMob Integration Slot (320x50)</span>
      </div>
      <span style="background: var(--islamic-gold); color: var(--islamic-green); font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px;">MONETIZATION</span>
    </div>
  </footer>

  <script>
    /* 4. EMBEDDED LOCALIZED BACKUP ARRAYS */
    const QURAN_DATA = [
      {
        id: 1,
        nameArabic: "سُورَةُ الْفَاتِحَةِ",
        nameUrdu: "سورۃ الفاتحہ",
        totalAyahs: 7,
        place: "مکی",
        ayahs: [
          { num: 1, ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", ur: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے" },
          { num: 2, ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", ur: "سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے" },
          { num: 3, ar: "الرَّحْمَٰنِ الرَّحِيمِ", ur: "بہت مہربان نہایت رحم فرمانے والا ہے" },
          { num: 4, ar: "مَالِكِ يَوْمِ الدِّينِ", ur: "روزِ جزا کا مالک ہے" },
          { num: 5, ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", ur: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں" },
          { num: 6, ar: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", ur: "ہمیں سیدھے راستے کی ہدایت فرما" },
          { num: 7, ar: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", ur: "ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ کہ ان کا جن پر غضب نازل ہوا اور نہ گمراہوں کا۔" }
        ]
      },
      {
        id: 112,
        nameArabic: "سُورَةُ الإِخْلَاصِ",
        nameUrdu: "سورۃ الاخلاص",
        totalAyahs: 4,
        place: "مکی",
        ayahs: [
          { num: 1, ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", ur: "آپ فرمائیے: وہ اللہ ایک ہے" },
          { num: 2, ar: "اللَّهُ الصَّمَدُ", ur: "اللہ بے نیاز ہے (سب اس کے محتاج ہیں)" },
          { num: 3, ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ", ur: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے" },
          { num: 4, ar: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", ur: "اور نہ ہی کوئی اس کے برابر کا ہے" }
        ]
      },
      {
        id: 113,
        nameArabic: "سُورَةُ الْفَلَقِ",
        nameUrdu: "سورۃ الفلق",
        totalAyahs: 5,
        place: "مکی",
        ayahs: [
          { num: 1, ar: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", ur: "آپ فرمائیے کہ میں صبح کے رب کی پناہ مانگتا ہوں" },
          { num: 2, ar: "مِنْ شَرِّ مَا خَلَقَ", ur: "ہر اُس چیز کے شر سے جو اس نے پیدا کی ہے" },
          { num: 3, ar: "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ", ur: "اور اندھیری رات کے شر سے جب وہ چھا جائے" },
          { num: 4, ar: "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", ur: "اور گرہوں میں پھونکنے والیوں (جادوگرنیوں) کے شر سے" },
          { num: 5, ar: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", ur: "اور حسد کرنے والے کے شر سے جب وہ حسد کرے" }
        ]
      }
    ];

    const DUAS_DATA = [
      {
        id: "dua-1",
        title: "سو کر اٹھنے کی دعا",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        urdu: "تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں مارنے کے بعد زندہ کیا اور اسی کی طرف اٹھ کر جانا ہے۔",
        ref: "صحیح البخاری: 6312"
      },
      {
        id: "dua-2",
        title: "سوتے وقت کی دعا",
        arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
        urdu: "اے اللہ! میں تیرے نام کے ساتھ مرتا ہوں (سوتا ہوں) اور جیتا ہوں (جاگتا ہوں)۔",
        ref: "صحیح البخاری: 6324"
      },
      {
        id: "dua-3",
        title: "کھانے سے پہلے کی دعا",
        arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
        urdu: "اللہ کے نام کے ساتھ اور اللہ کی برکت پر (میں کھانا شروع کرتا ہوں)۔",
        ref: "جامع الترمذی"
      }
    ];

    let currentTab = 'quran';

    /* 2. ANIMATED SPLASH INTERFACE (2.5 Seconds) */
    window.addEventListener('DOMContentLoaded', () => {
      const splash = document.getElementById('splash-screen');
      const progress = document.getElementById('splash-progress');
      let p = 0;
      const interval = setInterval(() => {
        p += 2;
        if (progress) progress.style.width = p + '%';
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            splash.classList.add('fade-out');
            setTimeout(() => splash.remove(), 400);
          }, 200);
        }
      }, 50); // 50 * 50ms = 2500ms (2.5 seconds)

      renderContent();
    });

    /* 3. NAVIGATION & TABS */
    function switchTab(tab) {
      currentTab = tab;
      document.getElementById('tab-quran').classList.toggle('active', tab === 'quran');
      document.getElementById('tab-duas').classList.toggle('active', tab === 'duas');
      renderContent();
    }

    function toggleDrawer(open) {
      const drawer = document.getElementById('side-drawer');
      const overlay = document.getElementById('drawer-overlay');
      if (open) {
        drawer.classList.add('open');
        overlay.style.display = 'block';
      } else {
        drawer.classList.remove('open');
        overlay.style.display = 'none';
      }
    }

    function setFontSize(ar, ur, btn) {
      document.documentElement.style.setProperty('--arabic-font-size', ar + 'px');
      document.documentElement.style.setProperty('--urdu-font-size', ur + 'px');
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
    }

    function openCloud114Surahs() {
      alert("Online Cloud 114 Surahs Directory:\\n\\nمکمل 114 سورتوں کی کلاؤڈ لسٹ دیکھنے کے لیے آپ کا شکریہ۔ آف لائن موڈ میں سورۃ الفاتحہ، سورۃ الاخلاص اور سورۃ الفلق مکمل متن کے ساتھ شامل ہیں۔");
      toggleDrawer(false);
    }

    function toggleVoiceRecitation() {
      if ('speechSynthesis' in window) {
        const text = currentTab === 'quran' ? QURAN_DATA[0].ayahs[0].ar : DUAS_DATA[0].arabic;
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'ar-SA';
        window.speechSynthesis.speak(msg);
      } else {
        alert("آڈیو تلاوت کے لیے براؤزر اسپیچ سپورٹ درکار ہے۔");
      }
    }

    function onSearchInput() {
      renderContent();
    }

    /* 4. CONTENT RENDERING */
    function renderContent() {
      const container = document.getElementById('content-container');
      const query = (document.getElementById('search-input')?.value || '').trim().toLowerCase();
      container.innerHTML = '';

      if (currentTab === 'quran') {
        const filtered = QURAN_DATA.filter(s => 
          !query || s.nameArabic.includes(query) || s.nameUrdu.includes(query) || s.ayahs.some(a => a.ar.includes(query) || a.ur.includes(query))
        );

        if (filtered.length === 0) {
          container.innerHTML = '<div style="text-align:center; padding: 40px; color: #a7f3d0;" class="font-urdu">کوئی سورت تلاش کے مطابق نہیں ملی۔</div>';
          return;
        }

        filtered.forEach(surah => {
          const card = document.createElement('div');
          card.className = 'islamic-card';
          
          let ayahsHtml = surah.ayahs.map(a => \`
            <div style="margin-bottom: 14px; border-bottom: 1px dashed rgba(10,92,54,0.4); padding-bottom: 8px;">
              <div class="arabic-text font-quran">\${a.ar} <span style="color:var(--islamic-gold); font-size:16px;">﴿\${a.num}﴾</span></div>
              <div class="urdu-text font-urdu">\${a.ur}</div>
            </div>
          \`).join('');

          card.innerHTML = \`
            <div class="card-top">
              <span class="badge font-urdu">\${surah.nameUrdu} • \${surah.place} (\${surah.totalAyahs} آیات)</span>
              <span class="font-quran" style="font-size: 22px; color: var(--islamic-gold); font-weight: bold;">\${surah.nameArabic}</span>
            </div>
            <div>\${ayahsHtml}</div>
            <div class="card-actions">
              <span style="font-size: 11px; color: #a7f3d0;">سورت نمبر: \${surah.id}</span>
              <button class="action-btn" onclick="navigator.clipboard.writeText('\${surah.nameArabic}\\n' + '\${surah.ayahs.map(a => a.ar).join('\\n')}'); alert('مکمل سورت کاپی ہو گئی!')">کاپی کریں</button>
            </div>
          \`;
          container.appendChild(card);
        });
      } else {
        const filtered = DUAS_DATA.filter(d => 
          !query || d.title.includes(query) || d.arabic.includes(query) || d.urdu.includes(query)
        );

        if (filtered.length === 0) {
          container.innerHTML = '<div style="text-align:center; padding: 40px; color: #a7f3d0;" class="font-urdu">کوئی دعا تلاش کے مطابق نہیں ملی۔</div>';
          return;
        }

        filtered.forEach(dua => {
          const card = document.createElement('div');
          card.className = 'islamic-card';
          card.innerHTML = \`
            <div class="card-top">
              <span class="badge font-urdu">\${dua.title}</span>
              <span style="font-size: 11px; color: #a7f3d0;">\${dua.ref}</span>
            </div>
            <div class="arabic-text font-quran">\${dua.arabic}</div>
            <div class="urdu-text font-urdu">\${dua.urdu}</div>
            <div class="card-actions">
              <button class="action-btn" onclick="navigator.clipboard.writeText('\${dua.title}\\n\\n' + '\${dua.arabic}\\n\\n' + '\${dua.urdu}\\n[' + '\${dua.ref}]'); alert('دعا کاپی ہو گئی!')">کاپی دعا</button>
              <button class="action-btn" onclick="let s = new SpeechSynthesisUtterance('\${dua.arabic}'); s.lang='ar-SA'; window.speechSynthesis.speak(s);">🔊 سنیں</button>
            </div>
          \`;
          container.appendChild(card);
        });
      }
    }
  </script>
</body>
</html>`;
}
