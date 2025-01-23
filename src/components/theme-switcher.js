'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LuSunMedium as Sun } from 'react-icons/lu';
import { LuMoonStar as MoonStar } from 'react-icons/lu';
import { HiMiniComputerDesktop as Monitor } from 'react-icons/hi2';

export default function ThemeSwitcher() {
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
        {resolvedTheme === 'light' ? (
          <Sun
            className={`${theme === 'system' ? 'text-slate-500' : ''}`}
            size={22}
          />
        ) : (
          <MoonStar
            className={`${theme === 'system' ? 'text-slate-500' : ''}`}
            size={22}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={15}
        className="w-24 font-semibold dark:bg-slate-700 dark:border-slate-700"
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={`cursor-pointer ${
            theme === 'light' ? 'text-blue-500 hover:text-blue-500' : ''
          } dark:hover:bg-slate-600`}
        >
          <Sun />
          <span className="ml-2">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={`cursor-pointer ${
            theme === 'dark' ? 'text-blue-500 hover:text-blue-500' : ''
          } dark:hover:bg-slate-600`}
        >
          <MoonStar />
          <span className="ml-2">Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={`cursor-pointer ${
            theme === 'system' ? 'text-blue-500 hover:text-blue-500' : ''
          } dark:hover:bg-slate-600`}
        >
          <Monitor />
          <span className="ml-2">System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
