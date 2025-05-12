"use client";
import { useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react"; // ✅ ใช้ icon แทน emoji

export default function DeleteZone() {
  const { setNodeRef, isOver } = useDroppable({ id: "delete-zone" });

  return (
    <div
      ref={setNodeRef}
      className={`fixed top-1/4 left-1/2 translate-x-24 -translate-y-1/2
        w-16 h-16 rounded-full flex items-center justify-center
        bg-red-600/30 text-white shadow-lg transition-all z-[999]
        ${isOver ? "scale-110 bg-red-400" : ""}
      `}
    >
      <Trash2 className="w-6 h-6" />
    </div>
  );
}
