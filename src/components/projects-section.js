"use client";

import { motion } from "motion/react";
import ProjectCard from "./project-card";
import aboutDataManager from "../lib/about-data-manager.js";

export default function ProjectsSection() {
  const { featured, all } = aboutDataManager.getProjectsData();

  return (
    <motion.section
      id="projects"
      className="py-12 sm:py-16 lg:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        id="projects-heading"
        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center text-slate-900 dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        项目作品
      </motion.h2>

      <motion.p
        className="text-sm sm:text-base text-slate-600 dark:text-slate-300 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        以下是我参与开发的一些项目，涵盖了前端、后端、移动端等多个技术领域
      </motion.p>

      {/* Featured projects */}
      <div className="mb-8 sm:mb-12">
        <motion.h3
          className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-800 dark:text-slate-200"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          精选项目
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {featured.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* All projects */}
      <div>
        <motion.h3
          className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-800 dark:text-slate-200"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          更多项目
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {all.filter(project => !project.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-30px" }}
            >
              <ProjectCard
                project={project}
                index={index + featured.length}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <motion.div
        className="text-center mt-8 sm:mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
          想了解更多项目详情或进行技术交流？
        </p>
        <motion.a
          href="#contact"
          className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          联系我
        </motion.a>
      </motion.div>
    </motion.section>
  );
}