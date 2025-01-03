// src/app/page.tsx
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to Notes App
      </h1>

      {!session ? (
        <div className="text-center space-y-4">
          <p className="text-xl text-gray-600">
            Get started by signing up or signing in
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-xl text-gray-600">
            Welcome back, {session.user?.email}
          </p>
          <Link
            href="/notes"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Notes
          </Link>
        </div>
      )}
    </div>
  )
}
