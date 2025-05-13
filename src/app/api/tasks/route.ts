import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { TaskMode, TaskStatus, TaskPriority } from "@/generated/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode");

  if (mode) {
    const isValidMode = Object.values(TaskMode).includes(mode as TaskMode);
    if (!isValidMode) {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
        mode: mode as TaskMode,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ tasks });
  }

  // ✅ fallback: ถ้าไม่ส่ง mode ให้ดึงทั้งหมด
  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ tasks });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const task = body.task || body;

  const { title, description, dueDate, cover, priority, mode } = task;

  const isValidMode = Object.values(TaskMode).includes(mode as TaskMode);
  const isValidPriority = ["low", "medium", "high"].includes(priority);

  if (!mode || !isValidMode) {
    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  }

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Invalid title" }, { status: 400 });
  }

  if (!priority || !isValidPriority) {
    return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description: description || null,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        cover: cover || null,
        priority: priority as TaskPriority,
        status: TaskStatus.TODO,
        mode: mode as TaskMode,
        userId: session.user.id,
      },
    });

    // ✅ บันทึก EnergyRecord ถ้ามี dueDate
    if (newTask.dueDate) {
      const due = new Date(newTask.dueDate);

      const energyLevel =
        newTask.priority === "high"
          ? "HIGH"
          : newTask.priority === "medium"
          ? "MEDIUM"
          : "LOW";

      const value =
        newTask.priority === "high"
          ? 100
          : newTask.priority === "medium"
          ? 60
          : 30;

      await prisma.energyRecord.upsert({
        where: {
          userId_day_month_year: {
            userId: session.user.id,
            day: due.getDate(),
            month: due.getMonth(),
            year: due.getFullYear(),
          },
        },
        update: {
          energyLevel,
          value,
        },
        create: {
          userId: session.user.id,
          day: due.getDate(),
          month: due.getMonth(),
          year: due.getFullYear(),
          energyLevel,
          value,
        },
      });
    }

    return NextResponse.json({ task: newTask });
  } catch (error) {
    console.error("❌ Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task", details: String(error) },
      { status: 500 }
    );
  }
}
