import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Completely disable authentication for now
  // This avoids the Invalid URL error until proper environment variables are set
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*.svg).*)"],
};
