/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Music } from 'lucide-react';
import { ambientPlayer } from './utils/audio';
import { HeroSection } from './components/HeroSection';
import { NoteSection } from './components/NoteSection';
import { EventDetailsSection } from './components/EventDetailsSection';
import { SaveTheDateSection } from './components/SaveTheDateSection';
import { FloralPetals } from './components/FloralPetals';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Autoplay wedding_music.mp3 with instant synchronous touch-unlock for mobile devices
  useEffect(() => {
    const unsubscribe = ambientPlayer.subscribe((playing, muted) => {
      setIsPlaying(playing);
      setIsMuted(muted);
    });

    // Synchronous touch activation for iOS/Android
    const handleGesture = () => {
      if (ambientPlayer.isExplicitlyMuted()) return;
      ambientPlayer.unlockAndPlay();
    };

    // 1. Attempt immediate playback on load
    ambientPlayer.unlockAndPlay();

    // 2. Attach synchronous user gesture listeners (required by iOS Safari and mobile Chrome)
    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('touchend', handleGesture, { passive: true });
    window.addEventListener('pointerdown', handleGesture, { passive: true });
    window.addEventListener('click', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('touchend', handleGesture);
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, []);

  const toggleMusic = () => {
    ambientPlayer.toggle();
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#080103] text-[#E0D8CB] font-sans selection:bg-[#E0D8CB] selection:text-[#080103] overflow-hidden">
      {/* Subtle Falling Floral Petals Effect */}
      <FloralPetals />

      {/* Fixed Minimal Top-Right Music Toggle with Clear On/Off State */}
      <div className="fixed top-6 right-6 sm:top-8 sm:right-8 z-50 flex items-center gap-2">
        <button
          onClick={toggleMusic}
          aria-label={isMuted ? 'Unmute wedding music' : 'Mute wedding music'}
          title={isMuted ? 'Music Muted (Click to play)' : 'Music Playing (Click to mute)'}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none backdrop-blur-xs relative group ${
            isPlaying
              ? 'border-[#E0D8CB] text-[#E0D8CB] bg-[#3a0812]/50 shadow-[0_0_12px_rgba(224,216,203,0.25)]'
              : isMuted
              ? 'border-[#E0D8CB]/30 text-[#E0D8CB]/50 bg-[#080103]/60 hover:text-[#E0D8CB] hover:border-[#E0D8CB]/70'
              : 'border-[#E0D8CB]/70 text-[#E0D8CB] bg-[#3a0812]/30 animate-pulse'
          }`}
        >
          <Music
            className={`w-4 h-4 transition-transform ${
              isPlaying
                ? 'scale-110 animate-pulse'
                : isMuted
                ? 'opacity-50 scale-95'
                : 'opacity-90 scale-100'
            }`}
          />

          {/* Subtle playing dot indicator */}
          {isPlaying && (
            <span className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#E0D8CB] shadow-xs" />
          )}

          {/* Minimal slash ONLY when the user explicitly muted */}
          {isMuted && (
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-5 h-[1.5px] bg-[#E0D8CB]/45 rotate-45 transform origin-center" />
            </span>
          )}
        </button>
      </div>

      {/* Main Single-Column Full-Screen Snap Container */}
      <main
        ref={scrollContainerRef}
        className="scroll-container-snap w-full h-full focus:outline-none"
        tabIndex={0}
      >
        <HeroSection onScrollToNext={() => scrollToSection('note')} />
        <NoteSection onScrollToNext={() => scrollToSection('details')} />
        <EventDetailsSection onScrollToNext={() => scrollToSection('save-the-date')} />
        <SaveTheDateSection />
      </main>
    </div>
  );
}
