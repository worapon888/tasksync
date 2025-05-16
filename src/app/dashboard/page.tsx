"use client";

import EmotionalMeter from "@/components/dashboard/EmotionalMeter";
import Greeing from "@/components/dashboard/Greeting";

export default function DashboardPage() {
  return (
    <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 w-full min-h-screen overflow-auto">
      <div className="max-w-screen-xl mx-auto">
        {/* Greeting */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
            Good Morning!
          </h1>
          <p className="text-white/80 dark:text-slate-400 text-sm sm:text-base">
            Here’s your day at a glance:
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Left */}
          <div className="w-full">
            <Greeing />
          </div>

          {/* Right */}
          <div className="w-full flex items-center justify-center">
            <EmotionalMeter />
          </div>
        </div>
      </div>
    </div>
  );
}
