import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authRoutes, protectedRoutes } from "./routes";

export async function middleware(req: NextRequest) {
  const lang = req.cookies.get("NEXT_LOCALE")?.value || "en"; // Default to "en"
  const path = req.nextUrl;
  const url = req.nextUrl.pathname.replace(`/${lang}`, "");

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isProtectedRoute =
    protectedRoutes.some((route) => {
      const regex = new RegExp(`^${route.replace(/\[.*\]/, ".*")}$`);
      return regex.test(url);
    }) || url.includes("dashboard");

  const isAuthRoute = authRoutes.includes(url);

  // Redirect unauthenticated users from protected routes
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL(`/login`, req.url);
    redirectUrl.searchParams.set("redirect", url);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect authenticated users away from login/signup pages
  if (session && isAuthRoute) {
    const redirectUrl = req.nextUrl.searchParams.get("redirect") || "/";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!.*\\..*|_next).*)"],
};
