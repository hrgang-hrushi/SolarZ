import { getApp, getApps, initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, getRedirectResult, onAuthStateChanged, signInWithRedirect } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export function hasFirebaseClientConfig() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId)
}

function getFirebaseApp() {
  if (!hasFirebaseClientConfig()) {
    throw new Error('Authentication is temporarily unavailable. Please try again later.')
  }

  if (getApps().length > 0) {
    return getApp()
  }

  const app = initializeApp(firebaseConfig)
  
  // Initialize analytics if measurement ID is available
  if (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
    getAnalytics(app)
  }

  return app
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp())
}

function getGoogleProvider() {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  return provider
}

export async function signInWithGoogleRedirect() {
  const auth = getFirebaseAuth()
  return signInWithRedirect(auth, getGoogleProvider())
}

export async function getGoogleRedirectCredential() {
  const auth = getFirebaseAuth()
  return getRedirectResult(auth)
}

export function getCurrentFirebaseUser() {
  const auth = getFirebaseAuth()

  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser)
  }

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      unsubscribe()
      resolve(null)
    }, 3000)

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      clearTimeout(timeout)
      unsubscribe()
      resolve(user)
    })
  })
}
