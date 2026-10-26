export interface Ayah {
  number: number;
  arabic: string;
  urdu: string;
  transliteration?: string;
}

export interface Surah {
  id: number;
  nameArabic: string;
  nameUrdu: string;
  nameEnglish: string;
  revelationPlace: 'مکی' | 'مدنی';
  totalAyahs: number;
  juzNumber: number;
  bismillahPre: boolean;
  bismillahUrdu?: string;
  ayahs: Ayah[];
}

export interface Dua {
  id: string;
  category: 'صبح و شام' | 'نماز و طہارت' | 'روزمرہ' | 'حفاظت و استغفار' | 'خیر و برکت';
  titleUrdu: string;
  titleArabic: string;
  arabic: string;
  urdu: string;
  transliteration?: string;
  reference: string;
  benefit: string;
  recommendedCount: number;
}

export interface CloudSurahSummary {
  id: number;
  nameArabic: string;
  nameUrdu: string;
  nameEnglish: string;
  totalAyahs: number;
  revelationPlace: string;
  isEmbeddedOffline: boolean;
}

export const LOCAL_SURAHS: Surah[] = [
  {
    id: 1,
    nameArabic: "سُورَةُ الْفَاتِحَةِ",
    nameUrdu: "سورۃ الفاتحہ",
    nameEnglish: "Al-Fatiha",
    revelationPlace: "مکی",
    totalAyahs: 7,
    juzNumber: 1,
    bismillahPre: false,
    ayahs: [
      {
        number: 1,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        urdu: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے",
        transliteration: "Bismillaahir-Rahmaanir-Raheem"
      },
      {
        number: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        urdu: "سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے",
        transliteration: "Alhamdu lillaahi Rabbil-'aalameen"
      },
      {
        number: 3,
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        urdu: "بہت مہربان نہایت رحم فرمانے والا ہے",
        transliteration: "Ar-Rahmaanir-Raheem"
      },
      {
        number: 4,
        arabic: "مَالِكِ يَوْمِ الدِّينِ",
        urdu: "روزِ جزا کا مالک ہے",
        transliteration: "Maaliki Yawmid-Deen"
      },
      {
        number: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        urdu: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں",
        transliteration: "Iyyaaka na'budu wa lyyaaka nasta'een"
      },
      {
        number: 6,
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        urdu: "ہمیں سیدھے راستے کی ہدایت فرما",
        transliteration: "Ihdinas-Siraatal-Mustaqeem"
      },
      {
        number: 7,
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        urdu: "ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ کہ ان کا جن پر غضب نازل ہوا اور نہ گمراہوں کا۔",
        transliteration: "Siraatal-lazeena an'amta 'alaihim ghayril-maghdoobi 'alaihim wa lad-daalleen"
      }
    ]
  },
  {
    id: 112,
    nameArabic: "سُورَةُ الإِخْلَاصِ",
    nameUrdu: "سورۃ الاخلاص",
    nameEnglish: "Al-Ikhlas",
    revelationPlace: "مکی",
    totalAyahs: 4,
    juzNumber: 30,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        urdu: "آپ فرمائیے: وہ اللہ ایک ہے",
        transliteration: "Qul Huwal-Laahu Ahad"
      },
      {
        number: 2,
        arabic: "اللَّهُ الصَّمَدُ",
        urdu: "اللہ بے نیاز ہے (سب اس کے محتاج ہیں)",
        transliteration: "Allaahus-Samad"
      },
      {
        number: 3,
        arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        urdu: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے",
        transliteration: "Lam yalid wa lam yoolad"
      },
      {
        number: 4,
        arabic: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
        urdu: "اور نہ ہی کوئی اس کے برابر کا ہے",
        transliteration: "Wa lam yakul-lahoo kufuwan ahad"
      }
    ]
  },
  {
    id: 113,
    nameArabic: "سُورَةُ الْفَلَقِ",
    nameUrdu: "سورۃ الفلق",
    nameEnglish: "Al-Falaq",
    revelationPlace: "مکی",
    totalAyahs: 5,
    juzNumber: 30,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        urdu: "آپ فرمائیے کہ میں صبح کے رب کی پناہ مانگتا ہوں",
        transliteration: "Qul a'oozu bi Rabbil-falaq"
      },
      {
        number: 2,
        arabic: "مِنْ شَرِّ مَا خَلَقَ",
        urdu: "ہر اُس چیز کے شر سے جو اس نے پیدا کی ہے",
        transliteration: "Min sharri maa khalaq"
      },
      {
        number: 3,
        arabic: "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        urdu: "اور اندھیری رات کے شر سے جب وہ چھا جائے",
        transliteration: "Wa min sharri ghaasiqin izaa waqab"
      },
      {
        number: 4,
        arabic: "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
        urdu: "اور گرہوں میں پھونکنے والیوں (جادوگرنیوں) کے شر سے",
        transliteration: "Wa min sharrin-naffaasaati fil 'uqad"
      },
      {
        number: 5,
        arabic: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        urdu: "اور حسد کرنے والے کے شر سے جب وہ حسد کرے",
        transliteration: "Wa min sharri haasidin izaa hasad"
      }
    ]
  },
  {
    id: 114,
    nameArabic: "سُورَةُ النَّاسِ",
    nameUrdu: "سورۃ الناس",
    nameEnglish: "An-Nas",
    revelationPlace: "مکی",
    totalAyahs: 6,
    juzNumber: 30,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        urdu: "آپ فرمائیے کہ میں انسانوں کے رب کی پناہ میں آتا ہوں",
        transliteration: "Qul a'oozu bi Rabbin-naas"
      },
      {
        number: 2,
        arabic: "مَلِكِ النَّاسِ",
        urdu: "جو تمام انسانوں کا بادشاہ ہے",
        transliteration: "Malikin-naas"
      },
      {
        number: 3,
        arabic: "إِلَٰهِ النَّاسِ",
        urdu: "جو تمام انسانوں کا معبودِ برحق ہے",
        transliteration: "Ilaahin-naas"
      },
      {
        number: 4,
        arabic: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
        urdu: "پیچھے ہٹ جانے والے وسوسہ انداز کے شر سے",
        transliteration: "Min sharril-waswaasil khannaas"
      },
      {
        number: 5,
        arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
        urdu: "جو لوگوں کے سینوں میں وسوسہ ڈالتا ہے",
        transliteration: "Allazee yuwaswisu fee sudoorin-naas"
      },
      {
        number: 6,
        arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ",
        urdu: "خواہ وہ جنات میں سے ہو یا انسانوں میں سے",
        transliteration: "Minal-jinnati wan-naas"
      }
    ]
  },
  {
    id: 103,
    nameArabic: "سُورَةُ الْعَصْرِ",
    nameUrdu: "سورۃ العصر",
    nameEnglish: "Al-Asr",
    revelationPlace: "مکی",
    totalAyahs: 3,
    juzNumber: 30,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        arabic: "وَالْعَصْرِ",
        urdu: "زمانے کی قسم!",
        transliteration: "Wal-'asr"
      },
      {
        number: 2,
        arabic: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
        urdu: "بیشک تمام انسان خسارے میں ہیں",
        transliteration: "Innal-insaana lafee khusr"
      },
      {
        number: 3,
        arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
        urdu: "سوائے ان لوگوں کے جو ایمان لائے اور نیک عمل کیے اور ایک دوسرے کو حق اور صبر کی تلقین کی",
        transliteration: "Illal-lazeena aamanoo wa 'amilus-saalihaati wa tawaasaw bil-haqqi wa tawaasaw bis-sabr"
      }
    ]
  },
  {
    id: 105,
    nameArabic: "سُورَةُ الْفِيلِ",
    nameUrdu: "سورۃ الفیل",
    nameEnglish: "Al-Fil",
    revelationPlace: "مکی",
    totalAyahs: 5,
    juzNumber: 30,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        arabic: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ",
        urdu: "کیا آپ نے نہیں دیکھا کہ آپ کے رب نے ہاتھی والوں کے ساتھ کیا کیا؟",
        transliteration: "Alam tara kayfa fa'ala Rabbuka bi-as-haabil-feel"
      },
      {
        number: 2,
        arabic: "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ",
        urdu: "کیا اس نے ان کی چال کو برباد نہیں کر دیا؟",
        transliteration: "Alam yaj'al kaydahum fee tadleel"
      },
      {
        number: 3,
        arabic: "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ",
        urdu: "اور ان پر جھنڈ کے جھنڈ پرندے بھیجے",
        transliteration: "Wa arsala 'alayhim tayran abaabeel"
      },
      {
        number: 4,
        arabic: "تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ",
        urdu: "جو ان پر پکی ہوئی مٹی کے پتھر پھینکتے تھے",
        transliteration: "Tarmeehim bi-hijaaratim-min sijjeel"
      },
      {
        number: 5,
        arabic: "فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ",
        urdu: "پس اس نے انہیں کھائے ہوئے بھوسے کی طرح بنا ڈالا",
        transliteration: "Fa-ja'alahum ka-'asfim-ma'kool"
      }
    ]
  },
  {
    id: 106,
    nameArabic: "سُورَةُ قُرَيْشٍ",
    nameUrdu: "سورۃ قریش",
    nameEnglish: "Quraish",
    revelationPlace: "مکی",
    totalAyahs: 4,
    juzNumber: 30,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        arabic: "لِإِيلَافِ قُرَيْشٍ",
        urdu: "قریش کو مانوس و الفت دلانے کی خاطر",
        transliteration: "Li-eelaafi Quraysh"
      },
      {
        number: 2,
        arabic: "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ",
        urdu: "یعنی سردی اور گرمی کے سفروں سے مانوس رکھنے کے لیے",
        transliteration: "Eelaafihim rihlatash-shitaaa'i was-sayf"
      },
      {
        number: 3,
        arabic: "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ",
        urdu: "پس انہیں چاہیے کہ وہ اس گھر (کعبہ) کے رب کی عبادت کریں",
        transliteration: "Fal-ya'budoo Rabba haazal-Bayt"
      },
      {
        number: 4,
        arabic: "الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ",
        urdu: "جس نے انہیں بھوک میں کھانا کھلایا اور خوف سے امن بخشا",
        transliteration: "Allazeee at'amahum min joo'inw-wa aamanahum min khawf"
      }
    ]
  },
  {
    id: 108,
    nameArabic: "سُورَةُ الْكَوْثَرِ",
    nameUrdu: "سورۃ الکوثر",
    nameEnglish: "Al-Kawthar",
    revelationPlace: "مکی",
    totalAyahs: 3,
    juzNumber: 30,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
        urdu: "بیشک ہم نے آپ کو کوثر (بے انتہا بھلائی) عطا فرمائی",
        transliteration: "Innaaa a'taynaakal-Kawthar"
      },
      {
        number: 2,
        arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
        urdu: "پس آپ اپنے رب کے لیے نماز پڑھیں اور قربانی کریں",
        transliteration: "Fasalli li-Rabbika wan-har"
      },
      {
        number: 3,
        arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
        urdu: "یقیناً آپ کا دشمن ہی بے نام و نشان رہے گا",
        transliteration: "Inna shaani'aka huwal-abtar"
      }
    ]
  },
  {
    id: 109,
    nameArabic: "سُورَةُ الْكَافِرُونَ",
    nameUrdu: "سورۃ الکافرون",
    nameEnglish: "Al-Kafirun",
    revelationPlace: "مکی",
    totalAyahs: 6,
    juzNumber: 30,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        arabic: "قُلْ يَا أَيُّهَا الْكَافِرُونَ",
        urdu: "آپ فرما دیجیے: اے کافرو!",
        transliteration: "Qul yaaa-aiyuhal-kaafiroon"
      },
      {
        number: 2,
        arabic: "لَا أَعْبُدُ مَا تَعْبُدُونَ",
        urdu: "میں ان کی عبادت نہیں کرتا جنہیں تم پوجتے ہو",
        transliteration: "Laaa a'budu maa ta'budoon"
      },
      {
        number: 3,
        arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ",
        urdu: "اور نہ تم اس کی عبادت کرنے والے ہو جس کی میں عبادت کرتا ہوں",
        transliteration: "Wa laaa antum 'aabidoona maaa a'bud"
      },
      {
        number: 4,
        arabic: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ",
        urdu: "اور نہ میں کبھی ان کی عبادت کرنے والا ہوں جن کی تم نے پرستش کی",
        transliteration: "Wa laaa ana 'aabidum-maa 'abattum"
      },
      {
        number: 5,
        arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ",
        urdu: "اور نہ تم اس کی بندگی کرنے والے ہو جس کی میں بندگی کرتا ہوں",
        transliteration: "Wa laaa antum 'aabidoona maaa a'bud"
      },
      {
        number: 6,
        arabic: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ",
        urdu: "تمہارے لیے تمہارا دین اور میرے لیے میرا دین ہے",
        transliteration: "Lakum deenukum wa liya deen"
      }
    ]
  },
  {
    id: 110,
    nameArabic: "سُورَةُ النَّصْرِ",
    nameUrdu: "سورۃ النصر",
    nameEnglish: "An-Nasr",
    revelationPlace: "مدنی",
    totalAyahs: 3,
    juzNumber: 30,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ",
        urdu: "جب اللہ کی مدد اور فتح آ جائے",
        transliteration: "Izaa jaaa'a nasrul-laahi wal-fath"
      },
      {
        number: 2,
        arabic: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا",
        urdu: "اور آپ لوگوں کو دیکھ لیں کہ وہ فوج در فوج اللہ کے دین میں داخل ہو رہے ہیں",
        transliteration: "Wa ra'aytan-naasa yadkhuloona fee deenil-laahi afwaajaa"
      },
      {
        number: 3,
        arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا",
        urdu: "تو اپنے رب کی حمد کے ساتھ تسبیح کریں اور اس سے بخشش مانگیں، بیشک وہ بڑا توبہ قبول فرمانے والا ہے",
        transliteration: "Fasabbih bihamdi Rabbika was-taghfirh; innahoo kaana Tawwaabaa"
      }
    ]
  },
  {
    id: 111,
    nameArabic: "سُورَةُ الْمَسَدِ",
    nameUrdu: "سورۃ المسد",
    nameEnglish: "Al-Masad",
    revelationPlace: "مکی",
    totalAyahs: 5,
    juzNumber: 30,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        arabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ",
        urdu: "ٹوٹ گئے ابو لہب کے دونوں ہاتھ اور وہ خود ہلاک ہو گیا",
        transliteration: "Tabbat yadaaa Abee Lahabinw-wa tabb"
      },
      {
        number: 2,
        arabic: "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ",
        urdu: "نہ اس کا مال اس کے کچھ کام آیا اور نہ وہ جو اس نے کمایا",
        transliteration: "Maaa aghnaa 'anhu maaluhoo wa maa kasab"
      },
      {
        number: 3,
        arabic: "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ",
        urdu: "وہ عنقریب بھڑکتی ہوئی آگ میں داخل ہو گا",
        transliteration: "Sayaslaa naaran zaata lahab"
      },
      {
        number: 4,
        arabic: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ",
        urdu: "اور اس کی بیوی بھی جو ایندھن (کانٹے) اٹھانے والی ہے",
        transliteration: "Wamra'atuhoo hammaalatal-hatab"
      },
      {
        number: 5,
        arabic: "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ",
        urdu: "اس کی گردن میں بٹی ہوئی رسی ہو گی",
        transliteration: "Fee jeedihaa hablum-mim-masad"
      }
    ]
  },
  {
    id: 97,
    nameArabic: "سُورَةُ الْقَدْرِ",
    nameUrdu: "سورۃ القدر",
    nameEnglish: "Al-Qadr",
    revelationPlace: "مکی",
    totalAyahs: 5,
    juzNumber: 30,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        arabic: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ",
        urdu: "بیشک ہم نے اس (قرآن) کو شبِ قدر میں نازل فرمایا",
        transliteration: "Innaaa anzalnaahu fee Laylatil-Qadr"
      },
      {
        number: 2,
        arabic: "وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ",
        urdu: "اور آپ کیا سمجھے کہ شبِ قدر کیا ہے؟",
        transliteration: "Wa maaa adraaka maa Laylatul-Qadr"
      },
      {
        number: 3,
        arabic: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ",
        urdu: "شبِ قدر ہزار مہینوں سے بہتر ہے",
        transliteration: "Laylatul-Qadri khayrum-min alfi shahr"
      },
      {
        number: 4,
        arabic: "تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ",
        urdu: "اس میں فرشتے اور روح القدس (جبریل علیہ السلام) اپنے رب کے حکم سے ہر کام کی تدبیر لے کر اترتے ہیں",
        transliteration: "Tanazzalul-malaaa'ikatu war-Roohu feehaa bi-izni Rabbihim min kulli amr"
      },
      {
        number: 5,
        arabic: "سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ",
        urdu: "یہ رات سراپا سلامتی ہے فجر کے طلوع ہونے تک",
        transliteration: "Salaamun hiya hattaa matla'il-fajr"
      }
    ]
  },
  {
    id: 255,
    nameArabic: "آيَةُ الْكُرْسِيِّ (الْبَقَرَة)",
    nameUrdu: "آیۃ الکرسی (سورۃ البقرہ)",
    nameEnglish: "Ayat-ul-Kursi",
    revelationPlace: "مدنی",
    totalAyahs: 1,
    juzNumber: 3,
    bismillahPre: true,
    ayahs: [
      {
        number: 255,
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        urdu: "اللہ وہ معبودِ برحق ہے کہ اس کے سوا کوئی عبادت کے لائق نہیں، وہ زندہ ہے سب کو سنبھالنے والا۔ نہ اسے اونگھ آتی ہے نہ نیند۔ جو کچھ آسمانوں میں ہے اور جو زمین میں ہے سب اسی کا ہے۔ کون ہے جو اس کی اجازت کے بغیر اس کے حضور سفارش کر سکے؟ وہ جانتا ہے جو کچھ بندوں کے سامنے ہے اور جو کچھ ان کے پیچھے ہے۔ اور وہ اس کے علم میں سے کسی چیز کا احاطہ نہیں کر سکتے مگر جتنا وہ چاہے۔ اس کی کرسی آسمانوں اور زمین کو گھیرے ہوئے ہے اور ان کی نگہبانی اس پر کچھ بھی گراں نہیں، وہ بلند اور عظمت والا ہے۔",
        transliteration: "Allahu laaa ilaaha illaa Huwal-Haiyul-Qaiyoom; laa ta'khuzuhoo sinatunw-wa laa nawm..."
      }
    ]
  }
];

