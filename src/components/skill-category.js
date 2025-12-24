"use client";

import { motion } from "motion/react";

export default function SkillCategory({ category }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
        {category.title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, index) => (
          <div
            key={skill.name}
            className="px-3 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm"
          >
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}