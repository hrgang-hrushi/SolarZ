import DashboardLayout from '../../components/DashboardLayout'

function PortfolioPage() {
  const holdings = [
    { name: 'Kigali Solar Park', status: 'Construction', irr: '11.2%', impact: '1.12M kg CO₂', coverage: '18 months', allocated: '$210,000' },
    { name: 'Lagos Rooftop Microgrid', status: 'Operational', irr: '9.4%', impact: '640k kg CO₂', coverage: '21 months', allocated: '$140,000' },
    { name: 'Mombasa Industrial Solar', status: 'Pre-construction', irr: '8.1%', impact: '420k kg CO₂', coverage: '24 months', allocated: '$96,000' },
    { name: 'Lusaka Community Solar', status: 'Operational', irr: '7.6%', impact: '310k kg CO₂', coverage: '26 months', allocated: '$66,430' },
  ]

  const kpis = [
    { label: 'Portfolio value', value: '$512,430', change: '+12.5% MoM' },
    { label: 'Weighted avg IRR', value: '9.4%', change: '+0.6 pp' },
    { label: 'Yield on cost', value: '7.8%', change: '+0.3 pp' },
    { label: 'Avg payback', value: '5.2 yrs', change: 'Portfolio-wide' },
  ]

  return (
    <div className="portfolio">
      <header className="hero">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1>Positions, yields and risk coverage</h1>
          <p className="lede">A consolidated look at every Solar Z position, IRR expectations, risk duration and verified impact to date.</p>
        </div>
        <div className="hero-actions">
          <button className="cta primary">Export holdings</button>
          <button className="cta ghost">Generate PDF</button>
        </div>
      </header>

      <section className="grid kpis">
        {kpis.map((kpi) => (
          <div className="card" key={kpi.label}>
            <p className="label">{kpi.label}</p>
            <p className="value">{kpi.value}</p>
            <p className="muted">{kpi.change}</p>
          </div>
        ))}
      </section>

      <section className="grid two">
        <div className="card table-card">
          <div className="card-head">
            <div>
              <p className="label">Holdings</p>
              <h3>Active & pipeline projects</h3>
            </div>
            <button className="chip ghost">Refresh data</button>
          </div>
          <div className="table">
            <div className="row head">
              <span>Project</span>
              <span>Status</span>
              <span>IRR</span>
              <span>Impact</span>
              <span>Risk coverage</span>
              <span>Allocated</span>
            </div>
            {holdings.map((h) => (
              <div className="row" key={h.name}>
                <span className="strong">{h.name}</span>
                <span className="pill subtle">{h.status}</span>
                <span>{h.irr}</span>
                <span>{h.impact}</span>
                <span>{h.coverage}</span>
                <span className="strong">{h.allocated}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card sidebar">
          <div className="card-head">
            <div>
              <p className="label">Performance</p>
              <h3>Return distribution</h3>
            </div>
            <button className="chip ghost">12m</button>
          </div>
          <div className="distribution">
            {[62, 74, 88, 92, 84, 68].map((v, idx) => (
              <div key={idx} className="dist-bar" style={{ height: `${v + 40}px` }} />
            ))}
          </div>
          <div className="stat-grid">
            <div>
              <p className="label">Best month</p>
              <p className="value">+6.2%</p>
            </div>
            <div>
              <p className="label">Worst month</p>
              <p className="value">-1.1%</p>
            </div>
            <div>
              <p className="label">Sharpe (proxy)</p>
              <p className="value">1.12</p>
            </div>
          </div>
          <div className="note">IRR model uses realized cashflows, projected merchant power and verified PPA schedules.</div>
        </div>
      </section>

      <style jsx>{`
        .portfolio {
          display: flex;
          flex-direction: column;
          gap: 18px;
          color: #1f241a;
        }
        .hero {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 22px;
          background: linear-gradient(135deg, #ffffff, #f6f9ec);
          border: 1px solid #e6e9de;
          border-radius: 20px;
        }
        .hero-actions { display: flex; gap: 10px; align-items: center; }
        .eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px; font-weight: 700; color: #596246; margin: 0 0 6px; }
        h1 { margin: 0 0 10px; font-size: 28px; font-family: 'Space Grotesk', var(--font-heading); }
        .lede { margin: 0; color: #4a5140; max-width: 640px; }
        .cta { border: 1px solid #d0e92d; padding: 10px 14px; border-radius: 12px; font-weight: 800; background: #f8faf2; color: #2a2e1f; }
        .cta.primary { background: #def83d; color: #111; box-shadow: 0 8px 20px rgba(85, 97, 0, 0.18); }
        .cta.ghost { border-color: #e6e9de; }

        .grid.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
        .card { background: #fff; border: 1px solid #e6e9de; border-radius: 16px; padding: 14px 16px; box-shadow: 0 10px 28px rgba(36, 43, 18, 0.06); }
        .label { text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; color: #6d7563; margin: 0 0 6px; font-weight: 700; }
        .value { margin: 0 0 4px; font-weight: 800; font-size: 20px; color: #1f241a; }
        .muted { margin: 0; color: #6d7563; }

        .grid.two { display: grid; grid-template-columns: 1.5fr 1fr; gap: 14px; }
        .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        h3 { margin: 4px 0 0; }
        .chip { display: inline-flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; border: 1px solid #dce3cc; background: #f8faf2; font-weight: 700; color: #414638; }
        .chip.ghost { background: #f2f6e8; }

        .table { width: 100%; border-radius: 14px; overflow: hidden; border: 1px solid #e6e9de; }
        .row { display: grid; grid-template-columns: 1.4fr repeat(5, 1fr); padding: 12px 14px; align-items: center; gap: 8px; }
        .row:nth-child(even) { background: #f7f9f1; }
        .row.head { background: #eef2e6; font-weight: 700; text-transform: uppercase; font-size: 12px; letter-spacing: 0.06em; color: #596246; }
        .strong { font-weight: 800; color: #222; }
        .pill.subtle { background: #eef2e6; color: #414638; border-radius: 10px; padding: 6px 8px; font-weight: 700; border: 1px solid #e6e9de; }

        .sidebar { display: grid; gap: 14px; }
        .distribution { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; align-items: end; height: 180px; background: #0f1e12; border-radius: 12px; padding: 12px; border: 1px solid #12281a; }
        .dist-bar { width: 100%; border-radius: 10px; background: linear-gradient(180deg, #def83d, #556100); box-shadow: 0 12px 28px rgba(0,0,0,0.2); }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .note { color: #4a5140; font-weight: 700; }

        @media (max-width: 980px) {
          .grid.two { grid-template-columns: 1fr; }
          .row { grid-template-columns: repeat(2, 1fr); grid-auto-rows: auto; }
          .row.head { display: none; }
        }
      `}</style>
    </div>
  )
}

PortfolioPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default PortfolioPage
