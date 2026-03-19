import { getPrisma } from '../../../lib/db'
import { hashPassword, generateToken } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password, name, phone } = req.body
    const prisma = getPrisma()

    const normalizedEmail = (email || '').trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Validation
    if (!normalizedEmail || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' })
    }

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ error: 'Please provide a valid email address' })
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' })
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name,
        phone: phone || null,
        kycStatus: 'PENDING',
        walletBalance: 0,
        role: 'USER'
      }
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        kycStatus: user.kycStatus
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    if (error?.code === 'P2002') {
      return res.status(400).json({ error: 'User with this email already exists' })
    }
    if (error?.message?.includes('DATABASE_URL')) {
      return res.status(500).json({ error: 'Database is not configured. Set DATABASE_URL in .env.local.' })
    }
    if (error?.code === 'P1001') {
      return res.status(500).json({ error: 'Cannot reach the database. Is Postgres running and DATABASE_URL correct?' })
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}
