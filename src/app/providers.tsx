"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { SnackProvider } from "@/context/SnackProvider";
import { TaskModeProvider } from "@/context/TaskModeContext";
import { TaskProvider } from "@/context/TaskContext";
import { DashboardProvider } from "@/context/DashboardContext"; // ✅ import เพิ่ม
import { EnergyProvider } from "@/context/EnergyContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { SettingsProvider } from "@/context/SettingsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SnackProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TaskModeProvider>
            <TaskProvider>
              <DashboardProvider>
                <EnergyProvider>
                  <ProfileProvider>
                    <SettingsProvider>{children}</SettingsProvider>
                  </ProfileProvider>
                </EnergyProvider>
              </DashboardProvider>
            </TaskProvider>
          </TaskModeProvider>
        </ThemeProvider>
      </SnackProvider>
    </SessionProvider>
  );
}
