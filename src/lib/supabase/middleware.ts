import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Always allow these public paths through (no redirects)
  const PUBLIC_PATHS = [
    '/welcome',
    '/login',
    '/register',
    '/auth/confirm',
    '/auth/email',
    '/error',
  ]

  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path))

  if (!user) {
    if (!isPublicPath) {
      const url = request.nextUrl.clone()
      url.pathname = '/welcome'
      return NextResponse.redirect(url)
    }
  } else {
    if (pathname === '/' || isPublicPath) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
