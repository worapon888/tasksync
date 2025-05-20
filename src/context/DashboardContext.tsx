"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { DashboardData } from "@/types/task";

// สร้าง type สำหรับ context
type DashboardContextType = {
  dashboardData: DashboardData | null;
  refetchDashboardData: () => Promise<void>;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const fetchData = async () => {
    try {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        refetchDashboardData: fetchData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Hook ใช้งาน: ปลอดภัย และ error ถ้าอยู่นอก provider
export const useDashboardData = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardData must be used within a DashboardProvider");
  }
  return context;
};
