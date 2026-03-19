import prisma from '../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, topic, message, source } = req.body || {}

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }

  if (message.length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters' })
  }

  try {
    const ipAddress = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || null
    const userAgent = req.headers['user-agent'] || null

    const submission = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        topic: topic || null,
        message,
        source: source || 'web',
        metadata: {
          ipAddress,
          userAgent
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        topic: true,
        source: true,
        createdAt: true
      }
    })

    return res.status(201).json({ message: 'Submitted', submission })
  } catch (error) {
    console.error('Contact submission error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
