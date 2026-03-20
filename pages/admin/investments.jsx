import { useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import { useAuth } from '../../context/AuthContext'

const mockInvestments = [
  { investor: 'Sanya Iyer', project: 'Aurora Rooftop II', shares: 1200, amount: '₹1.2L', status: 'Settled', date: 'Mar 12, 2026' },
  { investor: 'Aarav Mehta', project: 'Coastal Wind Hybrid', shares: 600, amount: '₹72K', status: 'Pending', date: 'Mar 18, 2026' },
  { investor: 'Rahul Nair', project: 'AgriSolar Microgrid', shares: 300, amount: '₹27K', status: 'Refunded', date: 'Mar 10, 2026' },
]

export default function AdminInvestments() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const redirect = encodeURIComponent(router.asPath)
      router.replace(`/login?redirect=${redirect}`)
    }
  }, [loading, isAuthenticated, router])

  if (loading || !isAuthenticated) return <div className="admin-loader">Loading investments…</div>

  return (
    <div className="admin-page">
      <header className="actions">
        <div>
          <h2>Investments</h2>
          <p>Allocations, settlements, refunds, and exports.</p>
        </div>
        <div className="action-buttons">
          <button className="ghost">Export CSV</button>
          <button className="primary">Trigger settlement</button>
        </div>
      </header>

      <div className="filters">
        <label>Status
          <select>
            <option>All</option>
            <option>Pending</option>
            <option>Settled</option>
            <option>Refunded</option>
          </select>
        </label>
        <label>Project
          <input placeholder="Search project" />
        </label>
        <label>Investor
          <input placeholder="Name or email" />
        </label>
      </div>

      <div className="table">
        <div className="head">
          <span>Investor</span>
          <span>Project</span>
          <span>Shares</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Date</span>
          <span>Actions</span>
        </div>
        {mockInvestments.map((inv, idx) => (
          <div key={idx} className="row">
            <span>{inv.investor}</span>
            <span>{inv.project}</span>
            <span>{inv.shares}</span>
            <span>{inv.amount}</span>
            <span><span className={`pill status-${inv.status.toLowerCase()}`}>{inv.status}</span></span>
            <span>{inv.date}</span>
            <span className="row-actions">
              <button className="link">View</button>
              <button className="link">Refund</button>
            </span>
          </div>
        ))}
      </div>

      <section className="card">
        <header className="card-head">
          <div>
            <p className="eyebrow">Ledger</p>
            <h3>Audit trail & escrow</h3>
          </div>
          <button className="ghost">View escrow feed</button>
        </header>
        <p className="muted">Connect payouts/escrow providers and map each settlement to ledger entries. This stub is ready to wire once the DB & payments are live.</p>
      </section>

      <style jsx>{`
        .admin-page { display: flex; flex-direction: column; gap: 16px; }
        .actions { display: flex; justify-content: space-between; align-items: center; }
        .action-buttons { display: flex; gap: 10px; }
        .ghost { padding: 10px 12px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #f5f7f2; font-weight: 700; }
        .primary { padding: 10px 14px; border-radius: 10px; background: linear-gradient(135deg, #d4ed31, #c1d92a); color: #111; font-weight: 800; border: none; }
        .filters { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 12px; border-radius: 12px; }
        label { display: grid; gap: 6px; font-size: 14px; color: rgba(255,255,255,0.82); }
        select, input { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 9px; color: #f5f7f2; }
        .table { display: flex; flex-direction: column; gap: 8px; }
        .head, .row { display: grid; grid-template-columns: 1.4fr 1.4fr 0.8fr 1fr 1fr 1fr 1.1fr; gap: 8px; padding: 12px; border-radius: 12px; }
        .head { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); font-size: 13px; }
        .row { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); }
        .row-actions { display: flex; gap: 8px; }
        .link { background: transparent; border: none; color: #d4ed31; font-weight: 700; }
        .pill { padding: 6px 10px; border-radius: 999px; font-weight: 700; font-size: 12px; }
        .status-settled { background: rgba(76,175,80,0.2); color: #d4ed31; }
        .status-pending { background: rgba(255,193,7,0.18); color: #f5d742; }
        .status-refunded { background: rgba(255,77,77,0.18); color: #ffb3b3; }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 14px; }
        .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .eyebrow { color: rgba(255,255,255,0.65); margin: 0 0 4px; font-size: 13px; }
        .muted { color: rgba(255,255,255,0.72); margin: 0; }
        @media (max-width: 1040px) { .head, .row { grid-template-columns: 1.2fr 1.2fr 0.9fr 1fr 1fr 1fr 1fr; } }
        @media (max-width: 860px) { .head { display: none; } .row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

AdminInvestments.getLayout = function getLayout(page) {
  return <AdminLayout title="Investments" subtitle="Allocations, settlements, refunds">{page}</AdminLayout>
}
