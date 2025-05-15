// app/api/delete-account/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ปรับ path ตามโปรเจกต์คุณ
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // ปรับ path ถ้าจำเป็น

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // 🔥 ลบทั้งหมดที่สัมพันธ์กับ user ก่อน
    await prisma.task.deleteMany({ where: { userId } });
    await prisma.account.deleteMany({ where: { userId } });
    await prisma.session.deleteMany({ where: { userId } });
    await prisma.energyRecord.deleteMany({ where: { userId } });
    await prisma.userSetting.deleteMany({ where: { userId } });

    // ✅ ลบ user สุดท้าย
    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ message: "Account deleted" });
  } catch (error) {
    console.error("❌ Failed to delete account:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
