"use client";

import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import { OptimizedProjectImage } from "./optimized-image";

export default function ProjectCard({ project, index }) {
  const { title, description, technologies, links, image, featured } = project;
  const { github, demo } = links || {};

  return (
    <motion.div
      className="group relative bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
          <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full">
            精选
          </span>
        </div>
      )}

      {/* Project image */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <OptimizedProjectImage
          src={image}
          alt={`${title} 项目预览图`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay with links */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-3 sm:space-x-4">
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`查看 ${title} 的源码`}
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300" />
              </motion.a>
            )}
            {demo && (
              <motion.a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`查看 ${title} 的演示`}
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300" />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Project content */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 leading-relaxed overflow-hidden" style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>
          {description}
        </p>

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {technologies.map((tech, idx) => (
                <motion.span
                  key={idx}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md font-medium hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Links (mobile fallback) */}
        <div className="flex space-x-4 lg:hidden">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>源码</span>
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>演示</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}