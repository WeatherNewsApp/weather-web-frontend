import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = ["/login", "/register", "/top", "/not-found"];
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/top", request.url));
  }
  if (
    isPublicPath &&
    token &&
    pathname !== "/top" &&
    pathname !== "/not-found"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, skins, animations)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|apple-icon.png|icon.png).*)",
  ],
};
