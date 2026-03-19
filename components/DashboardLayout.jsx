import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import { useMemo } from 'react'

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const { user, logout } = useAuth()

  const navItems = useMemo(() => ([
    { label: 'Overview', href: '/dashboard' },
    { label: 'Investments', href: '/dashboard/investments' },
    { label: 'Portfolio', href: '/dashboard/portfolio' },
    { label: 'Settings', href: '/dashboard/settings' },
    { label: 'Support', href: '/dashboard/support' },
  ]), [])

  const isActive = (href) => {
    if (href === '/dashboard' && router.pathname === '/dashboard') return true
    return router.pathname.startsWith(href) && href !== '/dashboard'
  }

  const initials = user?.name?.split(' ').map((n) => n[0]).slice(0, 2).join('') || 'SZ'

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">☀️</div>
          <div>
            <div className="brand-name">Solarify</div>
            <div className="brand-tag">User Portal</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link${isActive(item.href) ? ' active' : ''}`}>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="avatar">{initials}</div>
            <div>
              <div className="user-name">{user?.name || 'Your account'}</div>
              <div className="user-email">{user?.email || 'Signed in'}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={logout}>Log out</button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <h1>Dashboard</h1>
            <p>Track your solar investments and performance</p>
          </div>
          <div className="topbar-right">
            <div className="top-pill">Lime plan</div>
            <div className="top-pill success">Active</div>
          </div>
        </header>

        <div className="dashboard-content">
          {children}
        </div>
      </main>

      <style jsx>{`
        .dashboard-shell {
          display: grid;
          grid-template-columns: 280px 1fr;
          min-height: 100vh;
          background: #0f0f0f;
          color: #f5f7f2;
        }

        .dashboard-sidebar {
          background: #111;
          border-right: 1px solid rgba(255,255,255,0.05);
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-mark {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #d4ed31 0%, #c1d92a 100%);
          display: grid;
          place-items: center;
          font-size: 22px;
          box-shadow: 0 10px 30px rgba(212, 237, 49, 0.2);
        }

        .brand-name {
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .brand-tag {
          color: rgba(255,255,255,0.65);
          font-size: 13px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-link {
          padding: 12px 14px;
          border-radius: 12px;
          color: rgba(255,255,255,0.78);
          font-weight: 600;
          transition: all 0.2s ease;
          background: transparent;
          border: 1px solid transparent;
        }

        .nav-link:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.08);
        }

        .nav-link.active {
          background: linear-gradient(135deg, rgba(212,237,49,0.16), rgba(212,237,49,0.28));
          border-color: rgba(212,237,49,0.4);
          color: #d4ed31;
        }

        .sidebar-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .user-chip {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 12px;
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(212,237,49,0.2);
          color: #d4ed31;
          display: grid;
          place-items: center;
          font-weight: 800;
          letter-spacing: 0.02em;
        }

        .user-name {
          font-weight: 700;
        }

        .user-email {
          color: rgba(255,255,255,0.65);
          font-size: 13px;
        }

        .logout-btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: rgba(255,255,255,0.06);
          color: #f9fafb;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: rgba(212,237,49,0.18);
          color: #111;
          border-color: rgba(212,237,49,0.35);
        }

        .dashboard-main {
          padding: 28px 32px 48px;
          background: radial-gradient(circle at 20% 20%, rgba(212,237,49,0.08), transparent 35%),
                      radial-gradient(circle at 80% 10%, rgba(255,255,255,0.06), transparent 30%),
                      #0f0f0f;
        }

        .dashboard-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
        }

        .dashboard-topbar h1 {
          margin: 0;
          font-size: 26px;
          letter-spacing: -0.01em;
        }

        .dashboard-topbar p {
          margin: 6px 0 0;
          color: rgba(255,255,255,0.72);
        }

        .topbar-right {
          display: flex;
          gap: 10px;
        }

        .top-pill {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          font-weight: 700;
          font-size: 14px;
        }

        .top-pill.success {
          background: rgba(76, 175, 80, 0.16);
          border-color: rgba(76, 175, 80, 0.35);
          color: #d4ed31;
        }

        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        @media (max-width: 1080px) {
          .dashboard-shell {
            grid-template-columns: 1fr;
          }
          .dashboard-sidebar {
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
          }
          .sidebar-nav {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .sidebar-footer {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
