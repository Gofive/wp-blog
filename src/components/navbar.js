"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle, ThemeSwitcher } from "./theme-switcher";
import { FaGithub } from "react-icons/fa";
import { Separator } from "./ui/separator";
import Image from "next/image";
import NavItem from "./nav-item";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import MenuToggle from "./menu-toggle";
import { useAtom } from "jotai";
import { toggleMenuAtom } from "@/lib/atom-state";
import { redirect } from "next/navigation";

const mainNav = [
  {
    title: "Article",
    href: "/article",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "About",
    href: "/about",
  },
];

export default function MainNav({ className, ...props }) {
  const [open, setOpen] = useState(false);
  const [_, setIsOpen] = useAtom(toggleMenuAtom);

  const handleClick = () => {
    setOpen(!open);
    setIsOpen(false);
    document.getElementsByTagName("body")[0].classList.toggle("mobile-menu");
  };

  return (
    <>
      <div
        className={cn(
          "sticky border-b top-0 z-50 w-full backdrop-blur-sm flex-none transition-colors duration-500 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent",
          className
        )}
        {...props}
      >
        <div className="max-w-5xl mx-auto">
          <div className="border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
            <div className="relative h-[56px] flex items-center">
              <a href="/" className="w-8 h-8 relative">
                <Image
                  className="relative"
                  src="/iwb.png"
                  alt="Logo"
                  fill
                  sizes="32px"
                />
              </a>
              <a
                href="/"
                className="mx-3 font-semibold hidden md:flex overflow-hidden md:w-auto"
              >
                IMWIND
              </a>
              <div className="relative hidden md:flex items-center ml-auto">
                <div className="relative flex items-center">
                  <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                    <ul className="flex space-x-8">
                      {mainNav.map((item) => (
                        <li key={item.href}>
                          <NavItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <Separator
                  className="h-6 ml-6 mr-2 w-0.5"
                  orientation="vertical"
                />
                <Link
                  className="ml-4"
                  href="https://github.com/gofive"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub
                    className="text-slate-500 hover:text-slate-600 cursor-pointer"
                    size={22}
                  />
                </Link>

                <div className="ml-4">
                  <ThemeSwitcher />
                </div>
              </div>
              <button
                type="button"
                onClick={() => redirect("/search")}
                className="cursor-pointer ml-auto md:ml-4 text-slate-500 w-8 h-8 -my-1 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <Search strokeWidth={2.5} />
              </button>
              <div className="relative w-10 text-slate-500 h-10 ml-2 md:hidden flex items-center justify-center">
                <MenuToggle size={32} onClick={handleClick}></MenuToggle>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <motion.div
          className="fixed z-50 top-[57px] bg-white text-slate-900 dark:text-zinc-100 dark:bg-slate-800 h-[calc(100%-57px)] w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="space-x-8 p-6">
            {mainNav.map((item) => (
              <li
                onClick={handleClick}
                key={item.href}
                className="my-6 font-semibold text-xl"
              >
                <NavItem item={item} />
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 right-0 p-6 flex gap-4 items-center">
            <Link
              href="https://github.com/gofive"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub
                className="text-slate-500 hover:text-slate-600 cursor-pointer"
                size={32}
              />
            </Link>
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </>
  );
}
