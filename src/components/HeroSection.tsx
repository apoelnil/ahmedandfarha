import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useCountdown } from '../hooks/useCountdown';
import { useSectionInView } from '../hooks/useSectionInView';

interface HeroSectionProps {
  onScrollToNext: () => void;
}

const FlourishArrowLeft: React.FC = () => (
  <svg
    viewBox="0 0 140 18"
    className="w-20 sm:w-28 md:w-36 h-3 sm:h-4 text-[#E0D8CB]/85 shrink"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M 2 9 L 14 4.5 C 12 7.5 12 10.5 14 13.5 Z" />
    <path d="M 12 9 C 13.5 5.5 17 4.5 20 6.5 C 18 8 16 8.8 15 9 C 16 9.2 18 10 20 11.5 C 17 13.5 13.5 12.5 12 9 Z" />
    <polygon points="21,9 24.5,6.5 28,9 24.5,11.5" />
    <line x1="28" y1="9" x2="140" y2="9" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const FlourishArrowRight: React.FC = () => (
  <svg
    viewBox="0 0 140 18"
    className="w-20 sm:w-28 md:w-36 h-3 sm:h-4 text-[#E0D8CB]/85 shrink"
    fill="currentColor"
    style={{ transform: 'scaleX(-1)' }}
    aria-hidden="true"
  >
    <path d="M 2 9 L 14 4.5 C 12 7.5 12 10.5 14 13.5 Z" />
    <path d="M 12 9 C 13.5 5.5 17 4.5 20 6.5 C 18 8 16 8.8 15 9 C 16 9.2 18 10 20 11.5 C 17 13.5 13.5 12.5 12 9 Z" />
    <polygon points="21,9 24.5,6.5 28,9 24.5,11.5" />
    <line x1="28" y1="9" x2="140" y2="9" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToNext }) => {
  const countdown = useCountdown('2026-11-13T18:00:00');
  const { ref, isInView } = useSectionInView(0.2);

  const transitionEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="hero"
      ref={ref}
      className="scroll-section-snap h-screen w-full relative flex flex-col justify-between items-center text-center px-6 py-6 sm:py-8 bg-vignette select-none overflow-hidden"
    >
      {/* Top Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
        transition={{ duration: 0.9, delay: 0.1, ease: transitionEase }}
        className="flex flex-col items-center pt-2 sm:pt-4 z-10"
      >
        <div className="w-px h-10 sm:h-12 bg-[#E0D8CB]/25 mb-3" />
        <button
          onClick={onScrollToNext}
          className="flex flex-col items-center gap-1.5 text-[#E0D8CB]/65 hover:text-[#E0D8CB] transition-colors cursor-pointer focus:outline-none"
          aria-label="Scroll to continue"
        >
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-light">
            SCROLL
          </span>
          <ChevronDown className="w-3.5 h-3.5 stroke-[1.5] text-[#E0D8CB]/60 animate-bounce" />
        </button>
      </motion.div>

      {/* Center Main Content */}
      <div className="my-auto py-4 max-w-xl mx-auto w-full flex flex-col items-center z-10">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.9, delay: 0.25, ease: transitionEase }}
          className="text-[11px] sm:text-xs tracking-[0.3em] font-light text-[#E0D8CB]/85 uppercase mb-3 sm:mb-5"
        >
          THE BEGINNING OF FOREVER
        </motion.p>

        {/* AHMED & FARHA Title Lockup */}
        <div className="flex flex-col items-center my-4 sm:my-6 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 1.0, delay: 0.45, ease: transitionEase }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#E0D8CB] tracking-[0.24em] uppercase leading-none"
          >
            AHMED
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.0, delay: 0.65, ease: transitionEase }}
            className="flex items-center justify-center gap-3 sm:gap-4 my-2.5 sm:my-3.5 w-full max-w-xs sm:max-w-md"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.9, delay: 0.75, ease: transitionEase }}
            >
              <FlourishArrowLeft />
            </motion.div>

            <span
              className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#E0D8CB] leading-none px-1 select-none font-normal"
              style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", Georgia, serif' }}
            >
              &amp;
            </span>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.9, delay: 0.75, ease: transitionEase }}
            >
              <FlourishArrowRight />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 1.0, delay: 0.85, ease: transitionEase }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#E0D8CB] tracking-[0.24em] uppercase leading-none"
          >
            FARHA
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 1.05, ease: transitionEase }}
          className="text-[11px] sm:text-xs tracking-[0.3em] font-light text-[#E0D8CB]/85 uppercase mb-2 sm:mb-2.5"
        >
          OUR ENGAGEMENT
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 1.2, ease: transitionEase }}
          className="text-[11px] sm:text-xs tracking-[0.25em] font-light text-[#E0D8CB]/70 uppercase"
        >
          FRIDAY · 13 NOVEMBER 2026
        </motion.p>

        {/* Countdown Timer: positioned directly under the date, 20% smaller */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 1.0, delay: 1.35, ease: transitionEase }}
          className="w-full max-w-xs sm:max-w-sm mx-auto mt-6 sm:mt-8 scale-[0.80] origin-top"
        >
          <div className="grid grid-cols-4 items-center">
            {/* Days */}
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-light text-[#E0D8CB] tabular-nums tracking-wider">
                {String(countdown.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-light text-[#E0D8CB]/60 uppercase mt-1">
                DAYS
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center border-l border-[#E0D8CB]/20">
              <span className="text-3xl sm:text-4xl md:text-5xl font-light text-[#E0D8CB] tabular-nums tracking-wider">
                {String(countdown.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-light text-[#E0D8CB]/60 uppercase mt-1">
                HOURS
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center border-l border-[#E0D8CB]/20">
              <span className="text-3xl sm:text-4xl md:text-5xl font-light text-[#E0D8CB] tabular-nums tracking-wider">
                {String(countdown.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-light text-[#E0D8CB]/60 uppercase mt-1">
                MINUTES
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center border-l border-[#E0D8CB]/20">
              <span className="text-3xl sm:text-4xl md:text-5xl font-light text-[#E0D8CB] tabular-nums tracking-wider">
                {String(countdown.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-light text-[#E0D8CB]/60 uppercase mt-1">
                SECONDS
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom subtle balancing space */}
      <div className="pb-6 sm:pb-8" aria-hidden="true" />
    </section>
  );
};
