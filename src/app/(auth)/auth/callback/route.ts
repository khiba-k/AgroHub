import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)

  console.log('Callback URL:', request.url)

  const code = searchParams.get('code')
  
  // Try to get role from URL first, then from cookies
  let role = searchParams.get('role')
  
  if (!role) {
    const cookieStore = await cookies()
    role = cookieStore.get('oauth_role')?.value || null
    
  } else {
    console.log('Role from URL:', role)
  }

  //Determine redirect path based on role
  let next = '/dashboard'

  if (role === 'farmer') next = '/onboarding/farmer'
  else if (role === 'consumer') next = '/onboarding/consumer'

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      console.log('Successfully exchanged code for session')
      
      const { data: { user }, error: getUserError } = await supabase.auth.getUser()

      if (!getUserError && user && role) {
        console.log('Updating user metadata with role:', role)
        
        // Update user metadata with role
        const { error: updateError } = await supabase.auth.updateUser({
          data: { role },
        })
        
        if (updateError) {
          console.error('Error updating user metadata:', updateError)
        } else {
          console.log('Successfully updated user metadata')
        }
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      const redirectUrl = isLocalEnv
        ? `${origin}${next}`
        : forwardedHost
          ? `https://${forwardedHost}${next}`
          : `${origin}${next}`

      
      //Clear the role cookie in the response
      const response = NextResponse.redirect(redirectUrl)
      response.cookies.delete('oauth_role')
      
      return response
    } else {
      console.error('Error exchanging code for session:', exchangeError)
    }
  } else {
    console.error('No code parameter found in callback')
  }

  const errorResponse = NextResponse.redirect(`${origin}/auth/auth-code-error`)
  errorResponse.cookies.delete('oauth_role')
  return errorResponse
}