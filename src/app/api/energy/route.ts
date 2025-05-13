import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // ปรับ path ตามโปรเจกต์
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const year = parseInt(searchParams.get("year") || "2025", 10);

  const data = await prisma.energyRecord.findMany({
    where: {
      userId: session.user.id,
      year,
    },
    select: {
      day: true,
      month: true,
      year: true,
      energyLevel: true,
      value: true,
    },
  });

  return NextResponse.json(data);
}
