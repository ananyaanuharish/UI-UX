import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

// Light/dark toggle. Reads the class set by the pre-paint script in
// index.html, persists the choice, and animates the knob across.
export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {}
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      className="relative flex h-9 w-16 shrink-0 items-center rounded-full border border-[--color-border] bg-[--color-bg-soft] px-1"
    >
      {/* Icons */}
      <Sun size={14} className="absolute left-2.5 text-[--color-orange]" />
      <Moon size={13} className="absolute right-2.5 text-[--color-violet]" />
      {/* Sliding knob */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="z-10 grid h-7 w-7 place-items-center rounded-full bg-white shadow-md"
        style={{ marginLeft: dark ? "auto" : 0 }}
      >
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {dark ? <Moon size={14} className="text-[--color-violet]" /> : <Sun size={14} className="text-[--color-orange]" />}
        </motion.span>
      </motion.span>
    </button>
  );
}
