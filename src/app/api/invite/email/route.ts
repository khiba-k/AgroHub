import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { compare } from "bcryptjs";
import { badRequest, success, serverError } from "@/lib/utils/responseHandler";
import { getUnusedInviteTokens } from "@/actions/invite/InviteActions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return badRequest("Missing token.");
  }

  try {
    // Get all unused + unexpired tokens
    const tokens = await getUnusedInviteTokens();

    for (const t of tokens) {
      const isMatch = await compare(token, t.tokenHash);
      if (isMatch) {
        return success({ email: t.email }, "Invite token is valid.");
      }
    }

    return badRequest("Invalid or expired invite token.");
  } catch (err) {
    console.error("Invite token fetch error:", err);
    return serverError("Failed to verify invite token.", err as Error);
  }
}
