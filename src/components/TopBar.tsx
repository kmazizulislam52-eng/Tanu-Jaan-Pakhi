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
    <header className="relative z-30 flex items-center justify-between gap-8 px-6 py-4 border-b border-[#d4af37]/20 bg-[#0e0712]/90 backdrop-blur-md">
      {/* Zone 1: Brand Wordmark (Single text element in display face) */}
      <div className="flex items-center gap-2">
        <a
          href="/"
          className="text-lg sm:text-xl font-serif font-bold text-[#ffd700] hover:text-[#fff4c2] transition-colors tracking-wide whitespace-nowrap shrink-0"
        >
          Reasons I Love You
        </a>
      </div>

      {/* Zone 2: 4 Clean Single-Line Nav Links */}
      <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#d1c2a5]">
        <button
          onClick={onToggleMusic}
          className="hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          {isMusicPlaying ? <Volume2 className="w-4 h-4 text-[#ffd700]" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          <span>{isMusicPlaying ? 'Music Box Playing' : 'Music Box Muted'}</span>
        </button>

        <button
          onClick={onOpenPhotoGallery}
          className="hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-[#ffd700]"
        >
          <ImageIcon className="w-4 h-4 text-[#ffd700]" />
          <span>Keepsake Photos (13)</span>
        </button>

        <button
          onClick={onOpenCustomizer}
          className="hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Personalize Chapters</span>
        </button>

        <button
          onClick={onOpenCredits}
          className="hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Author &amp; Story</span>
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action (Mobile-friendly toggle & customize button) */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenPhotoGallery}
          aria-label="View Photo Memories"
          className="md:hidden p-2 rounded-lg border border-[#d4af37]/30 text-[#ffd700] hover:bg-white/5"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleMusic}
          aria-label={isMusicPlaying ? 'Mute Music Box' : 'Play Music Box'}
          className="md:hidden p-2 rounded-lg border border-[#d4af37]/30 text-[#ffd700] hover:bg-white/5"
        >
          {isMusicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenCustomizer}
          className="px-3.5 py-1.5 text-xs font-semibold text-[#1c0d02] bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <Sliders className="w-3.5 h-3.5 text-[#1c0d02]" />
          <span>Personalize Book</span>
        </button>
      </div>
    </header>
  );
};
