import React from 'react';
import { X, Heart, ExternalLink } from 'lucide-react';
import { GoldFlourishDivider } from './Ornaments';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Author and Story Credits"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-[#180d1e] border border-[#d4af37]/40 shadow-2xl p-6 sm:p-8 text-[#f4ecd8] text-center">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-lg text-[#d1c2a5] hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#3b0914] border border-[#ffd700] flex items-center justify-center shadow-lg">
          <Heart className="w-7 h-7 text-[#f43f5e] fill-[#f43f5e]" />
        </div>

        <h3 className="text-2xl font-serif font-bold text-[#ffd700] mb-1">
          Reasons I Love You
        </h3>
        <p className="text-xs uppercase tracking-widest text-[#d4af37]/80 font-semibold mb-3">
          3D Romantic Keepsake Tome
        </p>

        <GoldFlourishDivider className="w-36 my-2" />

        <blockquote className="font-['Dancing_Script'] text-lg sm:text-xl text-[#fbd5a5] italic my-4 px-4 leading-relaxed">
          &ldquo;In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.&rdquo;
        </blockquote>

        <div className="p-4 rounded-xl bg-black/30 border border-[#d4af37]/20 text-xs text-[#d1c2a5] space-y-2.5 text-left mb-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
            <span className="text-[#d4af37] font-semibold">Creator &amp; Developer</span>
            <span className="font-medium text-white">KM Azizul Islam</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#d4af37] font-semibold">Facebook Profile</span>
            <a
              href="https://www.facebook.com/km.azizul.islam.122576"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffd700] hover:underline flex items-center gap-1 font-medium"
            >
              <span>KM Azizul Islam</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="text-xs text-[#d1c2a5]">
          Crafted with love, procedural audio synthesis, and 3D paper physics.
        </div>

        <div className="mt-5">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f59e0b] text-[#1a0e02] font-semibold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            Close &amp; Return to Tome
          </button>
        </div>
      </div>
    </div>
  );
};
