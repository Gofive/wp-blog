"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { initPerformanceMonitoring, preloadCriticalResources } from "@/lib/performance-utils";

// Dynamic imports for better code splitting
const HeroSection = dynamic(() => import("@/components/hero-section"), {
  loading: () => <SectionSkeleton height="h-64" />,
  ssr: true
});

const SkillsSection = dynamic(() => import("@/components/skills-section"), {
  loading: () => <SectionSkeleton height="h-96" />,
  ssr: false
});

const ExperienceSection = dynamic(() => import("@/components/experience-section"), {
  loading: () => <SectionSkeleton height="h-80" />,
  ssr: false
});

const ProjectsSection = dynamic(() => import("@/components/projects-section"), {
  loading: () => <SectionSkeleton height="h-96" />,
  ssr: false
});

const ContactSection = dynamic(() => import("@/components/contact-section"), {
  loading: () => <SectionSkeleton height="h-48" />,
  ssr: false
});

const FloatingNav = dynamic(() => import("@/components/floating-nav"), {
  ssr: false
});

// Loading skeleton component
function SectionSkeleton({ height = "h-64" }) {
  return (
    <div className={`animate-pulse ${height} bg-slate-100 dark:bg-slate-800 rounded-lg mb-8`}>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export default function AboutPageClient() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Global scroll progress for the entire page
  const { scrollYProgress: globalScrollProgress } = useScroll();

  // Initialize performance monitoring and preload critical resources
  useEffect(() => {
    initPerformanceMonitoring();

    // Preload critical images
    preloadCriticalResources([
      { type: 'image', href: '/iwb.png' },
      { type: 'image', href: '/projects/blog-preview.svg' },
      { type: 'image', href: '/projects/dashboard-preview.svg' }
    ]);

    // Add smooth scrolling behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle anchor link clicks for smooth scrolling
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const href = target.getAttribute('href');
        const targetElement = document.querySelector(href);

        if (targetElement) {
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80; // 80px offset for header

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listener for anchor clicks
    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Parallax transforms for different sections
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const skillsY = useTransform(scrollYProgress, [0.2, 0.6], [50, -50]);
  const experienceY = useTransform(scrollYProgress, [0.4, 0.8], [50, -50]);
  const projectsY = useTransform(scrollYProgress, [0.6, 1], [50, -50]);

  return (
    <motion.main
      ref={containerRef}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      role="main"
      aria-label="关于 IMWIND 的个人简历页面"
    >


      <div className="space-y-12 sm:space-y-16 lg:space-y-20">
        {/* Hero Section with parallax */}
        <motion.section
          id="hero"
          style={{ y: heroY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          aria-labelledby="hero-heading"
        >
          <HeroSection />
        </motion.section>

        {/* Skills Section with parallax */}
        <motion.section
          id="skills"
          style={{ y: skillsY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          aria-labelledby="skills-heading"
        >
          <Suspense fallback={<SectionSkeleton height="h-96" />}>
            <SkillsSection />
          </Suspense>
        </motion.section>

        {/* Experience Section with parallax */}
        <motion.section
          id="experience"
          style={{ y: experienceY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          aria-labelledby="experience-heading"
        >
          <Suspense fallback={<SectionSkeleton height="h-80" />}>
            <ExperienceSection />
          </Suspense>
        </motion.section>

        {/* Projects Section with parallax */}
        <motion.section
          id="projects"
          style={{ y: projectsY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          aria-labelledby="projects-heading"
        >
          <Suspense fallback={<SectionSkeleton height="h-96" />}>
            <ProjectsSection />
          </Suspense>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          aria-labelledby="contact-heading"
        >
          <Suspense fallback={<SectionSkeleton height="h-48" />}>
            <ContactSection />
          </Suspense>
        </motion.section>
      </div>

      {/* Floating background elements for visual interest */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl"
          style={{ y: useTransform(globalScrollProgress, [0, 1], [0, -100]) }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-3xl"
          style={{ y: useTransform(globalScrollProgress, [0, 1], [0, 150]) }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-green-500/3 dark:bg-green-400/3 rounded-full blur-2xl"
          style={{
            y: useTransform(globalScrollProgress, [0, 1], [0, -200]),
            x: useTransform(globalScrollProgress, [0, 1], [0, 100])
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform-gpu z-50 shadow-lg"
        style={{
          scaleX: globalScrollProgress,
          transformOrigin: "0%"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        {/* Animated shine effect on progress bar */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3
          }}
        />
      </motion.div>

      {/* Floating Navigation */}
      <FloatingNav />
    </motion.main>
  );
}