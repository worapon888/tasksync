import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { IncomingTask } from "@/types/task";
import { TaskStatus } from "@/generated/prisma";

type TasksByColumn = Record<string, IncomingTask[]>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const tasks: TasksByColumn = body.tasks;
    const userId: string = body.userId;

    for (const [column, columnTasks] of Object.entries(tasks)) {
      for (const task of columnTasks) {
        await prisma.task.create({
          data: {
            title: task.title,
            description: task.description || "",
            dueDate: task.dueDate ? new Date(task.dueDate) : null,
            status: column as TaskStatus,
            priority: "medium",
            cover: task.cover || null,

            userId,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ SYNC ERROR:", err);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
