import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState(null)
  const [pillStyle, setPillStyle] = useState({ opacity: 0, left: 0, width: 0, height: 0 })
  const navRef = useRef(null)
  const linkRefs = useRef({})

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

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header__inner container">
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none', zIndex: 1001, marginLeft: '-90px' }}>
            <span className="header__logo-icon">
              <svg width="44" height="44" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="18" fill="var(--logo-circle-bg, var(--color-lime))" />
                <path d="M18 10l5 10h-3v6l-6-9h4V10z" fill="var(--logo-path-color, var(--color-dark))" />
              </svg>
            </span>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#ffffffff', lineHeight: 1 }}>Solar <span style={{ color: '#c8ee44' }}>Z</span></span>
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
            {navLinks.map((link, i) => (
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
                  color: hoveredNav === link.label ? '#1a1a1a' : (scrolled ? '#1a1a1a' : '#ffffff'),
                  textDecoration: 'none',
                  borderRadius: '8px',
                  transition: `color 0.2s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s`,
                  transform: scrolled ? 'scale(1.15)' : 'scale(1)',
                }}>
                {link.label}
                {link.hasDropdown && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                )}
              </Link>
            ))}
          </nav>

          <div className="header__right">
            <button className="header__search-btn" aria-label="Search">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </button>
            <button
              className={`header__hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span />
            </button>
            <Link href="/contact" className="btn btn-lime header__cta btn-arrow">
              Get in touch
              <span className="arrow-circle" style={{ background: 'var(--color-dark)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </span>
            </Link>
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
        .header__search-btn:hover {
          opacity: 1;
        }
        .header--scrolled .header__search-btn {
          color: var(--color-dark);
        }
        .header__hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          width: 32px;
          padding: 8px 0;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1001;
        }
        @media (max-width: 1200px) {
          .header__hamburger {
            display: flex;
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
          .header__cta, .header__search-btn {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
