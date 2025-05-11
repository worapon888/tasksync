"use client";

import { useSession, signIn } from "next-auth/react";
import { useMemo } from "react";
import { columns } from "../../../../data";
import { ColumnType } from "@/types/task";
import ModeSelector from "@/components/ModeSelector";
import ColumnSection from "@/components/tasks/ColumnSection";
import useBoardTasks from "@/hooks/useBoardTasks";
import TaskModalController from "@/components/tasks/TaskModalController";
import { useTaskMode } from "@/context/TaskModeContext";
import { TaskMode, TaskStatus } from "@/generated/prisma";
import { DragDropProvider } from "@/context/DragDropContext";
import { DragEndEvent } from "@dnd-kit/core";

export default function BoardPage() {
  const { data: session } = useSession();
  const { mode } = useTaskMode();

  const { tasks, fetchTasks } = useBoardTasks();

  const { TaskModal, openForNew, openForEdit } = TaskModalController({
    mode: mode as TaskMode,
    onSuccess: fetchTasks,
  });

  const handleAddTask = () => {
    if (!session?.user) {
      signIn(undefined, { callbackUrl: "/dashboard/board" });
    } else {
      openForNew();
    }
  };

  const handleTaskMove = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // แปลง overId (เช่น "doing") → "DOING"
    const status = overId.toUpperCase(); // ต้องได้: "DOING", "TODO", "REVIEW", "DONE"

    try {
      await fetch(`/api/tasks/${activeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }), // ✅ ส่งเป็น enum string
      });

      fetchTasks();
    } catch (err) {
      console.error("❌ Move failed", err);
    }
  };

  const renderColumns = useMemo(
    () =>
      columns.map((col) => {
        const columnId = col.id.toUpperCase() as TaskStatus;
        const columnTasks = tasks[columnId] || [];

        return (
          <ColumnSection
            key={`${columnId}-${columnTasks
              .map((t) => t.id + t.updatedAt)
              .join("-")}`}
            colId={col.id as ColumnType}
            title={col.title}
            color={col.color}
            tasks={columnTasks}
            onAddClick={columnId === "TODO" ? handleAddTask : undefined}
            onEditTask={openForEdit}
            onDeleteSuccess={fetchTasks}
          />
        );
      }),
    [tasks, session]
  );

  return (
    <DragDropProvider onDragEnd={handleTaskMove}>
      <div className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10 mt-10 h-screen overflow-auto">
        <ModeSelector />
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {renderColumns}
        </div>
        {TaskModal}
      </div>
    </DragDropProvider>
  );
}
