"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const columns = [
  { id: "todo", title: "To do", color: "bg-pink-500" },
  { id: "doing", title: "Doing", color: "bg-orange-400" },
  { id: "review", title: "Under Review", color: "bg-cyan-400" },
  { id: "done", title: "Done", color: "bg-green-400" },
];

const mockTasks = {
  todo: [
    {
      title: "Make a new post",
      date: "21/06/2025",
      description: "Lorem ipsum is simply dummy text of the printing...",
      cover: "/board/board_img1.avif",
    },
    {
      title: "Make a prototype website",
      date: "25/06/2025",
      description: "Lorem ipsum is simply dummy text...",
    },
  ],
  doing: [
    {
      title: "Check design materials",
      date: "21/06/2025",
      description: "Lorem ipsum is simply dummy text of the printing...",
      cover:
        "https://images.unsplash.com/photo-1649371176738-dfc088e7a037?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  review: [
    {
      title: "Discuss year budgets",
      date: "05/12/2024",
      description: "Lorem ipsum is simply dummy text...",
    },
    {
      title: "Content plans",
      date: "21/06/2025",
      description: "Lorem ipsum is simply dummy text...",
      cover: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    },
  ],
  done: [
    {
      title: "Weekly planning meeting",
      date: "05/12/2024",
      description: "Lorem ipsum is simply dummy text...",
    },
    {
      title: "Discuss a new concept",
      date: "05/12/2024",
      description: "Lorem ipsum is simply dummy text...",
    },
    {
      title: "Discuss monthly budgets",
      date: "05/12/2024",
      description: "Lorem ipsum is simply dummy text...",
    },
  ],
};

export default function BoardPage() {
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedAssistant, setSelectedAssistant] =
    useState("Personal Assistant");

  return (
    <div className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10 mt-10  h-screen overflow-auto">
      {/* Assistant Selector */}
      <div className="max-w-screen-2xl mx-auto">
        <select
          value={selectedAssistant}
          onChange={(e) => setSelectedAssistant(e.target.value)}
          className="dark:bg-[#1f2335] dark:text-white text-blue-400 bg-white/80 px-4 py-2 rounded-lg border border-white/10"
        >
          <option>Personal Assistant</option>
          <option>Focus Coach</option>
        </select>
      </div>
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
              <h2 className="text-white text-lg font-semibold">{col.title}</h2>
              <button className="dark:text-white/60 dark:hover:text-white text-blue-100 hover:text-blue-300">
                <Plus size={18} />
              </button>
            </div>
            {tasks[col.id].map((task, i) => (
              <div
                key={i}
                className="rounded-xl dark:bg-black/60 bg-white/80 dark:text-white text-gray-500 border border-white/10 backdrop-blur-sm p-4 w-full max-w-sm"
              >
                {/* รูปปก */}
                {task.cover && (
                  <div className="relative w-full h-32 mb-3 rounded-md overflow-hidden">
                    <Image
                      src={task.cover}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Header: ชื่อ + เมนู */}
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  <BsThreeDotsVertical className="dark:text-white/80 text-slate-500 text-lg cursor-pointer" />
                </div>

                {/* คำอธิบาย */}
                <p className="dark:text-white/50 text-slate-500 text-sm line-clamp-2 mb-4">
                  {task.description}
                </p>

                {/* วันที่ + Avatars */}
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-2 dark:text-white/40 text-gray-400 text-xs">
                    <FaCalendarAlt className="text-sm" />
                    <span>{task.date}</span>
                  </div>

                  <div className="flex -space-x-2">
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
                  </div>
                </div>
              </div>
            ))}

            {col.id === "doing" && (
              <div className="w-full max-w-sm border-2 border-dashed dark:border-white/20 border-white/80 h-28 rounded-lg"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
