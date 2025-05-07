"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { columns } from "../../../../data";
import { useTaskMode } from "@/context/TaskModeContext";
import { ColumnType, Task, TasksByColumn } from "@/types/task";
import ModeSelector from "@/components/ModeSelector";
import NewTaskModal from "@/components/tasks/NewTaskModal";
import { signIn } from "next-auth/react";
import { TaskMode } from "@/generated/prisma";

export default function BoardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TasksByColumn>({
    todo: [],
    doing: [],
    review: [],
    done: [],
  });
  const { data: session } = useSession();
  const { mode } = useTaskMode();

  useEffect(() => {
    if (!session?.user) return;

    const fetchTasks = async () => {
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
        else grouped.todo.push(task); // fallback to todo
      });

      setTasks(grouped);
    };

    fetchTasks();
  }, [session, mode]);

  return (
    <div className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10 mt-10 h-screen overflow-auto">
      <ModeSelector />
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
              <h2 className="text-white text-lg font-semibold">{col.title}</h2>

              {/* Show "+" button only in the "todo" column */}
              {col.id === "todo" && (
                <button
                  className="dark:text-white/60 dark:hover:text-white text-blue-100 hover:text-blue-300 cursor-pointer"
                  onClick={() => {
                    if (!session?.user) {
                      // 👇 redirect ไปหน้า login
                      signIn(undefined, { callbackUrl: "/board" }); // หรือ path เดิม
                    } else {
                      setIsModalOpen(true);
                    }
                  }}
                >
                  <Plus size={24} />
                </button>
              )}
            </div>
            {tasks[col.id as ColumnType]?.map((task, i) => (
              <div
                key={i}
                className="rounded-xl dark:bg-black/60 bg-white/80 dark:text-white text-gray-500 border border-white/10 backdrop-blur-sm p-4 w-full max-w-sm"
              >
                {task.cover && (
                  <div className="relative w-full h-32 mb-3 rounded-md overflow-hidden">
                    <Image
                      src={task.cover}
                      alt={task.title || "Task image"}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  <BsThreeDotsVertical className="dark:text-white/80 text-slate-500 text-lg cursor-pointer" />
                </div>
                <p className="dark:text-white/50 text-slate-500 text-sm line-clamp-2 mb-4">
                  {task.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-2 dark:text-white/40 text-gray-400 text-xs">
                    <FaCalendarAlt className="text-sm" />
                    <span>{task.dueDate}</span>
                  </div>
                  {/* <div className="flex -space-x-2">
                    <Image
                      src="https://i.pravatar.cc/40?img=1"
                      alt="user1"
                      width={30}
                      height={30}
                      className="rounded-full border-2 border-white"
                    />
                    <Image
                      src="https://i.pravatar.cc/40?img=2"
                      alt="user2"
                      width={30}
                      height={30}
                      className="rounded-full border-2 border-white"
                    />
                    <Image
                      src="https://i.pravatar.cc/40?img=3"
                      alt="user3"
                      width={30}
                      height={30}
                      className="rounded-full border-2 border-white"
                    />
                  </div> */}
                </div>
              </div>
            ))}
            {/* Placeholder */}
            <div className="w-full max-w-sm border-2 border-dashed dark:border-white/20 border-white/80 h-28 rounded-lg" />
          </div>
        ))}
      </div>
      {/* Modal สำหรับสร้าง Task ใหม่ */}
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={mode as TaskMode}
        onSubmit={async (task) => {
          if (!session?.user) return;

          const res = await fetch("/api/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...task, mode }), // 👈 ต้องส่ง mode ไปด้วย
          });

          if (res.ok) {
            const res2 = await fetch(`/api/tasks?mode=${mode}`);
            const data = await res2.json();

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
          }
        }}
      />
    </div>
  );
}
