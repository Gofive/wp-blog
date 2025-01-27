"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuSunMedium as Sun } from "react-icons/lu";
import { LuMoonStar as MoonStar } from "react-icons/lu";
import { HiMiniComputerDesktop as Monitor } from "react-icons/hi2";
import { motion } from "motion/react";

const themes = ["light", "dark", "system"];

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="text-blue-500 hover:cursor-pointer"
        asChild
      >
        {resolvedTheme === "light" ? (
          <Sun
            className={`${theme === "system" ? "text-slate-500" : ""}`}
            size={22}
          />
        ) : (
          <MoonStar
            className={`${theme === "system" ? "text-slate-500" : ""}`}
            size={22}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={15}
        className="w-24 font-semibold dark:bg-slate-700 dark:border-slate-700"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`cursor-pointer ${
            theme === "light" ? "text-blue-500 hover:text-blue-500" : ""
          } dark:hover:bg-slate-600`}
        >
          <Sun />
          <span className="ml-2">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`cursor-pointer ${
            theme === "dark" ? "text-blue-500 hover:text-blue-500" : ""
          } dark:hover:bg-slate-600`}
        >
          <MoonStar />
          <span className="ml-2">Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`cursor-pointer ${
            theme === "system" ? "text-blue-500 hover:text-blue-500" : ""
          } dark:hover:bg-slate-600`}
        >
          <Monitor />
          <span className="ml-2">System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * layout animation
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex space-x-1 bg-gray-200 dark:bg-slate-700 px-1.5 py-1 rounded-full">
      {themes.map((item) => (
        <button
          key={item}
          onClick={() => setTheme(item)}
          className={`relative flex items-center justify-center cursor-pointer rounded-full h-8 w-8 px-1.5 py-1.5 text-sm font-medium text-slate-900 dark:text-zinc-100 outline-sky-400 transition focus-visible:outline-2`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {theme === item && (
            <motion.span
              layoutId="bubble"
              className={`${
                resolvedTheme === "dark" ? "bg-blue-500" : "bg-white"
              } absolute inset-0 z-10`}
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {item === "system" && <Monitor className="z-20" size={20} />}
          {item === "light" && <Sun className="z-20" size={20} />}
          {item === "dark" && <MoonStar className="z-20" size={20} />}
        </button>
      ))}
    </div>
  );
}
