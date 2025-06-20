import { NextRequest } from "next/server";
import { z } from "zod";
import { randomBytes } from "crypto";
import { hash } from "bcryptjs";

import prisma from "@/lib/prisma/prisma"; // your Prisma client path
import { sendResetEmail } from "@/screens/auth/forgotPass/utils/ForgotPasswordSendEmail"; // your file
import {
  badRequest,
  notFound,
  serverError,
  success,
} from "@/lib/utils/responseHandler";
import { supabaseAdmin } from "@/lib/supabase/supabaseAdmin";

const bodySchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = bodySchema.safeParse(body);
    if (!parse.success) {
      return badRequest("Invalid email address.");
    }

    const { email } = parse.data;

    const { data, error } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!data || error) {
      return success(null, "If this email exists, a reset link has been sent.");
    }

    // Delete any previous unused tokens
    await prisma.passwordResetToken.deleteMany({
      where: {
        email,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    const rawToken = randomBytes(32).toString("hex");
    const tokenHash = await hash(rawToken, 10);

    await prisma.passwordResetToken.create({
      data: {
        email,
        tokenHash,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      },
    });

    await sendResetEmail(email, rawToken);

    return success(null, "If this email exists, a reset link has been sent.");
  } catch (err) {
    return serverError("Failed to process reset request", err as Error);
  }
}
