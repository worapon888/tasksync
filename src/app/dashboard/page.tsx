"use client";

import { useRef, useLayoutEffect } from "react";
import EmotionalMeter from "@/components/dashboard/EmotionalMeter";
import Greeing from "@/components/dashboard/Greeting";
import { gsap } from "gsap";

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".dash-heading", {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(
          ".dash-sub",
          {
            opacity: 0,
            y: -10,
            duration: 0.5,
            ease: "power2.out",
          },
          "<+0.1"
        )
        .from(
          [".dash-greeting", ".dash-meter"],
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.2,
          },
          "<+0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 w-full min-h-screen overflow-auto"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Greeting */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="dash-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
            Good Morning!
          </h1>
          <p className="dash-sub text-white/80 dark:text-slate-400 text-sm sm:text-base">
            Here’s your day at a glance:
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Left */}
          <div className="w-full dash-greeting">
            <Greeing />
          </div>

          {/* Right */}
          <div className="w-full flex items-center justify-center dash-meter">
            <EmotionalMeter />
          </div>
        </div>
      </div>
    </div>
  );
}
