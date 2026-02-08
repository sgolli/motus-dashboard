import { NextRequest, NextResponse } from "next/server";

const PASSWORD = process.env.DASHBOARD_PASSWORD || "1234";
const COOKIE_NAME = "motus_auth";

export function middleware(req: NextRequest) {
  // Allow the login API route through
  if (req.nextUrl.pathname === "/api/login") return NextResponse.next();

  const auth = req.cookies.get(COOKIE_NAME)?.value;
  if (auth === PASSWORD) return NextResponse.next();

  // Redirect to login page
  if (req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login|api/login).*)"],
};
