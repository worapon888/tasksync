"use client";
import { features } from "../../data";
import { useTaskMode } from "@/context/TaskModeContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { setMode } = useTaskMode();
  const router = useRouter();

  function normalizeTitleToEnum(title: string) {
    return title.replace(/\s+/g, "").replace("&", "And"); // Leisure & Balance → LeisureAndBalance (กรณีคุณใช้แบบนี้)
  }
  return (
    <>
      {/* Content */}
      <div className="relative z-10 ml-0 md:ml-24 mt-16 md:mt-20 flex flex-col items-center min-h-screen overflow-y-auto ">
        <h2 className="text-xl md:text-2xl mb-2 dark:text-white  text-blue-400">
          Hello, Sir!
        </h2>
        <h1
          className="
              text-3xl md:text-5xl font-semibold leading-snug text-center
              bg-gradient-to-r from-blue-500 to-amber-300
              dark:from-[#444444] dark:to-white
              bg-clip-text text-transparent tracking-tight
            "
        >
          What would you like to <span>achieve today?</span>
        </h1>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-12 w-full max-w-6xl px-4">
          {features.map((item, i) => {
            const row = Math.floor(i / 3);
            const hoverGlow =
              row === 0
                ? "hover:shadow-[0_0_40px_rgba(255,50,50,0.3)] dark:hover:from-red-500/20 dark:hover:to-red-900/20 hover:border-red-500/40"
                : row === 2
                ? "hover:shadow-[0_0_40px_rgba(0,200,100,0.3)] dark:hover:from-green-500/20 dark:hover:to-green-900/20 hover:border-green-500/40"
                : "hover:shadow-[0_0_40px_rgba(100,100,255,0.3)] dark:hover:from-blue-500/20 dark:hover:to-blue-900/20 hover:border-blue-500/40";

            return (
              <div
                key={i}
                onClick={() => {
                  const modeEnum = normalizeTitleToEnum(item.title);
                  setMode(modeEnum); // ✅ ส่งค่าแบบ enum จริง
                  router.push("/dashboard/board");
                }}
                className={`
                    relative rounded-xl p-6 md:p-10
                    bg-gradient-to-b 
                     bg-white/80 dark:bg-black/60
                    border border-white/10
                   text-white/90  hover:text-gray-400 dark:hover:text-white
                    backdrop-blur-md transition-all duration-300
                    hover:scale-[1.02] cursor-pointer
                    ${hoverGlow} 
                  `}
              >
                <div className="flex flex-row items-center gap-4">
                  <div className="text-2xl mb-2 text-slate-500 dark:text-cyan-400">
                    {item.icon}
                  </div>
                  <div className="font-semibold text-lg dark:text-white text-slate-500">
                    {item.title}
                  </div>
                </div>
                <div className="text-sm dark:text-white/60 text-gray-400 mt-1">
                  {item.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
