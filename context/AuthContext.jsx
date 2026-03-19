import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    checkAuth()
  }, [])

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

  const register = async (name, email, password, phone) => {
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
      register,
      logout,
      getToken,
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
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch (e) {
    return { error: text || 'Unexpected response' }
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
