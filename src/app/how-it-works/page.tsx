// app/how-it-works/page.tsx
"use client";

import {
  FaRegCalendarCheck,
  FaRegSmile,
  FaAlignLeft,
  FaUserCheck,
} from "react-icons/fa";
import { BsFillPlayCircleFill } from "react-icons/bs";

export default function HowItWorksPage() {
  return (
    <div className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10   h-screen overflow-visible">
      <div className="max-w-5xl mx-auto px-6 py-16 text-white">
        <h1 className="text-5xl font-bold text-cyan-400 mb-10 text-center">
          How It Works — TaskSync
        </h1>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center  gap-2">
            <FaRegCalendarCheck
              className="text-cyan-300 mt-1.5 transition-transform hover:scale-105 duration-300"
              size={28}
            />
            <h2 className="text-xl font-semibold mb-1">
              Plan with Your Energy
            </h2>
            <p className="dark:text-slate-400 text-slate-200 max-w-2xl">
              Schedule tasks based on your expected energy levels — not just
              your time slots. This helps you match your best hours with the
              most important work.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center  gap-2">
            <FaRegSmile
              className="text-pink-400 mt-1.5 transition-transform hover:scale-105 duration-300"
              size={28}
            />
            <h2 className="text-xl font-semibold mb-1">Track How You Feel</h2>
            <p className="dark:text-slate-400 text-slate-200 max-w-2xl">
              Quickly log your mood and energy each day. Your emotional state
              matters — TaskSync helps you notice patterns.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center  gap-2">
            <FaAlignLeft
              className="text-yellow-400 mt-1.5 transition-transform hover:scale-105 duration-300"
              size={28}
            />
            <h2 className="text-xl font-semibold mb-1">
              No Clutter, Just Flow
            </h2>
            <p className="dark:text-slate-400 text-slate-200 max-w-2xl">
              The design is made for flow — no noise, no overload. You’ll never
              feel like you’re managing another app.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center gap-2">
            <FaUserCheck
              className="text-green-400 mt-1.5 transition-transform hover:scale-105 duration-300"
              size={28}
            />
            <h2 className="text-xl font-semibold mb-1">Stay Intentional</h2>
            <p className="dark:text-slate-400 text-slate-200 max-w-2xl">
              TaskSync keeps your rhythm aligned — not just productive, but
              purposeful. It’s built for creators, not just task-doers.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center ">
          <BsFillPlayCircleFill
            className="text-cyan-400 mx-auto mb-4 transition-transform hover:scale-105 duration-300"
            size={42}
          />
          <p className="dark:text-slate-400 text-slate-200 italic max-w-xl mx-auto text-4xl">
            “You don’t need more productivity tools. You need more clarity,
            rhythm, and peace.”
          </p>
          <p className="dark:text-cyan-500 text-cyan-300 font-bold mt-5 text-4xl ">
            — TaskSync Team
          </p>
        </div>
      </div>
    </div>
  );
}
