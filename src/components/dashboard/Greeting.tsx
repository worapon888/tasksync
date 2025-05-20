"use client";

import { FaFireAlt } from "react-icons/fa";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { useDashboardData } from "@/context/DashboardContext";
import type { DashboardData } from "@/types/task";
import { TaskStatus, TaskMode } from "@/generated/prisma";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Greeing() {
  const context = useDashboardData();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
        }
      );
    }

    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
    }
  }, []);

  if (!context?.dashboardData) {
    return (
      <div className="flex flex-col xl:flex-row xl:items-center justify-center gap-12 max-w-[1300px] mx-auto min-h-[70vh]">
        <div className="flex items-center gap-4 text-white">
          <svg
            className="animate-spin h-8 w-8 text-cyan-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-sm text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const { dashboardData } = context;

  const { grouped, byDay, focusTasks, modePercentages, tasks }: DashboardData =
    dashboardData;

  const getProgressFromStatus = (status: TaskStatus): number => {
    switch (status) {
      case "TODO":
        return 0;
      case "DOING":
        return 33;
      case "REVIEW":
        return 66;
      case "DONE":
        return 100;
      default:
        return 0;
    }
  };

  const getModeColor = (mode: TaskMode): string => {
    const colorMap: Record<TaskMode, string> = {
      PersonalAssistant: "#F37B7B",
      CareerTransition: "#F37B7B",
      FinancialPlanner: "#F37B7B",
      BusinessLaunchpad: "#4B6EFF",
      SocialGrowth: "#4B6EFF",
      PersonalDevelopment: "#4B6EFF",
      HealthJourney: "#A3F986",
      LeisureBalance: "#A3F986",
      MindfulLiving: "#A3F986",
    };

    return colorMap[mode] ?? "#CCCCCC"; // fallback เผื่อ enum ถูกแปลงผิด
  };

  return (
    <div
      ref={containerRef}
      className="text-white  max-w-screen-xl mx-auto px-4 flex flex-col justify-start space-y-4 sm:space-y-6 md:space-y-8"
    >
      {/* Performance Chart */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-5"
      >
        {/* Performance Chart */}
        <div className="xl:col-span-3 xl:row-span-3 dark:bg-black/60 bg-white/80 rounded-xl p-4  flex flex-col justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-2">Performance / 7 days</p>
          </div>
          <div className="grid grid-cols-7 gap-2 sm:gap-3 items-end h-24 sm:h-28 ">
            {["M", "T", "W", "Th", "F", "S", "S"].map((day, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="w-4 sm:w-5 md:w-6 rounded-full bg-cyan-400 transition-all duration-300"
                  style={{ height: `${12 + byDay[i] * 10}px` }}
                />
                <span className="text-[11px] sm:text-xs mt-1 text-slate-400">
                  {day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Tasks */}
        <div className="xl:col-start-4 xl:row-span-3 dark:bg-black/60 bg-white/80 text-slate-500 rounded-xl px-4 py-6 flex flex-col items-center justify-center dark:text-white">
          <p className="text-xs text-slate-400 mb-3">Total Tasks</p>
          <h2 className="text-5xl font-extrabold">{grouped.total}</h2>
        </div>

        {/* Task Details */}
        <div className="xl:col-start-5 xl:row-span-6 dark:bg-black/60 bg-white/80 rounded-xl px-4 py-6 dark:text-white text-center">
          <p className="text-xs text-slate-400 mb-6">Task Details</p>
          {[
            { label: "To Do", value: grouped.toDo, color: "text-pink-400" },
            {
              label: "In Progress",
              value: grouped.inProgress,
              color: "text-indigo-400",
            },
            { label: "Done", value: grouped.done, color: "text-green-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="mb-6">
              <p className="text-4xl font-extrabold text-slate-500 dark:text-white">
                {value}
              </p>
              <p className={`text-sm mt-1 ${color}`}>{label}</p>
            </div>
          ))}
        </div>

        {/* This Week’s Focus */}
        <div className="xl:col-span-4 xl:row-start-4 xl:row-span-3 bg-[#009CA9]/60 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <FaFireAlt className="text-white w-10 h-10 mt-1" />
            <div>
              <p className="text-xl font-bold mb-1">This Week’s Focus</p>
              {focusTasks.length === 0 ? (
                <p className="text-base text-white/70">No focus task yet.</p>
              ) : (
                <>
                  <h2 className="text-lg font-semibold">
                    {focusTasks[0]?.title}
                  </h2>
                  {focusTasks[1] && (
                    <p className="text-base">{focusTasks[1]?.title}</p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Progress Bars */}
          <div className="flex gap-4 mt-6">
            {(modePercentages as { mode: string; progress: number }[])
              .slice(0, 3)
              .map((item, i) => (
                <div
                  key={i}
                  className="h-4 rounded-full bg-white/40 w-1/3 overflow-hidden"
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.progress}%`,
                      backgroundColor: getModeColor(item.mode as TaskMode),
                    }}
                  />
                </div>
              ))}
          </div>

          {/* Tags */}
          <div className="flex gap-6 mt-4 text-sm flex-wrap">
            {modePercentages.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: getModeColor(item.mode as TaskMode),
                  }}
                />
                <span>{item.mode.replace(/([A-Z])/g, " $1").trim()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="dark:bg-black/60 bg-white/80 rounded-xl p-6 space-y-5">
        <h3 className="text-slate-500 font-semibold text-base">PROJECTLIST</h3>
        {tasks.slice(0, 3).map((task) => (
          <div
            key={task.id}
            className="flex flex-wrap items-center justify-between gap-3 dark:bg-[#1f2335]/60 bg-slate-300 p-4 rounded-xl"
          >
            {/* Left: Title */}
            <div className="flex items-center gap-3 min-w-[180px]">
              <span className="w-3 h-3 rounded-full bg-cyan-400" />{" "}
              {/* ใช้สี default */}
              <p className="dark:text-white text-slate-500 text-sm font-medium">
                {task.title}
              </p>
            </div>

            {/* Center: Progress */}
            <div className="flex flex-col items-center w-40">
              <div className="w-full h-3 dark:bg-gray-500 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressFromStatus(task.status)}%` }}
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
                <span>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "No due"}
                </span>
              </div>
              <div className="w-10 h-7 flex items-center justify-center rounded-full dark:bg-white/10 dark:text-white text-slate-500 bg-white gap-1 font-semibold text-xs">
                <BiSolidMessageRoundedDots className="text-xs" />
                {2 /* mock จำนวน comment */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
