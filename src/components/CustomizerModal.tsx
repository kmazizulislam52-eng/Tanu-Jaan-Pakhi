import React, { useState } from 'react';
import { ReasonItem, ThemeType } from '../types';
import { THEME_CONFIGS, DEFAULT_REASONS } from '../data/defaultReasons';
import { ALL_PHOTO_MEMORIES } from '../data/photoMemories';
import { X, Plus, Trash2, RotateCcw, Check, Heart, Image as ImageIcon } from 'lucide-react';

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
      id: `custom-reason-${Date.now()}`,
      number: newNum,
      title: `Reason ${newNum}`,
      reason: 'Write your heartfelt reason here...',
      secretNote: 'A secret whispered thought...',
      theme: 'rose',
      emblem: 'heart-spark',
      polaroidQuote: 'A memory carved in time.',
      polaroidImage: '/src/assets/images/polaroid_rose_garden_1792854259589.jpg',
      dateLocation: 'A cherished moment together',
    };
    const updated = [...draftReasons, newReason];
    setDraftReasons(updated);
    setSelectedIdx(updated.length - 1);
  };

  const handleDeleteCurrent = () => {
    if (draftReasons.length <= 1) return;
    const updated = draftReasons.filter((_, idx) => idx !== selectedIdx);
    // re-number
    const renumbered = updated.map((item, i) => ({ ...item, number: i + 1 }));
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
    if (window.confirm('Reset all reasons and love notes back to original romantic defaults?')) {
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
      aria-label="Customize Reasons and Love Notes"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#160d1b] border border-[#d4af37]/30 shadow-2xl overflow-hidden text-[#f4ecd8]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d4af37]/20 bg-[#120a16]">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-[#f43f5e] fill-[#f43f5e]" />
            <div>
              <h2 className="text-xl font-serif font-bold text-[#ffd700]">
                Customize Reasons &amp; Secret Notes
              </h2>
              <p className="text-xs text-[#d1c2a5]">
                Tailor every chapter with your personal memories and intimate love notes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close customizer"
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
              <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                Chapters ({draftReasons.length})
              </span>
              <button
                onClick={handleAddReason}
                className="flex items-center gap-1 text-xs px-2.5 py-1 bg-[#d4af37]/20 text-[#ffd700] hover:bg-[#d4af37]/30 rounded-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
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
                      <span className="font-mono text-[#d4af37] font-bold mr-1.5">
                        #{item.number < 10 ? `0${item.number}` : item.number}
                      </span>
                      <span className="font-serif">{item.title}</span>
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
            <div className="md:col-span-8 p-6 overflow-y-auto space-y-4 bg-[#180f20]/90">
              <div className="flex items-center justify-between">
                <span className="text-sm font-serif text-[#ffd700]">
                  Editing Chapter {currentItem.number} of {draftReasons.length}
                </span>
                {draftReasons.length > 1 && (
                  <button
                    onClick={handleDeleteCurrent}
                    className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 px-2 py-1 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Chapter</span>
                  </button>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] mb-1 font-semibold">
                  Chapter Headline
                </label>
                <input
                  type="text"
                  value={currentItem.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-[#d4af37]/30 rounded-lg text-sm text-[#f4ecd8] focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              {/* Theme Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] mb-1.5 font-semibold">
                  Color Aesthetic Theme
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
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] mb-1 font-semibold">
                  Heartfelt Reason (Right Page)
                </label>
                <textarea
                  rows={3}
                  value={currentItem.reason}
                  onChange={(e) => handleFieldChange('reason', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-[#d4af37]/30 rounded-lg text-sm text-[#f4ecd8] focus:outline-none focus:border-[#ffd700] resize-none"
                />
              </div>

              {/* Secret Love Note */}
              <div className="p-3.5 rounded-xl bg-[#2a131b]/60 border border-rose-900/40">
                <label className="block text-xs uppercase tracking-wider text-rose-300 mb-1 font-semibold">
                  Hidden Secret Love Note (Revealed on Back Page)
                </label>
                <textarea
                  rows={2}
                  value={currentItem.secretNote}
                  onChange={(e) => handleFieldChange('secretNote', e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-rose-700/40 rounded-lg text-sm text-[#ffe4e6] focus:outline-none focus:border-rose-400 font-serif italic resize-none"
                  placeholder="A secret intimate whisper revealed on the left side..."
                />
              </div>

              {/* Polaroid Memory Quote & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] mb-1 font-semibold">
                    Polaroid Memory Quote
                  </label>
                  <input
                    type="text"
                    value={currentItem.polaroidQuote}
                    onChange={(e) => handleFieldChange('polaroidQuote', e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-[#d4af37]/30 rounded-lg text-xs text-[#f4ecd8] focus:outline-none focus:border-[#ffd700]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] mb-1.5 font-semibold">
                    Select Keepsake Photo ({ALL_PHOTO_MEMORIES.length} Photos)
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-h-36 overflow-y-auto p-1.5 rounded-lg bg-black/40 border border-white/10">
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
            <span>Restore Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#d1c2a5] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAndClose}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-gradient-to-r from-[#d4af37] to-[#f59e0b] text-[#1b0d02] rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              {savedAlert ? <Check className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
              <span>{savedAlert ? 'Saved!' : 'Save &amp; Apply'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
