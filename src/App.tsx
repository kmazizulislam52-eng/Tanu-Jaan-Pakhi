import React, { useState, useEffect, useCallback } from 'react';
import { ReasonItem } from './types';
import { DEFAULT_REASONS } from './data/defaultReasons';
import { AtmosphereCanvas } from './components/AtmosphereCanvas';
import { Book3D } from './components/Book3D';
import { TopBar } from './components/TopBar';
import { CustomizerModal } from './components/CustomizerModal';
import { CreditsModal } from './components/CreditsModal';
import { PhotoGalleryModal } from './components/PhotoGalleryModal';
import { soundManager } from './services/audioEngine';

const STORAGE_KEY = 'ek_torfa_valobasha_bengali_v3';

export default function App() {
  const [reasons, setReasons] = useState<ReasonItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const isBengaliStory = parsed.some((r: ReasonItem) => r.chapterLabel || r.title?.includes('গল্প'));
          if (isBengaliStory) {
            return parsed;
          }
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_REASONS;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState<boolean>(false);
  const [isPhotoGalleryOpen, setIsPhotoGalleryOpen] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  // Trigger celebration finale confetti
  const handleTriggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 7000);
  }, []);

  const handleSaveReasons = (newReasons: ReasonItem[]) => {
    setReasons(newReasons);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newReasons));
    } catch {
      // ignore
    }
  };

  const handleResetDefaults = () => {
    setReasons(DEFAULT_REASONS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleToggleMusic = () => {
    const playing = soundManager.toggleMusic();
    setIsMusicPlaying(playing);
  };

  // Keyboard shortcut for music toggle
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
          handleToggleMusic();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0b060f] text-[#f4ecd8] overflow-hidden selection:bg-[#d4af37]/30 selection:text-[#ffd700]">
      {/* Triple-Canvas Atmosphere Engine: Stars, Petals, Stardust Trail, Confetti & Candlelight */}
      <AtmosphereCanvas showFinaleConfetti={showConfetti} />

      {/* Top Bar Navigation */}
      <TopBar
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenCredits={() => setIsCreditsOpen(true)}
        onOpenPhotoGallery={() => setIsPhotoGalleryOpen(true)}
        onToggleMusic={handleToggleMusic}
        isMusicPlaying={isMusicPlaying}
      />

      {/* Main 3D Keepsake Stage */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center">
        <Book3D
          reasons={reasons}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onTriggerConfetti={handleTriggerConfetti}
        />
      </main>

      {/* Quiet Footer with unboxed metadata and author credits */}
      <footer className="relative z-20 px-6 py-3 border-t border-[#d4af37]/15 bg-[#08040a]/80 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between text-xs text-[#d1c2a5]/70 gap-2">
        <div className="flex items-center gap-2 font-suttoni">
          <span>লেখক: কেএম আজিজুল ইসলাম</span>
          <span aria-hidden="true">·</span>
          <a
            href="https://www.facebook.com/km.azizul.islam.122576"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ffd700] text-[#ffd700]/90 transition-colors underline decoration-[#d4af37]/40 underline-offset-2 flex items-center gap-1"
          >
            <span>Facebook প্রোফাইল</span>
          </a>
        </div>

        <div className="font-suttoni text-[#ffd700]/80 text-center sm:text-right text-[13px]">
          &ldquo;একটি ছোট্ট ধাক্কা থেকে শুরু, তারপর সারাজীবন একসঙ্গে থাকার গল্প।&rdquo;
        </div>
      </footer>

      {/* Photo Memories Keepsake Gallery Modal */}
      <PhotoGalleryModal
        isOpen={isPhotoGalleryOpen}
        onClose={() => setIsPhotoGalleryOpen(false)}
      />

      {/* Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        reasons={reasons}
        onSaveReasons={handleSaveReasons}
        onResetDefaults={handleResetDefaults}
      />

      {/* Credits / Story Modal */}
      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
      />
    </div>
  );
}
