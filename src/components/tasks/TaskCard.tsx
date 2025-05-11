"use client";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";
import { useState } from "react";
import { Task } from "@/types/task";
import TaskCardDropdown from "./TaskCardDropdown";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function TaskCard({
  task,
  onEdit,
  onDeleteSuccess,
}: {
  task: Task;
  onEdit: () => void;
  onDeleteSuccess?: () => void;
}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = async () => {
    await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
    onDeleteSuccess?.();
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="group relative rounded-xl dark:bg-black/60 bg-white/80 dark:text-white text-gray-500 border border-white/10 backdrop-blur-sm p-4 w-full max-w-sm cursor-grab active:cursor-grabbing transition-shadow hover:shadow-lg"
    >
      {/* Hover Hint */}
      <span className="absolute -top-5 -right-1 px-3 py-1 shadow-md text-[10px] rounded-xl italic bg-cyan-400/80 text-black opacity-0 group-hover:opacity-80 transition-all text-center z-10">
        “Drag to move”
        <span className="absolute left-1/2 -bottom-1 translate-x-[-50%] w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-cyan-400/80" />
      </span>

      {/* Drag handle icon (decorative) */}
      <div className="absolute top-2 left-2 text-gray-400 text-xs">☰</div>

      {task.cover && (
        <div className="relative w-full h-32 mb-3 rounded-md overflow-hidden">
          <Image
            src={task.cover}
            alt={task.title || "Task image"}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex justify-between items-start mb-1">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <TaskCardDropdown
          onEdit={onEdit}
          onDelete={() => setIsConfirmOpen(true)}
        />
        <ConfirmDeleteModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDelete}
        />
      </div>

      <p className="dark:text-white/50 text-slate-500 text-sm line-clamp-2 mb-4">
        {task.description}
      </p>

      <div className="flex justify-between items-center mt-auto">
        <div className="flex items-center gap-2 dark:text-white/40 text-gray-400 text-xs">
          <FaCalendarAlt className="text-sm" />
          <span className="text-cyan-400">
            {dayjs(task.dueDate).format("DD MMM YYYY, HH:mm")}
          </span>
        </div>
      </div>
    </div>
  );
}
