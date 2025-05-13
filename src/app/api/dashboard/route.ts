import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { TaskStatus } from "@/generated/prisma"; // ✅ ปรับ path ถ้าใช้จาก Prisma model จริง

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
  });

  // 🟢 กลุ่ม task ตามสถานะ
  const grouped = {
    total: tasks.length,
    toDo: tasks.filter((t) => t.status === TaskStatus.TODO).length,
    inProgress: tasks.filter((t) => t.status === TaskStatus.DOING).length,
    review: tasks.filter((t) => t.status === TaskStatus.REVIEW).length,
    done: tasks.filter((t) => t.status === TaskStatus.DONE).length,
  };

  // 🟢 จัดกลุ่มตามวันในสัปดาห์
  const byDay = [0, 1, 2, 3, 4, 5, 6].map((d) => {
    const count = tasks.filter((t) => {
      const date = new Date(t.createdAt);
      return date.getDay() === d;
    }).length;
    return count;
  });

  // 🟢 เลือก Focus Tasks จาก status === DOING
  const focusTasks = tasks
    .filter((t) => t.status === TaskStatus.DOING)
    .slice(0, 2); // เอาแค่ 2 อันแรก

  // 🟢 คำนวณ progress ราย mode
  const modeProgress: Record<string, number> = {};
  const totalPerMode: Record<string, number> = {};

  for (const task of tasks) {
    const mode = task.mode || "Uncategorized";
    totalPerMode[mode] = (totalPerMode[mode] || 0) + 1;

    if (task.status === TaskStatus.DONE) {
      modeProgress[mode] = (modeProgress[mode] || 0) + 1;
    }
  }

  const modePercentages = Object.keys(totalPerMode).map((mode) => ({
    mode,
    progress: Math.round(
      ((modeProgress[mode] || 0) / totalPerMode[mode]) * 100
    ),
  }));

  // ✅ ส่งทั้งหมดกลับ
  return NextResponse.json({
    grouped,
    byDay,
    tasks,
    focusTasks,
    modePercentages,
  });
}
