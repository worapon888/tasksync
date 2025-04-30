import { Home, Plus, BarChart, Calendar, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="absolute top-6 left-6 flex flex-col items-center justify-between  h-[calc(75vh-1rem)] drop-shadow-2xl w-20 bg-white/30 dark:bg-[#242739]/40 rounded-3xl py-6 z-10">
      {/* Top icons */}
      <div className="flex flex-col items-center mt-10 space-y-10">
        <Link href="/">
          <Home className="w-7 h-7 text-gray-400 hover:text-cyan-400 cursor-pointer" />
        </Link>
        <Link href="/borad">
          <Plus className="w-7 h-7 text-gray-400  hover:text-cyan-400 cursor-pointer" />{" "}
        </Link>
        <BarChart className="w-7 h-7 text-gray-400 hover:text-cyan-400 cursor-pointer" />
        <Calendar className="w-7 h-7 text-gray-400   hover:text-cyan-400 cursor-pointer" />
        <Settings className="w-7 h-7 text-gray-400 hover:text-cyan-400 cursor-pointer" />
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
