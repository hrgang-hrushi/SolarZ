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

  return (
    <div className="solar-dashboard">
      {/* Header */}
      <header className="topbar">
        <div className="topbar-left">
          <button className="icon-btn" aria-label="Menu">☰</button>
          <div className="logo-circle">☀️</div>
          <div>
            <div className="top-title">Solar Dashboard</div>
            <div className="top-sub">Portfolio overview</div>
          </div>
        </div>
        <div className="topbar-right">
          <div className="search">
            <span>🔍</span>
            <input placeholder="Search" />
          </div>
          <div className="user-block">
            <img src="https://i.pravatar.cc/80?img=5" alt="User" />
            <div>
              <div className="user-name">User Name</div>
              <div className="user-role">Solar Investor</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <div className="date-circle">
            <div className="date-day">19</div>
            <div className="date-month">Tue, December</div>
          </div>
          <div className="hero-actions">
            <button className="cta">Show my Tasks →</button>
            <div className="icon-pill">📅</div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-text">Hey, Need help?👋</div>
          <div className="hero-sub">Let’s get your solar investments organized.</div>
          <div className="mic">🎤</div>
        </div>
      </section>

      <section className="grid-3">
        {/* Left column */}
        <div className="col">
          <div className="card account">
            <div className="card-top">
              <span className="visa">VISA</span>
              <button className="dropdown">Direct Debits ▾</button>
            </div>
            <div className="acct-num">**** 2719</div>
            <div className="income">$12,430.90</div>
            <div className="pill-row">
              <button className="pill-btn active">Receive</button>
              <button className="pill-btn">Send</button>
            </div>
            <div className="row">
              <div>
                <p className="label">Monthly fee</p>
                <p className="value">$29.00</p>
                <a className="link lime" href="#">Edit cards limitation</a>
              </div>
              <div>
                <p className="label">Total paid</p>
                <p className="value">$8,320.40</p>
                <a className="link lime" href="#">View on chart mode</a>
              </div>
            </div>
          </div>

          <div className="card profits">
            <div className="card-head">
              <div>
                <p className="label">Annual profits</p>
                <h4>2023</h4>
              </div>
              <button className="dropdown">2023 ▾</button>
            </div>
            <div className="rings">
              <div className="ring r1">$4K</div>
              <div className="ring r2">$6.8K</div>
              <div className="ring r3">$9.3K</div>
              <div className="ring r4">$14K</div>
            </div>
          </div>
        </div>

        {/* Middle column */}
        <div className="col">
          <div className="card activity">
            <div className="card-head">
              <h4>Activity manager</h4>
              <button className="icon-btn">⚙️</button>
            </div>
            <div className="search pills">
              <span>🔍</span>
              <input placeholder="Search" />
              <div className="filters">
                <span className="pill-filter active">Team</span>
                <span className="pill-filter">Insights</span>
                <span className="pill-filter">Today</span>
              </div>
            </div>
            <div className="list">
              <div className="list-item">
                <div className="badge coral">1</div>
                <div>
                  <div className="item-title">Business plans</div>
                  <div className="item-sub">$ 43.20 USD</div>
                </div>
                <div className="bars">
                  <span className="bar coral" />
                  <span className="bar lime" />
                  <span className="bar coral" />
                </div>
              </div>
              <div className="list-item">
                <div className="badge coral">2</div>
                <div className="item-title">Bank loans</div>
                <button className="dropdown ghost">▾</button>
              </div>
              <div className="list-item">
                <div className="badge coral">3</div>
                <div className="item-title">Accounting</div>
              </div>
              <div className="list-item">
                <div className="badge coral">4</div>
                <div className="item-title">HR management</div>
              </div>
            </div>
          </div>

          <div className="card wallet">
            <div className="sunburst">☼</div>
            <h4>Wallet Verification</h4>
            <p className="muted">Enable 2-step verification to secure your wallet and payouts.</p>
            <button className="cta coral-btn">Enable</button>
          </div>
        </div>

        {/* Right column */}
        <div className="col">
          <div className="card status">
            <div className="row between">
              <div className="lock">🔒</div>
              <div className="label">System Lock</div>
            </div>
            <div className="big">13 Days</div>
            <div className="muted">Time remaining</div>
            <div className="dots">
              {[...Array(24)].map((_, i) => (
                <span key={i} className={`dot ${i % 2 === 0 ? 'lime' : ''}`} />
              ))}
            </div>
            <div className="bars-mini">
              <span className="mini coral" />
              <span className="mini lime" />
              <span className="mini coral" />
            </div>
          </div>

          <div className="card stocks">
            <div className="row between">
              <h4>Main Stocks</h4>
              <span className="pct">+9.3%</span>
            </div>
            <div className="muted">Extended & Limited</div>
            <div className="line-chart" />
            <div className="amount">$16,073.49</div>
          </div>

          <div className="card review">
            <h4>How is your business management going?</h4>
            <div className="emoji-row">
              {['😡','😕','😐','😊','🤩'].map((e) => <button key={e} className="emoji">{e}</button>)}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        :global(body) {
          background: #f5f5f5;
          color: #333;
        }
        .solar-dashboard {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          border-radius: 16px;
          padding: 16px 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .topbar-left { display: flex; align-items: center; gap: 12px; }
        .icon-btn {
          width: 40px; height: 40px; border-radius: 12px; border: 1px solid #eee;
          background: #fff; display: grid; place-items: center; font-size: 18px;
        }
        .logo-circle {
          width: 44px; height: 44px; border-radius: 50%;
          background: #111; color: #fff; display: grid; place-items: center;
          font-size: 18px; font-weight: 700;
        }
        .top-title { font-weight: 800; font-size: 18px; }
        .top-sub { color: #999; font-size: 13px; }

        .topbar-right { display: flex; align-items: center; gap: 12px; }
        .search {
          display: flex; align-items: center; gap: 8px;
          background: #f0f0f0; border-radius: 12px; padding: 8px 10px;
        }
        .search input { border: none; background: transparent; outline: none; color: #333; }
        .user-block { display: flex; align-items: center; gap: 10px; padding: 6px 10px; border-radius: 12px; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .user-block img { width: 40px; height: 40px; border-radius: 12px; }
        .user-name { font-weight: 700; }
        .user-role { color: #999; font-size: 12px; }

        .hero {
          display: grid; grid-template-columns: 1.2fr 1fr; gap: 16px;
          background: #fff; border-radius: 16px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          align-items: center;
        }
        .hero-left { display: flex; align-items: center; gap: 16px; }
        .date-circle { width: 120px; height: 120px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: grid; place-items: center; text-align: center; }
        .date-day { font-size: 32px; font-weight: 800; }
        .date-month { color: #999; font-size: 13px; }
        .hero-actions { display: flex; align-items: center; gap: 10px; }
        .cta { background: #d4ed31; color: #111; border-radius: 24px; padding: 12px 18px; border: none; font-weight: 800; }
        .cta:hover { background: #c1d92a; }
        .icon-pill { width: 46px; height: 46px; border-radius: 14px; background: #f0f0f0; display: grid; place-items: center; }
        .hero-right { position: relative; }
        .hero-text { font-size: 26px; font-weight: 800; }
        .hero-sub { color: #999; margin-top: 4px; }
        .mic { position: absolute; right: -8px; top: 0; font-size: 22px; }

        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .card { background: #fff; border-radius: 16px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); color: #333; }
        .card h4 { margin: 0; }
        .label { color: #999; margin: 0 0 4px; font-size: 13px; }
        .value { font-weight: 800; margin: 0 0 6px; }
        .link { font-weight: 700; font-size: 13px; text-decoration: none; }
        .lime { color: #d4ed31; }

        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .visa { font-weight: 800; letter-spacing: 2px; }
        .dropdown { border: 1px solid #eee; background: #f8f8f8; border-radius: 10px; padding: 8px 10px; color: #333; }
        .acct-num { color: #999; margin-bottom: 6px; }
        .income { font-size: 28px; font-weight: 800; margin-bottom: 10px; }
        .pill-row { display: flex; gap: 8px; margin-bottom: 12px; }
        .pill-btn { flex: 1; padding: 10px; border-radius: 16px; border: 1px solid #eee; background: #f7f7f7; font-weight: 700; }
        .pill-btn.active { background: #111; color: #fff; }
        .row { display: flex; gap: 16px; justify-content: space-between; }

        .profits .card-head { display: flex; justify-content: space-between; align-items: center; }
        .rings { position: relative; width: 220px; height: 220px; margin: 12px auto; }
        .ring { position: absolute; border-radius: 50%; display: grid; place-items: center; font-weight: 700; color: #333; }
        .r1 { width: 90px; height: 90px; background: radial-gradient(circle at center, #e85d4f 0%, #f5f5f5 65%); top: 65px; left: 65px; }
        .r2 { width: 130px; height: 130px; background: radial-gradient(circle at center, rgba(212,237,49,0.6), transparent 65%); top: 45px; left: 45px; }
        .r3 { width: 170px; height: 170px; border: 2px solid #e85d4f; top: 25px; left: 25px; }
        .r4 { width: 210px; height: 210px; border: 2px solid #d4ed31; top: 5px; left: 5px; }

        .activity .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .pills { gap: 8px; flex-wrap: wrap; }
        .filters { display: flex; gap: 6px; }
        .pill-filter { padding: 6px 10px; border-radius: 12px; background: #f0f0f0; color: #333; font-weight: 700; font-size: 12px; }
        .pill-filter.active { background: #d4ed31; color: #111; }
        .list { display: grid; gap: 10px; margin-top: 10px; }
        .list-item { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 10px; padding: 10px; border: 1px solid #eee; border-radius: 12px; }
        .badge { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; font-weight: 800; color: #fff; }
        .coral { background: #e85d4f; }
        .bars { display: flex; gap: 4px; align-items: center; }
        .bar { width: 24px; height: 6px; border-radius: 6px; background: #ccc; }
        .bar.lime { background: #d4ed31; }
        .bar.coral { background: #e85d4f; }

        .wallet { text-align: center; display: grid; gap: 10px; }
        .sunburst { font-size: 28px; }
        .coral-btn { background: #e85d4f; color: #fff; border-radius: 24px; padding: 12px 18px; font-weight: 800; border: none; }
        .coral-btn:hover { background: #cf4f44; }

        .status .row { display: flex; align-items: center; gap: 8px; }
        .row.between { justify-content: space-between; }
        .lock { font-size: 20px; }
        .big { font-size: 26px; font-weight: 800; margin: 8px 0 2px; }
        .dots { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin: 12px 0; }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: #ddd; }
        .dot.lime { background: #d4ed31; }
        .bars-mini { display: flex; gap: 6px; }
        .mini { width: 24px; height: 6px; border-radius: 6px; background: #ccc; }
        .mini.lime { background: #d4ed31; }
        .mini.coral { background: #e85d4f; }

        .stocks .pct { color: #d4ed31; font-weight: 800; }
        .line-chart { height: 120px; border-radius: 12px; background: linear-gradient(135deg, rgba(232,93,79,0.2), rgba(212,237,49,0.25)); margin: 10px 0; position: relative; overflow: hidden; }
        .line-chart::after { content: ''; position: absolute; inset: 20% 5%; border-left: 2px solid #e85d4f; border-bottom: 2px solid #e85d4f; transform: skew(-12deg); border-radius: 12px; }
        .amount { font-size: 22px; font-weight: 800; }

        .review { text-align: center; display: grid; gap: 12px; }
        .emoji-row { display: flex; justify-content: center; gap: 8px; }
        .emoji { width: 44px; height: 44px; border-radius: 14px; border: 1px solid #eee; background: #f9f9f9; font-size: 20px; }

        @media (max-width: 1100px) {
          .grid-3 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
