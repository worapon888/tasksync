"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface ContinuousCalendarProps {
  onClick?: (_day: number, _month: number, _year: number) => void;
}

export const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({
  onClick,
}) => {
  const today = new Date();
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
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

        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    }
  };

  const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
  const handleNextYear = () => setYear((prevYear) => prevYear + 1);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const monthIndex = parseInt(event.target.value, 10);
    setSelectedMonth(monthIndex);
    scrollToDay(monthIndex, 1);
  };

  const handleTodayClick = () => {
    setYear(today.getFullYear());
    scrollToDay(today.getMonth(), today.getDate());
  };

  const handleDayClick = (day: number, month: number, year: number) => {
    if (!onClick) {
      return;
    }
    if (month < 0) {
      onClick(day, 11, year - 1);
    } else {
      onClick(day, month, year);
    }
  };

  const generateCalendar = useMemo(() => {
    const today = new Date();

    const daysInYear = (): { month: number; day: number }[] => {
      const daysInYear = [];
      const startDayOfWeek = new Date(year, 0, 1).getDay();

      if (startDayOfWeek < 6) {
        for (let i = 0; i < startDayOfWeek; i++) {
          daysInYear.push({ month: -1, day: 32 - startDayOfWeek + i });
        }
      }

      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          daysInYear.push({ month, day });
        }
      }

      const lastWeekDayCount = daysInYear.length % 7;
      if (lastWeekDayCount > 0) {
        const extraDaysNeeded = 7 - lastWeekDayCount;
        for (let day = 1; day <= extraDaysNeeded; day++) {
          daysInYear.push({ month: 0, day });
        }
      }

      return daysInYear;
    };

    const calendarDays = daysInYear();

    const calendarWeeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push(calendarDays.slice(i, i + 7));
    }

    const calendar = calendarWeeks.map((week, weekIndex) => (
      <div className="flex w-full" key={`week-${weekIndex}`}>
        {week.map(({ month, day }, dayIndex) => {
          const index = weekIndex * 7 + dayIndex;
          const isNewMonth =
            index === 0 || calendarDays[index - 1].month !== month;
          const isToday =
            today.getMonth() === month &&
            today.getDate() === day &&
            today.getFullYear() === year;

          function getEnergyColor(level: string) {
            if (level === "High Energy") return "text-green-400";
            if (level === "Medium Energy") return "text-yellow-400";
            if (level === "Low Energy") return "text-red-400";
          }

          function getBarColor(level: string) {
            if (level === "High Energy") return "bg-green-400";
            if (level === "Medium Energy") return "bg-yellow-400";
            if (level === "Low Energy") return "bg-red-400";
          }

          return (
            <div
              key={`${month}-${day}`}
              ref={(el) => {
                dayRefs.current[index] = el;
              }}
              data-month={month}
              data-day={day}
              onClick={() => handleDayClick(day, month, year)}
              className={`relative m-[-0.5px] group aspect-square w-full grow cursor-pointer rounded-xl border border-white/10 font-medium transition-all hover:z-20 hover:border-cyan-400 sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-36 lg:rounded-3xl 2xl:size-40`}
            >
              {/* วันที่ในวงกลม */}
              <span
                className={`absolute left-1 top-1 flex items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm lg:left-2 lg:top-2 lg:size-8 lg:text-base ${
                  isToday
                    ? "bg-cyan-400 font-semibold text-white"
                    : "bg-[#444444] text-white"
                } ${month < 0 ? "text-slate-400" : "text-white"}`}
              >
                {day}
              </span>

              {/* bar พลังงาน อยู่ในกล่อง */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-40 h-2 rounded-full bg-gray-600 overflow-hidden mb-1">
                  <div
                    className={`h-full ${getBarColor(day.energyLevel)}`}
                    style={{ width: `${day.value}%` }}
                  />
                </div>
                <p className="text-[12px] dark:text-gray-400 text-black ">
                  Energy
                </p>
              </div>

              {/* ชื่อเดือน */}
              {isNewMonth && (
                <span className="absolute bottom-0.5 left-0 w-full truncate px-1.5 text-sm font-semibold text-slate-300 sm:bottom-0 sm:text-lg lg:bottom-2.5 lg:left-3.5 lg:-mb-1 lg:w-fit lg:px-0 lg:text-xl 2xl:mb-[-4px] 2xl:text-2xl">
                  {monthNames[month]}
                </span>
              )}

              {/* ปุ่มเพิ่มงาน */}
              <button
                type="button"
                className="absolute right-2 top-2 rounded-full opacity-0 transition-all focus:opacity-100 group-hover:opacity-100"
              >
                <svg
                  className="size-8 scale-90 text-blue-500 transition-all hover:scale-100 group-focus:scale-100"
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
            </div>
          );
        })}
      </div>
    ));

    return calendar;
  }, [year]);

  useEffect(() => {
    const calendarContainer = document.querySelector(".calendar-container");

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
      {
        root: calendarContainer,
        rootMargin: "-75% 0px -25% 0px",
        threshold: 0,
      }
    );

    dayRefs.current.forEach((ref) => {
      if (ref && ref.getAttribute("data-day") === "15") {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="no-scrollbar calendar-container max-h-full overflow-y-scroll  rounded-t-2xl border dark:border-white/10 border-slate-400 dark:bg-black/40 bg-white/10 pb-10 text-slate-800  ">
      <div className="sticky -top-px z-50 w-full rounded-t-2xl  dark:bg-black/40 bg-black/40 backdrop-blur-[60px]   px-5 pt-7 sm:px-8 sm:pt-8 shadow-[0_0_60px_-30px_rgba(0,200,255,0.3)]">
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
              className="rounded-lg border dark:border-white/10 border-slate-300  dark:bg-[#1f2335] cursor-pointer transition-all duration-200 bg-white px-3 py-1.5 text-sm font-medium dark:text-white text-slate-500 dark:hover:bg-[#1a1d27] lg:px-5 lg:py-2.5"
            >
              Today
            </button>
            <button
              type="button"
              className="whitespace-nowrap cursor-pointer rounded-lg dark:bg-slate-500 bg-cyan-200 border border-slate-300 dark:border-white/10 text-slate-500 dark:text-white drop-shadow-md  px-3 py-1.5 text-center text-sm font-medium  hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 sm:rounded-xl lg:px-5 lg:py-2.5"
            >
              + Add Event
            </button>
          </div>
          <div className="flex w-fit items-center justify-between">
            <button
              onClick={handlePrevYear}
              className="rounded-full border cursor-pointer dark:border-white/30 border-slate-500 p-1 transition-colors hover:bg-white dark:hover:bg-[#1a1d27] sm:p-2"
            >
              <svg
                className="size-5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
            <h1 className="min-w-16 text-center text-lg font-semibold sm:min-w-20 sm:text-xl text-white ">
              {year}
            </h1>
            <button
              onClick={handleNextYear}
              className="rounded-full border cursor-pointer dark:border-white/30 border-slate-500 p-1 transition-colors hover:bg-white dark:hover:bg-[#1a1d27]  sm:p-2"
            >
              <svg
                className="size-5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="w-full border-b border-white/10 dark:text-cyan-400  text-cyan-500 py-2 text-center font-semibold"
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">{generateCalendar}</div>
    </div>
  );
};

export interface SelectProps {
  name: string;
  value: string;
  label?: string;
  options: { name: string; value: string }[];
  onChange: (_event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const Select = ({
  name,
  value,
  label,
  options = [],
  onChange,
  className,
}: SelectProps) => (
  <div className={`relative ${className}`}>
    {label && (
      <label
        htmlFor={name}
        className="mb-2 block font-medium text-slate-800 border-slate-300"
      >
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded-lg border border-white/10 dark:bg-[#1f2335] py-1.5 pl-2 pr-6 text-sm font-medium dark:text-white dark:hover:bg-[#1a1d27] bg-white text-slate-500 sm:rounded-xl sm:py-2.5 sm:pl-3 sm:pr-8"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-1 sm:pr-2">
      <svg
        className="size-5 dark:text-white text-slate-500"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  </div>
);
