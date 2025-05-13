// hooks/useCalendarData.ts
import { useMemo } from "react";
import { EnergyData } from "@/context/EnergyContext";

export function useCalendarData(year: number, energyData: EnergyData[]) {
  const today = new Date();

  return useMemo(() => {
    const daysInYear = (): { month: number; day: number; year: number }[] => {
      const daysInYear = [];
      const startDayOfWeek = new Date(year, 0, 1).getDay();

      // เติมวันที่จากธันวาคมปีที่แล้ว (เฉพาะต้นเดือนที่ยังไม่เต็ม 7 วัน)
      if (startDayOfWeek < 6) {
        const lastMonth = 11;
        const prevYear = year - 1;
        const lastMonthDays = new Date(prevYear, lastMonth + 1, 0).getDate();

        for (let i = 0; i < startDayOfWeek; i++) {
          daysInYear.push({
            month: lastMonth,
            day: lastMonthDays - startDayOfWeek + 1 + i,
            year: prevYear,
          });
        }
      }

      // เพิ่มวันที่จริงของปีปัจจุบัน
      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          daysInYear.push({ month, day, year });
        }
      }

      // เติมวันจากมกราคมปีถัดไปให้ครบสัปดาห์สุดท้าย
      const lastWeekDayCount = daysInYear.length % 7;
      if (lastWeekDayCount > 0) {
        const extraDaysNeeded = 7 - lastWeekDayCount;
        const nextYear = year + 1;
        for (let day = 1; day <= extraDaysNeeded; day++) {
          daysInYear.push({ month: 0, day, year: nextYear });
        }
      }

      return daysInYear;
    };

    const calendarDays = daysInYear();
    const calendarWeeks = [];

    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push(calendarDays.slice(i, i + 7));
    }

    return {
      calendarWeeks,
      isToday: (day: number, month: number) =>
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year,
      getMatchEnergy: (day: number, month: number, yr: number = year) =>
        energyData.find(
          (e) => e.day === day && e.month === month && e.year === yr
        ),
    };
  }, [year, energyData]);
}
