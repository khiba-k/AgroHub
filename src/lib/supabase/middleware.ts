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

  // Allow API routes to pass through without redirect logic
  if (pathname.startsWith('/api/')) {
    return supabaseResponse
  }

  // Public paths (always accessible regardless of auth status)
  const PUBLIC_PATHS = [
    '/welcome',
    '/login',
    '/register',
    '/auth/confirm',
    '/auth/email',
    '/auth/callback',
    '/error',
    '/farmer/register',
    '/consumer/register',
  ];

  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path))

  // Handle root path differently
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    if (user) {
      url.pathname = '/dashboard'
    } else {
      url.pathname = '/welcome'
    }
    return NextResponse.redirect(url)
  }

  // For non-authenticated users
  if (!user) {
    if (!isPublicPath) {
      const url = request.nextUrl.clone()
      url.pathname = '/welcome'
      return NextResponse.redirect(url)
    }
  } else {
    // For authenticated users - only redirect if they're on auth pages (but NOT /welcome)
    const authPages = ['/login', '/register']
    if (authPages.some(path => pathname.startsWith(path))) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}