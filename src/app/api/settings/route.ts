import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key, value } = await req.json();

  const validKeys = [
    "defaultView",
    "showEmotionalStatus",
    "taskReminders",
    "emotionalSuggestions",
  ];

  if (!validKeys.includes(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  let settings = await prisma.userSetting.findUnique({
    where: { userId: session.user.id },
  });

  if (!settings) {
    settings = await prisma.userSetting.create({
      data: { userId: session.user.id },
    });
  }

  const updated = await prisma.userSetting.update({
    where: { userId: session.user.id },
    data: { [key]: value },
  });

  return NextResponse.json({ success: true, settings: updated });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.userSetting.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ settings });
}
