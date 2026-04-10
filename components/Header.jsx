import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState(null)
  const [pillStyle, setPillStyle] = useState({ opacity: 0, left: 0, width: 0, height: 0 })
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navRef = useRef(null)
  const linkRefs = useRef({})
  const { user, logout, isAuthenticated } = useAuth()

  const handleNavHover = useCallback((label, el) => {
    if (!el || !navRef.current) return
    setHoveredNav(label)
    const navRect = navRef.current.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setPillStyle({
      opacity: 1,
      left: elRect.left - navRect.left,
      top: elRect.top - navRect.top,
      width: elRect.width,
      height: elRect.height,
    })
  }, [])

  const handleNavLeave = useCallback(() => {
    setHoveredNav(null)
    setPillStyle(prev => ({ ...prev, opacity: 0 }))
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About us', href: '/about' },
    { label: 'Team', href: '/about' },
    { label: 'News', href: '/blog' },
    { label: 'Services', href: '/service', hasDropdown: true },
  ]

  const isHome = router.pathname === '/'
  const useDarkText = !isHome || scrolled

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header__inner container">
          <Link href="/" className="header__logo">
            <span className="header__logo-icon">
              <svg width="44" height="44" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="18" fill="var(--logo-circle-bg, var(--color-lime))" />
                <path d="M18 10l5 10h-3v6l-6-9h4V10z" fill="var(--logo-path-color, var(--color-dark))" />
              </svg>
            </span>
            <span className="header__logo-text">Solar <span style={{ color: '#c8ee44' }}>Z</span></span>
          </Link>

          <nav className="header__nav-capsule" ref={navRef} onMouseLeave={handleNavLeave} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {/* Sliding pill highlight */}
            <div style={{
              position: 'absolute',
              background: '#c8ee44',
              borderRadius: '8px',
              transition: 'all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
              opacity: pillStyle.opacity,
              left: pillStyle.left + 'px',
              top: pillStyle.top + 'px',
              width: pillStyle.width + 'px',
              height: pillStyle.height + 'px',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            {navLinks.map((link, i) => {
              const isActive = router.pathname === link.href
              return (
                <Link key={link.label} href={link.href}
                  onMouseEnter={(e) => handleNavHover(link.label, e.currentTarget)}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 18px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isActive ? (useDarkText ? '#1a1a1a' : '#ffffff') : (useDarkText ? '#1a1a1a' : '#ffffff'),
                    textDecoration: 'none',
                    borderRadius: '10px',
                    transition: `color 0.2s ease, background 0.25s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s`,
                    transform: scrolled ? 'scale(1.15)' : 'scale(1)',
                    background: isActive ? 'transparent' : 'transparent',
                  }}>
                  {link.label}
                  {link.hasDropdown && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="header__right">
            <button
              className={`header__hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span />
            </button>

            {isAuthenticated ? (
              <div className="header__user-menu">
                <button
                  className="header__user-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <span className="header__user-avatar">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                  <span className="header__user-name">{user?.name?.split(' ')[0]}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6" /></svg>
                </button>
                {userMenuOpen && (
                  <div className="header__dropdown">
                    <Link href="/dashboard" className="header__dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <span style={{ flexShrink: 0, display: 'flex' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                      </span>
                      <span>Dashboard</span>
                    </Link>
                    <Link href="/dashboard/portfolio" className="header__dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <span style={{ flexShrink: 0, display: 'flex' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>
                      </span>
                      <span>Portfolio</span>
                    </Link>
                    <Link href="/dashboard/settings" className="header__dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <span style={{ flexShrink: 0, display: 'flex' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                      </span>
                      <span>Settings</span>
                    </Link>
                    <div className="header__dropdown-divider" />
                    <button className="header__dropdown-item header__dropdown-item--danger" onClick={() => { logout(); setUserMenuOpen(false); }}>
                      <span style={{ flexShrink: 0, display: 'flex' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                      </span>
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="header__login-btn">
                  Sign in
                </Link>
                <Link href="/register" className="btn btn-lime header__cta btn-arrow">
                  Get started
                  <span className="arrow-circle" style={{ background: 'var(--color-dark)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
        <nav className="mobile-menu__nav">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="mobile-menu__link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-lime" onClick={() => setMenuOpen(false)}>
            Get in touch
          </Link>
        </nav>
      </div>

      <style jsx>{`
        .header {
          --logo-circle-bg: var(--color-lime);
          --logo-path-color: var(--color-dark);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 24px 0;
          transition: all var(--transition-base);
        }
        .header--scrolled {
          padding: 12px 0;
          background: rgba(255,255,255,0.4);
          backdrop-filter: blur(50px);
          -webkit-backdrop-filter: blur(50px);
          box-shadow: var(--shadow-sm);
          --logo-circle-bg: var(--color-dark);
          --logo-path-color: var(--color-lime);
        }
        .header__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header__logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--color-white);
          z-index: 1001;
          margin-left: -25px;
        }
        .header--scrolled .header__logo {
          color: var(--color-dark);
        }
        .header--scrolled .header__logo .header__logo-text {
          color: var(--color-dark) !important;
        }
        .header__logo-text {
          font-size: 22px;
          font-weight: 800;
        }

        .header__nav-capsule {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 50px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(80px);
          -webkit-backdrop-filter: blur(80px);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .header--scrolled .header__nav-capsule {
          border-color: rgba(0,0,0,0.05);
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(60px);
          -webkit-backdrop-filter: blur(60px);
        }
        .header__nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 16px;
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          transition: color var(--transition-fast);
          border-radius: var(--radius-full);
        }
        .header--scrolled .header__nav-link {
          color: var(--color-gray-600);
        }
        .header__nav-link:hover {
          color: var(--color-white);
        }
        .header--scrolled .header__nav-link:hover {
          color: var(--color-dark);
          background: var(--color-gray-50);
        }

        .header__right {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .header__search-btn {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-white);
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity var(--transition-fast);
        }
        /* search button removed */
          }
        }
        .header__hamburger span {
          display: block;
          height: 1.5px;
          background: var(--color-white);
          border-radius: 2px;
          transition: all var(--transition-base);
        }
        .header__hamburger span:last-child {
          width: 60%;
          margin-left: auto;
        }
        .header--scrolled .header__hamburger span {
          background: var(--color-dark);
        }
        .header--scrolled .header__hamburger span {
          background: var(--color-dark);
        }
        .header__hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .header__hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .header__hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--transition-base);
        }
        .mobile-menu--open {
          opacity: 1;
          pointer-events: all;
        }
        .mobile-menu__nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        .mobile-menu__link {
          font-size: var(--font-size-2xl);
          font-weight: 600;
          color: var(--color-dark);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .mobile-menu__link:hover {
          color: var(--color-lime-dark);
        }

        @media (max-width: 1100px) {
          .header__nav-capsule {
            display: none;
          }
          .header__hamburger {
            display: flex;
          }
        }
        @media (max-width: 768px) {
          .header__cta {
            display: none;
          }
        }

        /* User Menu Styles */
        .header__login-btn {
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 600;
          color: var(--color-white);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .header__login-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .header--scrolled .header__login-btn {
          color: var(--color-dark);
        }
        .header--scrolled .header__login-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .header__user-menu {
          position: relative;
        }

        .header__user-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 6px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--color-white);
        }
        .header__user-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .header--scrolled .header__user-btn {
          background: rgba(0, 0, 0, 0.05);
          color: var(--color-dark);
        }
        .header--scrolled .header__user-btn:hover {
          background: rgba(0, 0, 0, 0.1);
        }

        .header__user-avatar {
          width: 32px;
          height: 32px;
          background: var(--color-lime);
          color: var(--color-dark);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
        }

        .header__user-name {
          font-size: 14px;
          font-weight: 600;
        }

        .header__dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          min-width: 220px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(50px);
          -webkit-backdrop-filter: blur(50px);
          border-radius: 16px;
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.08);
          padding: 8px;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          gap: 2px;
          animation: dropdownFade 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .header__dropdown :global(.header__dropdown-item) {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 11px 14px;
          background: none;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }
        .header__dropdown :global(.header__dropdown-item:hover) {
          background: #c8ee44;
          color: #1a1a1a;
          transform: translateX(2px) scale(1.03);
        }
        .header__dropdown :global(.header__dropdown-item) svg {
          opacity: 0.6;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }
        .header__dropdown :global(.header__dropdown-item:hover) svg {
          opacity: 1;
        }
        .header__dropdown :global(.header__dropdown-item--danger) {
          color: #ff6b6b;
        }
        .header__dropdown :global(.header__dropdown-item--danger:hover) {
          background: #dc2626;
          color: #ffffff;
        }

        .header__dropdown-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
          margin: 6px 8px;
        }
      `}</style>
    </>
  )
}
