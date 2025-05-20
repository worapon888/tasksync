"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import ConfirmDeleteModal from "../tasks/ConfirmDeleteModal";

export default function AccountSettings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/delete-account", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete account");

      await signOut({ callbackUrl: "/login" }); // logout หลังลบ
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("❌ " + err.message);
      } else {
        setError("❌ An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/40 rounded-2xl p-10 space-y-4">
      <h2 className="text-3xl font-semibold text-white">Account</h2>
      <div className="flex flex-col items-start gap-4">
        <button
          onClick={handleLogout}
          className="text-slate-300 hover:text-white text-xl cursor-pointer"
        >
          Log out
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="text-red-500 hover:underline cursor-pointer text-xl"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Confirm Modal */}
      <ConfirmDeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action is permanent and cannot be undone."
      />
    </div>
  );
}
