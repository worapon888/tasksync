import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function handlePut(req: NextRequest, taskId: string) {
  try {
    const data = await req.json();

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        cover: data.cover,
        priority: data.priority,
        mode: data.mode,
        status: data.status ?? "TODO",
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ PUT /task/:id failed:", error);
    return NextResponse.json(
      { error: "Update failed", detail: String(error) },
      { status: 500 }
    );
  }
}
