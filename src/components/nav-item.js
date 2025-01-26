"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({ item }) {
  const pathname = usePathname();
  return (
    <Link
      className={`${
        pathname.includes(item.href) ? "text-violet-500" : ""
      } hover:text-violet-500 dark:hover:text-violet-400`}
      href={item.href}
      key={item.title}
    >
      {item.title}
    </Link>
  );
}
