export default function ForgotPasswordCheckEmail() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl font-bold mb-4">Check your email</h1>
            <p className="text-lg text-gray-400">
                If an account exists with the email you provided, a reset link has been sent.
                <br />
                Please check your inbox and follow the link to reset your password.
            </p>
        </div>
    );
}
