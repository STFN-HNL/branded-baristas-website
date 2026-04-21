import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { findRedirect } from "@/lib/redirects";
import { routing } from "@/lib/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request: NextRequest) {
  const redirect = findRedirect(request.nextUrl.pathname);
  if (redirect) {
    const url = new URL(redirect.destination, request.url);
    return NextResponse.redirect(url, 301);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(nl|en)/:path*", "/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
