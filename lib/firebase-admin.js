import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

function getServiceAccountConfig() {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY

  if (!projectId || !clientEmail || !privateKey) {
    return null
  }

  return {
    projectId,
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, '\n'),
  }
}

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0]
  }

  const serviceAccount = getServiceAccountConfig()
  if (!serviceAccount) {
    throw new Error('Firebase Admin credentials are missing. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.')
  }

  return initializeApp({
    credential: cert(serviceAccount),
  })
}

export function getFirebaseAdminAuth() {
  getFirebaseAdminApp()
  return getAuth()
}

export async function verifyFirebaseIdToken(idToken) {
  if (!idToken) {
    throw new Error('Firebase ID token is required')
  }

  return getFirebaseAdminAuth().verifyIdToken(idToken)
}