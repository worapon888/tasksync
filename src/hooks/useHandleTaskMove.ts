import { DragEndEvent } from "@dnd-kit/core";
import { Task } from "@/types/task";
import { TaskStatus } from "@/generated/prisma";
import { gsap } from "gsap";

export function createHandleTaskMove({
  tasks,
  fetchTasks,
  openForEdit,
  setTaskToDeleteId,
}: {
  tasks: Record<TaskStatus, Task[]>;
  fetchTasks: () => void;
  openForEdit: (task: Task) => void;
  setTaskToDeleteId: (id: string) => void;
}) {
  return async function handleTaskMove(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    if (overId === "delete-zone") {
      setTaskToDeleteId(activeId);
      return;
    }

    if (overId === "edit-zone") {
      const allTasks = Object.values(tasks).flat();
      const taskToEdit = allTasks.find((t) => t.id === activeId);
      if (taskToEdit) openForEdit(taskToEdit);
      return;
    }

    const status = overId.toUpperCase();
    try {
      await fetch(`/api/tasks/${activeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchTasks();

      setTimeout(() => {
        gsap.fromTo(
          ".task-card",
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.05,
          }
        );
      }, 50);
    } catch (err) {
      console.error("❌ Move failed", err);
    }
  };
}
