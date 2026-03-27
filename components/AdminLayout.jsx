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
            <div className="brand-name">SolarZ Admin</div>
              <div className="brand-tag">Controls & Operations</div>
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
    /* Dark admin theme (uses admin CSS variables) */
    .admin-shell { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; background: var(--admin-bg); color: var(--admin-text); }
    .sidebar { background: var(--admin-card); border-right: 1px solid var(--admin-border); padding: 20px 18px; display: flex; flex-direction: column; gap: 18px; }
    .sidebar-brand { display: flex; gap: 12px; align-items: center; }
  .brand-mark { width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, var(--admin-accent), var(--admin-accent-2)); display: grid; place-items: center; font-size: 20px; box-shadow: 0 8px 24px rgba(212, 237, 49, 0.12); }
  .brand-name { font-weight: 800; letter-spacing: -0.01em; color: var(--admin-text); }
  .brand-tag { color: var(--admin-muted); font-size: 13px; }
    .sidebar-nav { display: flex; flex-direction: column; gap: 8px; }
  .nav-link { padding: 10px 12px; border-radius: 10px; color: rgba(255,255,255,0.88); font-weight: 700; border: 1px solid transparent; transition: all 0.18s ease; display: inline-block; }
  .nav-link:hover { background: rgba(255,255,255,0.02); border-color: var(--admin-border); }
  .nav-link.active { background: linear-gradient(135deg, rgba(212,237,49,0.12), rgba(212,237,49,0.18)); border-color: rgba(212,237,49,0.18); color: var(--admin-accent); }
    .sidebar-footer { margin-top: auto; display: flex; flex-direction: column; gap: 12px; }
  .user-chip { display: flex; gap: 10px; align-items: center; padding: 12px; border-radius: 14px; background: rgba(255,255,255,0.02); border: 1px solid var(--admin-border); }
  .avatar { width: 42px; height: 42px; border-radius: 12px; background: rgba(212,237,49,0.18); color: var(--color-dark); display: grid; place-items: center; font-weight: 800; letter-spacing: 0.02em; }
  .user-name { font-weight: 700; color: var(--admin-text); }
  .user-email { color: var(--admin-muted); font-size: 13px; }
  .logout-btn { width: 100%; padding: 10px; border-radius: 10px; background: transparent; color: var(--admin-text); font-weight: 700; border: 1px solid var(--admin-border); }
  .logout-btn:hover { background: var(--admin-accent); color: var(--color-dark); border-color: var(--admin-accent-2); }
  .admin-main { padding: 24px 28px 48px; background: transparent; }
    .topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 22px; }
  .topbar h1 { margin: 0; font-size: 26px; letter-spacing: -0.01em; color: var(--admin-text); }
  .topbar p { margin: 6px 0 0; color: var(--admin-muted); }
    .topbar-right { display: flex; gap: 10px; }
  .pill { padding: 8px 12px; border-radius: 999px; background: rgba(255,255,255,0.02); border: 1px solid var(--admin-border); font-weight: 700; font-size: 13px; color: var(--admin-text); }
  .pill.success { background: rgba(76, 175, 80, 0.12); border-color: rgba(76, 175, 80, 0.18); color: var(--admin-accent); }
    .admin-content { display: flex; flex-direction: column; gap: 20px; }
      /* Dark card override inside admin main so cards match dark theme */
    /* Admin cards: subtle, flat surfaces for a calm dashboard */
    .admin-main .card { background: rgba(255,255,255,0.02); border: 1px solid var(--admin-border); color: var(--admin-text); box-shadow: none; padding: 28px; border-radius: var(--radius-xl); }
    .admin-main .card .eyebrow, .admin-main .card h3, .admin-main .card p, .admin-main .card td, .admin-main .card th { color: var(--admin-text); }
    @media (max-width: 1080px) { .admin-shell { grid-template-columns: 1fr; } .sidebar { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 10px; } .sidebar-nav { flex-direction: row; flex-wrap: wrap; } .sidebar-footer { width: 100%; } }
  `}</style>
    </div>
  )
}
