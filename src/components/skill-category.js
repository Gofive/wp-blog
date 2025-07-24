"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function SkillCategory({ category }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <motion.div
      className="relative bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-800 dark:text-slate-200 text-center">
        {category.title}
      </h3>

      <div className="space-y-3 sm:space-y-4">
        {category.skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="group/skill"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {/* Skill name and level */}
            <div className="flex justify-between items-center mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 group-hover/skill:text-slate-900 dark:group-hover/skill:text-slate-100 transition-colors duration-200">
                {skill.name}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                {skill.level}%
              </span>
            </div>

            {/* Progress bar container */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 sm:h-2 overflow-hidden relative">
              <motion.div
                className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.1 + 0.3,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={hoveredSkill === skill.name ? { x: "100%" } : { x: "-100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Pulsing effect for high-level skills */}
                {skill.level >= 85 && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2 + 1
                    }}
                  />
                )}
              </motion.div>

              {/* Skill level milestone indicators */}
              <div className="absolute inset-0 flex items-center">
                {[25, 50, 75].map((milestone) => (
                  <div
                    key={milestone}
                    className="absolute w-0.5 h-full bg-white/20"
                    style={{ left: `${milestone}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Skill level indicator */}
            <motion.div
              className="mt-1 text-xs text-slate-500 dark:text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredSkill === skill.name ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {skill.level >= 90 ? "专家级" :
                skill.level >= 80 ? "熟练" :
                  skill.level >= 70 ? "良好" : "入门"}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Category hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={false}
      />
    </motion.div>
  );
}