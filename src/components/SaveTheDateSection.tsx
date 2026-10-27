import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { getGoogleCalendarUrl, getAppleCalendarUrl, EVENT_DETAILS } from '../utils/calendar';
import { useSectionInView } from '../hooks/useSectionInView';

export const SaveTheDateSection: React.FC = () => {
  const [appleCalendarUrl, setAppleCalendarUrl] = useState('/invite.ics');
  const { ref, isInView } = useSectionInView(0.2);
  const transitionEase = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    setAppleCalendarUrl(getAppleCalendarUrl());
  }, []);

  const googleUrl = getGoogleCalendarUrl();

  return (
    <section
      id="save-the-date"
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
          SAVE THE DATE
        </span>
      </motion.div>

      {/* Main Content: Calendar Actions & Completed Message */}
      <div className="my-auto py-6 max-w-sm sm:max-w-md mx-auto w-full flex flex-col items-center z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, delay: 0.25, ease: transitionEase }}
          className="text-3xl sm:text-5xl font-light text-[#E0D8CB] tracking-[0.15em] uppercase mb-2"
        >
          {EVENT_DETAILS.dateShort}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 0.4, ease: transitionEase }}
          className="text-[11px] sm:text-xs tracking-[0.25em] font-light text-[#E0D8CB]/75 uppercase mb-8 sm:mb-10"
        >
          FRIDAY · 06:00 PM
        </motion.p>

        {/* Minimal Direct Calendar Sync Buttons */}
        <div className="w-full flex flex-col gap-3 mb-8 sm:mb-10">
          <motion.a
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.97 }}
            transition={{ duration: 0.8, delay: 0.55, ease: transitionEase }}
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 rounded-full border border-[#E0D8CB]/40 text-xs tracking-[0.25em] font-light text-[#E0D8CB] hover:bg-[#E0D8CB] hover:text-[#080103] transition-all duration-300 uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>GOOGLE CALENDAR</span>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.97 }}
            transition={{ duration: 0.8, delay: 0.7, ease: transitionEase }}
            href={appleCalendarUrl}
            className="w-full py-3 px-6 rounded-full border border-[#E0D8CB]/40 text-xs tracking-[0.25em] font-light text-[#E0D8CB] hover:bg-[#E0D8CB] hover:text-[#080103] transition-all duration-300 uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>APPLE CALENDAR</span>
          </motion.a>
        </div>

        {/* Completed Celebration Message */}
        <div className="flex flex-col items-center gap-2 px-2">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: transitionEase }}
            className="w-10 h-px bg-[#E0D8CB]/25 mb-1"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.8, delay: 0.95, ease: transitionEase }}
            className="text-xs sm:text-sm tracking-[0.22em] font-light text-[#E0D8CB] uppercase leading-relaxed text-center"
          >
            {EVENT_DETAILS.celebrationMessage}
          </motion.p>
        </div>
      </div>

      {/* Minimal Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: transitionEase }}
        className="pb-4 z-10 text-center"
      >
        <p className="text-[10px] tracking-[0.3em] font-light text-[#E0D8CB]/40 uppercase">
          AHMED &amp; FARHA · 2026
        </p>
      </motion.footer>
    </section>
  );
};
