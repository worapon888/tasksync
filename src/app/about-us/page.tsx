"use client";

import {
  FaBolt,
  FaSmile,
  FaWaveSquare,
  FaUser,
  FaTools,
  FaQuoteRight,
} from "react-icons/fa";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".about-section"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.3,
        }
      );
    }

    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 1.2,
        }
      );
    }
  }, []);

  return (
    <div className="relative z-10 px-4 sm:px-6 md:px-10 py-10 min-h-screen ml-0 md:ml-24 overflow-auto">
      <div
        ref={containerRef}
        className="max-w-screen-md mx-auto flex flex-col items-center gap-6 sm:gap-8"
      >
        <h1 className="text-2xl sm:text-4xl font-bold text-cyan-400 text-center mb-6">
          About Us – TaskSync
        </h1>

        <p className="text-base sm:text-lg dark:text-slate-300 text-slate-200 leading-relaxed text-center">
          <strong>TaskSync</strong> isn’t just another task manager. It&apos;s
          your rhythm, your reflection, and your quiet partner in productivity.
        </p>

        {/* Why We Built This */}
        <section className="about-section mt-10 flex flex-col items-center text-center px-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 flex items-center gap-2">
            <FaBolt className="text-cyan-400" /> Why We Built This
          </h2>
          <p className="text-sm sm:text-base dark:text-slate-400 text-slate-200 leading-relaxed">
            Most productivity tools push you to go faster. At TaskSync, we
            believe in moving better.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-sm sm:text-base dark:text-slate-400 text-slate-200 text-left">
            <li className="flex items-center gap-2">
              <FaBolt className="text-yellow-300" />
              <strong>Deep focus</strong> – not just endless checkboxes
            </li>
            <li className="flex items-center gap-2">
              <FaSmile className="text-pink-300" />
              <strong>Emotional awareness</strong> – how you feel affects what
              you do
            </li>
            <li className="flex items-center gap-2">
              <FaWaveSquare className="text-green-300" />
              <strong>Flow-friendly design</strong> – calm UX, no chaos
            </li>
          </ul>
          <p className="mt-4 text-sm sm:text-base dark:text-slate-400 text-slate-200">
            Our goal is to help you <strong>clear your mind</strong>, not
            clutter it more.
          </p>
        </section>

        {/* Built for Solo Creators */}
        <section className="about-section mt-10 flex flex-col items-center text-center px-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 flex items-center gap-2">
            <FaUser className="text-cyan-400" /> Built for Solo Creators
          </h2>
          <p className="text-sm sm:text-base dark:text-slate-400 text-slate-200 leading-relaxed">
            Whether you&apos;re a developer, freelancer, artist, or deep
            thinker—TaskSync is made for those who work alone, but not
            aimlessly.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-sm sm:text-base dark:text-slate-400 text-slate-200 text-left">
            <li>Plan sustainably</li>
            <li>Track without judgment</li>
            <li>Sync your work with your energy, not just your calendar</li>
          </ul>
        </section>

        {/* From Developer to Developer */}
        <section className="about-section mt-10 flex flex-col items-center text-center px-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 flex items-center gap-2">
            <FaTools className="text-cyan-400" /> From Developer to Developer
          </h2>
          <p className="text-sm sm:text-base dark:text-slate-400 text-slate-200 leading-relaxed">
            TaskSync was handcrafted by an independent developer passionate
            about UI, motion, and mental clarity. Every flow, every animation,
            and every layout is made to feel intentional—not robotic.
          </p>
        </section>

        {/* Quote */}
        <blockquote
          ref={quoteRef}
          className="border-l-4 border-cyan-500 pl-4 italic text-center text-lg sm:text-2xl dark:text-slate-400 text-slate-200 mt-10 flex items-start gap-2"
        >
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
