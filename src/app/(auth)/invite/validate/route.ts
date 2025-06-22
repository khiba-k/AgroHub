import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { getUnusedInviteTokens } from "@/actions/invite/InviteActions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const role = searchParams.get("role") || "agrohub";


  if (!token) {
    return NextResponse.redirect(new URL("/invite/invalid", request.url));
  }

  const tokens = await getUnusedInviteTokens();

  let matchedToken = null;
  for (const t of tokens) {
    const isMatch = await compare(token, t.tokenHash);
    if (isMatch) {
      matchedToken = t;
      break;
    }
  }

  if (!matchedToken) {
    return NextResponse.redirect(new URL("/invite/invalid", request.url));
  }

  if (matchedToken.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/invite/expired", request.url));
  }

  const redirectUrl =
    role === "agrohub"
      ? new URL("/onboarding/agrohub", request.url)
      : new URL("/invite/accept", request.url);

  redirectUrl.searchParams.set("token", token);

  return NextResponse.redirect(redirectUrl);
}
