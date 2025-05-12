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

  const isValidMode = Object.values(TaskMode).includes(mode as TaskMode);
  if (!mode || !isValidMode) {
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

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log("SESSION:", session);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  console.log("BODY RECEIVED:", body);

  // ✅ แก้ตรงนี้: ดึงจาก body.task
  const task = body.task || body; // รองรับทั้งแบบเก่าและใหม่

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

    return NextResponse.json({ task: newTask });
  } catch (error) {
    console.error("❌ Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task", details: String(error) },
      { status: 500 }
    );
  }
}
