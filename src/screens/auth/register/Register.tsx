import { RegisterForm } from "./components/RegisterForm"

const Register = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">AgroHub</h1>
                    <p className="text-muted-foreground">
                        Join the Agricultural Community
                    </p>
                </div>
                <RegisterForm />
            </div>
        </div>
    )
}

export default Register
