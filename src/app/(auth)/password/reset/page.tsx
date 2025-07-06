import PasswordReset from '@/screens/auth/forgotPass/ResetPassword'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PasswordReset />
      </Suspense>
    </div>
  )
}

export default page