import { NextResponse } from "next/server";
import { auth } from "./auth";

const publicRoutes = ["/login", "/signup", "/", "/menu", "/about", "/contact"];

const adminRoutes = ["/products", "/categories", "/all-users"];

const authRoutes = ["/profile", "/cart", "/checkout", "/orders"];

export default auth((req) => {
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(req.nextUrl.pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (req.auth?.user?.isAdmin) {
    return NextResponse.next();
  }

  if (isAdminRoute && !req.auth?.user?.isAdmin) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }

  if (isAuthRoute && !req.auth) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
