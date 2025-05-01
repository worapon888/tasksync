"use client";

import EmotionalMeter from "@/components/dashboard/EmotionalMeter";
import Greeing from "@/components/dashboard/Greeting";

export default function DashboardPage() {
  return (
    <div className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10 w-full h-screen overflow-auto">
      <div className="flex flex-col xl:flex-row items-start justify-center gap-12 max-w-[1600px] mx-auto">
        <div className="flex-[1.2] w-full">
          <Greeing />
        </div>
        <div className="flex-1 mb-10 self-center">
          <EmotionalMeter />
        </div>
      </div>
    </div>
  );
}
