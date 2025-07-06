import OnboardingAgrohub from '@/screens/onboarding/agrohub/OnboardingAgroHub'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
      <Suspense>
        <OnboardingAgrohub />
      </Suspense>
    </div>
  )
}

export default page