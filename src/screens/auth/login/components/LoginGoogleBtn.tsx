"use client"
import { signInWithGoogle } from "@/actions/auth/GoogleAuthActions"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { FcGoogle } from "react-icons/fc" // Import the Google icon

const LoginGoogleBtn = () => {
    const pathname = usePathname()

    // Check the current route to determine button text
    const buttonText = pathname === '/login' ? 'Sign In With Google' : 'Continue With Google'

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            signInWithGoogle();
        }}>
            <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-100 rounded-lg py-6 text-base font-semibold flex items-center justify-center gap-2"
                // Removed variant="outline" because we're providing a solid background
                // size="lg" // You might also consider using 'lg' size if your Button component supports it for more padding
            >
                <FcGoogle className="h-7 w-7" /> {/* Google Icon */}
                {buttonText}
            </Button>
        </form>
    )
}

export default LoginGoogleBtn