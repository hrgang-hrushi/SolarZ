import { issueAppSessionFromFirebaseToken } from '../../../lib/firebase-auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { idToken, name, phone } = req.body || {}

    if (!idToken) {
      return res.status(400).json({ error: 'Firebase ID token is required' })
    }

    const session = await issueAppSessionFromFirebaseToken({
      idToken,
      fallbackName: name,
      fallbackPhone: phone || null,
    })

    return res.status(200).json({
      message: 'Session created successfully',
      token: session.token,
      user: session.user,
    })
  } catch (error) {
    console.error('Firebase session error:', error)

    if (error?.message?.includes('Firebase Admin credentials')) {
      return res.status(500).json({ error: 'Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.' })
    }

    if (error?.message) {
      return res.status(401).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal server error' })
  }
}
