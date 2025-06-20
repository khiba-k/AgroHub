// app/password/validate/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { compare } from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  // If token is missing, redirect to invalid page
  if (!token) {
    return NextResponse.redirect(new URL("/password/invalid", request.url));
  }

  // Only fetch unexpired + unused tokens
  const tokens = await prisma.passwordResetToken.findMany({
    where: {
      used: false,
      expiresAt: { gt: new Date() },
    },
  });

  // Try to match the provided token with hashed entries
  let matchedToken = null;
  for (const t of tokens) {
    const isMatch = await compare(token, t.tokenHash);
    if (isMatch) {
      matchedToken = t;
      break;
    }
  }

  // No match found = invalid or expired token
  if (!matchedToken) {
    return NextResponse.redirect(new URL("/password/invalid", request.url));
  }

  // Valid token — continue to password reset screen
  const redirectUrl = new URL("/password/reset", request.url);
  redirectUrl.searchParams.set("token", token); // keep the original token

  return NextResponse.redirect(redirectUrl);
}
