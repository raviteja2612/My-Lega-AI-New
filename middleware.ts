import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  // Check if user is authenticated
  if (!token) {
    const url = new URL("/signin", request.url)
    url.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Role-based access control
  const userRole = token.role as string
  const path = request.nextUrl.pathname

  // Redirect based on role
  if (path.startsWith("/dashboard/consumer") && userRole !== "consumer") {
    return NextResponse.redirect(new URL("/dashboard/professional", request.url))
  }

  if (path.startsWith("/dashboard/professional") && userRole !== "professional") {
    return NextResponse.redirect(new URL("/dashboard/consumer", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/cases/:path*", "/documents/:path*"],
}
