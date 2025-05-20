"use client";

import { useState } from "react";
import NewTaskModal from "./NewTaskModal";
import { TaskMode, Task } from "@/generated/prisma";
import { useEnergy } from "@/context/EnergyContext";
import { IncomingTask } from "@/types/task";

type Props = {
  mode: TaskMode;
  onSuccess: () => void;
};

export default function TaskModalController({ mode, onSuccess }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<IncomingTask | null>(null);
  const [prefillDate, setPrefillDate] = useState<Date | null>(null);

  const { refetchEnergy } = useEnergy();

  const openForNew = () => {
    setEditingTask(null);
    setIsOpen(true);
  };

  const openForEdit = (task: Task) => {
    const simplifiedTask: IncomingTask = {
      title: task.title,
      description: task.description ?? "",
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : undefined,
      cover: task.cover ?? "",
      priority: task.priority,
      mode: task.mode,
    };

    setEditingTask(simplifiedTask);
    setIsOpen(true);
  };

  const handleAddTask = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day, 23, 59);
    setPrefillDate(date);
    setEditingTask(null);
    setIsOpen(true);
  };

  const handleSubmit = async (task: IncomingTask) => {
    const method = editingTask ? "PUT" : "POST";
    const url = editingTask ? `/api/tasks/${editingTask.title}` : "/api/tasks";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, mode }),
    });

    if (res.ok) {
      setIsOpen(false);
      await refetchEnergy();
      onSuccess();
    } else {
      console.error("❌ Failed to submit task (controller)");
    }
  };

  return {
    isOpen,
    openForNew,
    openForEdit,
    handleAddTask,
    TaskModal: (
      <NewTaskModal
        key={editingTask?.title || "new"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={mode}
        editingTask={editingTask}
        defaultDate={prefillDate ?? undefined}
        onSubmit={handleSubmit}
      />
    ),
  };
}
