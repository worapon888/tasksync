import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { features } from "../../data";
import ParticlesBackground from "@/components/tsparticles";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[linear-gradient(180deg,_#6995e9_0%,_#ffffff_100%)] dark:bg-[linear-gradient(180deg,_#141621_0%,_#0e0c11_100%)]">
      <div
        className="
          relative h-full w-full rounded-2xl p-4 sm:p-6 md:p-8
          backdrop-blur-2xl
          bg-white/30 dark:bg-black/30
          shadow-[0_0_60px_-30px_rgba(43,152,196,0.466)]
          dark:shadow-[0_0_60px_-30px_rgba(0,200,255,0.3)]
          overflow-hidden
        "
      >
        {/* Glow effects */}
        <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-cyan-400/20 blur-[200px] pointer-events-none z-0" />
        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[240px] h-[240px] rounded-full border border-cyan-400/10 opacity-20 z-0" />
        <ParticlesBackground />
        <Topbar />
        <div className="relative">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="relative z-10 ml-0 md:ml-24 mt-16 md:mt-20 flex flex-col items-center">
          <h2 className="text-xl md:text-2xl mb-2 text-white">Hello, Sir!</h2>
          <h1
            className="
              text-3xl md:text-5xl font-semibold leading-snug text-center
              bg-gradient-to-r from-cyan-300 to-white
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
                  className={`
                    relative rounded-xl p-6 md:p-10
                    bg-gradient-to-b from-white/70 to-white/50
                    dark:from-gray-800 dark:to-gray-700/70
                    border border-white/10
                    dark:text-white/90 text-gray-400/90 hover:text-gray-400 dark:hover:text-white
                    backdrop-blur-md transition-all duration-300
                    hover:scale-[1.02] cursor-pointer
                    ${hoverGlow}
                  `}
                >
                  <div className="flex flex-row items-center gap-4">
                    <div className="text-2xl mb-2 text-cyan-400">
                      {item.icon}
                    </div>
                    <div className="font-semibold text-lg">{item.title}</div>
                  </div>
                  <div className="text-sm dark:text-white/60 text-gray-400 mt-1">
                    {item.subtitle}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
