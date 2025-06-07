import { Leaf } from "lucide-react";
import { LoginForm } from "./components/LoginForm";

const Login = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="relative h-16 w-16">
                            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Leaf className="h-10 w-10 text-primary" />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">AgroHub</h1>
                    <p className="text-lg">
                        Agricultural Social Network for Africa
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login
