import DashboardLayout from '../../components/DashboardLayout'

const metrics = [
  { label: 'CO₂ avoided', value: '23.5M kg', detail: 'Verified by third party' },
  { label: 'Households powered', value: '58,200', detail: 'Affordable clean energy' },
  { label: 'Jobs supported', value: '4,120', detail: 'Local operations & construction' },
]

const sdgs = ['Affordable & Clean Energy (SDG 7)', 'Decent Work (SDG 8)', 'Climate Action (SDG 13)']

function ImpactPage() {
  return (
    <div className="impact">
      <header className="hero">
        <div>
          <p className="eyebrow">Impact</p>
          <h1>ESG impact report</h1>
          <p className="lede">Live measurements from the Solar Z portfolio aligned to UN SDGs, verified and ready to share with stakeholders.</p>
        </div>
        <div className="hero-actions">
          <button className="cta primary">Download PDF</button>
          <button className="cta ghost">Share snapshot</button>
        </div>
      </header>

      <section className="grid metrics">
        {metrics.map((m) => (
          <div className="card" key={m.label}>
            <p className="label">{m.label}</p>
            <p className="value">{m.value}</p>
            <p className="muted">{m.detail}</p>
          </div>
        ))}
      </section>

      <section className="card">
        <div className="card-head">
          <div>
            <p className="label">Scope</p>
            <h3>Aligned to UN SDGs</h3>
          </div>
          <button className="chip ghost">View assurance</button>
        </div>
        <div className="pill-row">
          {sdgs.map((s) => (
            <span className="pill" key={s}>{s}</span>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="card-head">
          <div>
            <p className="label">Regions</p>
            <h3>Footprint</h3>
          </div>
          <button className="chip ghost">See map</button>
        </div>
        <div className="map-visual">
          <div className="pin" style={{ top: '48%', left: '58%' }} />
          <div className="pin" style={{ top: '56%', left: '52%' }} />
          <div className="pin" style={{ top: '60%', left: '50%' }} />
          <div className="pin" style={{ top: '51%', left: '47%' }} />
        </div>
        <p className="muted">Concentrated across East & West Africa with growing MENA exposure.</p>
      </section>

      <style jsx>{`
        .impact { display: flex; flex-direction: column; gap: 14px; color: #1f241a; }
        .hero { display: flex; justify-content: space-between; gap: 14px; padding: 20px; background: linear-gradient(135deg, #ffffff, #f6f9ec); border: 1px solid #e6e9de; border-radius: 20px; }
        .hero-actions { display: flex; gap: 10px; align-items: center; }
        .eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px; font-weight: 700; color: #596246; margin: 0 0 6px; }
        h1 { margin: 0 0 10px; font-size: 28px; font-family: 'Space Grotesk', var(--font-heading); }
        .lede { margin: 0; color: #4a5140; max-width: 620px; }
        .cta { border: 1px solid #d0e92d; padding: 10px 14px; border-radius: 12px; font-weight: 800; background: #f8faf2; color: #2a2e1f; }
        .cta.primary { background: #def83d; color: #111; box-shadow: 0 8px 20px rgba(85, 97, 0, 0.18); }
        .cta.ghost { border-color: #e6e9de; }

        .grid.metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
        .card { background: #fff; border: 1px solid #e6e9de; border-radius: 16px; padding: 14px 16px; box-shadow: 0 10px 26px rgba(36, 43, 18, 0.06); }
        .label { text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; color: #6d7563; margin: 0 0 6px; font-weight: 700; }
        .value { margin: 0 0 4px; font-weight: 800; font-size: 22px; color: #1f241a; }
        .muted { margin: 0; color: #6d7563; }
        .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        h3 { margin: 4px 0 0; }
        .chip { display: inline-flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; border: 1px solid #dce3cc; background: #f8faf2; font-weight: 700; color: #414638; }
        .chip.ghost { background: #f2f6e8; }
        .pill-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .pill { display: inline-flex; align-items: center; justify-content: center; padding: 8px 10px; border-radius: 12px; background: #111; color: #eaff68; font-weight: 800; border: 1px solid #1d1d1d; }

  .map-visual { position: relative; background: radial-gradient(circle at 30% 40%, rgba(176, 207, 53, 0.35), transparent 35%), radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.8), transparent 30%), #0b1c12; border-radius: 16px; height: 200px; overflow: hidden; border: 1px solid #12281a; margin-top: 6px; }
  .pin { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: #def83d; box-shadow: 0 0 0 6px rgba(222, 248, 61, 0.15); }

        @media (max-width: 820px) {
          .hero { flex-direction: column; }
        }
      `}</style>
    </div>
  )
}

ImpactPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default ImpactPage
