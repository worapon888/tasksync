// components/tasks/TaskModalController.tsx
"use client";

import { useState } from "react";
import NewTaskModal from "./NewTaskModal";
import { TaskMode } from "@/generated/prisma";
import { Task } from "@/types/task";

type Props = {
  mode: TaskMode;
  onSuccess: () => void;
};

export default function TaskModalController({ mode, onSuccess }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openForNew = () => {
    setEditingTask(null);
    setIsOpen(true);
  };

  const openForEdit = (task: Task) => {
    setEditingTask(task);
    setIsOpen(true);
  };

  return {
    isOpen,
    openForNew,
    openForEdit,
    TaskModal: (
      <NewTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={mode}
        editingTask={editingTask}
        onSubmit={async (task) => {
          const method = editingTask ? "PUT" : "POST";
          const url = editingTask
            ? `/api/tasks/${editingTask.id}`
            : "/api/tasks";

          const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...task, mode }),
          });

          if (res.ok) {
            setIsOpen(false);
            onSuccess();
          }
        }}
      />
    ),
  };
}
