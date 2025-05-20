"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ProfileSettings from "@/components/settings/ProfileSettings";
import CalendarSettings from "@/components/settings/CalendarSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AccountSettings from "@/components/settings/AccountSettings";

export default function SettingsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Heading
      gsap.from(".settings-heading", {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.out",
      });

      // Animate each settings box
      gsap.from(".settings-box", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.15,
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10 mt-10 h-screen overflow-auto"
    >
      <h1 className="settings-heading text-4xl text-white font-bold mb-8">
        Settings
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
        <div className="settings-box">
          <ProfileSettings />
        </div>
        <div className="settings-box">
          <CalendarSettings />
        </div>
        <div className="settings-box">
          <NotificationSettings />
        </div>
        <div className="settings-box">
          <AccountSettings />
        </div>
      </div>
    </div>
  );
}
