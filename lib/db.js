import { PrismaClient } from '@prisma/client'

// Prevent multiple instances in development (hot-reloading)
const globalForPrisma = globalThis

// Ensure Prisma uses the library engine locally (avoids Accelerate/adapter requirement)
if (!process.env.PRISMA_CLIENT_ENGINE_TYPE) {
  process.env.PRISMA_CLIENT_ENGINE_TYPE = 'library'
}

let prismaInstance = globalForPrisma.prisma

function createPrisma() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })
}

export function getPrisma() {
  if (prismaInstance) return prismaInstance
  prismaInstance = createPrisma()
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance
  return prismaInstance
}

// Default export for existing imports
export const prisma = getPrisma()
export default prisma
