import { getPrisma } from './db'
import { generateToken, hashPassword } from './auth'
import { verifyFirebaseIdToken } from './firebase-admin'

const FIREBASE_IDENTITY_TOOLKIT_BASE = 'https://identitytoolkit.googleapis.com/v1'

function getFirebaseApiKey() {
  const apiKey = process.env.FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY

  if (!apiKey) {
    throw new Error('Firebase API key is missing. Set FIREBASE_API_KEY in your environment.')
  }

  return apiKey
}

async function firebaseIdentityRequest(path, body) {
  const apiKey = getFirebaseApiKey()
  const response = await fetch(`${FIREBASE_IDENTITY_TOOLKIT_BASE}${path}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await safeJson(response)

  if (!response.ok) {
    throw new Error(parseFirebaseError(data))
  }

  return data
}

export async function firebaseSignInWithEmailAndPassword(email, password) {
  return firebaseIdentityRequest('/accounts:signInWithPassword', {
    email,
    password,
    returnSecureToken: true,
  })
}

export async function firebaseSignUpWithEmailAndPassword(email, password) {
  return firebaseIdentityRequest('/accounts:signUp', {
    email,
    password,
    returnSecureToken: true,
  })
}

export async function firebaseUpdateDisplayName(idToken, displayName) {
  if (!displayName) {
    return null
  }

  return firebaseIdentityRequest('/accounts:update', {
    idToken,
    displayName,
    returnSecureToken: true,
  })
}

export async function issueAppSessionFromFirebaseToken({ idToken, fallbackName, fallbackPhone }) {
  const decodedToken = await verifyFirebaseIdToken(idToken)
  const email = (decodedToken.email || '').trim().toLowerCase()

  if (!email) {
    throw new Error('Firebase account does not include an email address')
  }

  const name = (fallbackName || decodedToken.name || decodedToken.displayName || email.split('@')[0] || 'User').trim()
  const phone = fallbackPhone || decodedToken.phone_number || null
  const passwordHash = await hashPassword(decodedToken.uid)

  let user

  try {
    const prisma = getPrisma()
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    user = existingUser
      ? await prisma.user.update({
          where: { email },
          data: {
            name: existingUser.name || name,
            phone: existingUser.phone || phone,
            password: existingUser.password || passwordHash,
          },
        })
      : await prisma.user.create({
          data: {
            email,
            password: passwordHash,
            name,
            phone,
            kycStatus: 'PENDING',
            walletBalance: 0,
            role: 'USER',
          },
        })
  } catch (error) {
    if (!isDatabaseUnavailable(error)) {
      throw error
    }

    console.warn('Database unavailable, issuing Firebase-only session:', error.message)
    user = {
      id: decodedToken.uid,
      email,
      name,
      phone,
      kycStatus: 'PENDING',
      walletBalance: 0,
      role: 'USER',
    }
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  })

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      kycStatus: user.kycStatus,
      walletBalance: user.walletBalance,
      role: user.role,
    },
  }
}

export function isDatabaseUnavailable(error) {
  const message = error?.message || ''
  return (
    error?.code === 'P1001' ||
    message.includes("Can't reach database server") ||
    message.includes('DATABASE_URL is not set') ||
    message.includes('ECONNREFUSED')
  )
}

async function safeJson(response) {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()

  try {
    return JSON.parse(text)
  } catch {
    return { error: text }
  }
}

function parseFirebaseError(data) {
  const message = data?.error?.message || data?.error || 'Firebase authentication failed'

  switch (message) {
    case 'EMAIL_EXISTS':
      return 'User with this email already exists'
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
    case 'INVALID_LOGIN_CREDENTIALS':
      return 'Invalid credentials'
    case 'USER_DISABLED':
      return 'This account has been disabled'
    case 'WEAK_PASSWORD : Password should be at least 6 characters':
      return 'Password must be at least 6 characters'
    default:
      return message.replace(/_/g, ' ').toLowerCase().replace(/^[a-z]/, (char) => char.toUpperCase())
  }
}
