"use client";

import { useState } from "react";
import { FaRegSmileBeam } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

export default function EmotionalMeter() {
  const [range, setRange] = useState("weekly");

  return (
    <div className="dark:bg-black/60 bg-white/80 rounded-xl p-8 w-full min-h-[620px] flex flex-col justify-between ">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
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
            onChange={(e) => setRange(e.target.value)}
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
      <div className="flex flex-col items-center mt-6">
        {/* Color Segments */}
        <div className="w-60 h-3 flex rounded-full overflow-hidden relative">
          <div className="w-[20%] bg-red-800" />
          <div className="w-[15%] bg-red-500" />
          <div className="w-[15%] bg-yellow-400" />
          <div className="w-[20%] bg-emerald-400" />
          <div className="w-[30%] bg-green-500" />
        </div>

        {/* Pointer */}
        <div className="relative -top-3">
          <div className="w-10 h-10 bg-[#0d0f1a] border-4 border-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* Energy State */}
      <div className="text-center mt-4">
        <p className="text-sm text-slate-400">Emotional</p>
        <h4 className="text-lg font-bold text-green-400">High Energy</h4>
      </div>

      {/* Action Button */}
      <div className="mt-6 flex justify-center">
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
