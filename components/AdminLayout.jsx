import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AdminLayout({ children, title = 'Admin', subtitle = 'Control center' }) {
  const router = useRouter()
  const { user, logout } = useAuth()

  const navItems = useMemo(() => ([
    { label: 'Overview', href: '/admin' },
    { label: 'Projects', href: '/admin/projects' },
    { label: 'Investors', href: '/admin/investors' },
    { label: 'Investments', href: '/admin/investments' },
    { label: 'Payouts', href: '/admin/payouts' },
    { label: 'Support', href: '/admin/support' },
    { label: 'Settings', href: '/admin/settings' },
  ]), [])

  const isActive = (href) => {
    if (href === '/admin' && router.pathname === '/admin') return true
    return router.pathname.startsWith(href) && href !== '/admin'
  }

  const initials = user?.name?.split(' ').map((n) => n[0]).slice(0, 2).join('') || 'AD'

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">☀️</div>
          <div>
            <div className="brand-name">Solarify Admin</div>
            <div className="brand-tag">Controls & Ops</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link${isActive(item.href) ? ' active' : ''}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="avatar">{initials}</div>
            <div>
              <div className="user-name">{user?.name || 'Admin'}</div>
              <div className="user-email">{user?.email || 'Signed in'}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={logout}>Log out</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="topbar">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="topbar-right">
            <span className="pill">Compliance mode</span>
            <span className="pill success">Audit trail on</span>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </main>

      <style jsx>{`
        .admin-shell { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; background: #0f0f0f; color: #f5f7f2; }
        .sidebar { background: #101010; border-right: 1px solid rgba(255,255,255,0.06); padding: 24px 18px; display: flex; flex-direction: column; gap: 22px; }
        .sidebar-brand { display: flex; gap: 12px; align-items: center; }
        .brand-mark { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #d4ed31, #c1d92a); display: grid; place-items: center; font-size: 22px; box-shadow: 0 10px 30px rgba(212, 237, 49, 0.2); }
        .brand-name { font-weight: 800; letter-spacing: -0.01em; }
        .brand-tag { color: rgba(255,255,255,0.65); font-size: 13px; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 8px; }
        .nav-link { padding: 12px 14px; border-radius: 12px; color: rgba(255,255,255,0.78); font-weight: 650; border: 1px solid transparent; transition: all 0.2s ease; }
        .nav-link:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }
        .nav-link.active { background: linear-gradient(135deg, rgba(212,237,49,0.16), rgba(212,237,49,0.28)); border-color: rgba(212,237,49,0.4); color: #d4ed31; }
        .sidebar-footer { margin-top: auto; display: flex; flex-direction: column; gap: 12px; }
        .user-chip { display: flex; gap: 10px; align-items: center; padding: 12px; border-radius: 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
        .avatar { width: 42px; height: 42px; border-radius: 12px; background: rgba(212,237,49,0.2); color: #d4ed31; display: grid; place-items: center; font-weight: 800; letter-spacing: 0.02em; }
        .user-name { font-weight: 700; }
        .user-email { color: rgba(255,255,255,0.65); font-size: 13px; }
        .logout-btn { width: 100%; padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.06); color: #f9fafb; font-weight: 700; border: 1px solid rgba(255,255,255,0.08); }
        .logout-btn:hover { background: rgba(212,237,49,0.2); color: #111; border-color: rgba(212,237,49,0.4); }
        .admin-main { padding: 26px 30px 48px; background: radial-gradient(circle at 20% 20%, rgba(212,237,49,0.08), transparent 35%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.06), transparent 30%), #0f0f0f; }
        .topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 22px; }
        .topbar h1 { margin: 0; font-size: 26px; letter-spacing: -0.01em; }
        .topbar p { margin: 6px 0 0; color: rgba(255,255,255,0.72); }
        .topbar-right { display: flex; gap: 10px; }
        .pill { padding: 9px 12px; border-radius: 999px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); font-weight: 700; font-size: 13px; }
        .pill.success { background: rgba(76, 175, 80, 0.18); border-color: rgba(76, 175, 80, 0.35); color: #d4ed31; }
        .admin-content { display: flex; flex-direction: column; gap: 18px; }
        @media (max-width: 1080px) { .admin-shell { grid-template-columns: 1fr; } .sidebar { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 10px; } .sidebar-nav { flex-direction: row; flex-wrap: wrap; } .sidebar-footer { width: 100%; } }
      `}</style>
    </div>
  )
}
