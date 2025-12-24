"use client";

import { motion } from "motion/react";
import { Github, ExternalLink, CheckCircle2, Target } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const { title, description, responsibilities, results, technologies, links } = project;
  const { github, demo } = links || {};

  return (
    <div className="group p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <div className="flex gap-2">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 transition-colors"
              aria-label={`查看 ${title} 的源码`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 transition-colors"
              aria-label={`查看 ${title} 的演示`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {/* Project Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
          {description}
        </p>

        {/* Responsibilities */}
        {responsibilities && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <Target className="w-3 h-3" />
              <span>核心任务</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {responsibilities}
            </p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <CheckCircle2 className="w-3 h-3" />
              <span>项目成效</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {results}
            </p>
          </div>
        )}
      </div>

      {/* Technologies */}
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}