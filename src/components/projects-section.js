"use client";

import { motion } from "motion/react";
import ProjectCard from "./project-card";
import aboutDataManager from "../lib/about-data-manager.js";

export default function ProjectsSection() {
  const { featured, all } = aboutDataManager.getProjectsData();

  return (
    <motion.section
      id="projects"
      className="py-12 sm:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2
        id="projects-heading"
        className="text-xl sm:text-2xl font-bold mb-8 text-slate-900 dark:text-slate-50 border-b pb-2"
      >
        项目作品
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
        {all.filter(project => !project.featured).map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index + featured.length}
          />
        ))}
      </div>
    </motion.section>
  );
}