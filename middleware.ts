import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentToken = request.cookies.get("access_token")?.value;

  // user is attempting to access non-public route without token, redirect
  if (!currentToken) {
    const response = NextResponse.redirect(new URL("/", request.url));
    return response;
  }
}

// run middleware on the private routes
export const config = {
  matcher: ["/events-private/:path*"],
};
