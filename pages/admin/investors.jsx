import { useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import { useAuth } from '../../context/AuthContext'

const mockInvestors = [
  { name: 'Aarav Mehta', email: 'aarav@example.com', kyc: 'Pending', invested: '₹2.8L', shares: 2800, status: 'Active' },
  { name: 'Sanya Iyer', email: 'sanya@example.com', kyc: 'Verified', invested: '₹5.1L', shares: 5100, status: 'Active' },
  { name: 'Rahul Nair', email: 'rahul@example.com', kyc: 'Pending', invested: '₹80K', shares: 800, status: 'Review' },
]

export default function AdminInvestors() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const redirect = encodeURIComponent(router.asPath)
      router.replace(`/login?redirect=${redirect}`)
    }
  }, [loading, isAuthenticated, router])

  if (loading || !isAuthenticated) return <div className="admin-loader">Loading investors…</div>

  return (
    <div className="admin-page">
      <header className="actions">
        <div>
          <h2>Investors</h2>
          <p>KYC, roles, and allocations.</p>
        </div>
        <div className="action-buttons">
          <button className="ghost">Export CSV</button>
          <button className="primary">Invite admin</button>
        </div>
      </header>

      <div className="filters">
        <label>KYC status
          <select>
            <option>All</option>
            <option>Pending</option>
            <option>Verified</option>
          </select>
        </label>
        <label>Search
          <input placeholder="Name or email" />
        </label>
      </div>

      <div className="table">
        <div className="head">
          <span>Name</span>
          <span>Email</span>
          <span>KYC</span>
          <span>Invested</span>
          <span>Shares</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {mockInvestors.map((inv) => (
          <div key={inv.email} className="row">
            <span><strong>{inv.name}</strong></span>
            <span>{inv.email}</span>
            <span><span className={`pill ${inv.kyc.toLowerCase()}`}>{inv.kyc}</span></span>
            <span>{inv.invested}</span>
            <span>{inv.shares}</span>
            <span><span className={`pill status-${inv.status.toLowerCase()}`}>{inv.status}</span></span>
            <span className="row-actions">
              <button className="link">View</button>
              <button className="link">Verify</button>
            </span>
          </div>
        ))}
      </div>

      <section className="card">
        <header className="card-head">
          <div>
            <p className="eyebrow">Compliance</p>
            <h3>KYC & risk rules</h3>
          </div>
          <button className="ghost">Edit rules</button>
        </header>
        <ul className="checklist">
          <li><input type="checkbox" /> PAN verified</li>
          <li><input type="checkbox" /> Aadhaar verified</li>
          <li><input type="checkbox" /> Bank linked</li>
          <li><input type="checkbox" /> Risk disclosure accepted</li>
        </ul>
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
        .head, .row { display: grid; grid-template-columns: 1.4fr 1.6fr 1fr 1fr 0.9fr 1fr 1.1fr; gap: 8px; padding: 12px; border-radius: 12px; }
        .head { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); font-size: 13px; }
        .row { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); }
        .row-actions { display: flex; gap: 8px; }
        .link { background: transparent; border: none; color: #d4ed31; font-weight: 700; }
        .pill { padding: 6px 10px; border-radius: 999px; font-weight: 700; font-size: 12px; }
        .pending { background: rgba(255,193,7,0.16); color: #f5d742; }
        .verified { background: rgba(76,175,80,0.2); color: #d4ed31; }
        .status-active { background: rgba(76,175,80,0.18); color: #d4ed31; }
        .status-review { background: rgba(255,193,7,0.18); color: #f5d742; }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 14px; }
        .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .eyebrow { color: rgba(255,255,255,0.65); margin: 0 0 4px; font-size: 13px; }
        .checklist { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; color: rgba(255,255,255,0.85); }
        .checklist li { display: flex; align-items: center; gap: 8px; }
        @media (max-width: 1040px) { .head, .row { grid-template-columns: 1.2fr 1.3fr 1fr 1fr 0.8fr 1fr 1fr; } }
        @media (max-width: 820px) { .head { display: none; } .row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

AdminInvestors.getLayout = function getLayout(page) {
  return <AdminLayout title="Investors" subtitle="KYC, allocations, and roles">{page}</AdminLayout>
}
