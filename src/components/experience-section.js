"use client";

import { motion } from "motion/react";
import ExperienceCard from "./experience-card";
import aboutDataManager from "../lib/about-data-manager.js";

export default function ExperienceSection() {
  const { experiences } = aboutDataManager.getExperienceData();

  return (
    <motion.section
      id="experience"
      className="py-12 sm:py-16 lg:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        id="experience-heading"
        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center text-slate-900 dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        工作经历
      </motion.h2>

      <div className="relative">
        {/* Animated Timeline line */}
        <motion.div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 transform md:-translate-x-0.5"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ transformOrigin: "top" }}
        />

        <div className="space-y-8 sm:space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <ExperienceCard
                experience={experience}
                index={index}
                isLast={index === experiences.length - 1}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}