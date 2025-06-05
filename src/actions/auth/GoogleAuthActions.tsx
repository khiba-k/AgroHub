"use server"

import { createClient } from "@/lib/supabase/server";
import { Provider } from "@supabase/auth-js";
import { redirect } from "next/navigation";

type AuthProvider = Provider;

const signInWith = (provider: AuthProvider) => async () => {
    const supabase = await createClient();

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://yourdomain.com');

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${baseUrl}/auth/callback`, // This is where Google will redirect
        },
    });

    if (error) {
        console.error("Error signing in with provider:", error);
        throw new Error("Failed to sign in with provider");
    }

    // Remove the redirect() call here - let the OAuth flow handle the redirect
    const typedData = data as { url?: string };
    if (typedData.url) {
        redirect(typedData.url);
    }
};

export const signInWithGoogle = signInWith("google");