import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import DashboardLayout from '../../components/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const redirect = encodeURIComponent(router.asPath)
      router.replace(`/login?redirect=${redirect}`)
    }
  }, [loading, isAuthenticated, router])

  const stats = useMemo(() => ([
    { label: 'Total invested', value: '₹12.4L', delta: '+8.1% vs last month' },
    { label: 'Monthly yield', value: '₹38,250', delta: '+₹2,180 this cycle' },
    { label: 'Active projects', value: '7', delta: '3 in Maharashtra, 2 in TN' },
    { label: 'Carbon offset', value: '14.3T CO₂e', delta: 'Equivalent to 650 trees' },
  ]), [])

  const assets = useMemo(() => ([
    { name: 'Aurora Rooftop Phase II', location: 'Pune, MH', irr: '14.8%', invested: '₹3.0L', status: 'Generating' },
    { name: 'Coastal Wind Hybrid', location: 'Tirunelveli, TN', irr: '16.2%', invested: '₹2.2L', status: 'Stabilising' },
    { name: 'AgriSolar Microgrid', location: 'Nagpur, MH', irr: '13.4%', invested: '₹1.8L', status: 'Generating' },
  ]), [])

  const activity = useMemo(() => ([
    { title: 'Payout processed', desc: '₹5,420 credited to bank • Aurora Rooftop Phase II', time: 'Today, 10:24 AM' },
    { title: 'New report ready', desc: 'Performance report for Coastal Wind Hybrid', time: 'Yesterday, 6:12 PM' },
    { title: 'Maintenance window', desc: 'AgriSolar Microgrid • 2h scheduled downtime', time: 'Mar 08, 3:00 PM' },
  ]), [])

  if (loading || !isAuthenticated) {
    return (
      <div className="dash-loader">
        <div className="spinner" />
        <p>Loading your dashboard...</p>
        <style jsx>{`
          .dash-loader {
            min-height: 80vh;
            display: grid;
            place-items: center;
            gap: 12px;
            background: #0f0f0f;
            color: #f5f7f2;
          }
          .spinner {
            width: 46px;
            height: 46px;
            border-radius: 50%;
            border: 4px solid rgba(255,255,255,0.12);
            border-top-color: #d4ed31;
            animation: spin 0.9s linear infinite;
          }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <section className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <div className="stat-value">{stat.value}</div>
            <p className="stat-delta">{stat.delta}</p>
          </div>
        ))}
      </section>

      <section className="panel-grid">
        <div className="panel wide">
          <header className="panel-header">
            <div>
              <p className="panel-kicker">Portfolio</p>
              <h3>Active assets</h3>
            </div>
            <button className="ghost-btn">View all</button>
          </header>

          <div className="asset-table">
            <div className="asset-head">
              <span>Project</span>
              <span>Location</span>
              <span>IRR</span>
              <span>Invested</span>
              <span>Status</span>
            </div>
            {assets.map((asset) => (
              <div key={asset.name} className="asset-row">
                <span>{asset.name}</span>
                <span>{asset.location}</span>
                <span className="pill pill-green">{asset.irr}</span>
                <span>{asset.invested}</span>
                <span className={`pill ${asset.status === 'Generating' ? 'pill-green' : 'pill-amber'}`}>{asset.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <header className="panel-header">
            <p className="panel-kicker">Cashflows</p>
            <h3>Next payout</h3>
          </header>
          <div className="payout-box">
            <div>
              <p className="muted">Scheduled date</p>
              <h4>18 Mar 2026</h4>
            </div>
            <div>
              <p className="muted">Expected amount</p>
              <h4>₹12,640</h4>
            </div>
            <div>
              <p className="muted">To account</p>
              <h4>{user?.bankName || 'HDFC •••• 9210'}</h4>
            </div>
            <button className="primary-btn">Download schedule</button>
          </div>
        </div>

        <div className="panel">
          <header className="panel-header">
            <p className="panel-kicker">Activity</p>
            <h3>Recent updates</h3>
          </header>
          <div className="activity-list">
            {activity.map((item) => (
              <div key={item.title} className="activity-item">
                <div className="dot" />
                <div>
                  <div className="activity-title">{item.title}</div>
                  <div className="activity-desc">{item.desc}</div>
                  <div className="activity-time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-grid">
        <div className="panel">
          <header className="panel-header">
            <p className="panel-kicker">Shortcuts</p>
            <h3>Quick actions</h3>
          </header>
          <div className="actions-grid">
            <button className="action-card">
              <span>Invest in new project</span>
              <small>Discover curated solar assets</small>
            </button>
            <button className="action-card">
              <span>Withdraw payout</span>
              <small>Transfer to your bank</small>
            </button>
            <button className="action-card">
              <span>Share performance</span>
              <small>Generate investor report</small>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .dashboard-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 15px 45px rgba(0,0,0,0.22);
        }

        .stat-label { color: rgba(255,255,255,0.65); font-size: 13px; }
        .stat-value { font-size: 28px; font-weight: 800; margin: 8px 0 4px; }
        .stat-delta { color: #d4ed31; font-weight: 600; font-size: 14px; }

        .panel-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
        }

        .panel {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.24);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .panel.wide { grid-column: span 2; }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .panel-kicker { color: rgba(255,255,255,0.65); font-size: 13px; margin: 0 0 4px; }
        .panel-header h3 { margin: 0; font-size: 20px; }

        .ghost-btn {
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.14);
          color: #f5f7f2;
          background: rgba(255,255,255,0.04);
          font-weight: 700;
        }

        .asset-table {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .asset-head, .asset-row {
          display: grid;
          grid-template-columns: 2fr 1.3fr 1fr 1fr 1fr;
          padding: 12px;
          border-radius: 12px;
        }

        .asset-head { color: rgba(255,255,255,0.55); font-size: 13px; }

        .asset-row { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); }

        .pill {
          padding: 6px 10px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 13px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }

        .pill-green { background: rgba(76,175,80,0.16); color: #d4ed31; }
        .pill-amber { background: rgba(255,193,7,0.16); color: #f5d742; }

        .payout-box {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
        }

        .muted { color: rgba(255,255,255,0.6); margin: 0 0 6px; }
        h4 { margin: 0 0 4px; font-size: 18px; }

        .primary-btn {
          grid-column: 1 / -1;
          padding: 12px;
          border-radius: 12px;
          background: linear-gradient(135deg, #d4ed31, #c1d92a);
          color: #111;
          font-weight: 800;
          border: none;
        }

        .activity-list { display: flex; flex-direction: column; gap: 12px; }
        .activity-item { display: grid; grid-template-columns: auto 1fr; gap: 12px; padding: 10px; border-radius: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); }
        .dot { width: 10px; height: 10px; background: #d4ed31; border-radius: 50%; margin-top: 6px; }
        .activity-title { font-weight: 700; }
        .activity-desc { color: rgba(255,255,255,0.7); font-size: 14px; margin-top: 2px; }
        .activity-time { color: rgba(255,255,255,0.55); font-size: 12px; margin-top: 6px; }

        .actions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
        .action-card { text-align: left; padding: 14px; border-radius: 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #f5f7f2; font-weight: 700; }
        .action-card small { display: block; margin-top: 6px; color: rgba(255,255,255,0.65); font-weight: 500; }

        @media (max-width: 900px) {
          .panel-grid { grid-template-columns: 1fr; }
          .panel.wide { grid-column: span 1; }
          .asset-head, .asset-row { grid-template-columns: 1.6fr 1fr 0.8fr 0.8fr 1fr; }
        }

        @media (max-width: 640px) {
          .asset-head { display: none; }
          .asset-row { grid-template-columns: 1fr; gap: 6px; }
          .panel-header { flex-direction: column; align-items: flex-start; gap: 6px; }
        }
      `}</style>
    </div>
  )
}

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
