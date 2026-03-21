import DashboardLayout from '../../components/DashboardLayout'

const transactions = [
  { title: 'Investment - Kigali Solar Park', meta: 'Ref: KP-INV-7841 · Dec 17', amount: '$32,500', type: 'out' },
  { title: 'Return - Lagos Rooftop', meta: 'Ref: LR-RET-2910 · Dec 12', amount: '$8,240', type: 'in' },
  { title: 'Investment - Mombasa Industrial', meta: 'Ref: MI-INV-0032 · Dec 04', amount: '$18,000', type: 'out' },
  { title: 'Return - Lusaka Community Solar', meta: 'Ref: LCS-RET-1209 · Nov 28', amount: '$5,870', type: 'in' },
]

function WalletPage() {
  return (
    <div className="wallet">
      <header className="hero">
        <div>
          <p className="eyebrow">Wallet</p>
          <h1>Balances, deposits and payouts</h1>
          <p className="lede">Manage cash, deploy into raises, and monitor automated disbursements from operating assets.</p>
        </div>
        <div className="hero-actions">
          <button className="cta primary">Deposit</button>
          <button className="cta ghost">Withdraw</button>
        </div>
      </header>

      <section className="grid two">
        <div className="card balance">
          <div className="row">
            <div>
              <p className="label">Available balance</p>
              <p className="value">$68,490</p>
              <p className="muted">Cleared and ready to deploy</p>
            </div>
            <div className="pill">Verified</div>
          </div>
          <div className="stat-grid">
            <div>
              <p className="label">On hold</p>
              <p className="value">$6,200</p>
              <p className="muted">Pending settlement</p>
            </div>
            <div>
              <p className="label">Upcoming payout</p>
              <p className="value">$12,430</p>
              <p className="muted">Expected Dec 21</p>
            </div>
            <div>
              <p className="label">Lifetime deposits</p>
              <p className="value">$410,000</p>
              <p className="muted">Across 32 transactions</p>
            </div>
          </div>
        </div>

        <div className="card info">
          <p className="label">Security</p>
          <h3>Enable two-factor for disbursements</h3>
          <p className="muted">Protect high-value payouts and wiring instructions with step-up verification and audit trails.</p>
          <div className="actions">
            <button className="cta primary">Enable 2FA</button>
            <button className="cta ghost">View audit log</button>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-head">
          <div>
            <p className="label">Transactions</p>
            <h3>Recent activity</h3>
          </div>
          <button className="chip ghost">Export CSV</button>
        </div>
        <div className="table">
          {transactions.map((t) => (
            <div className="tx" key={t.title}>
              <div>
                <div className="tx-title">{t.title}</div>
                <div className="tx-meta">{t.meta}</div>
              </div>
              <div className={`amount ${t.type === 'in' ? 'in' : 'out'}`}>
                {t.type === 'in' ? '+' : '-'}{t.amount}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .wallet { display: flex; flex-direction: column; gap: 16px; color: #1f241a; }
        .hero { display: flex; justify-content: space-between; gap: 14px; padding: 20px; background: linear-gradient(135deg, #ffffff, #f6f9ec); border: 1px solid #e6e9de; border-radius: 20px; }
        .hero-actions { display: flex; gap: 10px; align-items: center; }
        .eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px; font-weight: 700; color: #596246; margin: 0 0 6px; }
        h1 { margin: 0 0 10px; font-size: 28px; font-family: 'Space Grotesk', var(--font-heading); }
        .lede { margin: 0; color: #4a5140; max-width: 620px; }
        .cta { border: 1px solid #d0e92d; padding: 10px 14px; border-radius: 12px; font-weight: 800; background: #f8faf2; color: #2a2e1f; }
        .cta.primary { background: #def83d; color: #111; box-shadow: 0 8px 20px rgba(85, 97, 0, 0.18); }
        .cta.ghost { border-color: #e6e9de; }

        .grid.two { display: grid; grid-template-columns: 1.3fr 1fr; gap: 12px; }
        .card { background: #fff; border: 1px solid #e6e9de; border-radius: 16px; padding: 16px; box-shadow: 0 10px 26px rgba(36, 43, 18, 0.06); }
        .label { text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; color: #6d7563; margin: 0 0 6px; font-weight: 700; }
        .value { margin: 0 0 4px; font-weight: 800; font-size: 22px; color: #1f241a; }
        .muted { margin: 0; color: #6d7563; }
        .pill { display: inline-flex; align-items: center; justify-content: center; padding: 8px 10px; border-radius: 12px; background: #111; color: #eaff68; font-weight: 800; border: 1px solid #1d1d1d; height: max-content; }
        .row { display: flex; justify-content: space-between; align-items: center; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }

        .info { display: grid; gap: 8px; }
        .actions { display: flex; gap: 10px; flex-wrap: wrap; }

        .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        h3 { margin: 4px 0 0; }
        .chip { display: inline-flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; border: 1px solid #dce3cc; background: #f8faf2; font-weight: 700; color: #414638; }
        .chip.ghost { background: #f2f6e8; }

        .table { display: flex; flex-direction: column; gap: 8px; }
        .tx { display: flex; justify-content: space-between; align-items: center; padding: 12px; border-radius: 12px; background: #f7f9f1; border: 1px solid #e6e9de; }
        .tx-title { font-weight: 800; color: #222; }
        .tx-meta { color: #6d7563; font-size: 13px; }
        .amount { font-weight: 800; }
        .amount.in { color: #4c6f1a; }
        .amount.out { color: #b13c3c; }

        @media (max-width: 900px) {
          .hero { flex-direction: column; }
          .grid.two { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

WalletPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default WalletPage
