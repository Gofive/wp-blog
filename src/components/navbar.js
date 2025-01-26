import { cn } from "@/lib/utils";
import ThemeSwitcher from "./theme-switcher";
import { FaGithub } from "react-icons/fa";
import { Separator } from "./ui/separator";
import Image from "next/image";
import NavItem from "./nav-item";

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
  return (
    <div
      className={cn(
        "sticky border-b top-0 z-40 w-full backdrop-blur-sm flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent",
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
              <Separator className="h-6 ml-4 w-0.5" orientation="vertical" />
              <div className="ml-6">
                <ThemeSwitcher />
              </div>

              <div className="ml-4">
                <FaGithub
                  className="text-slate-500 hover:text-slate-600 cursor-pointer"
                  size={22}
                />
              </div>
            </div>
            <button
              type="button"
              className="ml-auto text-slate-500 w-8 h-8 -my-1 flex items-center justify-center hover:text-slate-600 md:hidden dark:text-slate-400 dark:hover:text-slate-300"
            >
              <span className="sr-only">Search</span>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m19 19-3.5-3.5"></path>
                <circle cx="11" cy="11" r="6"></circle>
              </svg>
            </button>
            <div className="ml-2 -my-1 md:hidden">
              <button
                type="button"
                className="text-slate-500 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <span className="sr-only">Navigation</span>
                <svg width="24" height="24" fill="none" aria-hidden="true">
                  <path
                    d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
