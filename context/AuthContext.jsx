import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getGoogleRedirectCredential, hasFirebaseClientConfig, signInWithGoogleRedirect } from '../lib/firebase-client'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
  const canUseGoogleAuth = demoMode || hasFirebaseClientConfig()

  const demoUser = {
    id: 'demo-admin',
    name: 'Demo Admin',
    email: 'demo@solarify.local',
    role: 'admin',
  }

  // Check for existing session on mount
  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    if (demoMode) {
      setUser(demoUser)
      setLoading(false)
      return
    }

    if (canUseGoogleAuth) {
      try {
        const credential = await getGoogleRedirectCredential()
        if (credential?.user) {
          await issueGoogleSession(credential)
          router.replace('/dashboard')
          return
        }
      } catch (error) {
        console.error('Google redirect sign-in failed:', error)
      }
    }

    await checkAuth()
  }

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('token')
    }

    setLoading(false)
  }

  const login = async (email, password) => {
    if (demoMode) {
      setUser(demoUser)
      return { token: 'demo-token', user: demoUser }
    }

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await safeJson(res)

    if (!res.ok) {
      throw new Error(data?.error || 'Login failed')
    }

    localStorage.setItem('token', data.token)
    setUser(data.user)
    return data
  }

  const loginWithGoogle = async () => {
    if (demoMode) {
      setUser(demoUser)
      return { token: 'demo-token', user: demoUser }
    }

    if (!canUseGoogleAuth) {
      throw new Error('Google sign-in is unavailable right now.')
    }

    try {
      await signInWithGoogleRedirect()
      return { redirecting: true }
    } catch (error) {
      throw new Error(getFriendlyAuthError(error))
    }
  }

  const issueGoogleSession = async (credential) => {
    const idToken = await credential.user.getIdToken()

    const res = await fetch('/api/auth/firebase-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idToken,
        name: credential.user.displayName,
        phone: credential.user.phoneNumber,
      })
    })
    const data = await safeJson(res)

    if (!res.ok) {
      throw new Error(data?.error || 'Google sign-in failed')
    }

    localStorage.setItem('token', data.token)
    setUser(data.user)
    return data
  }

  const register = async (name, email, password, phone) => {
    if (demoMode) {
      setUser({ ...demoUser, name: name || demoUser.name, email })
      return { token: 'demo-token', user: { ...demoUser, name: name || demoUser.name, email } }
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone })
    })
    const data = await safeJson(res)

    if (!res.ok) {
      throw new Error(data?.error || 'Registration failed')
    }

    localStorage.setItem('token', data.token)
    setUser(data.user)
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/')
  }

  const getToken = () => {
    return localStorage.getItem('token')
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      loginWithGoogle,
      register,
      logout,
      getToken,
      canUseGoogleAuth,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Gracefully handle non-JSON error responses
async function safeJson(res) {
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return res.json()
  }

  if (contentType.includes('text/html')) {
    return { error: 'Server error. Please try again in a moment.' }
  }

  const text = await res.text()
  if (text.trim().startsWith('<!DOCTYPE html') || text.trim().startsWith('<html')) {
    return { error: 'Server error. Please try again in a moment.' }
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return { error: text || 'Unexpected response' }
  }
}

function getFriendlyAuthError(error) {
  switch (error?.code) {
    case 'auth/popup-blocked':
    case 'auth/cancelled-popup-request':
      return 'Google sign-in was blocked. Please try again.'
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was closed before it finished.'
    case 'auth/unauthorized-domain':
      return 'Google sign-in is not enabled for this website yet.'
    default:
      return error?.message || 'Google sign-in failed. Please try again.'
  }
}

export const useAuth = () => useContext(AuthContext)

// HOC for protected pages
export function withAuth(Component) {
  return function ProtectedPage(props) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login?redirect=' + router.asPath)
      }
    }, [user, loading, router])

    if (loading) {
      return (
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh' 
        }}>
          <div className="loading-spinner" />
        </div>
      )
    }

    if (!user) {
      return null
    }

    return <Component {...props} />
  }
}
