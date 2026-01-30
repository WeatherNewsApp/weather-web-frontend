import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // デバッグログ
  console.log("Middleware executed:", { pathname, hasToken: !!token });

  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // 認証が必要なパスで、トークンがない場合
  if (!isPublicPath && !token) {
    console.log("Redirecting to login:", pathname);
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 認証済みユーザーが認証ページにアクセスした場合
  if (isPublicPath && token) {
    console.log("Redirecting to home:", pathname);
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)",
  ],
};

// こいつ動いてない
