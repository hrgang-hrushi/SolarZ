import { PrismaClient, Prisma } from '@prisma/client'

// Force library engine to avoid "client" (adapter/edge) requirement in local/serverful runtime
if (!process.env.PRISMA_CLIENT_ENGINE_TYPE || process.env.PRISMA_CLIENT_ENGINE_TYPE === 'client') {
  process.env.PRISMA_CLIENT_ENGINE_TYPE = 'library'
}

function ensureDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    const message = 'DATABASE_URL is not set. Create .env.local and set DATABASE_URL to your Postgres connection string.'
    throw new Error(message)
  }
}

// Prevent multiple instances in development (hot-reloading)
const globalForPrisma = globalThis

let prismaInstance = globalForPrisma.prisma

function createPrisma() {
  ensureDatabaseUrl()
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
    })
  } catch (err) {
    // Surface clearer diagnostics for init failures
    if (err instanceof Prisma.PrismaClientInitializationError) {
      const message = `Failed to initialize database client. Check DATABASE_URL and that Postgres is reachable. Original message: ${err.message}`
      const wrapped = new Error(message)
      wrapped.code = err.code
      throw wrapped
    }
    throw err
  }
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
