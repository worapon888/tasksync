// components/calendar/ContinuousCalendar.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEnergy } from "@/context/EnergyContext";
import { useCalendarData } from "@/hooks/useCalendarData";
import { getBarColor } from "@/utils/energyUtils";
import { daysOfWeek, monthNames } from "@/utils/constants";
import { Select } from "@/components/ui/Select";
import { useTaskContext } from "@/context/TaskContext";

interface ContinuousCalendarProps {
  onClick?: (_day: number, _month: number, _year: number) => void;
  onAddTask?: (_day: number, _month: number, _year: number) => void;
}

export const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({
  onClick,
  onAddTask,
}) => {
  const today = new Date();
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const { energyData, year, setYear } = useEnergy();
  const { tasks } = useTaskContext();

  const { calendarWeeks, isToday, getMatchEnergy } = useCalendarData(
    year,
    energyData
  );

  const monthOptions = monthNames.map((month, index) => ({
    name: month,
    value: `${index}`,
  }));

  const scrollToDay = (monthIndex: number, dayIndex: number) => {
    const targetDayIndex = dayRefs.current.findIndex(
      (ref) =>
        ref &&
        ref.getAttribute("data-month") === `${monthIndex}` &&
        ref.getAttribute("data-day") === `${dayIndex}`
    );

    const targetElement = dayRefs.current[targetDayIndex];

    if (targetDayIndex !== -1 && targetElement) {
      const container = document.querySelector(".calendar-container");
      const elementRect = targetElement.getBoundingClientRect();
      const is2xl = window.matchMedia("(min-width: 1536px)").matches;
      const offsetFactor = is2xl ? 3 : 2.5;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const offset =
          elementRect.top -
          containerRect.top -
          containerRect.height / offsetFactor +
          elementRect.height / 2;

        container.scrollTo({
          top: container.scrollTop + offset,
          behavior: "smooth",
        });
      } else {
        const offset =
          window.scrollY +
          elementRect.top -
          window.innerHeight / offsetFactor +
          elementRect.height / 2;

        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }
  };

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const monthIndex = parseInt(e.target.value, 10);
    setSelectedMonth(monthIndex);
    scrollToDay(monthIndex, 1);
  };
  const handleTodayClick = () => {
    setYear(today.getFullYear());
    scrollToDay(today.getMonth(), today.getDate());
  };
  const handleDayClick = (day: number, month: number) => {
    if (!onClick) return;
    if (month < 0) onClick(day, 11, year - 1);
    else onClick(day, month, year);
  };

  useEffect(() => {
    const container = document.querySelector(".calendar-container");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const month = parseInt(
              entry.target.getAttribute("data-month")!,
              10
            );
            setSelectedMonth(month);
          }
        });
      },
      { root: container, rootMargin: "-75% 0px -25% 0px", threshold: 0 }
    );

    dayRefs.current.forEach((ref) => {
      if (ref && ref.getAttribute("data-day") === "15") {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="no-scrollbar calendar-container max-h-full overflow-y-scroll rounded-t-2xl border dark:border-white/10 border-slate-400 dark:bg-black/40 bg-white/10 pb-10 text-slate-800">
      <div className="sticky -top-px z-50 w-full rounded-t-2xl dark:bg-black/40 bg-black/40 backdrop-blur-[60px] px-5 pt-7 sm:px-8 sm:pt-8 shadow-[0_0_60px_-30px_rgba(0,200,255,0.3)]">
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Select
              name="month"
              value={`${selectedMonth}`}
              options={monthOptions}
              onChange={handleMonthChange}
            />
            <button
              onClick={handleTodayClick}
              type="button"
              className="rounded-lg border dark:border-white/10 border-slate-300 dark:bg-[#1f2335] cursor-pointer transition-all duration-200 bg-white px-3 py-1.5 text-sm font-medium dark:text-white text-slate-500 dark:hover:bg-[#1a1d27] lg:px-5 lg:py-2.5"
            >
              Today
            </button>
          </div>
          <div className="flex w-fit items-center justify-between">
            <button
              onClick={handlePrevYear}
              className="rounded-full border cursor-pointer dark:border-white/30 border-slate-500 p-1 transition-colors hover:bg-white dark:hover:bg-[#1a1d27] sm:p-2"
            >
              <svg
                className="size-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="min-w-16 text-center text-lg font-semibold sm:min-w-20 sm:text-xl text-white">
              {year}
            </h1>
            <button
              onClick={handleNextYear}
              className="rounded-full border cursor-pointer dark:border-white/30 border-slate-500 p-1 transition-colors hover:bg-white dark:hover:bg-[#1a1d27] sm:p-2"
            >
              <svg
                className="size-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid w-full grid-cols-7 justify-between text-slate-500">
          {daysOfWeek.map((day, i) => (
            <div
              key={i}
              className="w-full border-b border-white/10 dark:text-cyan-400 text-cyan-500 py-2 text-center font-semibold"
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">
        {calendarWeeks.map((week, weekIndex) => (
          <div className="flex w-full" key={`week-${weekIndex}`}>
            {week.map(({ month, day }, dayIndex) => {
              const index = weekIndex * 7 + dayIndex;
              const matchEnergy = getMatchEnergy(day, month);
              const isNewMonth =
                index === 0 ||
                (weekIndex * 7 + dayIndex > 0 &&
                  calendarWeeks[weekIndex][dayIndex - 1]?.month !== month);
              const tasksForDay = tasks.filter((t) => {
                const date = new Date(t.dueDate);

                return (
                  !isNaN(date.getTime()) &&
                  date.getFullYear() === year &&
                  date.getMonth() === month &&
                  date.getDate() === day
                );
              });
              return (
                <div
                  key={`${month}-${day}`}
                  ref={(el) => void (dayRefs.current[index] = el)}
                  data-month={month}
                  data-day={day}
                  onClick={() => handleDayClick(day, month)}
                  className="relative m-[-0.5px] group aspect-square w-full grow cursor-pointer rounded-xl border border-white/10 font-medium transition-all hover:z-20 hover:border-cyan-400 sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-36 lg:rounded-3xl 2xl:size-40"
                >
                  <span
                    className={`absolute left-1 top-1 flex items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm lg:left-2 lg:top-2 lg:size-8 lg:text-base ${
                      isToday(day, month)
                        ? "bg-cyan-400 font-semibold text-white"
                        : "bg-[#444444] text-white"
                    } ${month < 0 ? "text-slate-400" : "text-white"}`}
                  >
                    {day}
                  </span>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-20 h-2 rounded-full bg-gray-600 overflow-hidden mb-1">
                      <div
                        className={`h-full ${getBarColor(
                          matchEnergy?.energyLevel ?? ""
                        )}`}
                        style={{ width: `${matchEnergy?.value ?? 0}%` }}
                      />
                    </div>
                    <p className="text-[12px] dark:text-gray-400 text-black">
                      Energy
                    </p>
                  </div>
                  {tasksForDay.length > 0 && (
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[98%] max-h-[70px] space-y-1 text-[12px] text-white leading-tight text-left">
                      {tasksForDay.slice(0, 3).map((t) => {
                        const time = new Date(t.dueDate).toLocaleTimeString(
                          "th-TH",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        );

                        return (
                          <div
                            key={t.id}
                            className="w-full rounded-md px-2 py-1 bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-md shadow-inner border border-white/5"
                          >
                            <div className="flex items-center justify-between gap-2 mb-[2px]">
                              <span className="text-white text-[10px] font-semibold truncate w-[60%]">
                                {t.title}
                              </span>
                              <span className="text-cyan-400 text-[10px]">
                                {time}
                              </span>
                            </div>
                            <div className="flex justify-between text-[9px] text-gray-400">
                              <span className="uppercase tracking-wide">
                                {t.status}
                              </span>
                              <span className="text-pink-300 truncate">
                                {t.mode}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                      {tasksForDay.length > 3 && (
                        <div className="text-[8px] text-center text-gray-400 mt-1">
                          +{tasksForDay.length - 3} more task
                          {tasksForDay.length - 3 > 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  )}

                  {isNewMonth && (
                    <span className="absolute bottom-0.5 left-0 w-full truncate px-1.5 text-sm font-semibold text-slate-300 sm:bottom-0 sm:text-lg lg:bottom-2.5 lg:left-3.5 lg:-mb-1 lg:w-fit lg:px-0 lg:text-xl 2xl:mb-[-4px] 2xl:text-2xl">
                      {monthNames[month]}
                    </span>
                  )}
                  {/* ปุ่มเพิ่มงาน */}
                  {onAddTask && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // ✅ ไม่ให้คลิกไปโดน handleDayClick
                        onAddTask(day, month, year); // ✅ ส่งวันที่ไปเปิด modal
                      }}
                      className="absolute right-2 top-2 rounded-full opacity-0 transition-all focus:opacity-100 group-hover:opacity-100"
                    >
                      <svg
                        className="size-6 text-blue-500 transition-all hover:scale-110 group-focus:scale-100 cursor-pointer"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
