// app/password/validate/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { compare } from "bcryptjs";
import { getUnusedTokens } from "@/actions/auth/BasicAuthActions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/password/invalid", request.url));
  }

  // Fetch ALL tokens (even expired ones)
  const tokens = await getUnusedTokens();

  let matchedToken = null;

  for (const t of tokens) {
    const isMatch = await compare(token, t.tokenHash);
    if (isMatch) {
      matchedToken = t;
      break;
    }
  }

  if (!matchedToken) {
    // Not found at all — invalid
    return NextResponse.redirect(new URL("/password/forgot/invalid", request.url));
  }

  if (matchedToken.expiresAt < new Date()) {
    // Expired
    return NextResponse.redirect(new URL("/password/forgot/expired", request.url));
  }

  // Valid and not expired
  const redirectUrl = new URL("/password/reset", request.url);
  redirectUrl.searchParams.set("token", token);

  return NextResponse.redirect(redirectUrl);
}
