import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useAuth } from '../context/AuthContext'

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const { user, logout } = useAuth()

  const navItems = useMemo(
    () => [
      { label: 'Overview', href: '/dashboard' },
      { label: 'Portfolio', href: '/dashboard/portfolio' },
      { label: 'Marketplace', href: '/dashboard/marketplace' },
      { label: 'Wallet', href: '/dashboard/wallet' },
      { label: 'Impact', href: '/dashboard/impact' },
    ],
    []
  )

  const secondaryNav = useMemo(
    () => [
      { label: 'Support', href: '/dashboard/support' },
      { label: 'Settings', href: '/dashboard/settings' },
    ],
    []
  )

  const isActive = (href) => {
    if (href === '/dashboard') return router.pathname === '/dashboard'
    return router.pathname.startsWith(href)
  }

  const initials = user?.name?.split(' ').map((n) => n[0]).slice(0, 2).join('') || 'SZ'

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark" aria-hidden>☀️</div>
          <div>
            <div className="brand-name">Solar Z</div>
            <div className="brand-tag">Investor Dashboard</div>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link ${isActive(item.href) ? 'active' : ''}`}>
              <span className="dot" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="nav secondary">
          {secondaryNav.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link ${isActive(item.href) ? 'active subtle' : 'subtle'}`}>
              <span className="dot muted" />
              <span>{item.label}</span>
            </Link>
          ))}
          <button className="nav-link subtle" onClick={logout}>
            <span className="dot muted" />
            <span>Logout</span>
          </button>
        </div>

        <div className="profile">
          <div className="avatar">{initials}</div>
          <div>
            <div className="user-name">{user?.name || 'Investor'}</div>
            <div className="user-meta">{user?.email || 'Signed in'}</div>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="search">
            <span aria-hidden className="material">search</span>
            <input placeholder="Search assets, projects, reports..." />
          </div>
          <div className="top-actions">
            <button className="icon-btn" aria-label="Notifications">
              <span className="material">notifications</span>
            </button>
            <button className="icon-btn" aria-label="Settings">
              <span className="material">settings</span>
            </button>
            <div className="chip">
              <span className="status" />
              <span>Live Net Impact</span>
            </div>
          </div>
        </header>

        <main className="content">{children}</main>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300;400;500;600;700&display=swap');
      `}</style>

      <style jsx>{`
        .shell {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 260px 1fr;
          background: #f5f7ed;
          color: #2c3029;
        }

        .sidebar {
          position: sticky;
          top: 0;
          align-self: start;
          height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding: 28px 22px 24px;
          background: #f5f7ed;
          border-right: 1px solid #e6e9de;
        }

        .brand {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 12px;
        }

        .brand-mark {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: #def83d;
          font-weight: 800;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        }

        .brand-name {
          font-family: 'Space Grotesk', var(--font-heading);
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .brand-tag {
          font-size: 12px;
          color: #595d55;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 700;
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 14px;
          font-weight: 700;
          border: 1px solid transparent;
          background: transparent;
          color: #2c3029;
          transition: all 0.2s ease;
          text-align: left;
        }

        .nav-link:hover {
          background: #eff2e7;
          border-color: #e6e9de;
        }

        .nav-link.active {
          background: #def83d;
          border-color: #d0e92d;
          color: #515c00;
          box-shadow: 0 10px 30px rgba(85, 97, 0, 0.15);
        }

        .nav-link.subtle {
          color: #595d55;
          font-weight: 600;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #d4ed31;
        }

        .dot.muted {
          background: #cdd2c3;
        }

        .profile {
          margin-top: auto;
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 12px;
          border-radius: 16px;
          background: #eff2e7;
          border: 1px solid #e6e9de;
        }

        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #556100;
          color: #e7ff57;
          display: grid;
          place-items: center;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .user-name {
          font-weight: 700;
        }

        .user-meta {
          color: #595d55;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 700;
        }

        .main {
          background: #f5f7ed;
          min-height: 100vh;
          padding: 24px 32px 48px;
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
          padding: 12px 0;
          backdrop-filter: blur(12px);
        }

        .search {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 16px;
          background: #eff2e7;
          border: 1px solid #e0e4d8;
        }

        .search input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 14px;
          color: #2c3029;
        }

        .material {
          font-family: 'Material Symbols Outlined';
          font-size: 20px;
          color: #595d55;
          line-height: 1;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid #e0e4d8;
          background: #ffffff;
          display: grid;
          place-items: center;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }

        .icon-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 14px;
          background: #111111;
          color: #def83d;
          font-weight: 700;
          letter-spacing: 0.02em;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
        }

        .status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #8bc34a;
          box-shadow: 0 0 0 6px rgba(139,195,74,0.18);
        }

        .content {
          margin-top: 16px;
        }

        @media (max-width: 1100px) {
          .shell {
            grid-template-columns: 1fr;
          }
          .sidebar {
            height: auto;
            position: relative;
            border-right: none;
            border-bottom: 1px solid #e6e9de;
          }
          .main {
            padding: 20px;
          }
          .topbar {
            position: sticky;
            top: 0;
          }
        }
      `}</style>
    </div>
  )
}