export const MASNOON_DUAS: Dua[] = [
  {
    id: "dua-wake",
    category: "صبح و شام",
    titleUrdu: "سو کر اٹھنے کی دعا",
    titleArabic: "دُعَاءُ الاسْتِيقَاظِ مِنَ النَّوْمِ",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    urdu: "تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں مارنے کے بعد زندہ کیا اور اسی کی طرف اٹھ کر جانا ہے۔",
    transliteration: "Alhamdu lillaahil-lazee ahyaanaa ba'da maa amaatanaa wa ilayhin-nushoor",
    reference: "صحیح البخاری: 6312",
    benefit: "صبح بیدار ہوتے ہی پڑھنے سے انسان دن بھر شکر گزاری اور اللہ کی یاد میں رہتا ہے۔",
    recommendedCount: 1
  },
  {
    id: "dua-sleep",
    category: "صبح و شام",
    titleUrdu: "سوتے وقت کی دعا",
    titleArabic: "دُعَاءُ قَبْلَ النَّوْمِ",
    arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    urdu: "اے اللہ! میں تیرے نام کے ساتھ مرتا ہوں (سوتا ہوں) اور جیتا ہوں (جاگتا ہوں)۔",
    transliteration: "Allaahumma bismika amootu wa ahyaa",
    reference: "صحیح البخاری: 6324",
    benefit: "رات کو ہر قسم کے برے خوابوں اور شیطان کے وسوسوں سے حفاظت رہتی ہے۔",
    recommendedCount: 1
  },
  {
    id: "dua-travel",
    category: "روزمرہ",
    titleUrdu: "سواری اور سفر کی مسنون دعا",
    titleArabic: "دُعَاءُ الرُّكُوبِ وَالسَّفَرِ",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
    urdu: "پاک ہے وہ ذات جس نے اس (سواری) کو ہمارے تابع کر دیا حالانکہ ہم اسے قابو میں لانے والے نہ تھے، اور بیشک ہم اپنے رب ہی کی طرف لوٹ کر جانے والے ہیں۔",
    transliteration: "Subhaanal-lazee sakh-khara lanaa haazaa wa maa kunnaa lahoo muqrineen, wa innaaa ilaa Rabbinaa lamunqaliboon",
    reference: "جامع الترمذی: 3446",
    benefit: "سفر میں ہر قسم کے حادثات، تکلیفوں اور پریشانیوں سے اللہ کی پناہ حاصل ہوتی ہے۔",
    recommendedCount: 1
  },
  {
    id: "dua-food-before",
    category: "روزمرہ",
    titleUrdu: "کھانے سے پہلے کی دعا",
    titleArabic: "دُعَاءُ قَبْلَ الطَّعَامِ",
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    urdu: "اللہ کے نام کے ساتھ اور اللہ کی برکت پر (میں کھانا شروع کرتا ہوں)۔",
    transliteration: "Bismillaahi wa 'alaa barakatillaah",
    reference: "جامع الترمذی و المستدرک",
    benefit: "کھانے میں برکت پیدا ہوتی ہے اور شیطان کھانے میں شریک نہیں ہوتا۔",
    recommendedCount: 1
  },
  {
    id: "dua-food-after",
    category: "روزمرہ",
    titleUrdu: "کھانے کے بعد کی دعا",
    titleArabic: "دُعَاءُ الفَرَاغِ مِنَ الطَّعَامِ",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    urdu: "تمام تعریفیں اللہ تعالیٰ کے لیے ہیں جس نے ہمیں کھلایا، پلایا اور ہمیں مسلمان بنایا۔",
    transliteration: "Alhamdu lillaahil-lazee at'amanaa wa saqaanaa wa ja'alanaa muslimeen",
    reference: "ابوداؤد: 3850",
    benefit: "رزق پر شکر ادا ہوتا ہے اور اللہ تعالیٰ کی خوشنودی نصیب ہوتی ہے۔",
    recommendedCount: 1
  },
  {
    id: "dua-home-in",
    category: "روزمرہ",
    titleUrdu: "گھر میں داخل ہونے کی دعا",
    titleArabic: "دُعَاءُ دُخُولِ المَنْزِلِ",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    urdu: "اللہ کے نام سے ہم داخل ہوئے اور اللہ کے نام سے ہم نکلے، اور اپنے رب اللہ ہی پر ہم نے بھروسا کیا۔",
    transliteration: "Bismillaahi walajnaa, wa bismillaahi kharajnaa, wa 'alal-laahi Rabbinaa tawakkalnaa",
    reference: "سنن ابی داؤد: 5096",
    benefit: "گھر میں داخل ہوتے وقت پڑھنے سے شیطان داخل نہیں ہو سکتا اور گھر میں امن رہتا ہے۔",
    recommendedCount: 1
  },
  {
    id: "dua-home-out",
    category: "روزمرہ",
    titleUrdu: "گھر سے نکلتے وقت کی دعا",
    titleArabic: "دُعَاءُ الخُرُوجِ مِنَ المَنْزِلِ",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    urdu: "اللہ کے نام سے، میں نے اللہ پر بھروسا کیا، گناہوں سے بچنے اور نیکی کرنے کی طاقت اللہ ہی کی طرف سے ہے۔",
    transliteration: "Bismillaahi tawakkaltu 'alal-laahi, laa hawla wa laa quwwata illaa billaah",
    reference: "جامع الترمذی: 3426",
    benefit: "حدیث میں ہے: فرشتے کہتے ہیں کہ تجھے کفایت کی گئی، بچا لیا گیا اور سیدھی راہ دکھا دی گئی، اور شیطان دور ہٹ جاتا ہے۔",
    recommendedCount: 1
  },
  {
    id: "dua-toilet-in",
    category: "نماز و طہارت",
    titleUrdu: "بیت الخلا میں داخل ہونے کی دعا",
    titleArabic: "دُعَاءُ دُخُولِ الخَلَاءِ",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    urdu: "اے اللہ! میں تیری پناہ مانگتا ہوں ناپاک جنات (مذکر و مونث) کے شر سے۔",
    transliteration: "Allaahumma innee a'oozu bika minal-khubuthi wal-khabaa'ith",
    reference: "صحیح البخاری: 142",
    benefit: "ناپاک جنات اور شیطان کے ناپاک اثرات سے پردہ اور حفاظت ہو جاتی ہے۔",
    recommendedCount: 1
  },
  {
    id: "dua-toilet-out",
    category: "نماز و طہارت",
    titleUrdu: "بیت الخلا سے نکلنے کی دعا",
    titleArabic: "دُعَاءُ الخُرُوجِ مِنَ الخَلَاءِ",
    arabic: "غُفْرَانَكَ، الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَىٰ وَعَافَانِي",
    urdu: "اے اللہ! میں تیری بخشش چاہتا ہوں۔ تمام تعریفیں اللہ کے لیے ہیں جس نے مجھ سے تکلیف دہ چیز دور کی اور مجھے عافیت بخشی۔",
    transliteration: "Ghufraanaka, alhamdu lillaahil-lazee azhaba 'annil-azaa wa 'aafaanee",
    reference: "جامع الترمذی: 7",
    benefit: "جسمانی صحت اور باطنی گناہوں سے معافی کی عظیم سنت دعا۔",
    recommendedCount: 1
  },
  {
    id: "dua-mosque-in",
    category: "نماز و طہارت",
    titleUrdu: "مسجد میں داخل ہونے کی دعا",
    titleArabic: "دُعَاءُ دُخُولِ المَسْجِدِ",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    urdu: "اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔",
    transliteration: "Allaahummaf-tah lee abwaaba rahmatik",
    reference: "صحیح مسلم: 713",
    benefit: "مسجد میں داخل ہوتے وقت دائیں پاؤں آگے رکھ کر پڑھیں؛ اللہ کی خصوصی رحمت حاصل ہوتی ہے۔",
    recommendedCount: 1
  },
  {
    id: "dua-mosque-out",
    category: "نماز و طہارت",
    titleUrdu: "مسجد سے نکلنے کی دعا",
    titleArabic: "دُعَاءُ الخُرُوجِ مِنَ المَسْجِدِ",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    urdu: "اے اللہ! میں تجھ سے تیرے فضل کا طلبگار ہوں۔",
    transliteration: "Allaahumma innee as'aluka min fadlik",
    reference: "صحیح مسلم: 713",
    benefit: "مسجد سے نکلتے وقت بایاں پاؤں باہر نکال کر پڑھیں؛ دنیاوی معاملات میں اللہ کے فضل کی ضمانت ہے۔",
    recommendedCount: 1
  },
  {
    id: "dua-after-adhan",
    category: "نماز و طہارت",
    titleUrdu: "اذان کے بعد کی مسنون دعا",
    titleArabic: "دُعَاءُ مَا بَعْدَ الأَذَانِ",
    arabic: "اللَّهُمَّ رَبَّ هَٰذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَّحْمُودًا الَّذِي وَعَدتَّهُ",
    urdu: "اے اللہ! اس کامل پکار اور قائم ہونے والی نماز کے رب! ہمارے نبی حضرت محمد ﷺ کو مقامِ وسیلہ اور فضیلت عطا فرما، اور انہیں اس مقامِ محمود پر فائز فرما جس کا تو نے ان سے وعدہ فرمایا ہے۔",
    transliteration: "Allaahumma Rabba haazihid-da'watit-taammah, was-salaatil-qaa'imah, aati Muhammadanil-waseelata wal-fadeelah, wab'ath-hu maqaamam-mahmoodanil-lazee wa'adtah",
    reference: "صحیح البخاری: 614",
    benefit: "رسول اللہ ﷺ نے فرمایا: جس نے اذان سن کر یہ دعا پڑھی، قیامت کے دن اس کے لیے میری شفاعت واجب ہو جائے گی۔",
    recommendedCount: 1
  },
  {
    id: "dua-qunoot",
    category: "نماز و طہارت",
    titleUrdu: "دعائے قنوت (نمازِ وتر)",
    titleArabic: "دُعَاءُ الْقُنُوتِ فِي الْوِتْرِ",
    arabic: "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ، وَنَشْكُرُكَ وَلَا نَكْفُرُكَ، وَنَخْلَعُ وَنَتْرُكُ مَن يَفْجُرُكَ. اللَّهُمَّ إِيَّاكَ نَعْبُدُ وَلَكَ نُصَلِّي وَنَسْجُدُ، وَإِلَيْكَ نَسْعَىٰ وَنَحْفِدُ، وَنَرْجُو رَحْمَتَكَ وَنَخْشَىٰ عَذَابَكَ، إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحِقٌ",
    urdu: "اے اللہ! ہم تجھ ہی سے مدد چاہتے ہیں اور تجھ ہی سے بخشش مانگتے ہیں، تجھ پر ایمان رکھتے ہیں اور تجھ پر بھروسا کرتے ہیں اور تیری بہترین تعریف کرتے ہیں، اور تیرا شکر ادا کرتے ہیں اور تیری ناشکری نہیں کرتے، اور ہم الگ کرتے ہیں اور چھوڑتے ہیں اس شخص کو جو تیری نافرمانی کرے۔ اے اللہ! ہم تیری ہی عبادت کرتے ہیں اور تیرے ہی لیے نماز پڑھتے ہیں اور سجدہ کرتے ہیں، اور تیری ہی طرف دوڑتے اور حاضر ہوتے ہیں، اور تیری رحمت کے امیدوار ہیں اور تیرے عذاب سے ڈرتے ہیں، بیشک تیرا عذاب کافروں کو ملنے والا ہے۔",
    transliteration: "Allaahumma innaa nasta'eenuka wa nastaghfiruka wa nu'minu bika wa natawakkalu 'alayka...",
    reference: "مصنف ابن ابی شیبہ و سنن بیہقی",
    benefit: "نمازِ وتر کی تیسری رکعت میں تکبیر کہہ کر پڑھی جانے والی عظیم دعا۔",
    recommendedCount: 1
  },
  {
    id: "dua-parents",
    category: "خیر و برکت",
    titleUrdu: "والدین کے لیے قرآنی دعا",
    titleArabic: "دُعَاءٌ لِلْوَالِدَيْنِ",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    urdu: "اے میرے رب! ان دونوں پر رحم فرما جیسا کہ انہوں نے مجھے بچپن میں پالا اور پرورش کی۔",
    transliteration: "Rabbir-hamhumaa kamaa rabbayaanee sagheeraa",
    reference: "سورۃ الإسراء: 24",
    benefit: "والدین کے حق میں اولاد کی سب سے افضل قرآنی دعا۔",
    recommendedCount: 3
  },
  {
    id: "dua-rabbana",
    category: "خیر و برکت",
    titleUrdu: "دنیا و آخرت کی بھلائی کی جامع دعا",
    titleArabic: "دُعَاءُ خَيْرِ الدُّنْيَا وَالْآخِرَةِ",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    urdu: "اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما، اور ہمیں آگ کے عذاب سے محفوظ رکھ۔",
    transliteration: "Rabbanaaa aatinaa fid-dunyaa hasanatanw-wa fil-aakhirati hasanatanw-wa qinaa 'azaaban-naar",
    reference: "سورۃ البقرة: 201",
    benefit: "رسول اللہ ﷺ کی سب سے زیادہ مانگی جانے والی دعا جو ہر نماز کے بعد مستحب ہے۔",
    recommendedCount: 3
  },
  {
    id: "dua-market",
    category: "خیر و برکت",
    titleUrdu: "بازار میں داخل ہونے کی دعا (۱۰ لاکھ نیکیاں)",
    titleArabic: "دُعَاءُ دُخُولِ السُّوقِ",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    urdu: "اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے حمد ہے، وہی زندہ کرتا ہے اور وہی مارتا ہے، اور وہ ہمیشہ زندہ رہنے والا ہے جسے کبھی موت نہیں، اسی کے ہاتھ میں تمام بھلائی ہے اور وہ ہر چیز پر قادر ہے۔",
    transliteration: "Laaa ilaaha illal-laahu wahdahoo laa shareeka lahoo...",
    reference: "جامع الترمذی: 3428",
    benefit: "حدیث میں آتا ہے کہ جو بازار میں داخل ہوتے وقت یہ دعا پڑھے، اللہ اس کے نامہ اعمال میں 10 لاکھ نیکیاں لکھ دیتا ہے اور 10 لاکھ گناہ معاف فرما دیتا ہے۔",
    recommendedCount: 1
  },
  {
    id: "dua-grief-anxiety",
    category: "حفاظت و استغفار",
    titleUrdu: "غم و پریشانی دور کرنے کی دعا",
    titleArabic: "دُعَاءُ الْهَمِّ وَالْحُزْنِ",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
    urdu: "اے اللہ! میں تیری پناہ مانگتا ہوں فکر اور غم سے، عاجزی اور سستی سے، بزدلی اور کنجوسی سے، قرض کے بوجھ اور لوگوں کے دباؤ سے۔",
    transliteration: "Allaahumma innee a'oozu bika minal-hammi wal-hazani...",
    reference: "صحیح البخاری: 2893",
    benefit: "ہر قسم کی ذہنی الجھن، ڈپریشن اور مالی تنگی میں بے پناہ تسکین بخشتی ہے۔",
    recommendedCount: 1
  },
  {
    id: "dua-sick",
    category: "حفاظت و استغفار",
    titleUrdu: "بیمار پرسی اور شفا کی مسنون دعا",
    titleArabic: "دُعَاءُ عِيَادَةِ الْمَرِيضِ",
    arabic: "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَن يَشْفِيَكَ",
    urdu: "میں عظمت والے اللہ سے جو عرشِ عظیم کا رب ہے، سوال کرتا ہوں کہ وہ آپ کو شفا عطا فرمائے۔",
    transliteration: "As'alul-laahal-'Azeema Rabbal-'Arshil-'Azeemi ai-yashfiyak",
    reference: "جامع الترمذی: 2083",
    benefit: "رسول اللہ ﷺ نے فرمایا: جو کسی بیمار کی عیادت کرے اور 7 مرتبہ یہ دعا پڑھے، اللہ اسے شفا عطا فرما دیتا ہے۔",
    recommendedCount: 7
  },
  {
    id: "dua-rain",
    category: "خیر و برکت",
    titleUrdu: "بارش کے وقت کی دعا",
    titleArabic: "دُعَاءُ نُزُولِ الْمَطَرِ",
    arabic: "اللَّهُمَّ صَيِّبًا نَّافِعًا",
    urdu: "اے اللہ! اس بارش کو خوب برسنے والی اور نفع بخش بنا۔",
    transliteration: "Allaahumma sayyiban naafi'aa",
    reference: "صحیح البخاری: 1032",
    benefit: "بارش رحمت کی صورت میں برستی ہے اور نقصان سے بچاتی ہے۔",
    recommendedCount: 1
  },
  {
    id: "dua-istighfar",
    category: "حفاظت و استغفار",
    titleUrdu: "سید الاستغفار (بخشش کی عظیم دعا)",
    titleArabic: "سَيِّدُ الاسْتِغْفَارِ",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    urdu: "اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں، اور میں اپنی استطاعت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے اعمال کے شر سے تیری پناہ چاہتا ہوں۔ میں اپنے اوپر تیری نعمتوں کا اقرار کرتا ہوں اور اپنے گناہوں کا اعتراف کرتا ہوں۔ پس مجھے بخش دے، کیونکہ تیرے سوا کوئی گناہوں کو معاف نہیں کر سکتا۔",
    transliteration: "Allaahumma Anta Rabbee laa ilaaha illaa Anta, khalaqtanee wa anaa 'abduka...",
    reference: "صحیح البخاری: 6306",
    benefit: "رسول اللہ ﷺ نے فرمایا: جس نے یقین کے ساتھ شام کو یہ دعا پڑھی اور اسی رات فوت ہوگیا وہ اہل جنت میں سے ہے۔",
    recommendedCount: 1
  }
];

