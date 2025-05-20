"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type EnergyData = {
  day: number;
  month: number;
  year: number;
  energyLevel: "High Energy" | "Medium Energy" | "Low Energy";
  value: number;
};

type EnergyContextType = {
  energyData: EnergyData[];
  setEnergyData: (data: EnergyData[]) => void; // ✅ เพิ่มตรงนี้
  isLoading: boolean;
  year: number;
  setYear: (year: number) => void;
  refetchEnergy: () => Promise<void>;
};

const EnergyContext = createContext<EnergyContextType | null>(null);

export const EnergyProvider = ({ children }: { children: React.ReactNode }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEnergyData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/energy?year=${year}`);
        const json = await res.json();
        setEnergyData(json);
      } catch (error) {
        console.error("Failed to load energy data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnergyData();
  }, [year]);

  const refetchEnergy = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/energy?year=${year}`);
      const json = await res.json();
      setEnergyData(json);
    } catch (error) {
      console.error("Failed to reload energy data", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <EnergyContext.Provider
      value={{
        energyData,
        setEnergyData,
        isLoading,
        year,
        setYear,
        refetchEnergy,
      }}
    >
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergy = () => {
  const context = useContext(EnergyContext);
  if (!context) {
    throw new Error("useEnergy must be used within EnergyProvider");
  }
  return context;
};
