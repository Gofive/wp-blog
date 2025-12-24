"use client";

import { motion } from "motion/react";
import SkillCategory from "./skill-category";
import aboutDataManager from "../lib/about-data-manager.js";

export default function SkillsSection() {
  const { categories } = aboutDataManager.getSkillsData();

  return (
    <motion.section
      id="skills"
      className="py-12 sm:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2
        id="skills-heading"
        className="text-xl sm:text-2xl font-bold mb-8 text-slate-900 dark:text-slate-50 border-b pb-2"
      >
        技术系统
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {categories.map((category, index) => (
          <SkillCategory key={category.title} category={category} />
        ))}
      </div>
    </motion.section>
  );
}