import React, { useState } from 'react';
import { ALL_PHOTO_MEMORIES, PhotoMemory } from '../data/photoMemories';
import { X, Heart, Sparkles, ZoomIn } from 'lucide-react';
import { GoldFlourishDivider } from './Ornaments';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhotoForChapter?: (photoPath: string) => void;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectPhotoForChapter,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keepsake Photo Memories Gallery"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-[#140a17] border border-[#d4af37]/40 shadow-2xl overflow-hidden text-[#f4ecd8]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d4af37]/20 bg-[#0f0712]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#3b0914] border border-[#d4af37]/40">
              <Heart className="w-5 h-5 text-[#f43f5e] fill-[#f43f5e]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#ffd700]">
                Keepsake Memories Gallery
              </h2>
              <p className="text-xs text-[#d1c2a5]">
                ১৩টি ভালোবাসার মুহূর্ত — ১৩ Sacred Moments of Love &amp; Grace
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close photo gallery"
            className="p-2 rounded-lg text-[#d1c2a5] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Dedication Banner highlighting photo 1 */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#2c0812] via-[#1c0818] to-[#140824] border border-[#d4af37]/30 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-28 sm:w-24 sm:h-32 shrink-0 rounded-lg overflow-hidden border-2 border-[#ffd700]/60 shadow-lg relative bg-black/40">
              <img
                src={ALL_PHOTO_MEMORIES[0].imagePath}
                alt={ALL_PHOTO_MEMORIES[0].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#ffd700] font-bold">
                Special Dedication Portrait ✨
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-0.5">
                {ALL_PHOTO_MEMORIES[0].title}
              </h3>
              <p className="font-['Dancing_Script'] text-base sm:text-lg text-[#fbd5a5] italic my-1">
                &ldquo;{ALL_PHOTO_MEMORIES[0].caption}&rdquo;
              </p>
              <div className="text-xs text-[#d1c2a5]/80">
                {ALL_PHOTO_MEMORIES[0].location}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ALL_PHOTO_MEMORIES.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative cursor-pointer bg-[#fcf9f2] p-2.5 pb-5 rounded-md shadow-lg border border-[#e3d7c3] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                {/* Polaroid corner pin */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-[#fef3c7]/80 backdrop-blur-xs border-t border-b border-[#fef08a] rounded-xs rotate-2 pointer-events-none z-10" />

                {/* Photo Image Frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xs bg-[#e8deca]">
                  <img
                    src={photo.imagePath}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/60 text-[#ffd700]">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Polaroid Caption */}
                <div className="pt-2 text-center">
                  <span className="block text-[10px] uppercase tracking-wider text-[#9f1239] font-bold font-serif">
                    {photo.chapterMatch === 0 ? 'Dedication' : `Memory #${photo.chapterMatch || idx + 1}`}
                  </span>
                  <p className="font-['Dancing_Script'] text-xs sm:text-sm text-[#381e28] font-semibold line-clamp-1 mt-0.5">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#d4af37]/20 bg-[#0f0712] flex items-center justify-between text-xs text-[#d1c2a5]">
          <span>All 13 photos are beautifully framed inside the 3D Tome</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
          >
            Close Gallery
          </button>
        </div>
      </div>

      {/* Expanded Photo Lightbox */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-[#fdfaf3] p-4 sm:p-6 pb-8 rounded-xl shadow-2xl text-[#2d121b] border-4 border-white/80 cursor-default animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-stone-200 shadow-inner">
              <img
                src={selectedPhoto.imagePath}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pt-4 text-center">
              <span className="text-[11px] uppercase tracking-widest text-[#9f1239] font-bold font-serif">
                {selectedPhoto.location}
              </span>
              <h4 className="text-lg sm:text-xl font-serif font-bold text-[#350a16] mt-0.5">
                {selectedPhoto.title}
              </h4>
              <p className="font-['Dancing_Script'] text-base sm:text-lg text-[#5c1c2e] italic mt-1 font-semibold">
                &ldquo;{selectedPhoto.caption}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
