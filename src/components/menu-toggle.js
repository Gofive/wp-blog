"use client";

import { toggleMenuAtom } from "@/lib/atom-state";
import { useAtom } from "jotai";
import { motion } from "motion/react";
const Path = ({ ...props }) => (
  <motion.path
    fill="none"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ onClick, size }) => {
  const [isOpen, setIsOpen] = useAtom(toggleMenuAtom);
  const handleClick = () => {
    onClick();
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      className="cursor-pointer"
      onClick={handleClick}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          variants={{
            closed: { d: "M 4 6 L 20 6" },
            open: { d: "M 18 6 L 6 18" },
          }}
        />
        <Path
          d="M 4 12 L 20 12"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 4 18 L 20 18" },
            open: { d: "M 6 6 L 18 18" },
          }}
        />
      </svg>
    </motion.nav>
  );
};

export default MenuToggle;
