import { PrismaClient } from '@prisma/client'

// This piece of code prevents multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// Create a singleton instance of PrismaClient
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  // Add logging in development to help with debugging
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error'],
})

// In development, attach the instance to the global object to maintain a single instance
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
