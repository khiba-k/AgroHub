"use client";

import Link from "next/link";

export default function InviteExpired() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Invite Link Expired</h1>
      <p className="text-lg text-gray-400 mb-4">
        This invite link has expired.
        <br />
        Please request a new one from the person who invited you.
      </p>
      <Link href="/">
        <span className="text-blue-600 underline hover:text-blue-800">
          Go back to home
        </span>
      </Link>
    </div>
  );
}
