export type ThemeType = 'rose' | 'blush' | 'navy' | 'peach' | 'lavender';

export interface ReasonItem {
  id: string;
  number: number;
  chapterLabel?: string;
  title: string;
  subtitle?: string;
  reason: string;
  secretNote: string;
  theme: ThemeType;
  emblem: string; // SVG icon identifier or path
  polaroidQuote: string;
  polaroidImage: string;
  dateLocation: string;
  author?: string;
}

export interface AtmosphereParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed?: number;
  rotation?: number;
  rotationSpeed?: number;
  type: 'star' | 'petal' | 'bokeh' | 'sparkle' | 'confetti-foil' | 'confetti-heart';
  color?: string;
  width?: number;
  height?: number;
  lifetime?: number;
  maxLifetime?: number;
}
