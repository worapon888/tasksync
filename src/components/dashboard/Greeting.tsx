"use client";

import { FaFireAlt } from "react-icons/fa";

import { BiSolidMessageRoundedDots } from "react-icons/bi";

export default function Greeing() {
  return (
    <div className=" text-white min-h-screen flex flex-col justify-start space-y-8">
      {/* Top Grid */}
      <div className="grid grid-cols-5 grid-rows-6 gap-6">
        {/* 1. Performance (div1) - ซ้ายบน */}
        <div className="col-span-3 row-span-3 dark:bg-black/60 bg-white/80  rounded-xl p-4">
          <p className="text-sm text-slate-400  mb-2">Performance / 7 days</p>
          <div className="flex justify-between items-end h-24">
            {["M", "T", "W", "Th", "F", "S", "S"].map((day, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="w-2 rounded-full bg-cyan-400"
                  style={{ height: `${20 + i * 8}px` }}
                />
                <span className="text-xs mt-1 text-slate-400">{day}</span>
              </div>
            ))}
          </div>
        </div>
        {/* 2. Total Tasks (div2) - ขวาบนซ้าย */}
        <div className="col-start-4  row-span-3 dark:bg-black/60 bg-white/80 text-slate-500 rounded-xl px-4 py-6 flex flex-col items-center justify-center dark:text-white">
          <p className="text-xs text-slate-400 mb-3">Total Tasks</p>
          <h2 className="text-5xl font-extrabold">15</h2>
        </div>
        {/* 3. Task Details (div3) - ขวาสุดแนวตั้งเต็ม */}
        <div className="col-start-5 row-span-6 dark:bg-black/60 bg-white/80  rounded-xl px-4 py-6 dark:text-white text-center">
          <p className="text-xs text-slate-400 mb-6">Task Details</p>

          {/* 6 - To Do */}
          <div className="mb-6">
            <p className="text-4xl font-extrabold text-slate-500 dark:text-white">
              6
            </p>
            <p className="text-pink-400 text-sm mt-1">To Do</p>
          </div>

          {/* 8 - In Progress */}
          <div className="mb-6">
            <p className="text-4xl font-extrabold text-slate-500 dark:text-white">
              8
            </p>
            <p className="text-indigo-400 text-sm mt-1">In Progress</p>
          </div>

          {/* 10 - Done */}
          <div>
            <p className="text-4xl font-extrabold text-slate-500 dark:text-white">
              10
            </p>
            <p className="text-green-400 text-sm mt-1">Done</p>
          </div>
        </div>
        {/* 4. This Week's Focus (div5) - กล่องล่างใหญ่ */}

        <div className="col-span-4 row-start-4 row-span-3 bg-[#009CA9]/60 rounded-2xl p-6 text-white">
          {/* Header */}
          <div className="flex items-start gap-4">
            <FaFireAlt className="text-white w-10 h-10 mt-1" />
            <div>
              <p className="text-xl font-bold mb-1">This Week’s Focus</p>
              <h2 className="text-lg font-semibold">Complete Marketing Plan</h2>
              <p className="text-base">Schedule 1-on-1 Team Meeting</p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="flex gap-4 mt-6">
            <div className="h-4 rounded-full bg-[#F37B7B] w-1/3"></div>
            <div className="h-4 rounded-full bg-[#4B6EFF] w-1/3"></div>
            <div className="h-4 rounded-full bg-[#A3F986] w-1/3"></div>
          </div>

          {/* Tags */}
          <div className="flex gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F37B7B]" />
              <span>Personal Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4B6EFF]" />
              <span>Personal Development</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A3F986]" />
              <span>Leisure & Balance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="dark:bg-black/60 bg-white/80 rounded-xl p-6 space-y-5">
        <h3 className="text-slate-500 font-semibold text-base">PROJECTLIST</h3>
        {[
          {
            title: "Make a prototype website",
            due: "May 11",
            color: "bg-pink-500",
            messages: 2,
            progress: 80,
          },
          {
            title: "Discuss year budgets",
            due: "April 8",
            color: "bg-blue-500",
            messages: 1,
            progress: 40,
          },
          {
            title: "Meeting School",
            due: "May 18",
            color: "bg-green-500",
            messages: 2,
            progress: 20,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-wrap items-center justify-between gap-3 dark:bg-[#1f2335]/60 bg-slate-300 p-4 rounded-xl"
          >
            {/* Left: Title */}
            <div className="flex items-center gap-3 min-w-[180px]">
              <span className={`w-3 h-3 rounded-full ${item.color}`} />
              <p className="dark:text-white text-slate-500 text-sm font-medium">
                {item.title}
              </p>
            </div>

            {/* Center: Progress bar + label underneath */}
            <div className="flex flex-col items-center w-40">
              <div className="w-full h-3 dark:bg-gray-500 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <span className="text-[10px] dark:text-gray-300 text-slate-500 mt-1">
                Progress
              </span>
            </div>

            {/* Right: Date + Messages */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 dark:bg-white/10 bg-white text-xs dark:text-white text-slate-500 px-5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>{item.due}</span>
              </div>
              <div className="w-10 h-7 flex items-center justify-center rounded-full dark:bg-white/10 dark:text-white text-slate-500 bg-white gap-1 font-semibold text-xs">
                <BiSolidMessageRoundedDots className="text-xs" />
                {item.messages}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
