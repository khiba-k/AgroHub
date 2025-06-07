"use server"

import { createClient } from "@/lib/supabase/server";
import { Provider } from "@supabase/auth-js";
import { redirect } from "next/navigation";

type AuthProvider = Provider;

const signInWith = async (provider: AuthProvider) => {
    const supabase = await createClient();

    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://yourdomain.com");

    const redirectTo = `${baseUrl}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo,
        },
    });

    if (error) {
        console.error("Error signing in with provider:", error);
        throw new Error("Failed to sign in with provider");
    }

    const typedData = data as { url?: string };
    if (typedData.url) {
        redirect(typedData.url);
    }
};

// No longer needs role argument since it's stored in cookies
export const signInWithGoogle = async () => await signInWith("google");