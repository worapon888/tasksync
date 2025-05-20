"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

export default function ProfileSettings() {
  const { profile, updateProfile } = useProfile();
  const isGoogleUser = profile.image?.includes("googleusercontent.com");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tasksync-profile");
    formData.append("folder", "profile_photos");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dcdibue2e/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    updateProfile(undefined, data.secure_url);
  };

  const handleChangePassword = async () => {
    setFeedback("");

    if (newPassword !== confirmPassword) {
      setFeedback("❌ รหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }

    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) {
      setFeedback(data.error || "❌ เปลี่ยนรหัสผ่านไม่สำเร็จ");
    } else {
      setFeedback("✅ เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="bg-black/40 rounded-2xl p-10 space-y-4">
      <h2 className="text-3xl font-semibold text-slate-200">
        Profile Settings
      </h2>

      <div className="flex flex-col items-center gap-4">
        {profile.image?.startsWith("http") || profile.image?.startsWith("/") ? (
          <Image
            src={profile.image}
            alt="Profile"
            width={60}
            height={60}
            className="w-[60px] h-[60px] rounded-full object-cover border border-white/10"
          />
        ) : (
          <div className="w-[60px] h-[60px] rounded-full bg-white/10 flex items-center justify-center border border-white/10">
            <User className="text-white w-8 h-8" />
          </div>
        )}
        <span className="text-lg font-medium text-slate-200">
          {profile.name}
        </span>
      </div>

      {!isGoogleUser && (
        <div className="flex flex-col gap-4 items-center">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleUploadImage}
            className="hidden"
          />
          <button
            onClick={handleChooseImage}
            className="w-[60%] dark:bg-[#1f2335] border dark:border-white/10 border-slate-300 transition-all duration-200 bg-white dark:text-white text-slate-500 dark:hover:bg-[#1a1d27] cursor-pointer hover:bg-[#383a42] rounded-2xl px-4 py-3 text-lg"
          >
            Change Profile Photo
          </button>

          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="w-[60%] dark:bg-[#1f2335] border dark:border-white/10 border-slate-300 cursor-pointer transition-all duration-200 bg-white hover:bg-[#383a42] dark:text-white text-slate-500 dark:hover:bg-[#1a1d27] rounded-2xl px-4 py-3 text-lg"
          >
            Change Password
          </button>

          {showPasswordForm && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="w-full max-w-md bg-black/80 border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
                <h3 className="text-xl font-semibold text-white">
                  Change Password
                </h3>

                <input
                  type="password"
                  placeholder="Old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/10 focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/10 focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/10 focus:ring-2 focus:ring-cyan-500"
                />

                {feedback && (
                  <p
                    className={`text-sm font-medium ${
                      feedback.startsWith("✅")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {feedback}
                  </p>
                )}

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={() => setShowPasswordForm(false)}
                    className="px-4 py-2 rounded-lg text-slate-300 cursor-pointer hover:text-white border border-white/10 hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="px-4 py-2 bg-cyan-500 cursor-pointer hover:bg-cyan-600 text-white font-semibold rounded-lg transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
