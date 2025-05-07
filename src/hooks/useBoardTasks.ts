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
    if (!session?.user) return;

    const res = await fetch(`/api/tasks?mode=${mode}`);
    const data = await res.json();

    const grouped: TasksByColumn = {
      todo: [],
      doing: [],
      review: [],
      done: [],
    };

    data.tasks.forEach((task: Task) => {
      if (task.status === "todo") grouped.todo.push(task);
      else if (task.status === "in_progress") grouped.doing.push(task);
      else if (task.status === "review") grouped.review.push(task);
      else if (task.status === "done") grouped.done.push(task);
      else grouped.todo.push(task);
    });

    setTasks(grouped);
  };

  useEffect(() => {
    fetchTasks();
  }, [session, mode]);

  return { tasks, fetchTasks };
}
