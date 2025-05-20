"use client";

import { useSession } from "next-auth/react";
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
import ConfirmDeleteModal from "@/components/tasks/ConfirmDeleteModal";
import FloatingZones from "@/components/drag/FloatingZones";
import useDragTaskConfirmDelete from "@/hooks/useDragTaskConfirmDelete";
import useHandleAddTask from "@/hooks/useHandleAddTask";
import { createHandleTaskMove } from "@/hooks/useHandleTaskMove";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";

export default function BoardPage() {
  const { data: session } = useSession();
  const { mode } = useTaskMode();
  const { tasks, fetchTasks } = useBoardTasks();
  const { setTaskId: setTaskToDeleteId, modal: deleteModal } =
    useDragTaskConfirmDelete(fetchTasks);

  const { TaskModal, openForNew, openForEdit } = TaskModalController({
    mode: mode as TaskMode,
    onSuccess: fetchTasks,
  });

  const handleAddTask = useHandleAddTask(session, openForNew);
  const handleTaskMove = createHandleTaskMove({
    tasks,
    fetchTasks,
    openForEdit,
    setTaskToDeleteId,
  });
  useLayoutEffect(() => {
    gsap.from(".task-card", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });

    gsap.fromTo(
      ".floating-zone",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [tasks]);

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
    [tasks, handleAddTask, openForEdit, fetchTasks]
  );

  return (
    <DragDropProvider onDragEnd={handleTaskMove}>
      <div className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10 mt-10 h-screen overflow-auto">
        <FloatingZones />
        <ModeSelector />
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {renderColumns}
        </div>
        {TaskModal}
      </div>

      {deleteModal && <ConfirmDeleteModal {...deleteModal} />}
    </DragDropProvider>
  );
}
