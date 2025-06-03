import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Check if environment variables are set
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.warn(
      "Supabase environment variables not set. Authentication disabled.",
    );
    // Return a mock client that won't throw errors
    return {
      auth: {
        signInWithPassword: async () => ({ data: {}, error: null }),
        signUp: async () => ({ data: {}, error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
      },
    } as any;
  }

  // Create the real client if environment variables are set
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
