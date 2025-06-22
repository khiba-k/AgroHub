import { NextRequest } from "next/server";
import { sendResetEmail } from "@/screens/auth/forgotPass/utils/ForgotPasswordSendEmail"; // your file
import {
  badRequest,
  notFound,
  serverError,
  success,
} from "@/lib/utils/responseHandler";
import { createResetToken, deletePreviousTokens, getUserByEmail } from "@/actions/auth/BasicAuthActions";
import { z } from "zod";



const ForgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = ForgotPasswordSchema.safeParse(body);
    if (!parse.success) {
      return badRequest("Invalid email address.");
    }

    const { email } = parse.data;

    // Check if user exists in Supabase
    try {
      const { data: user, error } = await getUserByEmail(email);
      
      if (error) {
        console.error('SupabaseAdminError:', error);
        return serverError("Failed to verify user existence");
      }
      
      if (!user) {
        // Still return success for security (don't reveal if email exists)
        return success(null, "If this email exists, a reset link has been sent.");
      }
      
    } catch (supabaseError) {
      console.error('Supabase lookup failed:', supabaseError);
      return serverError("Failed to process reset request");
    }

    // Delete any previous unused tokens
    deletePreviousTokens(email);

    // Create new reset token
    const newToken = await createResetToken(email);

    await sendResetEmail(email, newToken);

    return success(null, "If this email exists, a reset link has been sent.");
  } catch (err) {
    console.error('Password reset error:', err);
    return serverError("Failed to process reset request", err as Error);
  }
}