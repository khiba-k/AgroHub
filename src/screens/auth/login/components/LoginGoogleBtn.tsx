"use client"
import { signInWithGoogle } from "@/actions/auth/GoogleAuthActions";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginGoogleBtn = ({ role }: { role: null | string }) => {
    const pathname = usePathname()

    const buttonText = pathname === '/login' ? 'Sign In With Google' : 'Continue With Google'

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ Store role in cookie before OAuth
        if (role) {
            document.cookie = `oauth_role=${role}; path=/; max-age=600; SameSite=Lax`; // 10 minutes
        }

        // ✅ No longer need to pass role as parameter
        signInWithGoogle();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-100 rounded-lg py-6 text-base font-semibold flex items-center justify-center gap-2"
            >
                <FcGoogle className="h-7 w-7" />
                {buttonText}
            </Button>
        </form>
    )
}

export default LoginGoogleBtn