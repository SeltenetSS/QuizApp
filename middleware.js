import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

const protectedRoutes = ["/admin", "/quiz", "/leaderboard"];

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.pathname;

  const needsAuth = protectedRoutes.some((route) =>
    url.startsWith(route)
  );

  if (needsAuth && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  
  if (url === "/login" || url === "/register") {
    return NextResponse.next({
      headers: {
        "x-no-navbar": "true",
      },
    });
  }

  return NextResponse.next();
}
