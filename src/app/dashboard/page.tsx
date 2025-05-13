"use client";

import EmotionalMeter from "@/components/dashboard/EmotionalMeter";
import Greeing from "@/components/dashboard/Greeting";

export default function DashboardPage() {
  return (
    <div className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10 w-full min-h-screen overflow-auto">
      <div className="flex flex-col xl:flex-row xl:items-stretch justify-start gap-12 max-w-[1300px] mx-auto ">
        <div className="mb-5">
          {/* Greeting */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Good Morning!
            </h1>
            <p className="dark:text-slate-400 text-white mt-1">
              Here’s your day at a glance:
            </p>
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex flex-col xl:flex-row xl:items-stretch justify-center gap-12 max-w-[1300px] mx-auto ">
        {/* ฝั่งซ้าย */}
        <div className="flex-[1.2] w-full">
          <Greeing />
        </div>

        {/* ฝั่งขวา */}
        <div className="flex-1 flex items-center justify-center h-full">
          <EmotionalMeter />
        </div>
      </div>
    </div>
  );
}
