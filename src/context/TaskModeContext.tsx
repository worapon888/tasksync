"use client";

import type { TaskModeEnum } from "@/constants/taskModes";
import { createContext, useContext, useState } from "react";

type TaskModeContextType = {
  mode: TaskModeEnum;
  setMode: (mode: TaskModeEnum) => void;
};

const TaskModeContext = createContext<TaskModeContextType>({
  mode: "PersonalAssistant", // ต้องเป็น key ที่ตรงกับ TaskModes
  setMode: () => {},
});

export function TaskModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<TaskModeEnum>("PersonalAssistant");

  return (
    <TaskModeContext.Provider value={{ mode, setMode }}>
      {children}
    </TaskModeContext.Provider>
  );
}

export const useTaskMode = () => useContext(TaskModeContext);
