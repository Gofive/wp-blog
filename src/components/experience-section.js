"use client";

import { motion } from "motion/react";
import ExperienceCard from "./experience-card";
import aboutDataManager from "../lib/about-data-manager.js";

export default function ExperienceSection() {
  const { experiences } = aboutDataManager.getExperienceData();

  return (
    <motion.section
      id="experience"
      className="py-12 sm:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2
        id="experience-heading"
        className="text-xl sm:text-2xl font-bold mb-8 text-slate-900 dark:text-slate-50 border-b pb-2"
      >
        工作经历
      </h2>

      <div className="space-y-12">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            experience={experience}
            index={index}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </motion.section>
  );
}