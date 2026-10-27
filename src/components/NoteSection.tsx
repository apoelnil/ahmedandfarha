import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useSectionInView } from '../hooks/useSectionInView';
import { CHILDHOOD_PHOTO_SRC } from '../assets/images/childhoodData';

interface NoteSectionProps {
  onScrollToNext: () => void;
}

export const NoteSection: React.FC<NoteSectionProps> = ({ onScrollToNext }) => {
  const { ref, isInView } = useSectionInView(0.2);
  const transitionEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="note"
      ref={ref}
      className="scroll-section-snap h-screen w-full relative flex flex-col justify-between items-center text-center px-6 py-6 sm:py-8 bg-vignette select-none overflow-hidden"
    >
      {/* Top Section Lead */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: 0.8, delay: 0.15, ease: transitionEase }}
        className="flex flex-col items-center pt-2 sm:pt-4 z-10"
      >
        <div className="w-px h-8 sm:h-10 bg-[#E0D8CB]/25 mb-3" />
        <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-light text-[#E0D8CB]/70 uppercase">
          A NOTE FROM US
        </span>
      </motion.div>

      {/* Main Content: Framed Photo & Quote */}
      <div className="my-auto py-4 max-w-sm sm:max-w-md mx-auto w-full flex flex-col items-center z-10">
        {/* Photo with thin beige frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 1.0, delay: 0.3, ease: transitionEase }}
          className="relative mb-6 sm:mb-8"
        >
          <div className="p-1 sm:p-1.5 border border-[#E0D8CB]/35 rounded-xs shadow-2xl bg-black/20">
            <img
              src={CHILDHOOD_PHOTO_SRC}
              alt="Ahmed & Farha"
              loading="eager"
              decoding="async"
              className="w-48 sm:w-56 h-64 sm:h-72 object-cover object-top filter contrast-[1.03] brightness-[0.98]"
            />
          </div>
        </motion.div>

        {/* Minimal Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 0.55, ease: transitionEase }}
          className="text-sm sm:text-base font-light text-[#E0D8CB] leading-relaxed italic max-w-xs sm:max-w-sm mb-4"
        >
          &ldquo;In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.&rdquo;
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.7, ease: transitionEase }}
          className="text-xs sm:text-sm tracking-[0.25em] font-light text-[#E0D8CB]/80 uppercase"
        >
          AHMED &amp; FARHA
        </motion.p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="pb-4 z-10">
        <button
          onClick={onScrollToNext}
          className="flex flex-col items-center gap-1 text-[#E0D8CB]/50 hover:text-[#E0D8CB] transition-colors cursor-pointer focus:outline-none"
          aria-label="Scroll to event details"
        >
          <ChevronDown className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>
      </div>
    </section>
  );
};
