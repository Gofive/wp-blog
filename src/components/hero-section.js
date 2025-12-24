"use client";

import { motion } from "motion/react";
import { OptimizedAvatar } from "./optimized-image";
import aboutDataManager from "../lib/about-data-manager.js";

export default function HeroSection() {
  const { personalInfo } = aboutDataManager.getHeroData();

  return (
    <motion.section
      id="hero"
      className="py-12 sm:py-16"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Avatar Section */}
        <motion.div
          className="w-32 h-32 md:w-40 md:h-40 relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-full h-full rounded-xl overflow-hidden bg-white dark:bg-slate-900 flex items-center justify-center">
            <OptimizedAvatar
              src={personalInfo.avatar.src}
              alt={personalInfo.avatar.alt}
              size={128}
              className="w-20 h-20 md:w-28 md:h-28 object-contain"
              fallbackInitials={personalInfo.avatar.fallbackInitials}
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="flex-1 text-center md:text-left">
          <h1
            id="hero-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2"
          >
            {personalInfo.name}
          </h1>

          <p className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-4">
            {personalInfo.title}
          </p>

          <div className="space-y-4">
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
              {personalInfo.bio.primary}
            </p>
            {personalInfo.bio.secondary && (
              <p className="text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-500 max-w-2xl">
                {personalInfo.bio.secondary}
              </p>
            )}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-slate-50 dark:text-slate-900 rounded-md hover:opacity-90 transition-opacity shadow-sm"
            >
              联系我
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              查看作品
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}