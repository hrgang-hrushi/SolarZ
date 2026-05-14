import prisma from '../../../lib/db'
import { withAuth } from '../../../lib/auth'
import { isDatabaseUnavailable } from '../../../lib/firebase-auth'

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        kycStatus: true,
        walletBalance: true,
        role: true,
        createdAt: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json({ user })

  } catch (error) {
    console.error('Get user error:', error)
    if (isDatabaseUnavailable(error)) {
      return res.status(200).json({
        user: {
          id: req.user.userId,
          email: req.user.email,
          name: req.user.email?.split('@')[0] || 'User',
          phone: null,
          kycStatus: 'PENDING',
          walletBalance: 0,
          role: req.user.role || 'USER',
        },
      })
    }

    res.status(500).json({ error: 'Internal server error' })
  }
}

export default withAuth(handler)
