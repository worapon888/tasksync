"use client";

import {
  FaBolt,
  FaSmile,
  FaWaveSquare,
  FaUser,
  FaTools,
  FaQuoteRight,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10 mt-10  h-screen overflow-auto">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-bold mb-8 text-cyan-400">
          About Us – TaskSync
        </h1>

        <p className="mb-10 text-lg dark:text-slate-300 text-slate-200 leading-relaxed">
          <strong>TaskSync</strong> isn’t just another task manager. It&apos;s
          your rhythm, your reflection, and your quiet partner in productivity.
        </p>

        {/* Why We Built This */}
        <section className="mb-12 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
            <FaBolt className="text-cyan-400" /> Why We Built This
          </h2>
          <p className="dark:text-slate-400 text-slate-200 leading-relaxed">
            Most productivity tools push you to go faster. At TaskSync, we
            believe in moving better.
          </p>
          <ul className="list-disc list-inside dark:text-slate-400 text-slate-200  mt-4 space-y-1">
            <li className="flex items-center gap-2">
              <FaBolt className="text-yellow-300" /> <strong>Deep focus</strong>{" "}
              – not just endless checkboxes
            </li>
            <li className="flex items-center gap-2">
              <FaSmile className="text-pink-300" />{" "}
              <strong>Emotional awareness</strong> – how you feel affects what
              you do
            </li>
            <li className="flex items-center gap-2">
              <FaWaveSquare className="text-green-300" />{" "}
              <strong>Flow-friendly design</strong> – calm UX, no chaos
            </li>
          </ul>
          <p className="dark:text-slate-400 text-slate-200  mt-4">
            Our goal is to help you <strong>clear your mind</strong>, not
            clutter it more.
          </p>
        </section>

        {/* Built for Solo Creators */}
        <section className="mb-12 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
            <FaUser className="text-cyan-400" /> Built for Solo Creators
          </h2>
          <p className="dark:text-slate-400 text-slate-200  leading-relaxed">
            Whether you&apos;re a developer, freelancer, artist, or deep
            thinker—TaskSync is made for those who work alone, but not
            aimlessly.
          </p>
          <ul className="list-disc list-inside dark:text-slate-400 text-slate-200  mt-4 space-y-1">
            <li>Plan sustainably</li>
            <li>Track without judgment</li>
            <li>Sync your work with your energy, not just your calendar</li>
          </ul>
        </section>

        {/* From Developer to Developer */}
        <section className="mb-12 flex flex-col items-center">
          <h2 className="text-2xl font-semibold  text-white mb-3 flex items-center gap-2">
            <FaTools className="text-cyan-400" /> From Developer to Developer
          </h2>

          <p className="dark:text-slate-400 text-slate-200  leading-relaxed">
            TaskSync was handcrafted by an independent developer passionate
            about UI, motion, and mental clarity. Every flow, every animation,
            and every layout is made to feel intentional—not robotic.
          </p>
        </section>

        {/* Quote */}
        <blockquote className="border-l-4 border-cyan-500 pl-4 italic dark:text-slate-400 text-slate-200  flex items-start text-4xl gap-2">
          <FaQuoteRight className="mt-1 text-cyan-300" />
          <span>
            &quot;You don’t need more productivity. You need more peace with
            your process.&quot; — <strong>TaskSync</strong>
          </span>
        </blockquote>
      </div>
    </div>
  );
}
