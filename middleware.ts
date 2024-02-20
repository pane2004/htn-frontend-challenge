import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentToken = request.cookies.get("access_token")?.value;

  // redirect user to public if trying to access anything in private
  if (request.nextUrl.pathname.startsWith("/events-private") && !currentToken) {
    const response = NextResponse.redirect(new URL("/events-public", request.url));
    return response;
  }

  // request all events-public requests to private if user is logged in
  if (request.nextUrl.pathname.startsWith("/events-public") && currentToken) {
    const { searchParams } = request.nextUrl;
    const url = new URL("/events-private", request.url);
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    const response =  NextResponse.redirect(url);
    return response;
  }
}

// run middleware on the private routes
export const config = {
  matcher: ["/events-private/:path*", "/events-public/:path*"],
};
