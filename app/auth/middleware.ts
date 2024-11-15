import { NextResponse } from "next/server";

import { CustomMiddleware } from "@/utils/middlewareChain";
import withAuth from "@/utils/withAuth";

const AuthMiddleware: (middleware: CustomMiddleware) => CustomMiddleware = (middleware) => {
  return async (request, event, response) => {
    const auth = await withAuth();
    const { pathname, origin } = request.nextUrl;

    if (["/auth/login", "/auth/register", "/auth/forgot-password"].includes(pathname) && auth.isAuthenticated) {
      return NextResponse.redirect(new URL("/", origin).toString());
    }

    if (pathname === "/auth/verify-email" && (!auth.isAuthenticated || auth.isEmailVerified)) {
      return NextResponse.redirect(new URL("/auth/login", origin).toString());
    }

    return middleware(request, event, response);
  };
};

export default AuthMiddleware;
