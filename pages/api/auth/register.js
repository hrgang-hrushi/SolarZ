import { firebaseSignUpWithEmailAndPassword, firebaseUpdateDisplayName, issueAppSessionFromFirebaseToken } from '../../../lib/firebase-auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password, name, phone } = req.body
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

    const firebaseResponse = await firebaseSignUpWithEmailAndPassword(normalizedEmail, password)
    await firebaseUpdateDisplayName(firebaseResponse.idToken, name)
    const session = await issueAppSessionFromFirebaseToken({
      idToken: firebaseResponse.idToken,
      fallbackName: name,
      fallbackPhone: phone || null,
    })

    res.status(201).json({
      message: 'User registered successfully',
      token: session.token,
      user: session.user,
    })

  } catch (error) {
    console.error('Registration error:', error)
    if (error?.message?.includes('Firebase API key')) {
      return res.status(500).json({ error: 'Firebase is not configured. Set FIREBASE_API_KEY in your environment.' })
    }
    if (error?.message?.includes('Firebase Admin credentials')) {
      return res.status(500).json({ error: 'Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.' })
    }
    if (error?.message) {
      return res.status(400).json({ error: error.message })
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}
