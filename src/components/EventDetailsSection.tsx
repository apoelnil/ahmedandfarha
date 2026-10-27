import React from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { EVENT_DETAILS } from '../utils/calendar';
import { useSectionInView } from '../hooks/useSectionInView';

interface EventDetailsSectionProps {
  onScrollToNext: () => void;
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({ onScrollToNext }) => {
  const googleMapsUrl = EVENT_DETAILS.locationUrl;
  const { ref, isInView } = useSectionInView(0.2);
  const transitionEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="details"
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
          EVENT DETAILS
        </span>
      </motion.div>

      {/* Main Content: Venue & Date */}
      <div className="my-auto py-6 max-w-lg mx-auto w-full flex flex-col items-center z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, delay: 0.25, ease: transitionEase }}
          className="text-[11px] sm:text-xs tracking-[0.3em] font-light text-[#E0D8CB]/75 uppercase mb-3"
        >
          VENUE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, delay: 0.35, ease: transitionEase }}
          className="text-2xl sm:text-4xl tracking-[0.16em] font-light text-[#E0D8CB] uppercase mb-3"
        >
          {EVENT_DETAILS.venue}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 0.5, ease: transitionEase }}
          className="text-xs sm:text-sm tracking-[0.2em] font-light text-[#E0D8CB]/80 uppercase mb-8 sm:mb-10 max-w-xs sm:max-w-md"
        >
          {EVENT_DETAILS.address}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: transitionEase }}
          className="w-12 h-px bg-[#E0D8CB]/25 mb-8 sm:mb-10"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, delay: 0.75, ease: transitionEase }}
          className="text-[11px] sm:text-xs tracking-[0.3em] font-light text-[#E0D8CB]/75 uppercase mb-2"
        >
          DATE &amp; TIME
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 0.85, ease: transitionEase }}
          className="text-base sm:text-lg tracking-[0.2em] font-light text-[#E0D8CB] uppercase mb-1"
        >
          {EVENT_DETAILS.dateFormatted}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, delay: 0.95, ease: transitionEase }}
          className="text-xs sm:text-sm tracking-[0.25em] font-light text-[#E0D8CB]/70 uppercase mb-8 sm:mb-10"
        >
          AT {EVENT_DETAILS.timeFormatted}
        </motion.p>

        {/* Single minimal View Location button */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.96 }}
          transition={{ duration: 0.9, delay: 1.05, ease: transitionEase }}
          className="w-full flex justify-center"
        >
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full border border-[#E0D8CB]/40 text-xs tracking-[0.25em] font-light text-[#E0D8CB] hover:bg-[#E0D8CB] hover:text-[#080103] transition-all duration-300 uppercase cursor-pointer"
          >
            <span>VIEW LOCATION</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[1.5]" />
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="pb-4 z-10">
        <button
          onClick={onScrollToNext}
          className="flex flex-col items-center gap-1 text-[#E0D8CB]/50 hover:text-[#E0D8CB] transition-colors cursor-pointer focus:outline-none"
          aria-label="Scroll to save the date"
        >
          <ChevronDown className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>
      </div>
    </section>
  );
};
