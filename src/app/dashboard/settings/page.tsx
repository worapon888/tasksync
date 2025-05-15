"use client";
import ProfileSettings from "@/components/settings/ProfileSettings";
import CalendarSettings from "@/components/settings/CalendarSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AccountSettings from "@/components/settings/AccountSettings";

export default function SettingsPage() {
  return (
    <div className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10 mt-10 h-screen overflow-auto">
      <h1 className="text-4xl text-white font-bold mb-8">Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
        <ProfileSettings />
        <CalendarSettings />
        <NotificationSettings />
        <AccountSettings />
      </div>
    </div>
  );
}
