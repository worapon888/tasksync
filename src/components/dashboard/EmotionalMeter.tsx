"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { FaRegSmileBeam } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import MeterArcUI from "./MeterArcUI";
import useBoardTasks from "@/hooks/useBoardTasks";
import { getEnergyValue } from "@/utils/energyUtils";
import { gsap } from "gsap";

export default function EmotionalMeter() {
  const [range, setRange] = useState<"daily" | "weekly" | "monthly">("weekly");

  const { tasks } = useBoardTasks();
  const flatTasks = Object.values(tasks)
    .flat()
    .map((task) => ({
      ...task,
      description: task.description ?? null,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
      cover: task.cover ?? null,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    }));

  const energyValue = getEnergyValue(flatTasks);

  const getEnergyLabel = (value: number) => {
    if (value > 80) return "High Energy";
    if (value > 60) return "Moderate Energy";
    if (value > 40) return "Low Energy";
    if (value > 20) return "Burnout";
    return "Stagnant";
  };

  const getEnergyColor = (value: number): string => {
    if (value > 80) return "#22C55E";
    if (value > 60) return "#34D399";
    if (value > 40) return "#FACC15";
    if (value > 20) return "#DC2626";
    return "#92400E";
  };

  // 💡 GSAP animation
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".meter-header", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".meter-arc", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.3,
      });

      gsap.from([".meter-label", ".meter-button"], {
        opacity: 0,
        y: 10,
        duration: 0.6,
        stagger: 0.2,
        delay: 0.5,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [energyValue]);

  return (
    <div
      ref={containerRef}
      className="dark:bg-black/60 bg-white/80 rounded-xl p-8 w-full min-h-[620px] flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-4 meter-header">
        <div>
          <h3 className="text-slate-500 text-xl font-semibold">
            Emotional Meter
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            &quot;Track your inner momentum over time.&quot;
          </p>
        </div>
        <div className="relative">
          <select
            value={range}
            onChange={(e) =>
              setRange(e.target.value as "daily" | "weekly" | "monthly")
            }
            className="dark:bg-[#242739]/60 border bg-white/80 text-blue-400  border-white/10 dark:text-white px-4 py-1.5 rounded-lg text-sm appearance-none pr-8"
          >
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
          </select>
          <ChevronDown className="absolute right-2 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      {/* Meter */}
      <div className="flex flex-col items-center mt-6 meter-arc">
        <MeterArcUI value={energyValue} />
      </div>

      {/* Energy State */}
      <div className="text-center mt-4 meter-label">
        <p className="text-sm text-slate-400">Emotional</p>
        <h4
          className="text-lg font-bold text-green-400"
          style={{ color: getEnergyColor(energyValue) }}
        >
          {getEnergyLabel(energyValue)}
        </h4>
      </div>

      {/* Action Button */}
      <div className="mt-6 flex justify-center meter-button">
        <button className="bg-white/10 hover:bg-white/20 text-slate-500 text-sm px-6 py-2 rounded-lg flex items-center gap-2">
          Ready to take a break?
          <div className="bg-cyan-400 text-black p-1 rounded-md">
            <FaRegSmileBeam size={16} />
          </div>
        </button>
      </div>
    </div>
  );
}
