"use client";

import { useEffect } from "react";
import { useSnack } from "@/context/SnackProvider";
import { useEnergy } from "@/context/EnergyContext";
import { ContinuousCalendar } from "@/components/calendar/ContinuousCalendar";
import TaskModalController from "@/components/tasks/TaskModalController";
import { useTaskMode } from "@/context/TaskModeContext";

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

  const { mode } = useTaskMode();
  const { TaskModal, handleAddTask } = TaskModalController({
    mode,
    onSuccess: () => createSnack("✅ Task created!", "success"),
  });

  return (
    <div className="relative w-full px-4 pt-6 pb-10 flex flex-col items-center ">
      <div className="w-full min-w-[320px] max-w-none sm:max-w-[1300px]">
        <ContinuousCalendar
          onClick={onClickHandler}
          onAddTask={handleAddTask}
        />
        {TaskModal}
      </div>
    </div>
  );
}
