"use client";
import { Home, Plus, BarChart, Calendar, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="absolute z-40 top-6 left-6 flex flex-col items-center justify-between  h-[calc(75vh-1rem)] drop-shadow-2xl w-20 bg-white/30 dark:bg-[#242739]/40 rounded-3xl py-6  ">
      {/* Top icons */}
      <div className="flex flex-col items-center mt-10 space-y-10">
        <Link href="/">
          <Home
            className={clsx(
              "w-7 h-7 cursor-pointer",
              pathname === "/"
                ? "text-cyan-400"
                : "text-gray-400 hover:text-cyan-400"
            )}
          />
        </Link>
        <Link href="/dashboard/board">
          <Plus
            className={clsx(
              "w-7 h-7 cursor-pointer",
              pathname === "/dashboard/board"
                ? "text-cyan-400"
                : "text-gray-400 hover:text-cyan-400"
            )}
          />
        </Link>
        <Link href="/dashboard">
          <BarChart
            className={clsx(
              "w-7 h-7 cursor-pointer",
              pathname === "/dashboard"
                ? "text-cyan-400"
                : "text-gray-400 hover:text-cyan-400"
            )}
          />
        </Link>
        <Link href="/dashboard/calendar">
          <Calendar
            className={clsx(
              "w-7 h-7 cursor-pointer",
              pathname === "/dashboard/calendar"
                ? "text-cyan-400"
                : "text-gray-400 hover:text-cyan-400"
            )}
          />
        </Link>
        <Link href="/settings">
          <Settings
            className={clsx(
              "w-7 h-7 cursor-pointer",
              pathname === "/settings"
                ? "text-cyan-400"
                : "text-gray-400 hover:text-cyan-400"
            )}
          />
        </Link>
      </div>
      {/* Avatar + Logout */}
      <div className="flex flex-col items-center space-y-10">
        <Image
          src="/Avatar.png"
          alt="avatar"
          width={47}
          height={47}
          className="rounded-full border border-white/20"
        />
        <LogOut className="w-7 h-7 text-gray-400 hover:text-red-400 cursor-pointer" />
      </div>
    </aside>
  );
}
