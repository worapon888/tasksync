// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  // ✅ หน้าที่เข้าถึงได้โดยไม่ต้อง login
  const publicPaths = ["/", "/login", "/register", "/dashboard/board"];
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  // ✅ ถ้าไม่ใช่ public path และยังไม่มี token → redirect ไป login
  if (!isPublic && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirectBack", pathname); // 🔁 กลับมายัง path เดิมได้

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
