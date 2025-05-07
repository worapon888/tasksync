"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { SnackProvider } from "@/context/SnackProvider";
import { TaskModeProvider } from "@/context/TaskModeContext";

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
          <TaskModeProvider>{children}</TaskModeProvider>
        </ThemeProvider>
      </SnackProvider>
    </SessionProvider>
  );
}
