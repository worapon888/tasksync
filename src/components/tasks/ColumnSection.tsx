"use client";
import { Task, ColumnType } from "@/types/task";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { useDragContext } from "@/context/DragDropContext";

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

  const isEmpty = tasks.length === 0;

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-4 rounded-xl p-4 shadow-md min-h-[200px] transition-all duration-300 ${
        isOver ? "bg-white/5 border border-white/10 scale-[1.01]" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
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
        <button
          onClick={onAddClick}
          aria-label="Add new task to this column"
          className="w-full max-w-sm h-28 rounded-lg border-2 cursor-pointer border-dashed dark:border-white/20 border-white/80 text-white/40 hover:text-white hover:border-white/60 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Task
        </button>
      ) : (
        <div className="w-full max-w-sm border-2 border-dashed dark:border-white/20 border-white/80 h-28 rounded-lg" />
      )}
    </div>
  );
}
