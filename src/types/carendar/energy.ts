// types/energy.ts
export type EnergyLevel = "High Energy" | "Medium Energy" | "Low Energy";

export type EnergyInfo = {
  date: number;
  month: number;
  year: number;
  energyLevel: EnergyLevel;
  value: number;
};
