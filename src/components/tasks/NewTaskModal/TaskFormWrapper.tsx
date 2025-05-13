"use client";

import { useEffect, useState } from "react";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import DueDateInput from "./DueDateInput";
import ImageUploader from "./ImageUploader";
import PrioritySelector from "./PrioritySelector";
import ActionButtons from "./ActionButtons";

import type { IncomingTask } from "@/types/task";
import { TaskPriority, TaskMode } from "@/generated/prisma";

interface TaskFormWrapperProps {
  mode: TaskMode;
  editingTask?: IncomingTask | null;
  onClose: () => void;
  onSubmit?: (task: IncomingTask) => void;
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

  const handleSubmit = () => {
    if (!title.trim()) return;

    const payload: IncomingTask = {
      title,
      description,
      dueDate: date || undefined,
      cover,
      priority,
      mode,
    };

    onSubmit?.(payload);

    // Reset
    setTitle("");
    setDescription("");
    setDate("");
    setCover("");
    setPriority("medium");

    onClose();
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
