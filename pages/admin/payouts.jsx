import { useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import { useAuth } from '../../context/AuthContext'

const mockPayouts = [
  { project: 'Aurora Rooftop II', date: 'Mar 28, 2026', amount: '₹12.6L', status: 'Scheduled', beneficiaries: 842 },
  { project: 'Coastal Wind Hybrid', date: 'Mar 22, 2026', amount: '₹9.1L', status: 'Processing', beneficiaries: 610 },
  { project: 'AgriSolar Microgrid', date: 'Mar 15, 2026', amount: '₹4.4L', status: 'Completed', beneficiaries: 402 },
]

export default function AdminPayouts() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const redirect = encodeURIComponent(router.asPath)
      router.replace(`/login?redirect=${redirect}`)
    }
  }, [loading, isAuthenticated, router])

  if (loading || !isAuthenticated) return <div className="admin-loader">Loading payouts…</div>

  return (
    <div className="admin-page">
      <header className="actions">
        <div>
          <h2>Payouts</h2>
          <p>Schedule, approve, and audit investor payouts.</p>
        </div>
        <div className="action-buttons">
          <button className="ghost">Export schedule</button>
          <button className="primary">New payout run</button>
        </div>
      </header>

      <div className="table">
        <div className="head">
          <span>Project</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Beneficiaries</span>
          <span>Actions</span>
        </div>
        {mockPayouts.map((p, idx) => (
          <div key={idx} className="row">
            <span>{p.project}</span>
            <span>{p.date}</span>
            <span>{p.amount}</span>
            <span><span className={`pill status-${p.status.toLowerCase()}`}>{p.status}</span></span>
            <span>{p.beneficiaries}</span>
            <span className="row-actions">
              <button className="link">View</button>
              <button className="link">Mark paid</button>
            </span>
          </div>
        ))}
      </div>

      <section className="card">
        <header className="card-head">
          <div>
            <p className="eyebrow">Tax & TDS</p>
            <h3>Withholding summary</h3>
          </div>
          <button className="ghost">Export TDS</button>
        </header>
        <p className="muted">Keep TDS rules centralized. Map per-beneficiary withholdings and attach Form 16A when available. Stubbed until payments API is connected.</p>
      </section>

      <style jsx>{`
        .admin-page { display: flex; flex-direction: column; gap: 16px; }
        .actions { display: flex; justify-content: space-between; align-items: center; }
        .action-buttons { display: flex; gap: 10px; }
        .ghost { padding: 10px 12px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #f5f7f2; font-weight: 700; }
        .primary { padding: 10px 14px; border-radius: 10px; background: linear-gradient(135deg, #d4ed31, #c1d92a); color: #111; font-weight: 800; border: none; }
        .table { display: flex; flex-direction: column; gap: 8px; }
        .head, .row { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr 1fr 1.1fr; gap: 8px; padding: 12px; border-radius: 12px; }
        .head { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); font-size: 13px; }
        .row { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); }
        .row-actions { display: flex; gap: 8px; }
        .link { background: transparent; border: none; color: #d4ed31; font-weight: 700; }
        .pill { padding: 6px 10px; border-radius: 999px; font-weight: 700; font-size: 12px; }
        .status-scheduled { background: rgba(255,193,7,0.18); color: #f5d742; }
        .status-processing { background: rgba(76,175,80,0.18); color: #d4ed31; }
        .status-completed { background: rgba(76,175,80,0.2); color: #d4ed31; }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 14px; }
        .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .eyebrow { color: rgba(255,255,255,0.65); margin: 0 0 4px; font-size: 13px; }
        .muted { color: rgba(255,255,255,0.72); margin: 0; }
        @media (max-width: 920px) { .head, .row { grid-template-columns: 1.4fr 1fr 1fr 1fr 1fr 1fr; } }
        @media (max-width: 760px) { .head { display: none; } .row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

AdminPayouts.getLayout = function getLayout(page) {
  return <AdminLayout title="Payouts" subtitle="Schedules, approvals, and TDS">{page}</AdminLayout>
}
