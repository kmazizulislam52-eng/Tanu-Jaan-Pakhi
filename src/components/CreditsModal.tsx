import React from 'react';
import { X, Heart, ExternalLink, BookOpen } from 'lucide-react';
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
      aria-label="লেখক ও গল্পের পরিচিতি"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-[#180d1e] border border-[#d4af37]/40 shadow-2xl p-6 sm:p-8 text-[#f4ecd8] text-center font-suttoni">
        <button
          onClick={onClose}
          aria-label="বন্ধ করুন"
          className="absolute top-4 right-4 p-2 rounded-lg text-[#d1c2a5] hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#3b0914] border border-[#ffd700] flex items-center justify-center shadow-lg">
          <Heart className="w-7 h-7 text-[#f43f5e] fill-[#f43f5e]" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-[#ffd700] mb-1">
          একতরফা ভালোবাসা ও স্কুলের স্মৃতি
        </h3>
        <p className="text-xs text-[#dfba4f] font-medium mb-2">
          লেখক: কেএম আজিজুল ইসলাম
        </p>

        <GoldFlourishDivider className="w-36 my-2" />

        <blockquote className="text-sm sm:text-base text-[#fbd5a5] italic my-3 px-4 leading-relaxed">
          &ldquo;একটি ছোট্ট ধাক্কা থেকে শুরু, তারপর সারাজীবন একসঙ্গে থাকার গল্প।&rdquo;
        </blockquote>

        <div className="p-4 rounded-xl bg-black/35 border border-[#d4af37]/20 text-xs sm:text-[13px] text-[#d1c2a5] space-y-2.5 text-left mb-5">
          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
            <span className="text-[#d4af37] font-semibold">লেখক ও রচয়িতা</span>
            <span className="font-bold text-white">কেএম আজিজুল ইসলাম</span>
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
            <span className="text-[#d4af37] font-semibold">গল্পের সূচনা</span>
            <span className="text-[#f4ecd8]">১৬ নভেম্বর ২০২১ (স্কুল ছুটির পর মার্কেট)</span>
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
            <span className="text-[#d4af37] font-semibold">বর্তমান অধ্যায়</span>
            <span className="text-[#f4ecd8]">আলহামদুলিল্লাহ, আজ আমরা স্বামী-স্ত্রী</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[#d4af37] font-semibold">Facebook প্রোফাইল</span>
            <a
              href="https://www.facebook.com/km.azizul.islam.122576"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffd700] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>কেএম আজিজুল ইসলাম</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="text-[11px] text-[#d1c2a5]/80 leading-relaxed mb-4">
          প্রকৃত বাস্তব স্মৃতি, ১৩টি দুর্লভ ছবি এবং থ্রি-ডি বইয়ের পাতায় ভালোবাসার চিরন্তন নিবেদন।
        </div>

        <div>
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-[#1a0e02] font-bold text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>বইটিতে ফিরে যান</span>
          </button>
        </div>
      </div>
    </div>
  );
};
