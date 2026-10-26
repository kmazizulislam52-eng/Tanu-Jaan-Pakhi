export interface PhotoMemory {
  id: string;
  imagePath: string;
  title: string;
  caption: string;
  location: string;
  theme: 'rose' | 'blush' | 'navy' | 'peach' | 'lavender';
  chapterMatch?: number;
}

export const ALL_PHOTO_MEMORIES: PhotoMemory[] = [
  {
    id: 'photo-1',
    imagePath: '/assets/aistudio/TikVideo.App_7681678700433231112_1_8d5f3043.jpeg',
    title: 'ভালোবাসার উৎসর্গ ও সূচনা',
    caption: 'তুমি আমার জীবনের সেই অপ্রত্যাশিত শ্রেষ্ঠ উপহার।',
    location: 'স্মৃতির পাতা · চিরন্তন উৎসর্গ',
    theme: 'rose',
    chapterMatch: 0, // Book frontispiece & dedication
  },
  {
    id: 'photo-2',
    imagePath: '/assets/aistudio/TikVideo.App_7681678700433231112_4_8f7bf687.jpeg',
    title: 'যেদিন গল্পের শুরু',
    caption: 'একটি ছোট্ট ধাক্কা থেকে শুরু হয়েছিল আমাদের জীবনের সবচেয়ে সুন্দর গল্প।',
    location: '১৬ নভেম্বর ২০২১ · স্কুল ছুটির পর মার্কেট',
    theme: 'rose',
    chapterMatch: 1,
  },
  {
    id: 'photo-3',
    imagePath: '/assets/aistudio/TikVideo.App_7692014627709914386_3_5f8daedc.jpeg',
    title: 'এক চিঠির অমর গল্প',
    caption: 'এক মাসের নীরবতা ভেঙে সেই চিঠির ভাঁজেই বাঁধা পড়েছিল দুটি হৃদয়।',
    location: 'ডিসেম্বর ২০২১ · স্কুল ক্যাম্পাস ও ছোট বোনের চিঠি',
    theme: 'peach',
    chapterMatch: 2,
  },
  {
    id: 'photo-4',
    imagePath: '/assets/aistudio/TikVideo.App_7692468724086983943_3_c86ad1db.jpeg',
    title: 'স্কুলজীবনের সেই ভালোবাসা',
    caption: 'স্কুলের বারান্দা আর ক্লাসরুমের জানলা দিয়ে একে অপরকে একপলক দেখার আনন্দ।',
    location: '২০২২ · বিদ্যালয়ের প্রাঙ্গণ ও ক্লাসরুম',
    theme: 'lavender',
    chapterMatch: 3,
  },
  {
    id: 'photo-5',
    imagePath: '/assets/aistudio/TikVideo.App_7692468724086983943_5_e93884f5.jpeg',
    title: 'অভিমান, অপেক্ষা আর ভালোবাসা',
    caption: 'অভিমান যত গভীর হয়েছিল, ভালোবাসার টান ততই প্রগাঢ় হয়েছিল।',
    location: 'মান-অভিমান ও ভালোবাসার সন্ধিক্ষণ',
    theme: 'lavender',
    chapterMatch: 4,
  },
  {
    id: 'photo-6',
    imagePath: '/assets/aistudio/TikVideo.App_7694685894816615698_8_2e7fe14b.jpeg',
    title: 'সেই দিনগুলো আজ স্মৃতি',
    caption: 'স্কুলজীবনের স্মৃতিগুলো আজও আমাদের হৃদয়ে সুবাস ছড়ায়।',
    location: 'স্কুলজীবনের সমাপ্তি ও নস্টালজিয়া',
    theme: 'blush',
    chapterMatch: 5,
  },
  {
    id: 'photo-7',
    imagePath: '/assets/aistudio/TikVideo.App_7694685894816615698_11_6f3e54e6.jpeg',
    title: 'ফুলেল স্নিগ্ধতা ও মায়াবী হাসি',
    caption: 'চুলে গোঁজা ফুল আর নিষ্পাপ চোখের হাসিতে আমার পৃথিবী আলোকিত।',
    location: 'সবুজ বাগিচার নির্জন কোণে',
    theme: 'rose',
    chapterMatch: 6,
  },
  {
    id: 'photo-8',
    imagePath: '/assets/aistudio/TikVideo.App_7699159336127335698_7_bd7c2b21.jpeg',
    title: 'একসঙ্গে থাকার নতুন অধ্যায়',
    caption: 'একতরফা ভালোবাসায় যার শুরু, আল্লাহর রহমতে আজ তা পবিত্র বিবাহবন্ধনে পূর্ণ।',
    location: 'পবিত্র নিকাহ ও নবজীবনের সূচনা',
    theme: 'navy',
    chapterMatch: 7,
  },
  {
    id: 'photo-9',
    imagePath: '/assets/aistudio/TikVideo.App_7699159336127335698_1_0127520b.jpeg',
    title: 'শান্ত চাহনি আর অসীম বিশ্বাস',
    caption: 'তোমার শান্ত চোখের চাহনিতে আমি আমার জীবনের পরম প্রশান্তি খুঁজে পেয়েছি।',
    location: 'উষ্ণ রোদের মিষ্টি বিকেলে',
    theme: 'navy',
    chapterMatch: 8,
  },
  {
    id: 'photo-10',
    imagePath: '/assets/aistudio/TikVideo.App_7699159336127335698_10_3789c19e.jpeg',
    title: 'নীল দিগন্ত ও মৃদু হাওয়া',
    caption: 'খোলা ছাদে বাতাসের দোলায় যেন কবিতার মতো ভেসে আসা অনুভূতি।',
    location: 'উন্মুক্ত আকাশের নিচে ছাদের কিনারে',
    theme: 'navy',
    chapterMatch: 9,
  },
  {
    id: 'photo-11',
    imagePath: '/assets/aistudio/TikVideo.App_7699881915037404424_1_5aa89f97.jpeg',
    title: 'মমতাময়ী হৃদয়ের উষ্ণতা',
    caption: 'তোমার মমতায় ঘেরা হৃদয়ে প্রতিদিন নতুন করে প্রেমে পড়ার অনুভূতি।',
    location: 'আনন্দঘন পারিবারিক মুহূর্ত',
    theme: 'peach',
    chapterMatch: 10,
  },
  {
    id: 'photo-12',
    imagePath: '/assets/aistudio/TikVideo.App_7699881915037404424_5_956c9e4f.jpeg',
    title: 'গোলাপ রাঙা স্মৃতির মালা',
    caption: 'চুলে সেই রক্তিম ফুল, যা প্রথম দেখাতেই আমার হৃদয় কেড়ে নিয়েছিল।',
    location: 'ফুলঝরা আঙিনায় মিষ্টি স্মৃতি',
    theme: 'rose',
    chapterMatch: 11,
  },
  {
    id: 'photo-13',
    imagePath: '/assets/aistudio/TikVideo.App_7699881915037404424_4_7c640835.jpeg',
    title: 'আমার জীবনের সবচেয়ে সুন্দর স্মৃতি',
    caption: 'একটি ছোট্ট ধাক্কা থেকে শুরু, তারপর সারাজীবন একসঙ্গে থাকার অমর প্রেমকাহিনি।',
    location: 'অনন্তকালের অঙ্গীকার · কেএম আজিজুল ইসলাম',
    theme: 'rose',
    chapterMatch: 12,
  },
];
