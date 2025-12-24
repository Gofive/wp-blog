"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronUp, User, Code, Briefcase, FolderOpen, Mail } from "lucide-react";

const navItems = [
  { id: "hero", label: "关于", icon: User },
  { id: "skills", label: "技能", icon: Code },
  { id: "experience", label: "经历", icon: Briefcase },
  { id: "projects", label: "项目", icon: FolderOpen },
  { id: "contact", label: "联系", icon: Mail },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    const handleScroll = () => {
      const scrollY = mainContent.scrollTop;

      // Show floating nav after scrolling 300px
      setIsVisible(scrollY > 300);

      // Find active section
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const currentSection = sections.find(section => {
        if (!section.element) return false;

        const rect = section.element.getBoundingClientRect();
        // Since the scroll container is offset, we should check relative to the container or viewport
        // getBoundingClientRect is relative to viewport. If mainContent starts at top: 56px, then we should adjust.
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    mainContent.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => mainContent.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const mainContent = document.getElementById('main-content');
    if (element && mainContent) {
      const offsetTop = element.offsetTop - 20; // Simplified offset for independent scroll

      mainContent.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          {/* Navigation dots */}
          <div className="flex flex-col space-y-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-slate-200 dark:border-slate-700">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group p-2 rounded-full transition-all duration-200 ${isActive
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`跳转到${item.label}部分`}
                >
                  <Icon size={16} />

                  {/* Tooltip */}
                  <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-slate-900 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {item.label}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900 dark:border-l-slate-700"></div>
                    </div>
                  </div>
                </motion.button>
              );
            })}

            {/* Scroll to top button */}
            <div className="w-full h-px bg-slate-200 dark:bg-slate-600 my-1"></div>
            <motion.button
              onClick={scrollToTop}
              className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="回到顶部"
            >
              <ChevronUp size={16} />

              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-slate-900 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  回到顶部
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900 dark:border-l-slate-700"></div>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}