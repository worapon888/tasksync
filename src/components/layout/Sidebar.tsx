"use client";

import {
  Home,
  Plus,
  BarChart,
  Calendar,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <aside className="absolute z-40 top-6 left-6 flex flex-col items-center justify-between h-[calc(75vh-1rem)] w-20 bg-white/80 dark:bg-[#242739]/40 rounded-3xl py-6 drop-shadow-2xl">
      {/* Top icons */}
      <div className="flex flex-col items-center mt-10 space-y-10">
        <SidebarIcon href="/" icon={Home} pathname={pathname} />
        <SidebarIcon href="/dashboard/board" icon={Plus} pathname={pathname} />
        <SidebarIcon href="/dashboard" icon={BarChart} pathname={pathname} />
        <SidebarIcon
          href="/dashboard/calendar"
          icon={Calendar}
          pathname={pathname}
        />
        <SidebarIcon
          href="/dashboard/settings"
          icon={Settings}
          pathname={pathname}
        />
      </div>

      {user ? (
        <div className="flex flex-col items-center space-y-10">
          {user.image ? (
            <Image
              src={user.image}
              alt="Avatar"
              width={32} // ✅ ใหญ่ขึ้น
              height={32}
              className="rounded-full border border-cyan-400"
              title={user.email || ""}
            />
          ) : (
            <UserCircle className="w-8 h-8 text-cyan-400" />
          )}
          <LogOut
            onClick={() => signOut()}
            className="w-7 h-7 dark:text-gray-400 text-red-400 hover:text-red-500 transition cursor-pointer"
          />
        </div>
      ) : (
        <Link href="/login">
          <UserCircle className="w-7 h-7 text-slate-500 hover:text-cyan-400 transition cursor-pointer" />
        </Link>
      )}
    </aside>
  );
}

function SidebarIcon({
  href,
  icon: Icon,
  pathname,
}: {
  href: string;
  icon: React.ElementType;
  pathname: string;
}) {
  return (
    <Link href={href}>
      <Icon
        className={clsx(
          "w-7 h-7 cursor-pointer transition",
          pathname === href
            ? "text-cyan-400"
            : "text-slate-500 hover:text-cyan-400"
        )}
      />
    </Link>
  );
}
