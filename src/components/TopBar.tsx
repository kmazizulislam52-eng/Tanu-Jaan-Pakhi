import React from 'react';
import { Volume2, VolumeX, Sliders, Info, Image as ImageIcon } from 'lucide-react';
import { soundManager } from '../services/audioEngine';

interface TopBarProps {
  onOpenCustomizer: () => void;
  onOpenCredits: () => void;
  onOpenPhotoGallery: () => void;
  onToggleMusic: () => void;
  isMusicPlaying: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenCustomizer,
  onOpenCredits,
  onOpenPhotoGallery,
  onToggleMusic,
  isMusicPlaying,
}) => {
  return (
    <header className="relative z-30 flex items-center justify-between gap-6 px-4 sm:px-6 py-3.5 border-b border-[#d4af37]/20 bg-[#0e0712]/90 backdrop-blur-md">
      {/* Zone 1: Brand Wordmark (Bengali Book Title) */}
      <div className="flex items-center gap-2">
        <a
          href="/"
          className="text-base sm:text-lg md:text-xl font-bold font-suttoni text-[#ffd700] hover:text-[#fff4c2] transition-colors tracking-wide whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-xl">📖</span>
          <span>একতরফা ভালোবাসা ও স্কুলের স্মৃতি</span>
        </a>
      </div>

      {/* Zone 2: Clean Nav Links */}
      <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-medium font-suttoni text-[#d1c2a5]">
        <button
          onClick={onToggleMusic}
          className="hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          {isMusicPlaying ? <Volume2 className="w-4 h-4 text-[#ffd700]" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          <span>{isMusicPlaying ? 'মধুর সুর চালু' : 'সুর বন্ধ'}</span>
        </button>

        <button
          onClick={onOpenPhotoGallery}
          className="hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-[#ffd700]"
        >
          <ImageIcon className="w-4 h-4 text-[#ffd700]" />
          <span>স্মৃতির ছবি গ্যালারি (১৩)</span>
        </button>

        <button
          onClick={onOpenCustomizer}
          className="hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>অধ্যায় সম্পাদনা</span>
        </button>

        <button
          onClick={onOpenCredits}
          className="hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>লেখক ও পরিচিতি</span>
        </button>
      </nav>

      {/* Zone 3: Mobile & Quick Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenPhotoGallery}
          aria-label="View Photo Memories"
          className="md:hidden p-2 rounded-lg border border-[#d4af37]/30 text-[#ffd700] hover:bg-white/5"
          title="স্মৃতির ছবিসমূহ"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleMusic}
          aria-label={isMusicPlaying ? 'Mute Music Box' : 'Play Music Box'}
          className="md:hidden p-2 rounded-lg border border-[#d4af37]/30 text-[#ffd700] hover:bg-white/5"
          title="সুর"
        >
          {isMusicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenCustomizer}
          className="px-3.5 py-1.5 text-xs font-semibold font-suttoni text-[#1c0d02] bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <Sliders className="w-3.5 h-3.5 text-[#1c0d02]" />
          <span>বই সাজান</span>
        </button>
      </div>
    </header>
  );
};
