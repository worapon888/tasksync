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
    zIndex: 10,
  };

  return (
    <div className="relative w-full max-w-sm overflow-visible">
      {/* ✅ Dropdown อยู่มุมล่างขวา */}
      <div className="absolute bottom-[30%] right-2 z-[999]">
        <TaskCardDropdown
          onEdit={onEdit}
          onDelete={() => setIsConfirmOpen(true)}
        />
      </div>

      {/* ✅ กล่อง draggable จริง */}
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="group rounded-xl dark:bg-black/60 bg-white/80 dark:text-white text-gray-500 border border-white/10 backdrop-blur-sm p-4 cursor-grab active:cursor-grabbing transition-shadow hover:shadow-lg"
      >
        {/* Hover Hint */}
        <span className="absolute -top-5 -right-1 px-3 py-1 shadow-md text-[10px] rounded-xl italic bg-cyan-400/80 text-black opacity-0 group-hover:opacity-80 transition-all text-center z-10">
          “Drag to move”
          <span className="absolute left-1/2 -bottom-1 translate-x-[-50%] w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-cyan-400/80" />
        </span>

        {/* รูปภาพหน้าปก */}
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

        {/* ชื่อ Task */}
        <div className="mb-1">
          <h3 className="font-semibold text-lg">{task.title}</h3>
        </div>

        {/* คำอธิบาย */}
        <p className="dark:text-white/50 text-slate-500 text-sm line-clamp-2 mb-4">
          {task.description}
        </p>

        {/* วันที่ */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2 dark:text-white/40 text-gray-400 text-xs">
            <FaCalendarAlt className="text-sm" />
            <span className="text-cyan-400">
              {task.dueDate
                ? dayjs(task.dueDate).format("DD MMM YYYY, HH:mm")
                : "Invalid Date"}
            </span>
          </div>
        </div>
      </div>

      {/* Modal ลบ */}
      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
