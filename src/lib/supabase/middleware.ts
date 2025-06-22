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
  const searchParams = request.nextUrl.searchParams

  // Allow API routes and invite routes
  if (pathname.startsWith('/api/') || pathname.startsWith('/invite/')) {
    return supabaseResponse
  }

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
    '/onboarding/agrohub',
    '/onboarding/farm',
    '/onboarding/consumer',
  ]

  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path))
  
  // Special case: if user has an invite token and is accessing onboarding, always allow
  const hasInviteToken = searchParams.has('token')
  const isOnboardingPath = pathname.startsWith('/onboarding/')
  
  if (hasInviteToken && isOnboardingPath) {
    console.log("🎫 User has invite token accessing onboarding - allowing access")
    return supabaseResponse
  }

  // Redirect root to appropriate page
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = user ? '/dashboard' : '/welcome'
    return NextResponse.redirect(url)
  }

  // If not logged in
  if (!user) {
    if (!isPublicPath) {
      const url = request.nextUrl.clone()
      url.pathname = '/welcome'
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  // If logged in
  const { isOnboarded, role } = user.user_metadata || {}
  const authPages = ['/login', '/register']
  const onboardingPaths = [
    '/onboarding/farm',
    '/onboarding/agrohub',
    '/onboarding/consumer',
  ]
  const isOnboardingPage = onboardingPaths.some(path => pathname.startsWith(path))


  if (isOnboarded && isOnboardingPage) {
    console.log("Already onboarded but visiting onboarding — redirecting to dashboard")
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  if (!isOnboarded && !isPublicPath && !isOnboardingPage) {
    const url = request.nextUrl.clone()

    if (role === 'farmer') url.pathname = '/onboarding/farm'
    else if (role === 'agrohub') url.pathname = '/onboarding/agrohub'
    else if (role === 'consumer') url.pathname = '/onboarding/consumer'
    else url.pathname = '/welcome' // fallback for unknown role

    return NextResponse.redirect(url)
  }

  return supabaseResponse
}