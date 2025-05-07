"use client";
import { useTaskMode } from "@/context/TaskModeContext";
import { TaskModes, TaskModeEnum } from "@/constants/taskModes";

export default function ModeSelector() {
  const { mode, setMode } = useTaskMode();

  return (
    <div className="max-w-screen-2xl mx-auto">
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as TaskModeEnum)}
        className="dark:bg-[#1f2335] dark:text-white text-blue-400 bg-white/80 px-4 py-2 rounded-lg border border-white/10"
      >
        {Object.entries(TaskModes).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <h1 className="text-white mt-6 text-xl mb-2">
        Mode: <span className="text-cyan-400">{TaskModes[mode]}</span>
      </h1>
    </div>
  );
}
