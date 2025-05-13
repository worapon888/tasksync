"use client";

import { useEffect } from "react";
import { useSnack } from "@/context/SnackProvider";
import { useEnergy } from "@/context/EnergyContext";
import { ContinuousCalendar } from "@/components/calendar/ContinuousCalendar";
import TaskModalController from "@/components/tasks/TaskModalController";

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

export default function DemoWrapper() {
  const { createSnack } = useSnack();
  const { setEnergyData } = useEnergy();

  useEffect(() => {
    const fetchEnergy = async () => {
      try {
        const res = await fetch("/api/energy-records");
        const data = await res.json();
        setEnergyData(data.records);
      } catch (error) {
        console.error("Failed to load energy data", error);
      }
    };

    fetchEnergy();
  }, []);

  const onClickHandler = (day: number, month: number, year: number) => {
    const snackMessage = `📅 Clicked ${monthNames[month]} ${day}, ${year}`;
    createSnack(snackMessage, "success");
  };

  // ✅ ใช้ TaskModalController เพื่อควบคุม modal
  const { TaskModal, handleAddTask } = TaskModalController({
    mode: "PersonalAssistant", // หรือเปลี่ยนจาก context ก็ได้
    onSuccess: () => createSnack("✅ Task created!", "success"),
  });

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center px-4 pt-4">
      <div className="relative h-full w-[80%] overflow-auto mt-10">
        <ContinuousCalendar
          onClick={onClickHandler}
          onAddTask={handleAddTask} // ✅ ใช้ตัวจริงที่เชื่อม modal
        />
        {TaskModal} {/* ✅ แสดง modal จริง */}
      </div>
    </div>
  );
}
