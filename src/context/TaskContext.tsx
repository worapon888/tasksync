"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  cover?: string;
};

type TaskContextType = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  deleteTask: (id: string) => void;
  updateTask: (updatedTask: Task) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const deleteTask = async (id: string) => {
    // ลบจาก database ผ่าน API
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });

    // ลบจาก context state (ถ้ามี setTasks ภายใน context ด้วย)
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
