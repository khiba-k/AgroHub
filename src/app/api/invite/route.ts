// src/app/api/invite/route.ts

import { NextRequest } from "next/server";
import { z } from "zod";

import { sendInviteEmail } from "@/screens/invite/utils/InviteSendEmail";
import { badRequest, serverError, success } from "@/lib/utils/responseHandler";
import { createInviteToken, deleteExistingInvite } from "@/actions/invite/InviteActions";
import { createClient } from "@/lib/supabase/server";

export const inviteSchema = z.object({
  email: z.string().email(),
  role: z.string().optional().default("agrohub"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received invite request Body: ", body);
    const parse = inviteSchema.safeParse(body);

    if (!parse.success) return badRequest("Invalid invite format");

    const { email, role } = parse.data;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log("Current user: ", user);

    if (!user) return serverError("Unauthorized");
    if (user.email === email) return badRequest("Cannot invite yourself");

    await deleteExistingInvite(email); // optional cleanup

    const rawToken = await createInviteToken(email, user.id);
    await sendInviteEmail(email, rawToken, role); // 👈 now using dynamic role

    return success(null, "Invitation sent successfully");
  } catch (error) {
    return serverError("Failed to send invitation", error as Error);
  }
}
