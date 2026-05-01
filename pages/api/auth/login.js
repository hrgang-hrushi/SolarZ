import { firebaseSignInWithEmailAndPassword, issueAppSessionFromFirebaseToken } from '../../../lib/firebase-auth'

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

    const firebaseResponse = await firebaseSignInWithEmailAndPassword(normalizedEmail, password)
    const session = await issueAppSessionFromFirebaseToken({
      idToken: firebaseResponse.idToken,
      fallbackName: firebaseResponse.displayName,
    })

    res.status(200).json({
      message: 'Login successful',
      token: session.token,
      user: session.user,
    })

  } catch (error) {
    console.error('Login error:', error)
    if (error?.message?.includes('Firebase API key')) {
      return res.status(500).json({ error: 'Firebase is not configured. Set FIREBASE_API_KEY in your environment.' })
    }
    if (error?.message?.includes('Firebase Admin credentials')) {
      return res.status(500).json({ error: 'Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.' })
    }
    if (error?.code === 'P1001') {
      return res.status(500).json({ error: 'Cannot reach the database. Is Postgres running and DATABASE_URL correct?' })
    }
    if (error?.message) {
      return res.status(401).json({ error: error.message })
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}
