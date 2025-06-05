"use client"
import { signInWithGoogle } from "@/actions/auth/GoogleAuthActions"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

const LoginGoogleBtn = () => {
    const pathname = usePathname()

    // Check the current route to determine button text
    const buttonText = pathname === '/login' ? 'Sign In With Google' : 'Sign Up With Google'

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            signInWithGoogle();
        }}>
            <Button type="submit" className="w-full" variant="outline">
                {buttonText}
            </Button>
        </form>
    )
}

export default LoginGoogleBtn