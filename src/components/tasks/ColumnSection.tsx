"use client";
import { Task, ColumnType } from "@/types/task";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { useDragContext } from "@/context/DragDropContext";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ColumnSection({
  colId,
  title,
  color,
  tasks,
  onAddClick,
  onEditTask,
  onDeleteSuccess,
}: {
  colId: ColumnType;
  title: string;
  color: string;
  tasks: Task[];

  onAddClick?: () => void;
  onEditTask: (task: Task) => void;
  onDeleteSuccess?: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: colId });
  const { activeTaskId } = useDragContext();

  const addButtonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (addButtonRef.current) {
      gsap.fromTo(
        addButtonRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }

    if (placeholderRef.current) {
      gsap.fromTo(
        placeholderRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [onAddClick]);

  const isEmpty = tasks.length === 0;

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-4 rounded-xl p-4 shadow-md min-h-[200px]  ${
        isOver ? "bg-white/5 border border-white/10" : ""
      }`}
    >
      {/* Header */}
      <div ref={containerRef} className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        {onAddClick && (
          <button
            className="dark:text-white/60 dark:hover:text-white text-blue-100 hover:text-blue-300 cursor-pointer"
            onClick={onAddClick}
            aria-label="Add task button"
          >
            <Plus />
          </button>
        )}
      </div>

      {/* Task list */}
      {tasks.map((task) => (
        <TaskCard
          key={`${task.id}-${new Date(task.updatedAt).getTime()}`}
          task={task}
          onEdit={() => onEditTask(task)}
          onDeleteSuccess={onDeleteSuccess}
        />
      ))}

      {/* ถ้าไม่มี task */}
      {isEmpty && (
        <p className="text-center text-sm dark:text-zinc-400 italic py-4">
          {activeTaskId ? "Drop task here" : "No tasks in this column"}
        </p>
      )}

      {/* Add Button / Placeholder */}
      {onAddClick ? (
        <div className="relative w-full max-w-sm h-28">
          <button
            ref={addButtonRef}
            onClick={onAddClick}
            aria-label="Add new task to this column"
            className="relative w-full h-full rounded-lg border-2 cursor-pointer border-dashed 
      dark:border-white/20 border-white/80 
      text-white/40 hover:text-white hover:border-white/60 
       flex items-center justify-center gap-2 
      hover:scale-[1.02] active:scale-95
      overflow-hidden"
          >
            <Plus className="w-5 h-5" />
            Add New Task
            {/* 4 glow edges */}
            <span className="glow-line top-line" />
            <span className="glow-line right-line" />
            <span className="glow-line bottom-line" />
            <span className="glow-line left-line" />
          </button>
        </div>
      ) : (
        <div
          ref={placeholderRef}
          className="relative w-full max-w-sm border-2 border-dashed dark:border-white/20 border-white/80 h-28 rounded-lg overflow-hidden"
        >
          <span className="glow-line top-line" />
          <span className="glow-line right-line" />
          <span className="glow-line bottom-line" />
          <span className="glow-line left-line" />
        </div>
      )}
    </div>
  );
}
