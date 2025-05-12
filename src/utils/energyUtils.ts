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
