"use client";
import { useSettings } from "@/context/SettingsContext";
import { ChevronDown } from "lucide-react";

export default function CalendarSettings() {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="bg-black/40 rounded-2xl p-10 space-y-4">
      <h2 className="text-3xl font-semibold text-white">Calendar Settings</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xl text-slate-200">Default View</span>
          <div className="relative">
            <select
              value={settings.defaultView}
              onChange={(e) => updateSetting("defaultView", e.target.value)}
              className="dark:bg-[#242739]/60 border bg-white text-blue-400  border-white/10 dark:text-white px-4 py-1.5 rounded-lg text-sm appearance-none pr-8"
            >
              <option value="daily">daily</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl text-slate-200">Show Emotional Status</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showEmotionalStatus}
              className="sr-only peer"
              onChange={() =>
                updateSetting(
                  "showEmotionalStatus",
                  !settings.showEmotionalStatus
                )
              }
            />
            <div className="w-[60px] h-[32px] bg-gray-600 rounded-full peer peer-checked:bg-cyan-400 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border after:border-white after:rounded-full after:h-[24px] after:w-[24px] after:transition-all peer-checked:after:translate-x-[28px]"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
