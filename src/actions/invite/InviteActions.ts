import prisma from '@/lib/prisma/prisma'
import { compare, hash } from 'bcryptjs';
import { randomBytes } from 'crypto';

// Prevent duplicate invites
export async function deleteExistingInvite(email: string) {
  return await prisma.inviteToken.deleteMany({
    where: {
      email,
      used: false,
      expiresAt: { gt: new Date() },
    },
  });
}

// Create invite token
export async function createInviteToken(email: string, senderId: string) {
  const rawToken = randomBytes(32).toString('hex');
  const tokenHash = await hash(rawToken, 10);


  await prisma.inviteToken.create({
    data: {
      email,
      tokenHash,
      senderId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
    },
  });

  return rawToken;
}

// Get unused invite tokens

export async function getUnusedInviteTokens() {
  return prisma.inviteToken.findMany({
    where: {
      used: false,
    },
  });
}

// Helper function to mark token as used
export async function markTokenAsUsed(token: string): Promise<void> {
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

// Get email from token directly
export async function getEmailFromTokenDirect(token: string): Promise<string | null> {
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