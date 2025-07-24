"use client";

import { motion } from "motion/react";
import aboutDataManager from "../lib/about-data-manager.js";

// ContactLink component
function ContactLink({ contact, index }) {
  const Icon = contact.icon;

  const handleClick = (e) => {
    if (contact.type === "wechat") {
      e.preventDefault();
      // For WeChat, we could show a modal or copy to clipboard
      navigator.clipboard?.writeText(contact.value);
      alert(`微信号 ${contact.value} 已复制到剪贴板`);
    }
  };

  return (
    <motion.a
      href={contact.url}
      target={contact.type !== "email" && contact.type !== "wechat" ? "_blank" : undefined}
      rel={contact.type !== "email" && contact.type !== "wechat" ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className={`group relative flex flex-col items-center p-4 sm:p-6 rounded-xl bg-gradient-to-br ${contact.color} ${contact.hoverColor} text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <motion.div
        className="relative z-10 mb-2 sm:mb-3"
        whileHover={{ rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <Icon size={24} className="sm:w-8 sm:h-8 drop-shadow-lg" />
      </motion.div>

      {/* Label */}
      <h3 className="relative z-10 font-semibold text-base sm:text-lg mb-1 text-center">
        {contact.label}
      </h3>

      {/* Value */}
      <p className="relative z-10 text-xs sm:text-sm opacity-90 text-center break-all">
        {contact.value}
      </p>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.a>
  );
}

// Main ContactSection component
export default function ContactSection() {
  const { all: contacts } = aboutDataManager.getContactData();

  return (
    <motion.section
      id="contact"
      className="py-12 sm:py-16 lg:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2
          id="contact-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
        >
          联系我
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
          欢迎与我交流技术话题，讨论项目合作，或者只是简单地打个招呼！
        </p>
      </motion.div>

      {/* Contact Links Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.type}
            initial={{ opacity: 0, y: 30, rotateY: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1 + 0.3,
              ease: "easeOut"
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <ContactLink contact={contact} index={index} />
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Contact Info */}
      <motion.div
        className="mt-8 sm:mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-3 sm:mb-4">
          通常在 24 小时内回复邮件
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-500">
          <span>🌍 基于中国时区</span>
          <span className="hidden sm:inline">•</span>
          <span>💼 开放合作机会</span>
          <span className="hidden sm:inline">•</span>
          <span>🤝 乐于技术交流</span>
        </div>
      </motion.div>
    </motion.section>
  );
}