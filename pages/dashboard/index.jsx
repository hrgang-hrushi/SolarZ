import { useEffect } from 'react'
import { useRouter } from 'next/router'
import DashboardLayout from '../../components/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

export default function DashboardPage() {
  const router = useRouter()
  const { loading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const redirect = encodeURIComponent(router.asPath)
      router.replace(`/login?redirect=${redirect}`)
    }
  }, [loading, isAuthenticated, router])

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
            background: #f5f5f5;
            color: #333;
          }
          .spinner {
            width: 46px;
            height: 46px;
            border-radius: 50%;
            border: 4px solid rgba(0,0,0,0.08);
            border-top-color: #d4ed31;
            animation: spin 0.9s linear infinite;
          }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    )
  }

  const summary = [
    { label: 'Total invested', value: '$512,430.00', change: '+12.5% vs last month' },
    { label: 'Active projects', value: '14', change: '3 pending due diligence' },
    { label: 'Projected yield', value: '9.4%', change: 'Weighted avg IRR' },
    { label: 'Lifetime returns', value: '$82,190', change: 'Realized across exits' },
  ]

  const projects = [
    { name: 'Kigali Solar Park', region: 'Rwanda', impact: '1.12M kg CO₂', progress: 82, invested: '$210,000' },
    { name: 'Lagos Rooftop Microgrid', region: 'Nigeria', impact: '640k kg CO₂', progress: 65, invested: '$140,000' },
    { name: 'Mombasa Industrial Solar', region: 'Kenya', impact: '420k kg CO₂', progress: 44, invested: '$96,000' },
    { name: 'Lusaka Community Solar', region: 'Zambia', impact: '310k kg CO₂', progress: 31, invested: '$66,430' },
  ]

  const upcoming = [
    { title: 'Kigali Park construction drawdown', date: 'Dec 18', type: 'Milestone', status: 'Ready' },
    { title: 'Audit packet sign-off', date: 'Dec 21', type: 'Compliance', status: 'Pending' },
    { title: 'Disbursement to Lagos Phase 2', date: 'Jan 04', type: 'Funding', status: 'Scheduled' },
  ]

  return (
    <div className="overview">
      <section className="hero">
        <div>
          <p className="eyebrow">Investor overview · Solar Z</p>
          <h1>Track performance, deployment and impact in one view</h1>
          <p className="lede">Monitor positions, cashflows, pipeline diligence and measurable ESG outcomes across the Solar Z portfolio.</p>
          <div className="hero-actions">
            <button className="cta primary">View projects</button>
            <button className="cta ghost">Download ESG report</button>
          </div>
        </div>
        <div className="hero-card">
          <div className="chip">Live net impact</div>
          <div className="hero-metric">23.5M kg CO₂</div>
          <p className="muted">Equivalent to removing 5,100 cars from the road</p>
          <div className="progress">
            <div className="progress-bar" style={{ width: '78%' }} />
          </div>
          <div className="small-grid">
            <div>
              <p className="label">Regions</p>
              <p className="value">8</p>
            </div>
            <div>
              <p className="label">Communities reached</p>
              <p className="value">112k</p>
            </div>
            <div>
              <p className="label">Active capacity</p>
              <p className="value">68 MW</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid summary">
        {summary.map((item) => (
          <div className="card" key={item.label}>
            <p className="label">{item.label}</p>
            <p className="value">{item.value}</p>
            <p className="muted">{item.change}</p>
          </div>
        ))}
      </section>

      <section className="grid two">
        <div className="card chart">
          <div className="card-head">
            <div>
              <p className="label">Performance</p>
              <h3>Net asset growth</h3>
            </div>
            <button className="chip ghost">Last 12 months</button>
          </div>
          <div className="chart-bars">
            {[46, 62, 58, 71, 76, 80, 92, 88, 95, 103, 108, 115].map((v, i) => (
              <div key={i} className="bar-wrap">
                <div className="bar" style={{ height: `${v}%` }} />
                <span className="bar-label">{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="legend">
            <span className="dot" /> NAV growth
            <span className="dot alt" /> Cash yield
          </div>
        </div>

        <div className="card portfolio">
          <div className="card-head">
            <div>
              <p className="label">Portfolio</p>
              <h3>Deployment progress</h3>
            </div>
            <button className="chip ghost">Monitor</button>
          </div>
          <div className="project-list">
            {projects.map((p) => (
              <div className="project" key={p.name}>
                <div>
                  <div className="project-title">{p.name}</div>
                  <div className="project-meta">{p.region} · Impact {p.impact}</div>
                </div>
                <div className="project-side">
                  <div className="pill">{p.invested}</div>
                  <div className="progress sm">
                    <div className="progress-bar" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="project-progress">{p.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid three">
        <div className="card impact">
          <div className="card-head">
            <div>
              <p className="label">Impact</p>
              <h3>ESG scorecard</h3>
            </div>
            <button className="chip ghost">View report</button>
          </div>
          <div className="impact-grid">
            <div>
              <p className="muted">CO₂ avoided</p>
              <p className="value">23.5M kg</p>
            </div>
            <div>
              <p className="muted">Households powered</p>
              <p className="value">58,200</p>
            </div>
            <div>
              <p className="muted">Avg. tariff</p>
              <p className="value">$0.07/kWh</p>
            </div>
          </div>
          <div className="tagline">Aligned to UN SDG 7 · Third-party verified</div>
        </div>

        <div className="card map">
          <div className="card-head">
            <div>
              <p className="label">Geography</p>
              <h3>Deployment footprint</h3>
            </div>
            <button className="chip ghost">View map</button>
          </div>
          <div className="map-visual">
            <div className="pulse" />
            <div className="pin" style={{ top: '48%', left: '58%' }} />
            <div className="pin" style={{ top: '56%', left: '52%' }} />
            <div className="pin" style={{ top: '60%', left: '50%' }} />
            <div className="pin" style={{ top: '51%', left: '47%' }} />
          </div>
          <p className="muted">Concentrated across East & West Africa with growing MENA exposure.</p>
        </div>

        <div className="card tasks">
          <div className="card-head">
            <div>
              <p className="label">Actions</p>
              <h3>Upcoming milestones</h3>
            </div>
            <button className="chip ghost">View all</button>
          </div>
          <div className="task-list">
            {upcoming.map((item) => (
              <div className="task" key={item.title}>
                <div>
                  <div className="task-title">{item.title}</div>
                  <div className="task-meta">{item.type}</div>
                </div>
                <div className="task-right">
                  <span className="pill subtle">{item.date}</span>
                  <span className="status-dot" />
                  <span className="task-status">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .overview {
          display: flex;
          flex-direction: column;
          gap: 20px;
          color: #1f241a;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 18px;
          padding: 24px;
          background: linear-gradient(135deg, #ffffff, #f6f9ec);
          border: 1px solid #e6e9de;
          border-radius: 24px;
          box-shadow: 0 20px 70px rgba(39, 44, 20, 0.08);
        }

        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 12px;
          font-weight: 700;
          color: #596246;
          margin-bottom: 8px;
        }

        h1 {
          margin: 0 0 10px;
          font-family: 'Space Grotesk', var(--font-heading);
          font-size: 30px;
          line-height: 1.2;
          color: #1f1f1f;
        }

        .lede {
          color: #4a5140;
          margin: 0 0 16px;
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .cta {
          border: 1px solid #d0e92d;
          padding: 12px 16px;
          border-radius: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }

        .cta.primary {
          background: #def83d;
          color: #111;
          box-shadow: 0 14px 36px rgba(85, 97, 0, 0.18);
        }

        .cta.ghost {
          background: #f8faf2;
          color: #303526;
        }

        .cta:hover { transform: translateY(-1px); }

        .hero-card {
          background: #111;
          color: #eaff68;
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 18px 46px rgba(0,0,0,0.22);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          color: inherit;
          border: 1px solid rgba(255,255,255,0.1);
          font-weight: 700;
        }

        .hero-metric {
          font-size: 34px;
          font-weight: 800;
          margin: 12px 0 4px;
        }

        .muted { color: #6c715f; }

        .hero-card .muted { color: rgba(234,255,104,0.75); }

        .progress {
          background: #e7eadc;
          border-radius: 999px;
          height: 10px;
          overflow: hidden;
          margin: 12px 0;
          position: relative;
        }

        .progress-bar {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #def83d, #b5d216);
          border-radius: 999px;
        }

        .progress.sm { height: 8px; }

        .small-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 12px;
        }

        .label {
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 12px;
          color: #6d7563;
          margin: 0 0 6px;
          font-weight: 700;
        }

        .value {
          margin: 0;
          font-weight: 800;
          font-size: 18px;
          color: #1f241a;
        }

        .grid.summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
        }

        .card {
          background: #fff;
          border: 1px solid #e6e9de;
          border-radius: 18px;
          padding: 16px 16px 18px;
          box-shadow: 0 10px 28px rgba(36, 43, 18, 0.06);
        }

        .grid.two {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 16px;
        }

        .grid.three {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
        }

        .card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        h3 {
          margin: 4px 0 0;
          font-size: 18px;
          color: #222;
        }

        .chip.ghost {
          background: #f2f6e8;
          color: #4a5140;
          border-color: #dce3cc;
        }

        .chart-bars {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 8px;
          align-items: end;
          height: 200px;
          margin: 10px 0 6px;
        }

        .bar-wrap { display: grid; gap: 6px; justify-items: center; }

        .bar {
          width: 100%;
          border-radius: 10px;
          background: linear-gradient(180deg, #b7d11c, #5c6504);
        }

        .bar-label {
          font-size: 11px;
          color: #6d7563;
        }

        .legend {
          display: flex;
          gap: 8px;
          align-items: center;
          color: #4a5140;
          font-size: 13px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #b7d11c;
          display: inline-block;
        }

        .dot.alt { background: #4c5341; }

        .project-list { display: flex; flex-direction: column; gap: 12px; }

        .project {
          display: flex;
          gap: 14px;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          border-radius: 14px;
          background: #f7f9f1;
          border: 1px solid #e6e9de;
        }

        .project-title { font-weight: 800; color: #222; }
        .project-meta { color: #6d7563; font-size: 13px; }
        .project-side { display: grid; gap: 6px; min-width: 180px; }
        .project-progress { color: #4a5140; font-weight: 700; font-size: 13px; }
        .pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 10px;
          border-radius: 12px;
          background: #111;
          color: #eaff68;
          font-weight: 800;
          border: 1px solid #1d1d1d;
        }

        .pill.subtle {
          background: #eef2e6;
          color: #414638;
          border-color: transparent;
          font-weight: 700;
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin: 12px 0 10px;
        }

        .tagline {
          color: #4a5140;
          font-weight: 700;
        }

        .map-visual {
          position: relative;
          background: radial-gradient(circle at 30% 40%, rgba(176, 207, 53, 0.35), transparent 35%),
                      radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.8), transparent 30%),
                      #0b1c12;
          border-radius: 16px;
          height: 200px;
          overflow: hidden;
          border: 1px solid #12281a;
        }

        .pin {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #def83d;
          box-shadow: 0 0 0 6px rgba(222, 248, 61, 0.15);
        }

        .pulse {
          position: absolute;
          top: 45%;
          left: 50%;
          width: 140px;
          height: 140px;
          margin-left: -70px;
          margin-top: -70px;
          background: radial-gradient(circle, rgba(222, 248, 61, 0.4), transparent 70%);
          border-radius: 50%;
          filter: blur(1px);
        }

        .task-list { display: flex; flex-direction: column; gap: 10px; }
        .task {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: 12px;
          background: #f8faf2;
          border: 1px solid #e6e9de;
        }
        .task-title { font-weight: 800; color: #252a1c; }
        .task-meta { color: #6d7563; font-size: 13px; }
        .task-right { display: inline-flex; align-items: center; gap: 8px; }
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #8bc34a;
          box-shadow: 0 0 0 5px rgba(139,195,74,0.16);
        }
        .task-status { font-weight: 700; color: #4a5140; }

        @media (max-width: 1080px) {
          .hero { grid-template-columns: 1fr; }
          .grid.two { grid-template-columns: 1fr; }
        }

        @media (max-width: 720px) {
          .small-grid, .impact-grid { grid-template-columns: repeat(2, 1fr); }
          .project { flex-direction: column; align-items: flex-start; }
          .project-side { width: 100%; }
        }
      `}</style>
    </div>
  )
}

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
