import { useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import { useAuth } from '../../context/AuthContext'

const mockTickets = [
  { id: '#2411', title: 'Payout not received', user: 'Aarav Mehta', status: 'Open', updated: '2h ago' },
  { id: '#2410', title: 'KYC stuck at verification', user: 'Rahul Nair', status: 'Pending', updated: '5h ago' },
  { id: '#2409', title: 'Need invoice for FY25', user: 'Sanya Iyer', status: 'Closed', updated: '1d ago' },
]

export default function AdminSupport() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const redirect = encodeURIComponent(router.asPath)
      router.replace(`/login?redirect=${redirect}`)
    }
  }, [loading, isAuthenticated, router])

  if (loading || !isAuthenticated) return <div className="admin-loader">Loading support…</div>

  return (
    <div className="admin-page">
      <header className="actions">
        <div>
          <h2>Support</h2>
          <p>Tickets, status, and assignments.</p>
        </div>
        <div className="action-buttons">
          <button className="ghost">Export</button>
          <button className="primary">New ticket</button>
        </div>
      </header>

      <div className="table">
        <div className="head">
          <span>ID</span>
          <span>Title</span>
          <span>User</span>
          <span>Status</span>
          <span>Updated</span>
          <span>Actions</span>
        </div>
        {mockTickets.map((t) => (
          <div key={t.id} className="row">
            <span>{t.id}</span>
            <span>{t.title}</span>
            <span>{t.user}</span>
            <span><span className={`pill status-${t.status.toLowerCase()}`}>{t.status}</span></span>
            <span>{t.updated}</span>
            <span className="row-actions">
              <button className="link">View</button>
              <button className="link">Assign</button>
            </span>
          </div>
        ))}
      </div>

      <section className="card">
        <header className="card-head">
          <div>
            <p className="eyebrow">Comms</p>
            <h3>Broadcast to investors</h3>
          </div>
          <button className="ghost">Send update</button>
        </header>
        <p className="muted">Use this to send platform-wide announcements (maintenance, payout windows, policy changes). Stubbed for now; ready to wire to email/SMS provider.</p>
      </section>

      <style jsx>{`
        .admin-page { display: flex; flex-direction: column; gap: 16px; }
        .actions { display: flex; justify-content: space-between; align-items: center; }
        .action-buttons { display: flex; gap: 10px; }
        .ghost { padding: 10px 12px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #f5f7f2; font-weight: 700; }
        .primary { padding: 10px 14px; border-radius: 10px; background: linear-gradient(135deg, #d4ed31, #c1d92a); color: #111; font-weight: 800; border: none; }
        .table { display: flex; flex-direction: column; gap: 8px; }
        .head, .row { display: grid; grid-template-columns: 0.8fr 1.6fr 1.2fr 1fr 1fr 1.1fr; gap: 8px; padding: 12px; border-radius: 12px; }
        .head { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); font-size: 13px; }
        .row { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); }
        .row-actions { display: flex; gap: 8px; }
        .link { background: transparent; border: none; color: #d4ed31; font-weight: 700; }
        .pill { padding: 6px 10px; border-radius: 999px; font-weight: 700; font-size: 12px; }
        .status-open { background: rgba(255,193,7,0.18); color: #f5d742; }
        .status-pending { background: rgba(255,193,7,0.18); color: #f5d742; }
        .status-closed { background: rgba(76,175,80,0.2); color: #d4ed31; }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 14px; }
        .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .eyebrow { color: rgba(255,255,255,0.65); margin: 0 0 4px; font-size: 13px; }
        .muted { color: rgba(255,255,255,0.72); margin: 0; }
        @media (max-width: 900px) { .head, .row { grid-template-columns: 0.9fr 1.5fr 1.2fr 1fr 1fr 1fr; } }
        @media (max-width: 760px) { .head { display: none; } .row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

AdminSupport.getLayout = function getLayout(page) {
  return <AdminLayout title="Support" subtitle="Tickets and broadcasts">{page}</AdminLayout>
}
