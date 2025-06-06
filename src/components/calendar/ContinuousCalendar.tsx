// components/calendar/ContinuousCalendar.tsx
"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useEnergy } from "@/context/EnergyContext";
import { useCalendarData } from "@/hooks/useCalendarData";
import { getBarColor } from "@/utils/energyUtils";
import { daysOfWeek, monthNames } from "@/utils/constants";
import { Select } from "@/components/ui/Select";
import { useTaskContext } from "@/context/TaskContext";
import clsx from "clsx";
import { gsap } from "gsap";

interface ContinuousCalendarProps {
  onClick?: (_day: number, _month: number, _year: number) => void;
  onAddTask?: (_day: number, _month: number, _year: number) => void;
}

export const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({
  onAddTask,
}) => {
  const today = new Date();
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
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
  useEffect(() => {
    const today = new Date();
    scrollToDay(today.getMonth(), today.getDate());
  }, []);

  const calendarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".calendar-header", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Energy bars animation (appear)
      gsap.from(".energy-bar", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.01,
        delay: 0.3,
      });

      // Today pulse
      gsap.to(".today-circle", {
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1.5,
      });
      gsap.from(".day-label", {
        opacity: 0,
        y: -15,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
        delay: 0.2,
      });
      gsap.from(".week-row", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.07,
        delay: 0.4,
      });
    }, calendarRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={calendarRef}
      className="no-scrollbar calendar-container max-h-[70vh] sm:max-h-[80vh] overflow-y-scroll rounded-t-2xl border dark:border-white/10 border-slate-400 dark:bg-black/40 bg-white/10 pb-10 text-slate-800 "
    >
      <div className="calendar-header sticky -top-px z-50 w-full rounded-t-2xl dark:bg-black/40 bg-black/40 backdrop-blur-[60px] px-5 pt-7 sm:px-8 sm:pt-8 shadow-[0_0_60px_-30px_rgba(0,200,255,0.3)]">
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2 sm:gap-3 ml-5 sm:ml-0">
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
          <div className="flex w-fit items-center justify-between  ml-5 sm:ml-0">
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
              className={clsx(
                "day-label",
                "w-full border-b border-white/10",
                "py-1.5 sm:py-2 md:py-2.5", // ✅ ปรับ padding ตามขนาดจอ
                "text-[10px] sm:text-xs md:text-sm lg:text-base", // ✅ ปรับขนาดฟอนต์อัตโนมัติ
                "text-center font-semibold",
                "text-cyan-500 dark:text-cyan-400", // ✅ รองรับ Dark Mode
                "truncate" // ✅ ป้องกันข้อความล้นในจอแคบ
              )}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">
        {calendarWeeks.map((week, weekIndex) => (
          <div
            className="grid grid-cols-7 w-full week-row"
            key={`week-${weekIndex}`}
          >
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
                  className="relative group cursor-pointer font-medium transition-all hover:z-20 hover:border-cyan-400
    aspect-square overflow-hidden m-[0.5px] sm:m-px rounded-[15%] sm:rounded-2xl lg:rounded-3xl
    border border-white/10 sm:border-2"
                >
                  {/* ✅ วันที่ — ชิดซ้ายบนทุกขนาด */}
                  <span
                    className={clsx(
                      "absolute z-10 flex items-center justify-center rounded-full font-semibold",
                      // Position
                      "top-1 left-1 sm:top-1.5 sm:left-1.5 md:top-2 md:left-[5px]",
                      // Size (ใช้ size-* ถ้ากว้าง = สูง)
                      "size-[16px] sm:size-[20px] sm:h-[18px] md:size-[18px] md:h-[20px] lg:size-[28px]",
                      // Font size
                      "text-[10px] sm:text-sm md:text-[10px] lg:text-lg xl:text-xl",
                      // Color
                      isToday(day, month)
                        ? "today-circle bg-cyan-400 text-white"
                        : "bg-[#444444] text-white",
                      month < 0 && "text-slate-400"
                    )}
                  >
                    {day}
                  </span>

                  {/* ✅ Energy bar + label */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center w-full max-w-[80%]">
                    <div className="w-[70%] md:w-[50%] h-1 sm:h-1.5 lg:h-2 rounded-full bg-gray-600 overflow-hidden mb-1">
                      <div
                        className={`energy-bar h-full ${getBarColor(
                          matchEnergy?.energyLevel ?? ""
                        )}`}
                        style={{ width: `${matchEnergy?.value ?? 0}%` }}
                      />
                    </div>
                    <p className="text-[10px] sm:text-[12px] lg:text-sm md:text-[8px] text-black dark:text-gray-400">
                      Energy
                    </p>
                  </div>

                  {/* Task list */}
                  {tasksForDay.length > 0 && (
                    <div className="hidden sm:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[96%] sm:w-[98%] max-h-[60%] overflow-y-auto space-y-1 text-[10px] sm:text-[12px] text-white leading-tight text-left">
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
                            className="w-full rounded-md px-2 py-[2px] bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-md shadow-inner border border-white/5"
                          >
                            <div className="flex items-center justify-between gap-2 mb-[2px]">
                              <span className="block truncate w-full whitespace-nowrap overflow-hidden text-ellipsis">
                                {t.title}
                              </span>
                              <span className="text-cyan-400 text-[9px] sm:text-[10px]">
                                {time}
                              </span>
                            </div>
                            <div className="flex justify-between text-[8px] text-gray-400">
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
                        <div className="text-center text-[8px] text-gray-400 mt-1">
                          +{tasksForDay.length - 3} more task
                          {tasksForDay.length - 3 > 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  )}

                  {isNewMonth && (
                    <span
                      className={clsx(
                        "absolute font-semibold truncate text-slate-300",
                        "left-0 bottom-1 px-1.5 w-full",
                        "text-[7px] sm:text-[12px] md:text-[12px] lg:text-lg 2xl:text-xl",
                        "sm:bottom-0",
                        "lg:bottom-2.5 lg:left-3.5 lg:mb-[-4px] lg:w-fit lg:px-0"
                      )}
                    >
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
                      className={clsx(
                        "absolute z-20",
                        // ตำแหน่งปุ่ม (ขวาบนบนจอใหญ่, ล่างขวาบนมือถือ)
                        "right-1 top-1 sm:right-2 sm:top-2",
                        // การแสดงผล
                        "rounded-full opacity-0 transition-all",
                        "group-hover:opacity-100 focus:opacity-100",
                        // แสดงบนมือถือถ้าต้องการ
                        "sm:block hidden" // ✅ ถ้าต้องการให้ *ไม่แสดงบน mobile* ลบทิ้งได้
                      )}
                    >
                      <svg
                        className={clsx(
                          "text-blue-500 transition-transform cursor-pointer",
                          "size-5 sm:size-6 md:size-4", // ✅ เล็กลงนิดบนมือถือ
                          "hover:scale-110 active:scale-95"
                        )}
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
