import { NextRequest } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/supabaseAdmin";
import { badRequest, serverError, success } from "@/lib/utils/responseHandler";
import { markTokenAsUsed } from "@/actions/auth/BasicAuthActions";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  token: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = schema.safeParse(body);
    if (!parse.success) {
      return badRequest(`Invalid input: ${JSON.stringify(parse.error.format())}`);
    }

    const { email, password, token } = parse.data;

    // Find user by email
    const { data: usersList, error: listError } =
      await supabaseAdmin.auth.admin.listUsers();
    if (listError) return serverError("Failed to fetch users from Supabase");

    const user = usersList.users.find((u) => u.email === email);
    if (!user) return badRequest("No user found for this email");

    // Update password in Supabase
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password,
    });
    if (updateError) return serverError("Failed to update password");

    // Mark token as used (optional cleanup)
    await markTokenAsUsed(token);

    return success(null, "Password updated successfully. You can now log in.");
  } catch (err) {
    console.error("Reset password error:", err);
    return serverError("Something went wrong", err as Error);
  }
}
