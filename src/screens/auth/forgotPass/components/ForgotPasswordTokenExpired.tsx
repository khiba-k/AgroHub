"use client";

import Link from "next/link";

export default function ForgotPasswordTokenExpired() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Reset Link Expired</h1>
      <p className="text-lg text-gray-400 mb-4">
        The password reset link has expired.
        <br />
        You can request a new one below.
      </p>
      <Link href="/password/forgot">
        <span className="text-blue-600 underline hover:text-blue-800">
          Request new reset link
        </span>
      </Link>
    </div>
  );
}
