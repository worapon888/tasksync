"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiLock, FiMail } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else if (res?.ok && res.url) {
      router.push(res.url);
    }
  };

  // ✅ GSAP animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Step 1: Set default values
      gsap.set(".login-heading", { opacity: 0, y: -20 });
      gsap.set(".login-field", { opacity: 0, y: 20 });
      gsap.set(".login-divider, .login-google, .login-footer", {
        opacity: 0,
        y: 10,
      });

      // Step 2: Animate in sequence
      tl.to(".login-heading", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          ".login-field",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
          },
          "<+0.1"
        )
        .to(
          ".login-divider, .login-google, .login-footer",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          },
          "<+0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 ml-0 md:ml-24 px-4 py-10 md:px-10 mt-10 h-screen overflow-auto"
    >
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-black/40 w-full max-w-md sm:rounded-2xl sm:shadow-md px-6 py-12 sm:p-16 space-y-8"
        >
          {/* Header */}
          <div className="space-y-1 login-heading">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Sign in
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Sign in to continue using TaskSync
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div className="relative login-field">
              <label className="absolute -top-2 left-3 text-xs px-1 bg-white dark:bg-black  text-gray-500">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-500 rounded-lg px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
                required
              />
              <FiMail className="absolute top-3.5 left-3 text-gray-400" />
            </div>

            <div className="relative login-field">
              <label className="absolute -top-2 left-3 text-xs px-1 bg-white  dark:bg-black  text-gray-500">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-500 rounded-lg px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="••••••"
                required
              />
              <FiLock className="absolute top-3.5 left-3 text-gray-400" />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            className="login-field w-full bg-black dark:bg-slate-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
          >
            Sign in
          </button>

          <div className="login-divider flex items-center gap-4 text-sm text-gray-400">
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600" />
            or
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600" />
          </div>

          <button
            type="button"
            onClick={() => signIn("google")}
            className="login-google w-full flex items-center cursor-pointer justify-center gap-3 bg-[#fff] border border-gray-300 text-gray-800  font-medium py-2 rounded-lg hover:shadow-md hover:scale-[1.02] transition-all"
          >
            <Image
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="text-sm font-semibold">Continue with Google</span>
          </button>

          <p className="login-footer text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Register
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
