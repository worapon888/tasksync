"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SettingsPage() {
  const [showEmotionalStatus, setShowEmotionalStatus] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [emotionalSuggestions, setEmotionalSuggestions] = useState(true);
  const [range, setRange] = useState("weekly");

  return (
    <div className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10 mt-10  h-screen overflow-auto">
      <h1 className="text-4xl text-white font-bold mb-8">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
        {/* Profile Settings */}
        <div className="bg-black/40 rounded-2xl p-10 space-y-4">
          <h2 className="text-3xl font-semibold text-slate-200">
            Profile Settings
          </h2>
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/Avatar.png"
              alt="Profile"
              width={60}
              height={60}
              className="w-18 h-18 rounded-full object-cover"
            />
            <span className="text-lg font-medium text-slate-200">Lisa</span>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <button className="w-[60%] dark:bg-[#1f2335] border dark:border-white/10 border-slate-300 transition-all duration-200 bg-white dark:text-white text-slate-500 dark:hover:bg-[#1a1d27] cursor-pointer hover:bg-[#383a42] rounded-2xl px-4 py-3 text-lg">
              Change Profile Photo
            </button>
            <button className="w-[60%] dark:bg-[#1f2335] border dark:border-white/10 border-slate-300 cursor-pointer transition-all duration-200 bg-white hover:bg-[#383a42] dark:text-white text-slate-500 dark:hover:bg-[#1a1d27] rounded-2xl px-4 py-3 text-lg">
              Change Password
            </button>
          </div>
        </div>

        {/* Calendar Settings */}
        <div className="bg-black/40 rounded-2xl p-10 space-y-4 ">
          <h2 className="text-3xl font-semibold text-white">
            Calendar Settings
          </h2>
          <div className="space-y-4 ">
            <div className="flex justify-between items-center ">
              <span className="text-xl text-slate-200">Default View</span>
              <div className="relative">
                <select
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
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
              <span className="text-xl text-slate-200">
                Show Emotional Status
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showEmotionalStatus}
                  onChange={() => setShowEmotionalStatus(!showEmotionalStatus)}
                  className="sr-only peer"
                />
                <div className="w-[60px] h-[32px] bg-gray-600 rounded-full peer peer-checked:bg-cyan-400 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border after:border-white after:rounded-full after:h-[24px] after:w-[24px] after:transition-all peer-checked:after:translate-x-[28px]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
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
            <span className="text-xl text-slate-200">
              Emotional Suggestions
            </span>
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

        {/* Account Settings */}
        <div className="bg-black/40 rounded-2xl p-10 space-y-4">
          <h2 className="text-3xl font-semibold text-white">Account</h2>
          <div className="flex flex-col items-start gap-4">
            <button className="text-slate-300 hover:text-white text-xl">
              Log out
            </button>
            <button className="text-red-500 hover:underline cursor-pointer text-xl">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
