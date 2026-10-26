export interface Kalima {
  number: number;
  nameArabic: string;
  nameUrdu: string;
  nameEnglish: string;
  arabic: string;
  urdu: string;
  transliteration: string;
  meaningSummary: string;
}

export const SIX_KALIMAS: Kalima[] = [
  {
    number: 1,
    nameArabic: "الكَلِمَةُ الطَّيِّبَةُ",
    nameUrdu: "پہلا کلمہ طیب",
    nameEnglish: "First Kalima Tayyibah",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ",
    urdu: "اللہ کے سوا کوئی معبود نہیں، محمد صلی اللہ علیہ وسلم اللہ کے رسول ہیں۔",
    transliteration: "Laa ilaaha illal-laahu Muhammadur-Rasoolul-laah",
    meaningSummary: "توحید اور رسالت کا اقرار، اسلام کی بنیادی بنیاد ہے۔"
  },
  {
    number: 2,
    nameArabic: "كَلِمَةُ الشَّهَادَةِ",
    nameUrdu: "دوسرا کلمہ شہادت",
    nameEnglish: "Second Kalima Shahadah",
    arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    urdu: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اور میں گواہی دیتا ہوں کہ محمد (صلی اللہ علیہ وسلم) اس کے بندے اور رسول ہیں۔",
    transliteration: "Ash-hadu allaaa ilaaha illal-laahu wahdahoo laa shareeka lahoo wa ash-hadu anna Muhammadan 'abduhoo wa Rasooluh",
    meaningSummary: "ایمان اور بندگی کی کھلی گواہی۔"
  },
  {
    number: 3,
    nameArabic: "كَلِمَةُ التَّمْجِيدِ",
    nameUrdu: "تیسرا کلمہ تمجید",
    nameEnglish: "Third Kalima Tamjeed",
    arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
    urdu: "اللہ پاک ہے، اور تمام تعریفیں اللہ کے لیے ہیں، اور اللہ کے سوا کوئی معبود نہیں، اور اللہ سب سے بڑا ہے، اور گناہوں سے بچنے کی طاقت اور نیکی کرنے کی قوت اللہ ہی کی طرف سے ہے جو عالی شان اور عظمت والا ہے۔",
    transliteration: "Subhaanallaahi wal-hamdu lillaahi wa laaa ilaaha illal-laahu wallaahu Akbar; wa laa hawla wa laa quwwata illaa billaahil-'Aliyyil-'Azeem",
    meaningSummary: "اللہ کی تسبیح، حمد، کبریائی اور طاقت کی عظمت کا بیان۔"
  },
  {
    number: 4,
    nameArabic: "كَلِمَةُ التَّوْحِيدِ",
    nameUrdu: "چوتھا کلمہ توحید",
    nameEnglish: "Fourth Kalima Tauheed",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ أَبَدًا أَبَدًا، ذُو الْجَلَالِ وَالْإِكْرَامِ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    urdu: "اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے حمد ہے، وہی زندہ کرتا ہے اور وہی مارتا ہے، اور وہ ہمیشہ زندہ رہنے والا ہے جسے کبھی موت نہیں، بڑی عظمت اور بزرگی والا ہے، اسی کے ہاتھ میں تمام بھلائی ہے اور وہ ہر چیز پر قادر ہے۔",
    transliteration: "Laaa ilaaha illal-laahu wahdahoo laa shareeka lahoo, lahul-mulku wa lahul-hamdu, yuhyee wa yumeetu, wa Huwa Haiyul-laa yamootu abadan abadaa, Zul-Jalaali wal-Ikraam, biyadihil-khayr, wa Huwa 'alaa kulli shay'in Qadeer",
    meaningSummary: "اللہ کی کامل حاکمیت اور لازوال حیات کا اقرار۔"
  },
  {
    number: 5,
    nameArabic: "كَلِمَةُ الاسْتِغْفَارِ",
    nameUrdu: "پانچواں کلمہ استغفار",
    nameEnglish: "Fifth Kalima Astaghfar",
    arabic: "أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ أَذْنَبْتُهُ عَمْدًا أَوْ خَطَأً، سِرًّا أَوْ عَلَانِيَةً، وَأَتُوبُ إِلَيْهِ مِنَ الذَّنْبِ الَّذِي أَعْلَمُ وَمِنَ الذَّنْبِ الَّذِي لَا أَعْلَمُ، إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ وَسَتَّارُ الْعُيُوبِ وَغَفَّارُ الذُّنُوبِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
    urdu: "میں اپنے رب اللہ سے معافی مانگتا ہوں ہر اس گناہ سے جو میں نے جان بوجھ کر کیا یا بھول کر، چھپ کر کیا یا کھلم کھلا، اور میں اس کے حضور توبہ کرتا ہوں اس گناہ سے جسے میں جانتا ہوں اور اس گناہ سے جسے میں نہیں جانتا، بیشک تو غیبوں کو جاننے والا، عیبوں کو چھپانے والا اور گناہوں کو بخشنے والا ہے، اور گناہ سے بچنے اور نیکی کرنے کی طاقت اللہ ہی کی طرف سے ہے جو بلند اور عظمت والا ہے۔",
    transliteration: "Astaghfirullaaha Rabbee min kulli zambin aznabtuhoo 'amadan aw khata'an, sirran aw 'alaaniyah...",
    meaningSummary: "تمام ظاہری اور باطنی گناہوں سے سچی توبہ اور بخشش کی دعا۔"
  },
  {
    number: 6,
    nameArabic: "كَلِمَةُ رَدِّ الْكُفْرِ",
    nameUrdu: "چھٹا کلمہ رد کفر",
    nameEnglish: "Sixth Kalima Radde Kufr",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ أَنْ أُشْرِكَ بِكَ شَيْئًا وَأَنَا أَعْلَمُ بِهِ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ بِهِ، تُبْتُ عَنْهُ وَتَبَرَّأْتُ مِنَ الْكُفْرِ وَالشِّرْكِ وَالْكِذْبِ وَالْغِيبَةِ وَالْبِدْعَةِ وَالنَّمِيمَةِ وَالْفَوَاحِشِ وَالْبُهْتَانِ وَالْمَعَاصِي كُلِّهَا، وَأَسْلَمْتُ وَأَقُولُ: لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ",
    urdu: "اے اللہ! میں تیری پناہ مانگتا ہوں اس بات سے کہ میں کسی چیز کو تیرا شریک ٹھہراؤں جان بوجھ کر، اور میں تجھ سے معافی مانگتا ہوں اس کی جسے میں نہیں جانتا، میں نے اس سے توبہ کی اور بیزاری کا اظہار کیا کفر سے، شرک سے، جھوٹ سے، غیبت سے، بدعت سے، چغلی سے، بے حیائی کے کاموں سے، بہتان سے اور تمام گناہوں سے، اور میں اسلام لایا اور کہتا ہوں: اللہ کے سوا کوئی معبود نہیں، محمد صلی اللہ علیہ وسلم اللہ کے رسول ہیں۔",
    transliteration: "Allaahumma innee a'oozu bika min an ushrika bika shay'anw-wa anaa a'lamu bihee...",
    meaningSummary: "کفر، شرک، غیبت اور بدکاری سے پناہ اور ایمان کی تجدید۔"
  }
];