export const ALL_114_SURAHS: CloudSurahSummary[] = [
  { id: 1, nameArabic: "الفاتحة", nameUrdu: "سورۃ الفاتحہ", nameEnglish: "Al-Fatihah", totalAyahs: 7, revelationPlace: "مکی", isEmbeddedOffline: true },
  { id: 2, nameArabic: "البقرة", nameUrdu: "سورۃ البقرہ", nameEnglish: "Al-Baqarah", totalAyahs: 286, revelationPlace: "مدنی", isEmbeddedOffline: true },
  { id: 3, nameArabic: "آل عمران", nameUrdu: "سورۃ آل عمران", nameEnglish: "Ali 'Imran", totalAyahs: 200, revelationPlace: "مدنی", isEmbeddedOffline: false },
  { id: 4, nameArabic: "النساء", nameUrdu: "سورۃ النساء", nameEnglish: "An-Nisa", totalAyahs: 176, revelationPlace: "مدنی", isEmbeddedOffline: false },
  { id: 5, nameArabic: "المائدة", nameUrdu: "سورۃ المائدہ", nameEnglish: "Al-Ma'idah", totalAyahs: 120, revelationPlace: "مدنی", isEmbeddedOffline: false },
  { id: 6, nameArabic: "الأنعام", nameUrdu: "سورۃ الانعام", nameEnglish: "Al-An'am", totalAyahs: 165, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 7, nameArabic: "الأعراف", nameUrdu: "سورۃ الاعراف", nameEnglish: "Al-A'raf", totalAyahs: 206, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 8, nameArabic: "الأنفال", nameUrdu: "سورۃ الانفال", nameEnglish: "Al-Anfal", totalAyahs: 75, revelationPlace: "مدنی", isEmbeddedOffline: false },
  { id: 9, nameArabic: "التوبة", nameUrdu: "سورۃ التوبہ", nameEnglish: "At-Tawbah", totalAyahs: 129, revelationPlace: "مدنی", isEmbeddedOffline: false },
  { id: 10, nameArabic: "يونس", nameUrdu: "سورۃ یونس", nameEnglish: "Yunus", totalAyahs: 109, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 11, nameArabic: "هود", nameUrdu: "سورۃ ہود", nameEnglish: "Hud", totalAyahs: 123, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 12, nameArabic: "يوسف", nameUrdu: "سورۃ یوسف", nameEnglish: "Yusuf", totalAyahs: 111, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 13, nameArabic: "الرعد", nameUrdu: "سورۃ الرعد", nameEnglish: "Ar-Ra'd", totalAyahs: 43, revelationPlace: "مدنی", isEmbeddedOffline: false },
  { id: 14, nameArabic: "إبراهيم", nameUrdu: "سورۃ ابراہیم", nameEnglish: "Ibrahim", totalAyahs: 52, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 15, nameArabic: "الحجر", nameUrdu: "سورۃ الحجر", nameEnglish: "Al-Hijr", totalAyahs: 99, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 16, nameArabic: "النحل", nameUrdu: "سورۃ النحل", nameEnglish: "An-Nahl", totalAyahs: 128, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 17, nameArabic: "الإسراء", nameUrdu: "سورۃ الاسراء", nameEnglish: "Al-Isra", totalAyahs: 111, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 18, nameArabic: "الكهف", nameUrdu: "سورۃ الکہف", nameEnglish: "Al-Kahf", totalAyahs: 110, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 19, nameArabic: "مريم", nameUrdu: "سورۃ مریم", nameEnglish: "Maryam", totalAyahs: 98, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 20, nameArabic: "طه", nameUrdu: "سورۃ طٰہٰ", nameEnglish: "Ta-Ha", totalAyahs: 135, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 21, nameArabic: "الأنبياء", nameUrdu: "سورۃ الانبیاء", nameEnglish: "Al-Anbiya", totalAyahs: 112, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 22, nameArabic: "الحج", nameUrdu: "سورۃ الحج", nameEnglish: "Al-Hajj", totalAyahs: 78, revelationPlace: "مدنی", isEmbeddedOffline: false },
  { id: 23, nameArabic: "المؤمنون", nameUrdu: "سورۃ المؤمنون", nameEnglish: "Al-Mu'minun", totalAyahs: 118, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 24, nameArabic: "النور", nameUrdu: "سورۃ النور", nameEnglish: "An-Nur", totalAyahs: 64, revelationPlace: "مدنی", isEmbeddedOffline: false },
  { id: 25, nameArabic: "الفرقان", nameUrdu: "سورۃ الفرقان", nameEnglish: "Al-Furqan", totalAyahs: 77, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 26, nameArabic: "الشعراء", nameUrdu: "سورۃ الشعراء", nameEnglish: "Ash-Shu'ara", totalAyahs: 227, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 27, nameArabic: "النمل", nameUrdu: "سورۃ النمل", nameEnglish: "An-Naml", totalAyahs: 93, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 28, nameArabic: "القصص", nameUrdu: "سورۃ القصص", nameEnglish: "Al-Qasas", totalAyahs: 88, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 29, nameArabic: "العنكبوت", nameUrdu: "سورۃ العنکبوت", nameEnglish: "Al-'Ankabut", totalAyahs: 69, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 30, nameArabic: "الروم", nameUrdu: "سورۃ الروم", nameEnglish: "Ar-Rum", totalAyahs: 60, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 31, nameArabic: "لقمان", nameUrdu: "سورۃ لقمان", nameEnglish: "Luqman", totalAyahs: 34, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 32, nameArabic: "السجدة", nameUrdu: "سورۃ السجدہ", nameEnglish: "As-Sajdah", totalAyahs: 30, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 33, nameArabic: "الأحزاب", nameUrdu: "سورۃ الاحزاب", nameEnglish: "Al-Ahzab", totalAyahs: 73, revelationPlace: "مدنی", isEmbeddedOffline: false },
  { id: 34, nameArabic: "سبأ", nameUrdu: "سورۃ سبا", nameEnglish: "Saba", totalAyahs: 54, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 35, nameArabic: "فاطر", nameUrdu: "سورۃ فاطر", nameEnglish: "Fatir", totalAyahs: 45, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 36, nameArabic: "يس", nameUrdu: "سورۃ یٰسٓ", nameEnglish: "Ya-Sin", totalAyahs: 83, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 55, nameArabic: "الرحمن", nameUrdu: "سورۃ الرحمن", nameEnglish: "Ar-Rahman", totalAyahs: 78, revelationPlace: "مدنی", isEmbeddedOffline: false },
  { id: 56, nameArabic: "الواقعة", nameUrdu: "سورۃ الواقعہ", nameEnglish: "Al-Waqi'ah", totalAyahs: 96, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 67, nameArabic: "الملك", nameUrdu: "سورۃ الملک", nameEnglish: "Al-Mulk", totalAyahs: 30, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 108, nameArabic: "الكوثر", nameUrdu: "سورۃ الکوثر", nameEnglish: "Al-Kawthar", totalAyahs: 3, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 109, nameArabic: "الكافرون", nameUrdu: "سورۃ الکافرون", nameEnglish: "Al-Kafirun", totalAyahs: 6, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 110, nameArabic: "النصر", nameUrdu: "سورۃ النصر", nameEnglish: "An-Nasr", totalAyahs: 3, revelationPlace: "مدنی", isEmbeddedOffline: false },
  { id: 111, nameArabic: "المسد", nameUrdu: "سورۃ المسد", nameEnglish: "Al-Masad", totalAyahs: 5, revelationPlace: "مکی", isEmbeddedOffline: false },
  { id: 112, nameArabic: "الإخلاص", nameUrdu: "سورۃ الاخلاص", nameEnglish: "Al-Ikhlas", totalAyahs: 4, revelationPlace: "مکی", isEmbeddedOffline: true },
  { id: 113, nameArabic: "الفلق", nameUrdu: "سورۃ الفلق", nameEnglish: "Al-Falaq", totalAyahs: 5, revelationPlace: "مکی", isEmbeddedOffline: true },
  { id: 114, nameArabic: "الناس", nameUrdu: "سورۃ الناس", nameEnglish: "An-Nas", totalAyahs: 6, revelationPlace: "مکی", isEmbeddedOffline: true }
];
