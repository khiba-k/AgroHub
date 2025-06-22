// app/api/users/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { onboardingAgrohubSchema } from '@/screens/agrohub/utils/onboardingAgrohubValidation';
import { create } from 'domain';
import { createAgroHubUser } from '@/actions/onboarding/OnboardingAgroHubActions';

const prisma = new PrismaClient();

// POST /api/users
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input using Zod
    const result = onboardingAgrohubSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const data = result.data;

    // Create a new user
    const user = await createAgroHubUser(data);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
