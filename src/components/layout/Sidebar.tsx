"use client";

import {
  Home,
  Plus,
  BarChart,
  Calendar,
  Settings,
  LogOut,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useProfile } from "@/context/ProfileContext";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { profile } = useProfile();
  const user = session?.user;

  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sidebarRef.current) return;

    gsap.to(sidebarRef.current, {
      width: isExpanded ? 64 : 56,
      height: isExpanded ? 500 : 56,
      padding: isExpanded ? "1.5rem" : "0.5rem",
      duration: 0.5,
      ease: "power4.out",
    });
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".sidebar-icon",
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.05,
          }
        );

        gsap.fromTo(
          ".sidebar-user",
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }, contentRef);

      return () => ctx.revert(); // cleanup
    }
  }, [isExpanded]);

  // Detect screen width
  // ปรับ breakpoint เป็น iPad (lg = 1024px)
  useEffect(() => {
    const handleResize = () => {
      const small = window.innerWidth < 1024; // จากเดิม < 640
      setIsMobile(small);
      setIsExpanded(!small); // collapse เมื่อเป็น mobile/tablet
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ✅ Blur background when sidebar is expanded on mobile */}
      {isMobile && isExpanded && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => setIsExpanded(false)}
        />
      )}
      <aside
        ref={sidebarRef}
        className={clsx(
          "sticky top-[80px] left-[5px] sm:left-[10px] lg:left-[15px] z-40 ",
          isExpanded
            ? "h-fit min-h-[80vh] max-h-[90vh] w-16 bg-white/80 dark:bg-[#242739]/60 rounded-full py-6 drop-shadow-2xl flex flex-col justify-start items-center overflow-hidden"
            : "h-16 w-16 bg-white/80 dark:bg-[#242739]/60 rounded-full p-2 flex justify-center items-center"
        )}
      >
        {/* Toggle (เฉพาะ mobile) */}
        {isMobile && (
          <button onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded ? (
              <X className="w-6 h-6 text-gray-500 dark:text-gray-200 cursor-pointer" />
            ) : (
              <Menu className="w-6 h-6 text-cyan-500 cursor-pointer" />
            )}
          </button>
        )}

        {/* Sidebar Content */}
        <div
          className="flex flex-col justify-between h-screen "
          ref={contentRef}
        >
          {isExpanded && (
            <>
              {/* ICONS */}
              <div className="flex flex-col mt-10 space-y-10">
                <SidebarIcon href="/" icon={Home} pathname={pathname} />
                <SidebarIcon
                  href="/dashboard/board"
                  icon={Plus}
                  pathname={pathname}
                />
                <SidebarIcon
                  href="/dashboard"
                  icon={BarChart}
                  pathname={pathname}
                />
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
                <div className="sidebar-user flex flex-col items-center mt-10 space-y-10 mb-2">
                  {profile.image ? (
                    <Image
                      src={profile.image || "/default-avatar.png"}
                      alt="Avatar"
                      width={32}
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
                  <UserCircle className="w-7 h-7 text-slate-500 hover:text-cyan-400 transition cursor-pointer mb-4" />
                </Link>
              )}
            </>
          )}
        </div>
      </aside>
    </>
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
          "sidebar-icon w-7 h-7 cursor-pointer transition",
          pathname === href
            ? "text-cyan-400"
            : "text-slate-500 hover:text-cyan-400"
        )}
      />
    </Link>
  );
}
