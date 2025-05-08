import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route"; // ปรับ path ตามจริง

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task || task.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("❌ DELETE error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  contextPromise: Promise<{ params: { id: string } }>
) {
  // รอ params ที่ถูก resolve
  const { params } = await contextPromise;
  const taskId = params.id;

  try {
    const data = await req.json();

    console.log("🛠️ PUT Task ID:", taskId);
    console.log("📦 Payload received:", data);

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
