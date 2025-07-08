"use client";
import { useState } from "react"; // ✅ import useState
import { signInWithGoogle } from "@/actions/auth/GoogleAuthActions";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

const LoginGoogleBtn = ({ role }: { role: null | string }) => {
  const [loading, setLoading] = useState(false); // ✅ define loading state
  const pathname = usePathname();

  const buttonText =
    pathname === "/login" ? "Sign In With Google" : "Continue With Google";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); // ✅ start loader

    if (role) {
      document.cookie = `oauth_role=${role}; path=/; max-age=600; SameSite=Lax`;
    }

    // Run Google Sign In
    await signInWithGoogle();

    setLoading(false); // Optional: If signInWithGoogle redirects, this may never run
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black hover:bg-gray-100 rounded-lg py-6 text-base font-semibold flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 className="h-8 w-8 animate-spin text-gray-700" />
        ) : (
          <>
            <FcGoogle className="h-7 w-7" />
            {buttonText}
          </>
        )}
      </Button>
    </form>
  );
};

export default LoginGoogleBtn;
