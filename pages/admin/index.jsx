import { useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import { useAuth } from '../../context/AuthContext'

const kpis = [
  { label: 'Total funded', value: '₹8.4 Cr', delta: '+6.2% MoM' },
  { label: 'Active investors', value: '12,140', delta: '+420 new' },
  { label: 'Active projects', value: '24', delta: '5 in install phase' },
  { label: 'Projected payouts (30d)', value: '₹41.6L', delta: 'On schedule' },
]

const alerts = [
  { title: 'Compliance', desc: 'KYC pending for 38 investors. Hold payouts until cleared.', severity: 'amber' },
  { title: 'Payments', desc: 'Escrow settlement delayed for Project Aurora • ₹3.2L', severity: 'red' },
  { title: 'Ops', desc: 'Inverter downtime reported • Coastal Wind Hybrid', severity: 'amber' },
]

export default function AdminHome() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const redirect = encodeURIComponent(router.asPath)
      router.replace(`/login?redirect=${redirect}`)
    }
  }, [loading, isAuthenticated, router])

  if (loading || !isAuthenticated) {
    return <div className="admin-loader">Loading admin...</div>
  }

  return (
    <div className="admin-page">
      <section className="grid">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="card kpi">
            <p className="kpi-label">{kpi.label}</p>
            <div className="kpi-value">{kpi.value}</div>
            <p className="kpi-delta">{kpi.delta}</p>
          </div>
        ))}
      </section>

      <section className="split">
        <div className="card">
          <header className="card-head">
            <div>
              <p className="eyebrow">Alerts</p>
              <h3>Operational & compliance</h3>
            </div>
            <button className="ghost">View all</button>
          </header>
          <div className="stack">
            {alerts.map((a) => (
              <div key={a.title} className={`alert ${a.severity}`}>
                <div>
                  <div className="alert-title">{a.title}</div>
                  <div className="alert-desc">{a.desc}</div>
                </div>
                <button className="link-btn">Open</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <header className="card-head">
            <div>
              <p className="eyebrow">Next actions</p>
              <h3>Operations queue</h3>
            </div>
          </header>
          <ul className="tasks">
            <li>Approve 3 new projects for funding</li>
            <li>Trigger payout run for March cycle</li>
            <li>Review maintenance logs (2 open)</li>
            <li>Send ESG impact email to investors</li>
          </ul>
        </div>
      </section>

      <style jsx>{`
        .admin-page { display: flex; flex-direction: column; gap: 18px; }
        .admin-loader { color: #f5f7f2; padding: 40px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; }
        .split { display: grid; grid-template-columns: 1.3fr 1fr; gap: 12px; }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .kpi { padding: 18px; }
        .kpi-label { color: rgba(255,255,255,0.7); margin: 0 0 6px; }
        .kpi-value { font-size: 26px; font-weight: 800; margin-bottom: 6px; }
        .kpi-delta { color: #d4ed31; font-weight: 700; margin: 0; }
        .card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .eyebrow { color: rgba(255,255,255,0.65); font-size: 13px; margin: 0 0 4px; }
        h3 { margin: 0; }
        .ghost { padding: 10px 12px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #f5f7f2; font-weight: 700; }
        .stack { display: flex; flex-direction: column; gap: 10px; }
        .alert { display: flex; justify-content: space-between; gap: 12px; padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); }
        .alert.red { border-color: rgba(255,77,77,0.4); background: rgba(255,77,77,0.08); }
        .alert.amber { border-color: rgba(255,193,7,0.35); background: rgba(255,193,7,0.08); }
        .alert-title { font-weight: 700; }
        .alert-desc { color: rgba(255,255,255,0.75); font-size: 14px; }
        .link-btn { background: transparent; border: none; color: #d4ed31; font-weight: 700; }
        .tasks { margin: 0; padding-left: 18px; color: rgba(255,255,255,0.85); display: grid; gap: 8px; }
        @media (max-width: 960px) { .split { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

AdminHome.getLayout = function getLayout(page) {
  return <AdminLayout title="Admin overview" subtitle="Operational, compliance, and funding at a glance">{page}</AdminLayout>
}
