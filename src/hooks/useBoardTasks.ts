import { useEffect, useState, useCallback } from "react";
import { RawTask, Task, TasksByColumn } from "@/types/task";
import { useSession } from "next-auth/react";
import { useTaskMode } from "@/context/TaskModeContext";

export default function useBoardTasks() {
  const { data: session } = useSession();
  const { mode } = useTaskMode();
  const [tasks, setTasks] = useState<TasksByColumn>({
    TODO: [],
    DOING: [],
    REVIEW: [],
    DONE: [],
  });

  const fetchTasks = useCallback(async () => {
    if (!session?.user || !mode) return;

    const res = await fetch(`/api/tasks?mode=${mode}`);
    const data = await res.json();

    const grouped: TasksByColumn = {
      TODO: [],
      DOING: [],
      REVIEW: [],
      DONE: [],
    };

    data.tasks.forEach((task: RawTask) => {
      const normalizedTask: Task = {
        ...task,
        description: task.description ?? null,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        cover: task.cover ?? null,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      };

      switch (normalizedTask.status) {
        case "TODO":
          grouped.TODO.push(normalizedTask);
          break;
        case "DOING":
          grouped.DOING.push(normalizedTask);
          break;
        case "REVIEW":
          grouped.REVIEW.push(normalizedTask);
          break;
        case "DONE":
          grouped.DONE.push(normalizedTask);
          break;
        default:
          grouped.TODO.push(normalizedTask);
      }
    });

    setTasks(grouped);
  }, [session?.user, mode]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, fetchTasks };
}
