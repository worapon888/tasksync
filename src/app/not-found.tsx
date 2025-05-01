import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import ParticlesBackground from "@/components/tsparticles";

export default function NotFound() {
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
        <div className="relative overflow-visible">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
          <div className="text-center space-y-6">
            <h1
              className="text-3xl md:text-5xl font-semibold leading-snug
        bg-gradient-to-r from-cyan-300 to-white
        dark:from-[#444444] dark:to-white
        bg-clip-text text-transparent tracking-tight"
            >
              Oops! We couldn&apos;t find the page you&apos;re looking for.
            </h1>
            <h1
              className="text-5xl md:text-8xl font-semibold leading-snug
        bg-gradient-to-br from-cyan-300 to-white
        dark:from-[#444444] dark:to-white
        bg-clip-text text-transparent tracking-tight"
            >
              404
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
