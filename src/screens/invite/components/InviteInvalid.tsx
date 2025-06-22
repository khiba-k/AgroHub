"use client";

import Link from "next/link";

export default function InviteInvalid() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Invalid Invite Link</h1>
      <p className="text-lg text-gray-400 mb-4">
        This invite link is invalid or has already been used.
        <br />
        Please ask the sender to invite you again.
      </p>
      <Link href="/">
        <span className="text-blue-600 underline hover:text-blue-800">
          Go back to home
        </span>
      </Link>
    </div>
  );
}
