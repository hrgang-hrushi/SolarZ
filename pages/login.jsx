import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      const redirect = router.query.redirect || '/dashboard'
      router.push(redirect)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <Link href="/" className="auth-logo">
              <span className="logo-icon"></span>
              <span className="logo-text">Solar Z</span>
            </Link>
            <h1>Welcome back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="auth-error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
                <Link href="/forgot-password" className="form-link">
                  Forgot password?
                </Link>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="auth-social">
            <button className="social-btn" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
          </div>

          <p className="auth-footer">
            Don't have an account?{' '}
            <Link href="/register">Create one</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
          padding: 24px;
        }

        .auth-container {
          background: white;
          border-radius: 16px;
          padding: 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          margin-bottom: 24px;
        }

        .logo-icon {
          font-size: 28px;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 700;
          color: var(--color-dark);
        }

        .auth-header h1 {
          font-size: 24px;
          font-weight: 600;
          color: var(--color-dark);
          margin: 0 0 8px;
        }

        .auth-header p {
          color: #666;
          margin: 0;
        }

        .auth-error {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fef2f2;
          color: #dc2626;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-dark);
        }

        .form-link {
          font-size: 13px;
          color: var(--color-lime-dark);
          text-decoration: none;
        }

        .form-link:hover {
          text-decoration: underline;
        }

        .form-group input {
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--color-lime-dark);
          box-shadow: 0 0 0 3px rgba(132, 204, 22, 0.1);
        }

        .auth-submit {
          background: var(--color-dark);
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
        }

        .auth-submit:hover:not(:disabled) {
          background: #1a1a1a;
          transform: translateY(-1px);
        }

        .auth-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 24px 0;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .auth-divider span {
          font-size: 13px;
          color: #666;
        }

        .auth-social {
          display: flex;
          gap: 12px;
        }

        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-dark);
          cursor: pointer;
          transition: all 0.2s;
        }

        .social-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .auth-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 14px;
          color: #666;
        }

        .auth-footer a {
          color: var(--color-lime-dark);
          font-weight: 500;
          text-decoration: none;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}

// Remove default layout for auth pages
Login.getLayout = (page) => page
