"use client";

import { motion } from "motion/react";

export default function ExperienceCard({ experience, index, isLast }) {
  const { company, position, duration, description, responsibilities, technologies } = experience;

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
      {/* Date/Duration */}
      <div className="md:w-32 shrink-0 md:pt-1">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {duration}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            {position}
          </h3>
          <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {company}
          </h4>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>

        {responsibilities && responsibilities.length > 0 && (
          <ul className="space-y-1">
            {responsibilities.map((responsibility, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-start italic">
                {responsibility}
              </li>
            ))}
          </ul>
        )}

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700 font-bold"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}