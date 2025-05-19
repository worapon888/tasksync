import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // ✅ เรียกใช้ component client
import ParticlesBackground from "@/components/tsparticles";
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaskSync - Organize Your Tasks Effortlessly",
  description:
    "TaskSync is your personal task management tool for better productivity and focus.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interSans.variable} antialiased`}>
        <Providers>
          <div className="flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[linear-gradient(180deg,_#6995e9_0%,_#ffffff_100%)] dark:bg-[linear-gradient(180deg,_#141621_0%,_#0e0c11_100%)]">
            <div className="relative min-h-full h-full w-full rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-2xl bg-black/30 shadow-[0_0_60px_-30px_rgba(0,200,255,0.3)] overflow-hidden sm:overflow-visible">
              <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-cyan-400/20 blur-[200px] pointer-events-none z-0" />
              <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[240px] h-[240px] rounded-full border border-cyan-400/10 opacity-20 z-0" />

              <ParticlesBackground />
              <Topbar />
              <main className="relative z-10 flex w-full overflow-x-hidden max-w-full">
                <Sidebar />
                <div className="flex-1 min-w-0">{children}</div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
