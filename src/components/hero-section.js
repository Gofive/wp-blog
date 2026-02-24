'use client';

import { motion } from 'motion/react';
import { OptimizedAvatar } from './optimized-image';
import aboutDataManager from '../lib/about-data-manager.js';

export default function HeroSection() {
  const { personalInfo } = aboutDataManager.getHeroData();

  return (
    <motion.section
      id="hero"
      className="py-8 sm:py-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-8 md:gap-10">
        {/* Top Info Section: Avatar + Name & Title */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-8 lg:gap-12 text-center sm:text-left">
          <motion.div
            className="w-20 h-20 md:w-24 md:h-24 relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <OptimizedAvatar
              src={personalInfo.avatar.src}
              alt={personalInfo.avatar.alt}
              size={120}
              className="w-full h-full rounded-[2rem] object-cover"
              fallbackInitials={personalInfo.avatar.fallbackInitials}
            />
          </motion.div>

          <div className="flex flex-col justify-center">
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-3"
            >
              {personalInfo.name}
            </h1>
            <div className="inline-block">
              <span className="text-base sm:text-lg font-semibold px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {personalInfo.title}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Content Section: Bio & Buttons */}
        <div className="flex-1 text-center sm:text-left">
          <div className="space-y-4">
            <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 max-w-3xl">
              {personalInfo.bio.primary}
            </p>
            {personalInfo.bio.secondary && (
              <p className="text-sm sm:text-base leading-relaxed text-slate-500 dark:text-slate-400 max-w-3xl">
                {personalInfo.bio.secondary}
              </p>
            )}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8 justify-center sm:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-slate-50 dark:text-slate-900 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
            >
              联系我
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              查看作品
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
