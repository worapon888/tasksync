import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

interface IncomingTask {
  title: string;
  done: boolean;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tasks } = await req.json();

  try {
    await prisma.task.createMany({
      data: tasks.map((t: IncomingTask) => ({
        title: t.title,
        done: t.done,
        userId: session.user.id,
      })),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Sync task error:", err);
    return NextResponse.json(
      { error: "Failed to save tasks" },
      { status: 500 }
    );
  }
}
