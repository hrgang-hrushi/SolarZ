import { useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import RecentInvestments from '../../components/admin/RecentInvestments'
import QuickActions from '../../components/admin/QuickActions'
import MetricCard from '../../components/admin/MetricCard'

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
      <section className="kpis-grid">
        {kpis.map((kpi) => (
          <MetricCard key={kpi.label} label={kpi.label} value={kpi.value} delta={kpi.delta} />
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

      <section className="split">
        <div>
          <RecentInvestments rows={[
            { investor: 'Asha R.', project: 'Project Aurora', amount: '₹12,000', date: '2026-03-22', status: 'settled' },
            { investor: 'Ravi K.', project: 'Coastal Wind', amount: '₹50,000', date: '2026-03-21', status: 'pending' },
            { investor: 'GreenFund', project: 'Solar Farm Beta', amount: '₹1,20,000', date: '2026-03-20', status: 'settled' },
            { investor: 'Meera P.', project: 'Hydro Micro', amount: '₹7,500', date: '2026-03-19', status: 'failed' },
          ]} />
        </div>

        <div>
          <QuickActions actions={[
            { label: 'Approve pending KYC (38)', onClick: () => alert('Approve KYC clicked') },
            { label: 'Trigger payout run', onClick: () => alert('Trigger payouts clicked') },
            { label: 'Create new project', onClick: () => alert('Create project clicked') },
          ]} />
        </div>
      </section>

  <style jsx>{`
    .admin-page { display: flex; flex-direction: column; gap: 22px; }
    .admin-loader { color: var(--color-dark); padding: 40px; }
    .kpis-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .kpis-grid > :global(.metric-card) { min-height: 88px; }
    .split { display: grid; grid-template-columns: 1.6fr 1fr; gap: 16px; }
  /* rely on global .card for card visuals; only tweak small card-head spacing */
  .card { /* intentionally blank to use global .card */ }
    .card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .eyebrow { color: var(--admin-muted); font-size: 13px; margin: 0 0 4px; }
    h3 { margin: 0; }
    .ghost { padding: 8px 10px; border-radius: 10px; background: transparent; border: 1px solid var(--admin-border); color: var(--admin-text); font-weight: 700; }
    .stack { display: flex; flex-direction: column; gap: 10px; }
  .alert { display: flex; justify-content: space-between; gap: 12px; padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.02); background: rgba(255,255,255,0.01); }
    .alert.red { border-color: rgba(255,77,77,0.08); background: rgba(255,77,77,0.02); }
    .alert.amber { border-color: rgba(255,193,7,0.08); background: rgba(255,193,7,0.02); }
    .alert-title { font-weight: 700; }
    .alert-desc { color: var(--admin-muted); font-size: 14px; }
    .link-btn { background: transparent; border: none; color: var(--admin-accent); font-weight: 700; }
    .tasks { margin: 0; padding-left: 18px; color: var(--admin-text); display: grid; gap: 8px; }
    @media (max-width: 960px) { .split { grid-template-columns: 1fr; } .kpis-grid { grid-template-columns: repeat(2, 1fr); } }
  `}</style>
    </div>
  )
}

AdminHome.getLayout = function getLayout(page) {
  return <AdminLayout title="Admin overview" subtitle="Operational, compliance, and funding at a glance">{page}</AdminLayout>
}
