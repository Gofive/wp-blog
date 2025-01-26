"use client";

import { ArrowUpToLine } from "lucide-react";
import { useEffect, useState } from "react";

export default function UpTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
  });
  return (
    <ArrowUpToLine
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className={`${
        show ? "flex" : "hidden"
      } w-9 h-9 p-2 bg-indigo-500 text-slate-100 fixed bottom-16 right-4 rounded-full md:hidden cursor-pointer`}
      size={26}
    />
  );
}
