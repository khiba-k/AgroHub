'use client';

import React from 'react';
import Link from 'next/link';

const ForgotPasswordLink = () => {
  return (
    <div className="text-sm text-center mt-2">
      <Link href="/password/forgot" className="text-blue-600 hover:underline">
        Forgot your password?
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;
