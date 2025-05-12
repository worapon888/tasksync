"use client";
import { useTaskMode } from "@/context/TaskModeContext";
import { TaskModes, TaskModeEnum } from "@/constants/taskModes";
import { ChevronDown } from "lucide-react";

export default function ModeSelector() {
  const { mode, setMode } = useTaskMode();

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="relative w-fit">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as TaskModeEnum)}
          className="appearance-none pr-10 dark:bg-[#1f2335] dark:text-white text-blue-400 bg-white/80 px-4 py-2 rounded-lg border border-white/10"
        >
          {Object.entries(TaskModes).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
      </div>
      <h1 className="text-white mt-6 text-xl mb-2">
        Mode:{" "}
        <span className="text-cyan-400">
          {TaskModes[mode as keyof typeof TaskModes]}
        </span>
      </h1>
    </div>
  );
}
