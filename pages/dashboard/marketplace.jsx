import DashboardLayout from '../../components/DashboardLayout'

const listings = [
  {
    name: 'Kigali Solar Park',
    location: 'Rwanda · Utility scale',
    irr: '11.2% target IRR',
    impact: '1.12M kg CO₂ avoided',
    size: '68 MW',
    stage: 'Construction',
  },
  {
    name: 'Lagos Rooftop Microgrid',
    location: 'Nigeria · C&I rooftop',
    irr: '9.4% target IRR',
    impact: '640k kg CO₂ avoided',
    size: '22 MW',
    stage: 'Operational',
  },
  {
    name: 'Lusaka Community Solar',
    location: 'Zambia · Community solar',
    irr: '8.1% target IRR',
    impact: '310k kg CO₂ avoided',
    size: '14 MW',
    stage: 'Due diligence',
  },
  {
    name: 'Mombasa Industrial Solar',
    location: 'Kenya · Industrial offtake',
    irr: '7.9% target IRR',
    impact: '420k kg CO₂ avoided',
    size: '31 MW',
    stage: 'Pre-construction',
  },
]

function MarketplacePage() {
  return (
    <div className="marketplace">
      <header className="hero">
        <div>
          <p className="eyebrow">Marketplace</p>
          <h1>Discover vetted solar infrastructure</h1>
          <p className="lede">Explore current raises, diligence-ready projects and secondary blocks across the Solar Z platform.</p>
        </div>
        <div className="hero-actions">
          <button className="cta primary">Create investment</button>
          <button className="cta ghost">Build portfolio</button>
        </div>
      </header>

      <div className="filters">
        <button className="filter active">All</button>
        <button className="filter">Primary</button>
        <button className="filter">Secondary</button>
        <button className="filter">Due diligence</button>
        <button className="filter">MENA</button>
        <button className="filter">East Africa</button>
        <div className="filter search">
          <input placeholder="Search raises, regions, technologies" />
        </div>
      </div>

      <section className="grid listings">
        {listings.map((item) => (
          <div className="card" key={item.name}>
            <div className="card-head">
              <div>
                <p className="label">{item.stage}</p>
                <h3>{item.name}</h3>
                <p className="muted">{item.location}</p>
              </div>
              <div className="pill">{item.size}</div>
            </div>
            <div className="meta">
              <span>{item.irr}</span>
              <span>{item.impact}</span>
            </div>
            <div className="actions">
              <button className="cta primary">Review deal</button>
              <button className="cta ghost">Download deck</button>
            </div>
          </div>
        ))}
      </section>

      <style jsx>{`
        .marketplace { display: flex; flex-direction: column; gap: 16px; color: #1f241a; }
        .hero { display: flex; justify-content: space-between; gap: 14px; padding: 20px; background: linear-gradient(135deg, #ffffff, #f6f9ec); border: 1px solid #e6e9de; border-radius: 20px; }
        .eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px; font-weight: 700; color: #596246; margin: 0 0 6px; }
        h1 { margin: 0 0 8px; font-size: 28px; font-family: 'Space Grotesk', var(--font-heading); }
        .lede { margin: 0; color: #4a5140; max-width: 620px; }
        .hero-actions { display: flex; gap: 10px; align-items: center; }
        .cta { border: 1px solid #d0e92d; padding: 10px 14px; border-radius: 12px; font-weight: 800; background: #f8faf2; color: #2a2e1f; }
        .cta.primary { background: #def83d; color: #111; box-shadow: 0 8px 20px rgba(85, 97, 0, 0.18); }
        .cta.ghost { border-color: #e6e9de; }

        .filters { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
        .filter { border: 1px solid #e0e4d8; background: #fff; padding: 10px 12px; border-radius: 12px; font-weight: 700; color: #414638; }
        .filter.active { background: #111; color: #eaff68; border-color: #1a1a1a; }
        .filter.search { flex: 1; min-width: 240px; }
        .filter.search input { width: 100%; border: none; outline: none; background: transparent; color: #2c3029; font-weight: 600; }

        .grid.listings { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
        .card { background: #fff; border: 1px solid #e6e9de; border-radius: 16px; padding: 14px; box-shadow: 0 10px 26px rgba(36, 43, 18, 0.06); display: grid; gap: 10px; }
        .card-head { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
        h3 { margin: 4px 0 4px; color: #222; }
        .label { text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; color: #6d7563; margin: 0; font-weight: 700; }
        .muted { margin: 0; color: #6d7563; }
        .pill { display: inline-flex; align-items: center; justify-content: center; padding: 8px 10px; border-radius: 12px; background: #111; color: #eaff68; font-weight: 800; border: 1px solid #1d1d1d; }
        .meta { display: flex; flex-wrap: wrap; gap: 8px; color: #414638; font-weight: 700; }
        .actions { display: flex; gap: 10px; flex-wrap: wrap; }

        @media (max-width: 820px) {
          .hero { flex-direction: column; }
          .hero-actions { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  )
}

MarketplacePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default MarketplacePage
