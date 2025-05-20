// utils/fetchEnergyData.ts
import { EnergyInfo } from "@/types/carendar/energy";

export async function fetchEnergyData(): Promise<EnergyInfo[]> {
  const res = await fetch("/api/energy"); // หรือ URL API จริงของคุณ
  if (!res.ok) throw new Error("Failed to fetch energy data");
  return res.json();
}
