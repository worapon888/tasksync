import React from "react";
import EventCard from "./CalendarEvent";
import { days, hours } from "../../../data";

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

export default function WeeklyCalendar() {
  return (
    <div className="relative w-full">
      {/* เวลาแนวตั้งซ้าย */}
      <div className="absolute left-0 top-44 flex flex-col text-sm text-gray-400 w-[60px] z-20 pointer-events-none ">
        {hours.map((hour, i) => (
          <div key={i} className="h-24 flex items-start justify-end pr-2 pt-1">
            {hour}
          </div>
        ))}
      </div>

      {/* เวลาแนวตั้งขวา */}
      <div className="absolute right-0 top-44 flex flex-col text-sm text-gray-400 w-[60px] z-20 pointer-events-none ">
        {hours.map((hour, i) => (
          <div
            key={i}
            className="h-24 flex items-start justify-start pl-2 pt-1 "
          >
            {hour}
          </div>
        ))}
      </div>

      {/* ตารางหลัก */}
      <div
        className="grid w-full text-white pl-[60px] pr-[60px]"
        style={{
          minHeight: `${(hours.length + 1) * 96}px`, // 6rem = 96px
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gridTemplateRows: `auto repeat(${hours.length}, 6rem)`,
        }}
      >
        {/* Header */}
        {days.map((day, i) => (
          <div
            key={i}
            className="py-5 bg-gray-900/60 border-b border-gray-800 flex flex-col items-center justify-center gap-1 "
          >
            <div className="flex flex-row gap-3">
              <div>
                <p className="text-sm font-medium text-white/60">{day.name}</p>
                <p className="text-3xl font-semibold">{day.date}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className={`text-xs ${getEnergyColor(day.energyLevel)}`}>
                  {day.energyLevel}
                </p>
                <div className="w-16 h-2 rounded-full bg-gray-600">
                  <div
                    className={`h-full rounded-full ${getBarColor(
                      day.energyLevel
                    )}`}
                    style={{ width: `${day.value}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400">Energy</p>
              </div>
            </div>
          </div>
        ))}

        {/* Time Slots */}
        {hours.map((_, hIdx) =>
          days.map((_, dIdx) => (
            <div
              key={`${hIdx}-${dIdx}`}
              className="h-24 border border-gray-800/60 bg-black/60"
            />
          ))
        )}

        {/* EventCards */}
        <EventCard
          time="6 AM"
          title="Discuss year budgets"
          category="PersonalDevelopment"
          className="col-start-1 row-start-2 z-10"
        />
        {/*  <EventCard
          time="7 AM"
          title="Financial Update"
          category="PersonalDevelopment"
          className="col-start-1 row-start-3 z-10"
        />
        <EventCard
          time="8 AM"
          title="Make a prototype website"
          category="PersonalAssistant"
          className="col-start-2 row-start-4 z-10"
        />
        <EventCard
          time="8 AM"
          title="Meeting School"
          category="LeisureBalance"
          className="col-start-3 row-start-4 z-10"
        />
        <EventCard
          time="9 AM"
          title="Meeting School"
          category="LeisureBalance"
          className="col-start-3 row-start-5 z-10"
        />
        <EventCard
          time="10 AM"
          title="Meeting School"
          category="LeisureBalance"
          className="col-start-3 row-start-6 z-10"
        />  */}
      </div>
    </div>
  );
}
