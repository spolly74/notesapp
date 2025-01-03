// src/middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Protect all routes except public ones
      const publicPaths = ["/auth/signin", "/auth/signup"]
      const isPublicPath = publicPaths.some(path =>
        req.nextUrl.pathname.startsWith(path)
      )

      return Boolean(token) || isPublicPath
    }
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
