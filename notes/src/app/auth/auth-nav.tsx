// src/components/auth/auth-nav.tsx
"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export function AuthNav() {
  const { data: session, status } = useSession()

  // Show different navigation items based on authentication status
  if (status === "loading") {
    return (
      <div className="flex gap-4 items-center">
        <div className="h-8 w-20 bg-gray-200 animate-pulse rounded" />
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex gap-4 items-center">
        <span className="text-sm text-gray-700">
          {session.user?.email}
        </span>
        <button
          onClick={() => signOut()}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <div className="flex gap-4 items-center">
      <Link
        href="/auth/signin"
        className="text-sm text-gray-600 hover:text-gray-900"
      >
        Sign in
      </Link>
      <Link
        href="/auth/signup"
        className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Sign up
      </Link>
    </div>
  )
}
