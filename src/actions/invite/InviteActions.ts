import prisma from '@/lib/prisma/prisma'
import { hash } from 'bcryptjs';
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
