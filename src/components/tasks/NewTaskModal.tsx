"use client";

import TaskFormWrapper from "./NewTaskModal/TaskFormWrapper";
import type { IncomingTask } from "@/types/task";
import { TaskMode } from "@/generated/prisma";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (task: IncomingTask) => void; // ✅ แก้ตรงนี้
  mode: TaskMode;
  editingTask?: IncomingTask | null; // ✅ แก้ตรงนี้
  defaultDate?: Date;
}

export default function NewTaskModal({
  isOpen,
  onClose,
  mode,
  editingTask,
  onSubmit,
  defaultDate,
}: NewTaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-3xl flex items-center justify-center">
      <div className="bg-white dark:bg-black/80 rounded-xl w-full max-w-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {editingTask ? "Edit Task" : "Create New Task"}
        </h2>

        <TaskFormWrapper
          mode={mode}
          editingTask={editingTask}
          onClose={onClose}
          onSubmit={onSubmit}
          defaultDate={defaultDate}
        />
      </div>
    </div>
  );
}
