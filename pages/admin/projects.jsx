import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import { useAuth } from '../../context/AuthContext'

const mockProjects = [
  { name: 'Aurora Rooftop Phase II', slug: 'aurora-rooftop-ii', location: 'Pune, MH', irr: '14.8%', sharePrice: '₹100', goal: '₹2.4 Cr', raised: '₹1.9 Cr', status: 'Funding' },
  { name: 'Coastal Wind Hybrid', slug: 'coastal-wind-hybrid', location: 'Tirunelveli, TN', irr: '16.2%', sharePrice: '₹120', goal: '₹3.1 Cr', raised: '₹2.7 Cr', status: 'Installing' },
  { name: 'AgriSolar Microgrid', slug: 'agrisolar-microgrid', location: 'Nagpur, MH', irr: '13.4%', sharePrice: '₹90', goal: '₹1.6 Cr', raised: '₹1.6 Cr', status: 'Live' },
]

export default function AdminProjects() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const redirect = encodeURIComponent(router.asPath)
      router.replace(`/login?redirect=${redirect}`)
    }
  }, [loading, isAuthenticated, router])

  if (loading || !isAuthenticated) return <div className="admin-loader">Loading projects…</div>

  const statuses = useMemo(() => ['Draft', 'Funding', 'Installing', 'Live', 'Maintenance'], [])

  return (
    <div className="admin-page">
      <header className="actions">
        <div>
          <h2>Projects</h2>
          <p>Create, publish, and monitor funding/installation.</p>
        </div>
        <div className="action-buttons">
          <button className="ghost">Import CSV</button>
          <button className="primary">New project</button>
        </div>
      </header>

      <div className="filters">
        <label>Status
          <select>
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label>Location
          <input placeholder="State / city" />
        </label>
        <label>IRR min
          <input placeholder="12%" />
        </label>
      </div>

      <div className="table">
        <div className="head">
          <span>Project</span>
          <span>Location</span>
          <span>IRR</span>
          <span>Share</span>
          <span>Goal</span>
          <span>Raised</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {mockProjects.map((p) => (
          <div key={p.slug} className="row">
            <span>
              <strong>{p.name}</strong>
              <small>{p.slug}</small>
            </span>
            <span>{p.location}</span>
            <span>{p.irr}</span>
            <span>{p.sharePrice}</span>
            <span>{p.goal}</span>
            <span>{p.raised}</span>
            <span><span className={`pill ${p.status.toLowerCase()}`}>{p.status}</span></span>
            <span className="row-actions">
              <button className="link">Edit</button>
              <button className="link">Publish</button>
            </span>
          </div>
        ))}
      </div>

      <section className="card">
        <header className="card-head">
          <div>
            <p className="eyebrow">Compliance</p>
            <h3>Risk & disclosures checklist</h3>
          </div>
          <button className="ghost">Manage templates</button>
        </header>
        <ul className="checklist">
          <li><input type="checkbox" /> KYC required before investment</li>
          <li><input type="checkbox" /> Escrow enabled for collections</li>
          <li><input type="checkbox" /> Risk disclosure shown on invest flow</li>
          <li><input type="checkbox" /> ESG impact statement attached</li>
        </ul>
      </section>

      <style jsx>{`
        .admin-page { display: flex; flex-direction: column; gap: 16px; }
        .admin-loader { color: #f5f7f2; padding: 24px; }
        .actions { display: flex; justify-content: space-between; align-items: center; }
        .action-buttons { display: flex; gap: 10px; }
        .ghost { padding: 10px 12px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #f5f7f2; font-weight: 700; }
        .primary { padding: 10px 14px; border-radius: 10px; background: linear-gradient(135deg, #d4ed31, #c1d92a); color: #111; font-weight: 800; border: none; }
        .filters { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 12px; border-radius: 12px; }
        label { display: grid; gap: 6px; font-size: 14px; color: rgba(255,255,255,0.82); }
        select, input { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 9px; color: #f5f7f2; }
        .table { display: flex; flex-direction: column; gap: 8px; }
        .head, .row { display: grid; grid-template-columns: 2fr 1.2fr 0.8fr 0.8fr 1fr 1fr 1fr 1.2fr; gap: 8px; padding: 12px; border-radius: 12px; }
        .head { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); font-size: 13px; }
        .row { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); }
        .row small { display: block; color: rgba(255,255,255,0.55); }
        .row-actions { display: flex; gap: 8px; }
        .link { background: transparent; border: none; color: #d4ed31; font-weight: 700; }
        .pill { padding: 6px 10px; border-radius: 999px; font-weight: 700; font-size: 12px; }
        .pill.funding { background: rgba(212,237,49,0.16); color: #d4ed31; }
        .pill.installing { background: rgba(255,193,7,0.16); color: #f5d742; }
        .pill.live { background: rgba(76,175,80,0.2); color: #d4ed31; }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 14px; }
        .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .eyebrow { color: rgba(255,255,255,0.65); margin: 0 0 4px; font-size: 13px; }
        .checklist { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; color: rgba(255,255,255,0.85); }
        .checklist li { display: flex; align-items: center; gap: 8px; }
        @media (max-width: 1040px) { .head, .row { grid-template-columns: 1.6fr 1fr 0.8fr 0.8fr 1fr 1fr 1fr 1fr; } }
        @media (max-width: 840px) { .head { display: none; } .row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

AdminProjects.getLayout = function getLayout(page) {
  return <AdminLayout title="Projects" subtitle="Create, fund, install, and monitor">{page}</AdminLayout>
}
