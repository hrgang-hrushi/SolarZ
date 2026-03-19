import prisma from '../../../lib/db'
import { withAuth } from '../../../lib/auth'

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
        role: true,
        kycStatus: true,
        walletBalance: true,
        createdAt: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    return res.status(200).json({ tokenValid: true, user })
  } catch (error) {
    console.error('Verify token error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default withAuth(handler)
