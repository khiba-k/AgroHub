'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { randomBytes } from "crypto";
import { hash } from "bcryptjs";
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin'
import prisma from '@/lib/prisma/prisma'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      return { error: "Please confirm your email before logging in." }
    }

    return { error: "Invalid email or password." }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role },
     emailRedirectTo: `${siteUrl}/auth/confirm`,
    },
  });

  if (error) {
    console.error('Full Supabase error object:', JSON.stringify(error, null, 2));
    throw new Error(`Email confirmation failed: ${error.message}`);
  }

  revalidatePath('/', 'layout');
  redirect('/auth/email');
}

export async function getUserObj() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) return null

  return {
    id: user.id,
    email: user.email,
    metadata: user.user_metadata,
    role: user.role,
    createdAt: user.created_at,
    all: user,
  }
}

// For checking if a user exists by email in Supabase
// Mainly for Signup and Forgot Password flows
export async function getUserByEmail(email: string) {
  let page = 1;
  const perPage = 1000;
  
  while (true) {
    const { data: users, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage
    });
    
    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    
    // Look for user in current page
    const user = users.users.find(u => u.email === email);
    if (user) {
      return { data: user, error: null };
    }
    
    // If we got fewer users than perPage, we've reached the end
    if (users.users.length < perPage) {
      return { data: null, error: null }; // User not found
    }
    
    page++;
  }
}

// Delete any old password reset tokens for the given email
export const deletePreviousTokens = async (email: string) => {

  await prisma.passwordResetToken.deleteMany({
    where: {
      email,
      used: false,
      expiresAt: {
        gt: new Date(),
      },
    },
  });
}

// Create and hash token
export const createResetToken = async (email: string) => {
  const rawToken = randomBytes(32).toString('hex');
  const tokenHash = await hash(rawToken, 10);

  await prisma.passwordResetToken.create({
    data: {
      email,
      tokenHash,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    },
  });

  return rawToken;
}

// Get all unused tokens
export const getUnusedTokens = async () => {
  return await prisma.passwordResetToken.findMany({
    where: {
      used: false,
      expiresAt: {
        gt: new Date(),
      },
    },
  });
}

// Mark a token as used
export const markTokenAsUsed = async (token: string) => {
  await prisma.passwordResetToken.updateMany({
    where: {
      tokenHash: token,
      used: false,
      expiresAt: {
        gt: new Date(),
      },
    },
    data: {
      used: true,
    },
  });
}

