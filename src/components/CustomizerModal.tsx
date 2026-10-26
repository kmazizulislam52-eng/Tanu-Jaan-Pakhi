import React, { useState } from 'react';
import { ReasonItem, ThemeType } from '../types';
import { THEME_CONFIGS, DEFAULT_REASONS } from '../data/defaultReasons';
import { ALL_PHOTO_MEMORIES } from '../data/photoMemories';
import { X, Plus, Trash2, RotateCcw, Check, Heart, BookOpen } from 'lucide-react';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  reasons: ReasonItem[];
  onSaveReasons: (newReasons: ReasonItem[]) => void;
  onResetDefaults: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  reasons,
  onSaveReasons,
  onResetDefaults,
}) => {
  const [draftReasons, setDraftReasons] = useState<ReasonItem[]>(reasons);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [savedAlert, setSavedAlert] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentItem = draftReasons[selectedIdx] || draftReasons[0];

  const handleFieldChange = (field: keyof ReasonItem, value: unknown) => {
    setDraftReasons((prev) => {
      const updated = [...prev];
      updated[selectedIdx] = {
        ...updated[selectedIdx],
        [field]: value,
      };
      return updated;
    });
  };

  const handleAddReason = () => {
    const newNum = draftReasons.length + 1;
    const newReason: ReasonItem = {
      id: `custom-chapter-${Date.now()}`,
      number: newNum,
      chapterLabel: `অধ্যায় ${newNum}`,
      title: `নতুন স্মৃতির পাতা`,
      subtitle: `আমাদের আরও একটি ভালোবাসার মুহূর্ত`,
      reason: 'এখানে আপনার অনুভূতি ও ভালোবাসার নতুন গল্প লিখুন...',
      secretNote: 'হৃদয়ের আরও একটি না বলা কথা...',
      theme: 'rose',
      emblem: 'heart-spark',
      polaroidQuote: 'ভালোবাসা চিরন্তন ও অমলিন।',
      polaroidImage: ALL_PHOTO_MEMORIES[Math.min(newNum - 1, ALL_PHOTO_MEMORIES.length - 1)].imagePath,
      dateLocation: 'স্মৃতির সোনালী দিনগুলি',
      author: 'কেএম আজিজুল ইসলাম',
    };
    const updated = [...draftReasons, newReason];
    setDraftReasons(updated);
    setSelectedIdx(updated.length - 1);
  };

  const handleDeleteCurrent = () => {
    if (draftReasons.length <= 1) return;
    const updated = draftReasons.filter((_, idx) => idx !== selectedIdx);
    const renumbered = updated.map((item, i) => ({
      ...item,
      number: i + 1,
      chapterLabel: item.chapterLabel || (i === 0 ? 'উৎসর্গ' : i === updated.length - 1 ? 'শেষ অধ্যায়' : `অধ্যায় ${i}`),
    }));
    setDraftReasons(renumbered);
    setSelectedIdx(Math.max(0, selectedIdx - 1));
  };

  const handleSaveAndClose = () => {
    onSaveReasons(draftReasons);
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      onClose();
    }, 600);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('আপনি কি মূল কাহিনির ডিফল্ট ৮টি অধ্যায় ও স্মৃতি পুনরুদ্ধার করতে চান?')) {
      onResetDefaults();
      setDraftReasons(DEFAULT_REASONS);
      setSelectedIdx(0);
    }
  };

  const themeKeys: ThemeType[] = ['rose', 'blush', 'navy', 'peach', 'lavender'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="অধ্যায়সমূহ ও স্মৃতি সম্পাদনা করুন"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-suttoni"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#160d1b] border border-[#d4af37]/30 shadow-2xl overflow-hidden text-[#f4ecd8]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d4af37]/20 bg-[#120a16]">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-[#f43f5e] fill-[#f43f5e]" />
            <div>
              <h2 className="text-xl font-bold text-[#ffd700]">
                অধ্যায়সমূহ ও স্মৃতি সম্পাদনা
              </h2>
              <p className="text-xs text-[#d1c2a5]">
                একতরফা ভালোবাসা ও স্কুলের স্মৃতি — প্রতিটি অধ্যায় নিজের মতো করে সাজান
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="p-2 rounded-lg text-[#d1c2a5] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Sidebar list + Detail editor */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* Chapter Selector sidebar */}
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[#d4af37]/20 bg-[#0f0713]/80 p-3 overflow-y-auto max-h-56 md:max-h-full">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs tracking-wider text-[#d4af37] font-semibold">
                অধ্যায় তালিকা ({draftReasons.length})
              </span>
              <button
                onClick={handleAddReason}
                className="flex items-center gap-1 text-xs px-2.5 py-1 bg-[#d4af37]/20 text-[#ffd700] hover:bg-[#d4af37]/30 rounded-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>যুক্ত করুন</span>
              </button>
            </div>

            <div className="space-y-1">
              {draftReasons.map((item, idx) => {
                const isSelected = idx === selectedIdx;
                const theme = THEME_CONFIGS[item.theme] || THEME_CONFIGS.rose;
                return (
                  <button
                    key={item.id || idx}
                    onClick={() => setSelectedIdx(idx)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#d4af37]/25 text-white border border-[#d4af37]/50 shadow-sm'
                        : 'text-[#d1c2a5] hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <span className="text-[#ffd700] font-bold mr-1.5">
                        {item.chapterLabel || `অধ্যায় ${item.number}`}:
                      </span>
                      <span>{item.title}</span>
                    </div>
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: theme.accent }}
                      title={theme.name}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reason Editor form */}
          {currentItem && (
            <div className="md:col-span-8 p-5 sm:p-6 overflow-y-auto space-y-4 bg-[#180f20]/90">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#ffd700]">
                  সম্পাদনা করছেন: {currentItem.chapterLabel || `অধ্যায় ${currentItem.number}`}
                </span>
                {draftReasons.length > 1 && (
                  <button
                    onClick={handleDeleteCurrent}
                    className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 px-2.5 py-1 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>অধ্যায় মুছুন</span>
                  </button>
                )}
              </div>

              {/* Chapter Label and Title */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs text-[#d4af37] mb-1 font-semibold">
                    অধ্যায় শিরোনাম
                  </label>
                  <input
                    type="text"
                    value={currentItem.chapterLabel || ''}
                    onChange={(e) => handleFieldChange('chapterLabel', e.target.value)}
                    placeholder="উদাঃ অধ্যায় ১"
                    className="w-full px-3 py-2 bg-black/40 border border-[#d4af37]/30 rounded-lg text-xs text-[#f4ecd8] focus:outline-none focus:border-[#ffd700]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#d4af37] mb-1 font-semibold">
                    মূল শিরোনাম (Headline)
                  </label>
                  <input
                    type="text"
                    value={currentItem.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-[#d4af37]/30 rounded-lg text-sm text-[#f4ecd8] focus:outline-none focus:border-[#ffd700]"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs text-[#d4af37] mb-1 font-semibold">
                  উপশিরোনাম / সারসংক্ষেপ
                </label>
                <input
                  type="text"
                  value={currentItem.subtitle || ''}
                  onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                  placeholder="উদাঃ ১৬ নভেম্বর ২০২১ — অপ্রত্যাশিত সেই মুহূর্ত"
                  className="w-full px-3 py-2 bg-black/40 border border-[#d4af37]/30 rounded-lg text-xs text-[#f4ecd8] focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              {/* Theme Selector */}
              <div>
                <label className="block text-xs text-[#d4af37] mb-1.5 font-semibold">
                  রঙিন থিম নির্বাচন
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {themeKeys.map((key) => {
                    const cfg = THEME_CONFIGS[key];
                    const active = currentItem.theme === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleFieldChange('theme', key)}
                        className={`flex items-center gap-2 p-2 rounded-lg text-xs border transition-all ${
                          active
                            ? 'border-[#ffd700] bg-white/10 text-white shadow-sm'
                            : 'border-white/10 text-[#d1c2a5] hover:bg-white/5'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: cfg.accent }}
                        />
                        <span className="truncate">{cfg.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reason Body Text */}
              <div>
                <label className="block text-xs text-[#d4af37] mb-1 font-semibold">
                  অধ্যায়ের মূল বিবরণ ও কাহিনি (ডান পৃষ্ঠা) — অনুচ্ছেদ ভাগ করতে জোড়া এন্টার (Enter) দিন
                </label>
                <textarea
                  rows={4}
                  value={currentItem.reason}
                  onChange={(e) => handleFieldChange('reason', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-[#d4af37]/30 rounded-lg text-xs sm:text-sm text-[#f4ecd8] focus:outline-none focus:border-[#ffd700] resize-y leading-relaxed"
                />
              </div>

              {/* Secret Love Note */}
              <div className="p-3.5 rounded-xl bg-[#2a131b]/60 border border-rose-900/40">
                <label className="block text-xs text-rose-300 mb-1 font-semibold">
                  হৃদয়ের গোপন অনুভূতি / চিরকুট (বাম পৃষ্ঠায় প্রদর্শিত)
                </label>
                <textarea
                  rows={2}
                  value={currentItem.secretNote}
                  onChange={(e) => handleFieldChange('secretNote', e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-rose-700/40 rounded-lg text-xs sm:text-sm text-[#ffe4e6] focus:outline-none focus:border-rose-400 italic resize-none"
                  placeholder="আপনার গোপন মনের অনুভূতির কথা লিখুন..."
                />
              </div>

              {/* Polaroid Memory Quote & Photo Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#d4af37] mb-1 font-semibold">
                    স্মৃতির উক্তি (ছবির নিচে ক্যাপশন)
                  </label>
                  <input
                    type="text"
                    value={currentItem.polaroidQuote}
                    onChange={(e) => handleFieldChange('polaroidQuote', e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-[#d4af37]/30 rounded-lg text-xs text-[#f4ecd8] focus:outline-none focus:border-[#ffd700]"
                  />
                  <div className="mt-2">
                    <label className="block text-xs text-[#d4af37] mb-1 font-semibold">
                      তারিখ ও স্থান
                    </label>
                    <input
                      type="text"
                      value={currentItem.dateLocation}
                      onChange={(e) => handleFieldChange('dateLocation', e.target.value)}
                      className="w-full px-3 py-2 bg-black/40 border border-[#d4af37]/30 rounded-lg text-xs text-[#f4ecd8] focus:outline-none focus:border-[#ffd700]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#d4af37] mb-1.5 font-semibold">
                    স্মৃতির ছবি বেছে নিন ({ALL_PHOTO_MEMORIES.length}টি ব্যক্তিগত ছবি)
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-36 overflow-y-auto p-1.5 rounded-lg bg-black/40 border border-white/10">
                    {ALL_PHOTO_MEMORIES.map((m) => {
                      const isChosen = currentItem.polaroidImage === m.imagePath;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            handleFieldChange('polaroidImage', m.imagePath);
                            handleFieldChange('polaroidQuote', m.caption);
                            handleFieldChange('dateLocation', m.location);
                          }}
                          title={m.title}
                          className={`relative aspect-[3/4] rounded overflow-hidden border-2 transition-all ${
                            isChosen
                              ? 'border-[#ffd700] ring-2 ring-[#ffd700]/50 scale-105 z-10'
                              : 'border-transparent opacity-70 hover:opacity-100 hover:scale-100'
                          }`}
                        >
                          <img
                            src={m.imagePath}
                            alt={m.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top"
                          />
                          {isChosen && (
                            <div className="absolute top-1 right-1 p-0.5 rounded-full bg-[#ffd700] text-black">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#d4af37]/20 bg-[#120a16]">
          <button
            onClick={handleResetToDefaults}
            className="flex items-center gap-1.5 text-xs text-[#d1c2a5] hover:text-[#ffd700] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ডিফল্ট কাহিনি পুনরুদ্ধার</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#d1c2a5] hover:text-white transition-colors"
            >
              বাতিল
            </button>
            <button
              onClick={handleSaveAndClose}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-[#1b0d02] rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              {savedAlert ? <Check className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
              <span>{savedAlert ? 'সংরক্ষিত হয়েছে!' : 'সংরক্ষণ ও প্রয়োগ করুন'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
