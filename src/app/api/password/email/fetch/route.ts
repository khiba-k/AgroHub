// app/api/password/fetch-email/route.ts

import { NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { compare } from "bcryptjs";
import { badRequest, notFound, success, serverError } from "@/lib/utils/responseHandler";
import { get } from "http";
import { getUnusedTokens } from "@/actions/auth/BasicAuthActions";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return badRequest("Missing token");
    }

    // Get all unused tokens (expired or not)
    const tokens = await getUnusedTokens();

    for (const t of tokens) {
      const isMatch = await compare(token, t.tokenHash);
      if (isMatch) {
        if (t.expiresAt < new Date()) {
          return badRequest("Token expired");
        }

        return success({ email: t.email });
      }
    }

    return notFound("Invalid token");
  } catch (error) {
    console.error("Fetch email by token error:", error);
    return serverError("Server error", error as Error);
  }
}
