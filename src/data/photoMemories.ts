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
    title: 'Sweet Dedication & Gentle Gaze',
    caption: 'The opening portrait of the one who holds my heart in her hands.',
    location: 'Under warm neon ambient lights',
    theme: 'rose',
    chapterMatch: 0, // Book frontispiece & dedication
  },
  {
    id: 'photo-2',
    imagePath: '/assets/aistudio/TikVideo.App_7681678700433231112_4_8f7bf687.jpeg',
    title: 'The Magic in Your Radiant Smile',
    caption: 'A flower in your hair and all of heaven in your smile.',
    location: 'That sweet magical evening in pink glow',
    theme: 'rose',
    chapterMatch: 1,
  },
  {
    id: 'photo-3',
    imagePath: '/assets/aistudio/TikVideo.App_7692014627709914386_3_5f8daedc.jpeg',
    title: 'The Peace in Your Gentle Soul',
    caption: 'In your quiet gaze, I found the home I was searching for.',
    location: 'Peaceful moments wrapped in warmth',
    theme: 'peach',
    chapterMatch: 2,
  },
  {
    id: 'photo-4',
    imagePath: '/assets/aistudio/TikVideo.App_7692468724086983943_3_c86ad1db.jpeg',
    title: 'Enchanted Nights Under Fairy Lights',
    caption: 'Even the starry midnight sky envies your ethereal glow.',
    location: 'Rooftop terrace under magical string lights',
    theme: 'lavender',
    chapterMatch: 3,
  },
  {
    id: 'photo-5',
    imagePath: '/assets/aistudio/TikVideo.App_7692468724086983943_5_e93884f5.jpeg',
    title: 'Your Elegance and Effortless Grace',
    caption: 'Grace is not something you put on — it is who you are.',
    location: 'Quiet veranda under gentle evening breeze',
    theme: 'lavender',
    chapterMatch: 4,
  },
  {
    id: 'photo-6',
    imagePath: '/assets/aistudio/TikVideo.App_7694685894816615698_8_2e7fe14b.jpeg',
    title: 'Whispers of Sunset & Calm Horizons',
    caption: 'Nature painted the sunset, but you brought it to life.',
    location: 'Garden sanctuary at twilight',
    theme: 'blush',
    chapterMatch: 5,
  },
  {
    id: 'photo-7',
    imagePath: '/assets/aistudio/TikVideo.App_7694685894816615698_11_6f3e54e6.jpeg',
    title: 'The Sweetness of Your Playful Spirit',
    caption: 'You are the wild, gentle flower that bloomed in my heart.',
    location: 'Green garden pathway on a breezy afternoon',
    theme: 'rose',
    chapterMatch: 6,
  },
  {
    id: 'photo-8',
    imagePath: '/assets/aistudio/TikVideo.App_7699159336127335698_7_bd7c2b21.jpeg',
    title: 'A Sky Full of Dreams in Sky Blue',
    caption: 'The sky borrowed its shade of blue just to see you smile.',
    location: 'Terrace stairs beneath open autumn clouds',
    theme: 'navy',
    chapterMatch: 7,
  },
  {
    id: 'photo-9',
    imagePath: '/assets/aistudio/TikVideo.App_7699159336127335698_1_0127520b.jpeg',
    title: 'The Sparkle in Your Direct Glance',
    caption: 'In your eyes, I found a reflection of my deepest peace.',
    location: 'Sunlit afternoon captured forever',
    theme: 'navy',
    chapterMatch: 8,
  },
  {
    id: 'photo-10',
    imagePath: '/assets/aistudio/TikVideo.App_7699159336127335698_10_3789c19e.jpeg',
    title: 'Poetry in the Open Breeze',
    caption: 'Like poetry moving in the gentle autumn wind.',
    location: 'High above on the breezy rooftop terrace',
    theme: 'navy',
    chapterMatch: 9,
  },
  {
    id: 'photo-11',
    imagePath: '/assets/aistudio/TikVideo.App_7699881915037404424_1_5aa89f97.jpeg',
    title: 'The Warmth of Your Compassionate Heart',
    caption: 'Your heart carries the warmth of a thousand sunrises.',
    location: 'Golden afternoon festival celebration',
    theme: 'peach',
    chapterMatch: 10,
  },
  {
    id: 'photo-12',
    imagePath: '/assets/aistudio/TikVideo.App_7699881915037404424_5_956c9e4f.jpeg',
    title: 'The Crimson Blossom in Your Hair',
    caption: 'A red flower in your hair, forever etched in my memory.',
    location: 'Sunlit courtyard filled with flowers',
    theme: 'rose',
    chapterMatch: 11,
  },
  {
    id: 'photo-13',
    imagePath: '/assets/aistudio/TikVideo.App_7699881915037404424_4_7c640835.jpeg',
    title: 'Simply Because You Are My Forever',
    caption: 'In every lifetime, in every crowd, my heart will always choose you.',
    location: 'Rooftop terrace under eternal golden skies',
    theme: 'rose',
    chapterMatch: 12,
  },
];
