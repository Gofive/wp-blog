"use client";

import { motion } from "motion/react";
import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
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

/**
 * ==============   Styles   ================
 */

const toggleContainer = {
  outline: "none",
  border: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  cursor: "pointer",
  top: 18,
  left: 15,
  width: 50,
  height: 50,
  borderRadius: "50%",
  background: "blue",
};

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="lucide lucide-menu"
>
  <line x1="4" x2="20" y1="12" y2="12" />
  <line x1="4" x2="20" y1="6" y2="6" />
  <line x1="4" x2="20" y1="18" y2="18" />
</svg>;

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="lucide lucide-x"
>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>;
