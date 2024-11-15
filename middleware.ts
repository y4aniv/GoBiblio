import AuthMiddleware from "@/app/auth/middleware";
import chain from "@/utils/middlewareChain";

export default chain([AuthMiddleware]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
