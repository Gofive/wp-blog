"use client";

import { motion } from "motion/react";
import aboutDataManager from "../lib/about-data-manager.js";
import { Mail, Github, MessageSquare, Twitter, Globe } from "lucide-react";

export default function ContactSection() {
  const { all: contacts } = aboutDataManager.getContactData();

  const getIcon = (type) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'github': return <Github className="w-4 h-4" />;
      case 'wechat': return <MessageSquare className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const handleClick = (e, contact) => {
    if (contact.type === "wechat") {
      e.preventDefault();
      navigator.clipboard?.writeText(contact.value);
      alert(`微信号 ${contact.value} 已复制到剪贴板`);
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-12 sm:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2
        id="contact-heading"
        className="text-xl sm:text-2xl font-bold mb-8 text-slate-900 dark:text-slate-50 border-b pb-2"
      >
        联系方式
      </h2>

      <div className="flex flex-col space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          欢迎与我交流技术话题，讨论项目合作，或者只是简单地打个招呼！
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {contacts.map((contact) => (
            <a
              key={contact.type}
              href={contact.url}
              onClick={(e) => handleClick(e, contact)}
              target={contact.type !== "email" && contact.type !== "wechat" ? "_blank" : undefined}
              rel={contact.type !== "email" && contact.type !== "wechat" ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group shadow-sm"
            >
              <div className="text-slate-500 group-hover:text-blue-500 transition-colors">
                {getIcon(contact.type)}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                  {contact.label}
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {contact.value}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}