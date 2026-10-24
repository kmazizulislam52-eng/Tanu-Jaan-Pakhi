import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ReasonItem } from '../types';
import { THEME_CONFIGS } from '../data/defaultReasons';
import { soundManager } from '../services/audioEngine';
import {
  GoldCornerBracket,
  GoldFiligreeFrame,
  GoldFlourishDivider,
  WaxSeal,
  ReasonEmblem,
} from './Ornaments';
import { ChevronLeft, ChevronRight, BookOpen, RotateCcw, Heart, Sparkles, X } from 'lucide-react';

interface Book3DProps {
  reasons: ReasonItem[];
  onOpenCustomizer: () => void;
  onTriggerConfetti: () => void;
}

export const Book3D: React.FC<Book3DProps> = ({
  reasons,
  onOpenCustomizer,
  onTriggerConfetti,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0); // 0 to reasons.length - 1
  const [isTurning, setIsTurning] = useState<boolean>(false);
  const [turningPage, setTurningPage] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Touch tracking for swipe
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const totalPages = reasons.length;
  const currentReason = reasons[currentPage] || reasons[0];
  const activeTheme = THEME_CONFIGS[currentReason?.theme || 'rose'];

  // Handle open book
  const handleOpenBook = useCallback(() => {
    soundManager.unlock();
    soundManager.playLeatherBookThud(false);
    setIsCompleted(false);
    setIsOpen(true);
    setCurrentPage(0);
    if (!soundManager.getIsMusicPlaying()) {
      soundManager.startMusic();
    }
  }, []);

  // Handle close book from finish or action
  const handleCloseBook = useCallback(() => {
    setIsClosing(true);
    soundManager.playLeatherBookThud(true);
    soundManager.playHarpCrescendo();
    onTriggerConfetti();

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setIsCompleted(true);
    }, 900);
  }, [onTriggerConfetti]);

  // Turn to Next Page (or close on last page)
  const handleNextPage = useCallback(() => {
    if (isTurning || isClosing) return;

    if (currentPage >= totalPages - 1) {
      // Reached the final page -> Close book!
      handleCloseBook();
      return;
    }

    setIsTurning(true);
    setTurningPage(currentPage);
    soundManager.playPageTurn();
    soundManager.playSecretReveal();

    if ('vibrate' in navigator) {
      navigator.vibrate?.(15);
    }

    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsTurning(false);
      setTurningPage(null);
    }, 650);
  }, [currentPage, totalPages, isTurning, isClosing, handleCloseBook]);

  // Turn to Previous Page
  const handlePrevPage = useCallback(() => {
    if (isTurning || isClosing || currentPage <= 0) return;

    setIsTurning(true);
    setTurningPage(currentPage - 1);
    soundManager.playPageTurn();

    if ('vibrate' in navigator) {
      navigator.vibrate?.(15);
    }

    setTimeout(() => {
      setCurrentPage((prev) => Math.max(0, prev - 1));
      setIsTurning(false);
      setTurningPage(null);
    }, 650);
  }, [currentPage, isTurning, isClosing]);

  // Reset to read again from beginning
  const handleRestart = useCallback(() => {
    soundManager.unlock();
    setIsCompleted(false);
    setCurrentPage(0);
    handleOpenBook();
  }, [handleOpenBook]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          handleOpenBook();
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentPage >= totalPages - 1) {
          handleCloseBook();
        }
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleRestart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage, totalPages, handleOpenBook, handleNextPage, handlePrevPage, handleCloseBook, handleRestart]);

  // Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Detect horizontal swipe if delta X dominates
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        // Swiped left -> Next
        handleNextPage();
      } else {
        // Swiped right -> Prev
        handlePrevPage();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Determine secret note for the left page:
  // Shows secret note from current page (or previous turned page if turned)
  const revealedReason = currentPage > 0 ? reasons[currentPage - 1] : reasons[0];

  return (
    <div
      className="relative w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-3 sm:p-6"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Scene Container */}
      <div
        className="relative flex items-center justify-center w-full max-w-5xl my-auto transition-transform duration-700 ease-out preserve-3d"
        style={{
          perspective: '2200px',
        }}
      >
        {/* Soft candlelight drop shadow under entire tome */}
        <div
          className={`absolute pointer-events-none transition-all duration-700 rounded-full blur-2xl ${
            isOpen
              ? 'w-[88%] h-24 -bottom-10 bg-black/60'
              : 'w-72 h-16 -bottom-6 bg-black/70'
          }`}
        />

        {/* ============================================================== */}
        {/* 1. CLOSED BOOK STATE: 6-Faced Solid 3D Box Geometry            */}
        {/* ============================================================== */}
        {!isOpen && (
          <div
            className={`relative preserve-3d transition-transform duration-700 cursor-pointer select-none group ${
              isClosing ? 'scale-95' : 'hover:scale-[1.02]'
            }`}
            style={{
              width: 'var(--book-width)',
              height: 'var(--book-height)',
              transform: 'rotateX(14deg) rotateY(-12deg) rotateZ(1deg)',
            }}
            onClick={handleOpenBook}
          >
            {/* FRONT COVER */}
            <div
              className="absolute inset-0 rounded-r-xl leather-burgundy preserve-3d p-6 sm:p-8 flex flex-col items-center justify-between border-r-2 border-b-2 border-amber-900/40 shadow-2xl"
              style={{
                transform: 'translateZ(23px)',
              }}
            >
              {/* Gold Filigree Corner Brackets and Outer Frame */}
              <GoldFiligreeFrame />

              {/* Top Embossed Header */}
              <div className="text-center pt-4 z-10">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-serif text-[#d4af37]/80 block mb-1">
                  Private Keepsake
                </span>
                <GoldFlourishDivider className="w-32 my-1" />
              </div>

              {/* Main Title Centerpiece */}
              <div className="text-center z-10 my-auto px-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-[#420914]/80 shadow-inner">
                  <ReasonEmblem emblem="crown-eternity" className="w-10 h-10 sm:w-12 sm:h-12 text-[#ffd700]" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold gold-foil-text tracking-wide leading-tight mb-2">
                  Reasons
                  <span className="block italic text-2xl sm:text-3xl font-light text-[#ffd700]/90">
                    I Love You
                  </span>
                </h1>
                <p className="text-xs sm:text-sm font-serif italic text-[#dfba4f]/80 max-w-xs mx-auto mt-3">
                  Twelve sacred promises and hidden love notes bound for eternity
                </p>
              </div>

              {/* Bottom Interactive CTA & Wax Seal */}
              <div className="text-center pb-2 z-10 w-full flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37]/20 via-[#ffd700]/30 to-[#d4af37]/20 border border-[#ffd700]/60 text-[#fff5db] text-xs sm:text-sm font-serif tracking-wider shadow-lg group-hover:bg-[#ffd700]/30 group-hover:scale-105 transition-all">
                  <Sparkles className="w-4 h-4 text-[#ffd700] animate-pulse" />
                  <span>Click to Open Tome</span>
                  <Sparkles className="w-4 h-4 text-[#ffd700] animate-pulse" />
                </div>
                <span className="text-[10px] text-[#dfba4f]/60 tracking-widest uppercase mt-2">
                  Press Enter or Space
                </span>
              </div>
            </div>

            {/* LEATHER SPINE (Left Edge) */}
            <div
              className="absolute top-0 bottom-0 leather-spine flex flex-col justify-around py-8 items-center border-l border-amber-950 shadow-2xl"
              style={{
                width: 'var(--book-depth)',
                left: 0,
                transformOrigin: 'left center',
                transform: 'rotateY(-90deg)',
              }}
            >
              {/* Raised Ribbed Bands on Spine */}
              <div className="w-full h-1.5 bg-[#dfba4f]/30 border-y border-[#dfba4f]/60 shadow-sm" />
              <div className="w-full h-1.5 bg-[#dfba4f]/30 border-y border-[#dfba4f]/60 shadow-sm" />
              <div className="rotate-90 whitespace-nowrap text-[11px] font-serif font-bold text-[#dfba4f]/90 tracking-[0.25em]">
                REASONS I LOVE YOU
              </div>
              <div className="w-full h-1.5 bg-[#dfba4f]/30 border-y border-[#dfba4f]/60 shadow-sm" />
              <div className="w-full h-1.5 bg-[#dfba4f]/30 border-y border-[#dfba4f]/60 shadow-sm" />
            </div>

            {/* DECKLED CREAM PAGES BLOCK (Right Edge) */}
            <div
              className="absolute top-0 bottom-0 page-block-edge"
              style={{
                width: 'var(--book-depth)',
                right: 0,
                transformOrigin: 'right center',
                transform: 'rotateY(90deg)',
              }}
            />

            {/* DECKLED PAGES BLOCK (Top Edge) */}
            <div
              className="absolute left-0 right-0 page-block-edge-vertical"
              style={{
                height: 'var(--book-depth)',
                top: 0,
                transformOrigin: 'top center',
                transform: 'rotateX(90deg)',
              }}
            />

            {/* DECKLED PAGES BLOCK (Bottom Edge) */}
            <div
              className="absolute left-0 right-0 page-block-edge-vertical"
              style={{
                height: 'var(--book-depth)',
                bottom: 0,
                transformOrigin: 'bottom center',
                transform: 'rotateX(-90deg)',
              }}
            />

            {/* BACK COVER */}
            <div
              className="absolute inset-0 rounded-r-xl leather-burgundy border border-amber-950"
              style={{
                transform: 'translateZ(-23px)',
              }}
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. OPEN TWO-PAGE SPREAD                                        */}
        {/* ============================================================== */}
        {isOpen && (
          <div
            className={`relative preserve-3d flex flex-col items-center w-full transition-all duration-700 ${
              isClosing ? 'scale-90 opacity-60' : 'scale-100 opacity-100'
            }`}
          >
            {/* The Two-Page Open Book Container */}
            <div
              className="relative w-full max-w-4xl preserve-3d rounded-xl flex flex-col md:flex-row shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-visible border border-amber-900/30"
              style={{
                minHeight: 'min(580px, 80vh)',
              }}
            >
              {/* Central Spine Gutter crease shadow */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 z-30 pointer-events-none bg-gradient-to-r from-black/25 via-black/40 to-black/25" />

              {/* -------------------------------------------------------- */}
              {/* LEFT PAGE: Keepsake Polaroid + Revealed Secret Love Note */}
              {/* -------------------------------------------------------- */}
              <div className="w-full md:w-1/2 left-page-gutter p-6 sm:p-8 rounded-t-xl md:rounded-t-none md:rounded-l-xl flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-[#d4af37]/30">
                {/* Soft parchment corner styling */}
                <div className="absolute top-3 left-3">
                  <GoldCornerBracket className="w-10 h-10 opacity-40 -top-1 -left-1" />
                </div>

                {/* Left Page Top Header */}
                <div className="flex items-center justify-between text-xs text-[#785b3b] font-serif border-b border-[#785b3b]/20 pb-2.5 z-10">
                  <span className="uppercase tracking-widest text-[10px] font-semibold">
                    Keepsake Memory #{currentReason.number}
                  </span>
                  <span className="italic text-[11px] text-[#934423]">
                    {currentReason.dateLocation}
                  </span>
                </div>

                {/* Polaroid Memory Photo Frame with Zoom Lightbox */}
                <div className="my-auto py-2 z-10 flex flex-col items-center">
                  <div
                    onClick={() => setZoomedImage(currentReason.polaroidImage)}
                    title="Click to view full photo"
                    className="relative bg-[#fdfdfc] p-2.5 sm:p-3 pb-4 sm:pb-5 rounded shadow-lg border border-[#e2d5be] -rotate-1 hover:rotate-0 hover:scale-[1.03] transition-all duration-300 max-w-[240px] sm:max-w-[280px] w-full cursor-zoom-in group/polaroid"
                  >
                    {/* Polaroid Tape Accent */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#fef3c7]/80 backdrop-blur-xs shadow-xs border-t border-b border-[#fef08a]/80 rotate-2 pointer-events-none z-10" />

                    {/* Polaroid Image with 3/4 Portrait Aspect Ratio */}
                    <div className="w-full aspect-[3/4] rounded-sm overflow-hidden bg-[#e8deca] shadow-inner relative">
                      <img
                        src={currentReason.polaroidImage}
                        alt={currentReason.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/polaroid:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-1.5 right-1.5 p-1 rounded-full bg-black/50 text-[#ffd700] opacity-0 group-hover/polaroid:opacity-100 transition-opacity">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Polaroid Handwritten Caption */}
                    <div className="pt-2 text-center">
                      <p className="font-['Dancing_Script'] text-sm sm:text-base text-[#3f2029] leading-snug font-semibold line-clamp-2">
                        &ldquo;{currentReason.polaroidQuote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Revealed Secret Love Note (Back face reveal) */}
                <div className="mt-2 p-3.5 rounded-lg bg-[#f5ecdc]/90 border border-[#cbb391] relative shadow-inner z-10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase tracking-wider font-serif text-[#8f1d2c] font-bold flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-[#8f1d2c] text-[#8f1d2c]" />
                      Secret Love Note
                    </span>
                    <WaxSeal label="LOVE" className="w-7 h-7 -mt-2 -mr-1" />
                  </div>
                  <p className="font-['Dancing_Script'] text-sm sm:text-base text-[#4a1525] leading-relaxed italic">
                    &ldquo;{revealedReason.secretNote}&rdquo;
                  </p>
                </div>

                {/* Left Page Footer */}
                <div className="pt-2 text-center text-[10px] text-[#8c6b4b] font-serif border-t border-[#785b3b]/20 flex items-center justify-between">
                  <span>Chapter {currentReason.number}</span>
                  <span className="italic">Page {currentReason.number * 2 - 1}</span>
                </div>
              </div>

              {/* -------------------------------------------------------- */}
              {/* RIGHT PAGE: The Heartfelt Reason (Spine Pivot Turning)   */}
              {/* -------------------------------------------------------- */}
              <div
                onClick={handleNextPage}
                className={`w-full md:w-1/2 right-page-gutter p-6 sm:p-10 rounded-b-xl md:rounded-b-none md:rounded-r-xl flex flex-col justify-between relative overflow-hidden cursor-pointer group select-none transition-all duration-300 ${
                  isTurning ? 'paper-curl-shadow' : ''
                }`}
              >
                {/* Gold corner ornaments on right page */}
                <div className="absolute top-3 right-3 pointer-events-none">
                  <GoldCornerBracket className="w-10 h-10 opacity-40 -top-1 -right-1 rotate-90" />
                </div>
                <div className="absolute bottom-3 right-3 pointer-events-none">
                  <GoldCornerBracket className="w-10 h-10 opacity-40 -bottom-1 -right-1 rotate-180" />
                </div>

                {/* Right Page Header */}
                <div className="flex items-center justify-between text-xs text-[#785b3b] font-serif border-b border-[#785b3b]/20 pb-2.5 z-10">
                  <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#8f1d2c]">
                    REASON {currentReason.number < 10 ? `0${currentReason.number}` : currentReason.number} OF {totalPages}
                  </span>
                  <span className="font-mono text-[10px] text-[#785b3b]">
                    § {activeTheme.name}
                  </span>
                </div>

                {/* Right Page Main Reading Content */}
                <div className="my-auto py-4 z-10 flex flex-col items-center text-center">
                  {/* Thematic SVG Emblem */}
                  <div className="mb-4 p-3 rounded-full bg-[#f4ecd8] border border-[#d4af37]/40 shadow-xs group-hover:scale-110 transition-transform">
                    <ReasonEmblem emblem={currentReason.emblem} className="w-8 h-8 text-[#8f1d2c]" />
                  </div>

                  {/* Chapter Headline Title */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#2a0e14] leading-snug mb-3">
                    {currentReason.title}
                  </h2>

                  <GoldFlourishDivider className="w-40 my-2" />

                  {/* Heartfelt Reason Body Prose */}
                  <div className="relative mt-3 px-2 sm:px-4">
                    <span className="text-3xl font-serif text-[#d4af37] leading-none absolute -top-3 -left-1 opacity-60">
                      &ldquo;
                    </span>
                    <p className="font-serif text-sm sm:text-base text-[#382025] leading-relaxed text-justify sm:text-center selection:bg-rose-200">
                      {currentReason.reason}
                    </p>
                    <span className="text-3xl font-serif text-[#d4af37] leading-none absolute -bottom-4 -right-1 opacity-60">
                      &rdquo;
                    </span>
                  </div>
                </div>

                {/* Right Page Bottom Interaction Hint */}
                <div className="pt-4 border-t border-[#785b3b]/20 flex items-center justify-between text-xs z-10">
                  <span className="text-[10px] text-[#8c6b4b] font-serif italic">
                    Page {currentReason.number * 2}
                  </span>

                  {currentPage >= totalPages - 1 ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8f1d2c] text-[#fff5db] text-xs font-serif font-bold shadow-md animate-pulse">
                      <span>Close Book 📕</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1 text-[11px] font-serif text-[#8f1d2c] group-hover:translate-x-1 transition-transform">
                      <span>Click to turn page</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reading Mode Navigation Bar Underneath */}
            <div className="flex items-center justify-between w-full max-w-4xl mt-5 px-3 py-2.5 rounded-xl bg-[#160d1b]/80 border border-[#d4af37]/30 backdrop-blur-md text-[#f4ecd8] text-xs sm:text-sm z-30 shadow-lg">
              {/* Prev Button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-all ${
                  currentPage === 0
                    ? 'opacity-30 border-white/5 cursor-not-allowed'
                    : 'border-[#d4af37]/40 text-[#ffd700] hover:bg-white/10 active:scale-95'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {reasons.map((r, idx) => (
                  <button
                    key={r.id || idx}
                    onClick={() => {
                      if (!isTurning) {
                        soundManager.playPageTurn();
                        setCurrentPage(idx);
                      }
                    }}
                    title={`Jump to Reason ${r.number}`}
                    className={`h-2 sm:h-2.5 rounded-full transition-all ${
                      idx === currentPage
                        ? 'w-6 sm:w-8 bg-gradient-to-r from-[#d4af37] to-[#ffd700]'
                        : idx < currentPage
                        ? 'w-2 sm:w-2.5 bg-[#d4af37]/60'
                        : 'w-2 sm:w-2.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Next / Close Book Button */}
              {currentPage >= totalPages - 1 ? (
                <button
                  onClick={handleCloseBook}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-rose-700 to-rose-600 text-white font-serif font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  <span>Close Book</span>
                  <span>📕</span>
                </button>
              ) : (
                <button
                  onClick={handleNextPage}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#d4af37]/40 text-[#ffd700] hover:bg-white/10 active:scale-95 transition-all"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. CELEBRATION COMPLETED REPLAY OVERLAY                         */}
        {/* ============================================================== */}
        {isCompleted && !isOpen && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl bg-[#1a0e1d]/95 border-2 border-[#ffd700]/70 shadow-2xl text-center backdrop-blur-md animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#3d0912] border border-[#ffd700] flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-[#f43f5e] fill-[#f43f5e] animate-pulse" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold gold-foil-text mb-2">
                Bound with Eternal Love
              </h2>
              <GoldFlourishDivider className="w-36 my-2" />
              <p className="text-xs sm:text-sm font-serif italic text-[#dfba4f] mt-3 mb-6 leading-relaxed">
                &ldquo;In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.&rdquo;
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleRestart}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-[#1b0d02] font-serif font-bold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>🌹 Read Again from the Beginning ✨</span>
                </button>

                <button
                  onClick={onOpenCustomizer}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-[#f4ecd8] text-xs font-medium border border-white/10 transition-colors"
                >
                  Edit or Add Custom Reasons &amp; Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard & Click Navigation Micro-Hint */}
      <div className="mt-4 text-center text-[11px] text-[#d1c2a5]/70 flex items-center justify-center gap-2.5 flex-wrap">
        <span>Arrow Keys / Swipe: Turn Page</span>
        <span aria-hidden="true">·</span>
        <span>Space: Next</span>
        <span aria-hidden="true">·</span>
        <span>Click Photo: Zoom In 🔍</span>
        <span aria-hidden="true">·</span>
        <span>M: Music</span>
        <span aria-hidden="true">·</span>
        <span>R: Restart</span>
      </div>
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-[#fdfdfc] p-4 sm:p-5 pb-7 rounded-xl shadow-2xl border-4 border-[#fffdfa] cursor-default animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setZoomedImage(null)}
              aria-label="Close photo preview"
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-stone-200 shadow-inner">
              <img
                src={zoomedImage}
                alt="Enlarged polaroid memory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="pt-3 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#9f1239] font-bold font-serif">
                {currentReason.dateLocation}
              </span>
              <p className="font-['Dancing_Script'] text-base sm:text-lg text-[#350a16] font-semibold mt-1">
                &ldquo;{currentReason.polaroidQuote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
