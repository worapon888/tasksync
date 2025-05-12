"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  return (
    <div
      onClick={handleToggle}
      tabIndex={0}
      className="relative w-20 h-10 rounded-full cursor-pointer bg-gradient-to-r from-[#d6e9f8] to-[#c4e1f6] dark:bg-[#31494C]  
      flex items-center  px-2
      outline-none focus-visible:ring-2 focus-visible:ring-[#4DA1F0] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111111]"
    >
      {/* Moon Icon (อยู่ซ้าย) */}
      <Moon className="text-black/60 dark:text-[#88C5DC] absolute left-2.5 top-1/2 -translate-y-1/2 z-10 h-5 w-5" />
      {/* Sun Icon (อยู่ขวา) */}
      <Sun className="text-black/60 dark:text-[#88C5DC] absolute right-3 top-1/2 -translate-y-1/2 z-10 h-5 w-5" />

      {/* Thumb (ปุ่มเลื่อน) */}
      <div
        className={`absolute top-1 left-1 h-8 w-8 rounded-full dark:bg-[#222222] bg-white shadow-md drop-shadow-xl transition-transform duration-300  ease-in-out ${
          isDark ? "translate-x-0" : "translate-x-10"
        }`}
      />
    </div>
  );
}
