// hooks/useBoardTasks.ts
import { useEffect, useState } from "react";
import { Task, TasksByColumn } from "@/types/task";
import { useSession } from "next-auth/react";
import { useTaskMode } from "@/context/TaskModeContext";

export default function useBoardTasks() {
  const { data: session } = useSession();
  const { mode } = useTaskMode();
  const [tasks, setTasks] = useState<TasksByColumn>({
    todo: [],
    doing: [],
    review: [],
    done: [],
  });

  const fetchTasks = async () => {
    if (!session?.user || !mode) return;

    const res = await fetch(`/api/tasks?mode=${mode}`);
    const data = await res.json();

    const grouped: TasksByColumn = {
      todo: [],
      doing: [],
      review: [],
      done: [],
    };

    data.tasks.forEach((task: Task) => {
      switch (task.status) {
        case "todo":
          grouped.todo.push(task);
          break;
        case "in_progress":
          grouped.doing.push(task);
          break;
        case "review":
          grouped.review.push(task);
          break;
        case "done":
          grouped.done.push(task);
          break;
        default:
          grouped.todo.push(task);
      }
    });

    setTasks({ ...grouped });
  };

  useEffect(() => {
    fetchTasks();
  }, [session, mode]);

  return { tasks, fetchTasks };
}
