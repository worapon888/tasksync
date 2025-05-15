"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    console.log("🔁 สมัครเสร็จ กำลังล็อกอิน");

    // ✅ redirect = true ปลอดภัยแน่นอน ไม่ใช้ res.url เอง
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10 mt-10 h-screen overflow-auto">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6">
        <form
          onSubmit={handleRegister}
          className="bg-white dark:bg-black/40 w-full max-w-md sm:rounded-2xl sm:shadow-md px-6 py-12 sm:p-16 space-y-8"
        >
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Create your account
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Register to start using TaskSync
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <label className="absolute -top-2 left-3 text-xs px-1 bg-white dark:bg-black text-gray-500">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border dark:border-slate-500 border-gray-300 rounded-lg px-4 py-3 pl-10 text-sm"
                placeholder="Your name"
                required
              />
              <FiUser className="absolute top-3.5 left-3 text-gray-400" />
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-3 text-xs px-1 bg-white dark:bg-black text-gray-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border dark:border-slate-500 border-gray-300 rounded-lg px-4 py-3 pl-10 text-sm"
                placeholder="you@example.com"
                required
              />
              <FiMail className="absolute top-3.5 left-3 text-gray-400" />
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-3 text-xs px-1 bg-white dark:bg-black text-gray-500">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border dark:border-slate-500 border-gray-300 rounded-lg px-4 py-3 pl-10 text-sm"
                placeholder="••••••••"
                required
              />
              <FiLock className="absolute top-3.5 left-3 text-gray-400" />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-black dark:bg-slate-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600" />
            or
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600" />
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 py-2 rounded-lg hover:shadow-md"
          >
            <Image
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
              width={20}
              height={20}
            />
            <span className="text-sm font-semibold">Continue with Google</span>
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
