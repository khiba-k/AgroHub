import { NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { supabaseAdmin } from "@/lib/supabase/supabaseAdmin";
import { InviteAcceptSchema } from "@/screens/invite/utils/inviteAgroHubAcceptValidation";
import { badRequest, serverError, success } from "@/lib/utils/responseHandler";
import { createAgroHubUser } from "@/actions/auth/BasicAuthActions";
import { compare } from "bcryptjs";
import { getEmailFromTokenDirect, markTokenAsUsed } from "@/actions/invite/InviteActions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Extract token from body
    const { token, password, firstName, lastName, role } = body;
    
    if (!token) {
      return badRequest("Token is required");
    }

    // Get email from the invite token
    const email = await getEmailFromTokenDirect(token);
    
    if (!email) {
      return badRequest("Invalid or expired invite token");
    }

    // Now validate with the complete data including email
    const validationData = {
      email,
      password,
      firstName,
      lastName,
      confirmPassword: body.confirmPassword, // Include this if it's in your schema
    };

    const parse = InviteAcceptSchema.safeParse(validationData);

    if (!parse.success) {
      console.error("Validation failed:", parse.error);
      return badRequest("Invalid form data");
    }

    const supabase = supabaseAdmin;

    // Use Admin API to bypass email confirmation
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        role
      },
      email_confirm: true,
    });

    if (error) {
      console.error("Supabase user creation error:", error);
      return serverError("Failed to create Supabase user", error);
    }

    if (!data.user) {
      return serverError("Failed to create user", new Error("No user returned"));
    }

    // Now you have the userId
    const userId = data.user.id;

    // Create user record in Prisma
    await createAgroHubUser(firstName, lastName, userId);

    // Mark the token as used
    await markTokenAsUsed(token);

    return success(null, "AgroHub account created successfully.");
  } catch (err) {
    console.error("Onboarding error:", err);
    return serverError("An unexpected error occurred during onboarding.", err as Error);
  }
}