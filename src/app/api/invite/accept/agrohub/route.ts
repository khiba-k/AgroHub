import { NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { createClient } from "@/lib/supabase/server";
import { InviteAcceptSchema } from "@/screens/invite/utils/inviteAgroHubAcceptValidation";
import { badRequest, serverError, success } from "@/lib/utils/responseHandler";
import { createAgroHubUser } from "@/actions/auth/BasicAuthActions";
import { compare } from "bcryptjs"; // Make sure you have this import


async function getEmailFromTokenDirect(token: string): Promise<string | null> {
  try {
    // Get all unexpired invite tokens
    const inviteTokens = await prisma.inviteToken.findMany({
      where: {
        expiresAt: { gt: new Date() },
        used: false,
      },
      select: {
        tokenHash: true,
        email: true,
      },
    });

    // Check each token hash against the provided token
    for (const inviteToken of inviteTokens) {
      const isMatch = await compare(token, inviteToken.tokenHash);
      if (isMatch) {
        return inviteToken.email;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error retrieving email from token:", error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received body:", body);
    
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
    console.log("Onboarding AgroHub form data:", parse);

    if (!parse.success) {
      console.error("Validation failed:", parse.error);
      return badRequest("Invalid form data");
    }

    const supabase = await createClient();

    // Create Supabase user with role 'agrohub' and isOnboarded = true
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { role: role || "agrohub", isOnboarded: true },
      email_confirm: true,
    });

    if (userError || !userData?.user) {
      return serverError("Failed to create Supabase user", userError ?? new Error("No user returned"));
    }

    // Create user record in Prisma
    await createAgroHubUser(firstName, lastName, userData.user.id);

    // Mark the token as used
    await markTokenAsUsed(token);

    return success(null, "AgroHub account created successfully.");
  } catch (err) {
    console.error("Onboarding error:", err);
    return serverError("An unexpected error occurred during onboarding.", err as Error);
  }
}

// Helper function to mark token as used
async function markTokenAsUsed(token: string): Promise<void> {
  try {
    const inviteTokens = await prisma.inviteToken.findMany({
      where: {
        expiresAt: { gt: new Date() },
        used: false,
      },
    });

    for (const inviteToken of inviteTokens) {
      const isMatch = await compare(token, inviteToken.tokenHash);
      if (isMatch) {
        await prisma.inviteToken.update({
          where: { id: inviteToken.id },
          data: { used: true },
        });
        break;
      }
    }
  } catch (error) {
    console.error("Error marking token as used:", error);
  }
}