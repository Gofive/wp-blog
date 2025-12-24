"use client";

import { motion } from "motion/react";
import HeroSection from "@/components/hero-section";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";

export default function AboutPageClient() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-20">
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}