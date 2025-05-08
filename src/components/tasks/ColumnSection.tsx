"use client";
import { Task, ColumnType } from "@/types/task";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

export default function ColumnSection({
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
  return (
    <div className="flex flex-col gap-4">
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

      {tasks.map((task) => (
        <TaskCard
          key={`${task.id}-${new Date(task.updatedAt).getTime()}`}
          task={task}
          onEdit={() => onEditTask(task)}
          onDeleteSuccess={onDeleteSuccess}
        />
      ))}

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
