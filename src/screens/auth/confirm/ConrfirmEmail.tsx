export default function ConfirmEmail() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl font-bold mb-4">Check your email</h1>
            <p className="text-lg text-gray-400">
                We've sent a confirmation link to your email address.
                <br />
                Please open your inbox and follow the link to complete your registration.
            </p>
        </div>
    )
}
