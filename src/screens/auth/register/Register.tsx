import { RegisterForm } from "./components/RegisterForm"

const Register = ({ role }: { role: string }) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2 ">AgroHub</h1>
                    <p className="text-muted-foreground">
                        {`Join the Agricultural Community as a ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                    </p>
                </div>
                <RegisterForm role={role} />
            </div>
        </div>
    )
}

export default Register
