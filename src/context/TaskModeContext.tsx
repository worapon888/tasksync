"use client";

import { createContext, useContext, useState } from "react";

const TaskModeContext = createContext({
  mode: "PersonalAssistant",
  setMode: (mode: string) => {},
});

export function TaskModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("PersonalAssistant");

  return (
    <TaskModeContext.Provider value={{ mode, setMode }}>
      {children}
    </TaskModeContext.Provider>
  );
}

export const useTaskMode = () => useContext(TaskModeContext);
