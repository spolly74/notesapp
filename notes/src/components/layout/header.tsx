// src/components/layout/header.tsx
import { AuthNav } from "@/app/auth/auth-nav"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Notes App
            </Link>
          </div>

          <AuthNav />
        </div>
      </div>
    </header>
  )
}
