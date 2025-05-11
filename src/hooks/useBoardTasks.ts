// hooks/useBoardTasks.ts
import { useEffect, useState } from "react";
import { Task, TasksByColumn } from "@/types/task";
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

  const fetchTasks = async () => {
    if (!session?.user || !mode) return;

    const res = await fetch(`/api/tasks?mode=${mode}`);
    const data = await res.json();

    const grouped: TasksByColumn = {
      TODO: [],
      DOING: [],
      REVIEW: [],
      DONE: [],
    };

    data.tasks.forEach((task: Task) => {
      switch (task.status) {
        case "TODO":
          grouped.TODO.push(task);
          break;
        case "DOING":
          grouped.DOING.push(task);
          break;
        case "REVIEW":
          grouped.REVIEW.push(task);
          break;
        case "DONE":
          grouped.DONE.push(task);
          break;
        default:
          grouped.TODO.push(task);
      }
    });
    setTasks({ ...grouped });
  };

  useEffect(() => {
    fetchTasks();
  }, [session, mode]);

  return { tasks, fetchTasks };
}
