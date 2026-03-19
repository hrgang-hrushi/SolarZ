import { getPrisma } from '../../../lib/db'
import { verifyPassword, generateToken } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body
    const normalizedEmail = (email || '').trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Validation
    if (!normalizedEmail || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ error: 'Please provide a valid email address' })
    }

    const prisma = getPrisma()

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        kycStatus: user.kycStatus,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    if (error?.message?.includes('DATABASE_URL')) {
      return res.status(500).json({ error: 'Database is not configured. Set DATABASE_URL in .env.local.' })
    }
    if (error?.code === 'P1001') {
      return res.status(500).json({ error: 'Cannot reach the database. Is Postgres running and DATABASE_URL correct?' })
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}
