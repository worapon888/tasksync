"use client";

import { useEffect, useState } from "react";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import DueDateInput from "./DueDateInput";
import ImageUploader from "./ImageUploader";
import PrioritySelector from "./PrioritySelector";
import ActionButtons from "./ActionButtons";

import type { Task } from "@/types/task";
import { TaskPriority, TaskMode } from "@/generated/prisma";

interface TaskFormWrapperProps {
  mode: TaskMode;
  editingTask?: Task | null;
  onClose: () => void;
  onSubmit?: (task: Task) => void;
}

export default function TaskFormWrapper({
  mode,
  editingTask,
  onClose,
  onSubmit,
}: TaskFormWrapperProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [cover, setCover] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setDate(
        editingTask.dueDate
          ? new Date(editingTask.dueDate).toISOString().slice(0, 16)
          : ""
      );
      setCover(editingTask.cover || "");
      setPriority(editingTask.priority || "medium");
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setCover("");
      setPriority("medium");
    }
  }, [editingTask]);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    const payload = {
      title,
      description,
      dueDate: date ? new Date(date).toISOString() : undefined,
      cover,
      priority,
      mode,
    };

    const url = editingTask ? `/api/tasks/${editingTask.id}` : "/api/tasks";
    const method = editingTask ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("❌ Failed to submit task");
        return;
      }

      const updated = (await res.json()) as Task; // ✅ ใส่ type
      if (onSubmit) {
        await onSubmit(updated); // ✅ ปลอดภัย type
      }

      // Reset state
      setTitle("");
      setDescription("");
      setDate("");
      setCover("");
      setPriority("medium");

      onClose();
    } catch (err) {
      console.error("❌ Error submitting task:", err);
    }
  };

  return (
    <div className="space-y-4">
      <TitleInput value={title} onChange={setTitle} />
      <DescriptionInput value={description} onChange={setDescription} />
      <DueDateInput value={date} onChange={setDate} />
      <ImageUploader cover={cover} onUpload={setCover} />
      <PrioritySelector value={priority} onChange={setPriority} />
      <ActionButtons
        onCancel={onClose}
        onSubmit={handleSubmit}
        isEditing={!!editingTask}
      />
    </div>
  );
}
