// src/app/api/signout/route.ts

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabase = await createClient()
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut({ scope: 'global' })
    
    if (error) {
      console.error('Supabase signout error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Create response that will clear auth cookies
    const response = NextResponse.json({ success: true })
    
    // Get current cookies to clear Supabase auth cookies
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()
    
    const cookieOptions = {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const
    }

    // Clear any Supabase auth-related cookies
    allCookies.forEach(cookie => {
      if (cookie.name.includes('sb-') && 
          (cookie.name.includes('auth-token') || cookie.name.includes('code-verifier'))) {
        response.cookies.set(cookie.name, '', cookieOptions)
      }
    })

    return response
    
  } catch (error) {
    console.error('Signout error:', error)
    return NextResponse.json({ error: 'Failed to sign out' }, { status: 500 })
  }
}