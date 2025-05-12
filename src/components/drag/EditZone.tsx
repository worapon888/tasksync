"use client";
import { useDroppable } from "@dnd-kit/core";
import { Pencil } from "lucide-react"; // ✅ ใช้ icon แบบ component

export default function EditZone() {
  const { setNodeRef, isOver } = useDroppable({ id: "edit-zone" });

  return (
    <div
      ref={setNodeRef}
      className={`fixed top-1/4 left-1/2 -translate-x-24 -translate-y-1/2
        w-16 h-16 rounded-full flex items-center justify-center
        bg-white/30 text-white shadow-lg transition-all z-[999]
        ${isOver ? "scale-110 bg-cyan-400" : ""}
      `}
    >
      <Pencil className="w-6 h-6" />
    </div>
  );
}
