# Al-Quran & Duas Pro: Beginner Roadmap & Complete App Guide

A complete, beginner-friendly roadmap designed for a first-time creator to run, test, and use **Al-Quran & Duas Pro** without requiring any prior coding or technical knowledge.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Aap ko pareshan hone ki bilkul zaroorat nahi hai!** Aap ki app ka 100% mukammal code, design, audio recitation, Arabic calligraphy, Urdu translations, aur AdMob banner pehle hi mukammal taur par develop ho kar live chal raha hai.
>
> Aap ko coding seekhne ya commands likhne ki zaroorat nahi hai. Hum aap ko step-by-step aasan tareeqe se samjha rahe hain ke is app ko apne mobile par kaise chalana hai aur use kaise karna hai.

- **Confirmed Decision 1: Ready-to-Use App**: App ka interface, splash screen, Surahs (Al-Fatiha, Al-Ikhlas, Al-Falaq, An-Nas, Ayat-ul-Kursi), Duas, Tasbeeh counter, aur AdMob banner ready hain.
- **Confirmed Decision 2: 1-Click Mobile Testing**: Aap ko computer ya mobile par sirf ek link khol kar app use karni hai, kisi installation ki zaroorat nahi.
- **Confirmed Decision 3: Simple APK / Standalone Option**: App ke drawer mein "سنگل فائل HTML حاصل کریں (Export)" ka button mojood hai jahan se 1-click mein standalone `index.html` download ya copy ho sakti hai.

---

## 1. Overview & Core Concept

- **What It Does**: Ek premium, khoobsurat Islamic Android WebApp jo internet ke baghair (100% offline) chalti hai. Is mein Quran Majeed ki Surahs, Masnoon Duas, Urdu tarjuma, audio tilawat, digital tasbeeh counter, aur AdMob advertisement banner shamil hain.
- **Target Audience**: Har wo musalman jo roz marrah ki Duas aur Quran Majeed ki Surahs aasan Urdu tarjumay ke sath mobile par baghair internet ke parhna chahta hai.
- **Key Value**: Zero technical knowledge required. Aap ko sirf screen dekhni hai aur buttons press karne hain; baqi saara technical kaam already complete ho chuka hai.

---

## 2. User Experience & Visual Design

### Key User Flows (Aap Is App Ko Kaise Use Kar Sakte Hain)

1. **App Kholna (Starting Screen)**:
   - Jaise hi app open hoti hai, sunahray (gold) rang mein **"بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ"** aur loading progress bar aati hai jo 2.5 seconds mein smoothly load ho kar main screen par le aati hai.

2. **Quran Majeed Parhna**:
   - Main screen par pehla tab **"القرآن مجید"** select hota hai.
   - Har Surah ka sabz aur gold border wala card samne hota hai.
   - **"مکمل تلاوت پڑھیں"** par click karne se poori Surah ba-tashkeel Arabic aur Urdu tarjumay ke sath khul jati hai.
   - Har aayat ke sath **🔊 (Sunne ka button)** aur **📋 (Copy ka button)** mojood hai.

3. **Masnoon Duas Parhna**:
   - Ooper **"مسنون دعائیں"** tab par click karein.
   - Subah o Shaam, Khane peene, Masjid aane jaane, aur Waldain ke liye masnoon Duas samne aayengi.
   - Har dua par **"پڑھیں +1"** ka interactive button hai jo aap ko tasbeeh ki tarah parhne ka shumar (count) batata hai.

4. **Font Chota ya Bara Karna**:
   - Top-right par **☰ (Menu)** button dabayein.
   - **Font Resize** mein "چھوٹا", "معمول", "بڑا", ya "بہت بڑا" dabayein taake parhne mein aasani ho.

5. **AdMob Banner**:
   - Screen ke neechay fixed gold border wala Google AdMob banner reserved hai jo play store ya mobile par ads dikha kar earning ke liye tayyar hai.

### Visual Identity & Theme
- **Theme Palette**: Deep Islamic Green (`#0A5C36`), Royal Gold (`#D4AF37`), Dark Emerald Canvas (`#052918`), aur White text.
- **Fonts**: Amiri Quran calligraphy for Arabic, Noto Nastaliq for Urdu, aur clean Plus Jakarta Sans for UI.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Zero Setup Required (No Database / No Server)**
  - *Chosen Approach*: Tamam Surahs aur Duas app ke andar hi offline store hain.
  - *Why*: Aap ko kisi server, database ya payment ki zaroorat nahi. Internet band hone par bhi app 100% kaam karti hai.
- **Decision 2: Direct Single-File HTML Export**
  - *Chosen Approach*: Drawer ke andar 1-click Download / Copy button mojood hai.
  - *Why*: Agar aap kisi ko app bhejna chahein ya Android Studio mein APK banana chahein, to sirf ek file `index.html` save kar lein.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                    AL-QURAN & DUAS PRO                          │
├─────────────────────────────────────────────────────────────────┤
│  [ Splash: Bismillah + 2.5s Golden Loading Bar ]               │
├─────────────────────────────────────────────────────────────────┤
│  [ Top Header: ☰ Drawer Menu  |  Logo  |  🔍 Live Search Bar ] │
├─────────────────────────────────────────────────────────────────┤
│  [ Tabs: 📖 القرآن مجید (5)      |      🤲 مسنون دعائیں (9) ]     │
├─────────────────────────────────────────────────────────────────┤
│  [ Cards Workspace (Responsive, Green #0A5C36 + Gold #D4AF37) ] │
│   - Surah Cards: Al-Fatiha, Al-Ikhlas, Al-Falaq, An-Nas, Kursi  │
│   - Duas Cards: Daily Duas + Hadith Ref + +1 Tasbeeh Counter    │
│   - Audio Recitation (Speech Synthesis Web API)                 │
│   - Bookmarks System (LocalStorage Persistence)                 │
├─────────────────────────────────────────────────────────────────┤
│  [ Side Drawer: Font Resize (A-/A+) | 114 Surahs Directory ]    │
│  [ Tasbeeh Modal 📿 | Export Standalone Single-file index.html]  │
├─────────────────────────────────────────────────────────────────┤
│  [ Fixed Bottom AdMob Monetization Banner (320x50 Responsive) ] │
└─────────────────────────────────────────────────────────────────┘
```

---

## Aap Ke Agle Steps (Next Steps)

1. **Plan ko Approve karein**: Neechay diye gaye **"Proceed"** button par click karein.
2. **App ko apne samne live dekhein**: Right side ya preview window mein aap ki app chal rahi hai.
3. **Drawer open karein**: ☰ button daba kar font bara ya chota kar ke test karein aur Duas check karein.
4. Agar aap chahein ke hum is mein mazeed Surahs dalein ya koi aur cheez badlein, to bas bata dein; saara kaam hum khud kar denge!
