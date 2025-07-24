"use client";

import { motion } from "motion/react";

export default function ExperienceCard({ experience, index, isLast }) {
  const { company, position, duration, description, responsibilities, technologies } = experience;

  // Alternate layout for desktop - odd indices on right, even on left
  const isRight = index % 2 === 1;

  return (
    <div className={`relative flex items-center ${isRight ? 'md:flex-row-reverse' : ''}`}>
      {/* Timeline node */}
      <motion.div
        className="absolute left-4 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white dark:bg-slate-800 border-3 sm:border-4 border-blue-500 rounded-full transform -translate-x-1.5 sm:-translate-x-2 md:-translate-x-2 z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0.5 sm:inset-1 bg-blue-500 rounded-full"></div>
      </motion.div>

      {/* Card content */}
      <motion.div
        className={`ml-10 sm:ml-12 md:ml-0 md:w-1/2 ${isRight ? 'md:pr-6 lg:pr-8' : 'md:pl-6 lg:pl-8'}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
          {/* Header */}
          <div className="mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
              {position}
            </h3>
            <h4 className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              {company}
            </h4>
            <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              {duration}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 leading-relaxed">
            {description}
          </p>

          {/* Responsibilities */}
          {responsibilities && responsibilities.length > 0 && (
            <div className="mb-3 sm:mb-4">
              <h5 className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                主要职责：
              </h5>
              <ul className="space-y-1">
                {responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-start">
                    <span className="text-blue-500 mr-2 mt-1 sm:mt-1.5 flex-shrink-0 text-xs">•</span>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {technologies && technologies.length > 0 && (
            <div>
              <h5 className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                技术栈：
              </h5>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {technologies.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    className="px-1.5 sm:px-2 py-0.5 text-xs sm:text-sm bg-violet-500 text-zinc-100 rounded-md dark:bg-slate-600 dark:text-slate-200 font-medium"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Arrow pointing to timeline (desktop only) */}
        <div className={`hidden md:block absolute top-6 sm:top-8 ${isRight ? 'left-full' : 'right-full'} w-0 h-0`}>
          <div className={`w-0 h-0 border-t-6 sm:border-t-8 border-b-6 sm:border-b-8 border-transparent ${isRight
            ? 'border-r-6 sm:border-r-8 border-r-white dark:border-r-slate-800 -ml-px'
            : 'border-l-6 sm:border-l-8 border-l-white dark:border-l-slate-800 -mr-px'
            }`}></div>
        </div>
      </motion.div>
    </div>
  );
}