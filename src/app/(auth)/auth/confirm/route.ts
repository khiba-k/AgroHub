import { createClient } from '@/lib/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const role = searchParams.get('role') // 'farmers' or 'consumers'

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      if (role === 'farmer') {
        redirect('/onboarding/farmer')
      } else if (role === 'consumers') {
        redirect('/onboarding/consumer')
      } else {
        redirect('/dashboard')
      }
    }
  }

  redirect('/error')
}
