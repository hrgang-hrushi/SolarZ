import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev'

// Hash password
export async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}

// Compare password with hash
export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

// Generate JWT token
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Extract user from request (for API routes)
export function getUserFromRequest(req) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.split(' ')[1]
  return verifyToken(token)
}

// Middleware wrapper for protected API routes
export function withAuth(handler) {
  return async (req, res) => {
    const user = getUserFromRequest(req)
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    
    req.user = user
    return handler(req, res)
  }
}

// Middleware for admin-only routes
export function withAdmin(handler) {
  return async (req, res) => {
    const user = getUserFromRequest(req)
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' })
    }
    
    req.user = user
    return handler(req, res)
  }
}
