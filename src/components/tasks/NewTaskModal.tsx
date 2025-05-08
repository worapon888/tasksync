"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import type { IncomingTask } from "@/types/task";
import { TaskMode, TaskPriority } from "@/generated/prisma";
import { Task } from "@/types/task";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (task: IncomingTask) => void;
  mode: TaskMode;
  editingTask?: Task | null;
}

export default function NewTaskModal({
  isOpen,
  onClose,
  mode,
  editingTask,
}: NewTaskModalProps) {
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
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title.trim()) return;

    const payload = {
      title,
      description,
      dueDate: date ? new Date(date).toISOString() : null,
      cover,
      priority,
      mode,
    };

    console.log("\ud83d\udce4 Submitting Task Payload:", payload);

    const url = editingTask ? `/api/tasks/${editingTask.id}` : "/api/tasks";
    const method = editingTask ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("\u274c Failed to submit task");
        return;
      }

      const updated = await res.json();
      console.log("\u2705 Task updated/created:", updated);

      setTitle("");
      setDescription("");
      setDate("");
      setCover("");
      setPriority("medium");

      onClose();
    } catch (error) {
      console.error("\u274c Error submitting task:", error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "task_upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcdibue2e/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setCover(data.secure_url);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-3xl flex items-center justify-center">
      <div className="bg-white dark:bg-black/80 rounded-xl w-full max-w-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {editingTask ? "Edit Task" : "Create New Task"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded border bg-transparent text-black dark:text-white dark:border-white/10"
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded border bg-transparent text-black dark:text-white dark:border-white/10"
        />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded border bg-transparent text-black dark:text-white dark:border-white/10"
        />

        <div>
          <label
            htmlFor="fileUpload"
            className="block w-full text-center cursor-pointer px-4 py-2 rounded border border-white/10 bg-black/30 dark:bg-slate-700 dark:hover:bg-white/10 text-white hover:text-blue-300 transition"
          >
            Upload Image
          </label>
          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {cover && (
            <div className="relative w-full h-40 mt-2 rounded-md overflow-hidden border border-white/10">
              <Image src={cover} alt="Preview" fill className="object-cover" />
            </div>
          )}
        </div>

        <div className="relative w-full">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="appearance-none w-full p-2 pr-10 rounded border bg-transparent text-black dark:bg-slate-600 dark:text-white dark:border-slate-500"
          >
            {Object.values(TaskPriority).map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)} Priority
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
            <ChevronDown size={18} />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-white/10 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 cursor-pointer"
          >
            {editingTask ? "Save Changes" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
