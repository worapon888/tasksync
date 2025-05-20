"use client";
import { useState } from "react";

export default function NotificationSettings() {
  const [taskReminders, setTaskReminders] = useState(true);
  const [emotionalSuggestions, setEmotionalSuggestions] = useState(true);

  return (
    <div className="bg-black/40 rounded-xl p-10 space-y-4">
      <h2 className="text-3xl font-semibold text-white">
        Notification Settings
      </h2>

      <div className="flex justify-between items-center">
        <span className="text-xl text-slate-200">Task Reminders</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={taskReminders}
            onChange={() => setTaskReminders(!taskReminders)}
            className="sr-only peer"
          />
          <div className="w-[60px] h-[32px] bg-gray-600 rounded-full peer peer-checked:bg-cyan-400 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-white after:border after:rounded-full after:h-[24px] after:w-[24px] after:transition-all peer-checked:after:translate-x-[28px]"></div>
        </label>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xl text-slate-200">Emotional Suggestions</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={emotionalSuggestions}
            onChange={() => setEmotionalSuggestions(!emotionalSuggestions)}
            className="sr-only peer"
          />
          <div className="w-[60px] h-[32px] bg-gray-600 rounded-full peer peer-checked:bg-cyan-400 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border after:border-white after:rounded-full after:h-[24px] after:w-[24px] after:transition-all peer-checked:after:translate-x-[28px]"></div>
        </label>
      </div>
    </div>
  );
}
