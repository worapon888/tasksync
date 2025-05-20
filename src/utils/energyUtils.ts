import { Task } from "@/generated/prisma";

// utils/energyUtils.ts
export function getEnergyValue(tasks: Task[]): number {
  // ประมวลผล energy จาก tasks (ปรับ logic ตามจริง)
  const total = tasks.length;
  if (total === 0) return 0;

  const score = tasks.reduce((acc, task) => {
    switch (task.priority) {
      case "high":
        return acc + 100;
      case "medium":
        return acc + 60;
      case "low":
        return acc + 30;
      default:
        return acc;
    }
  }, 0);

  return Math.min(100, Math.round(score / total));
}

// utils/energyUtils.ts
export function getEnergyColor(level: string): string {
  if (level === "High Energy") return "text-green-400";
  if (level === "Medium Energy") return "text-yellow-400";
  if (level === "Low Energy") return "text-red-400";
  return "";
}

export function getBarColor(level: string): string {
  if (level === "High Energy") return "bg-green-400";
  if (level === "Medium Energy") return "bg-yellow-400";
  if (level === "Low Energy") return "bg-red-400";
  return "bg-transparent";
}
