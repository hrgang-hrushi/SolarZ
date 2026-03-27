export default function RecentInvestments({ rows = [] }) {
  return (
    <div className="card investments-card">
      <header className="card-head">
        <div>
          <p className="eyebrow">Investments</p>
          <h3>Recent investments</h3>
        </div>
        <button className="ghost">Export CSV</button>
      </header>

      <div className="table-wrap">
        <table className="investments-table">
          <thead>
            <tr>
              <th>Investor</th>
              <th>Project</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '18px' }}>No recent investments</td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i}>
                  <td className="muted">{r.investor}</td>
                  <td className="muted-light">{r.project}</td>
                  <td className="amount">{r.amount}</td>
                  <td className="muted">{r.date}</td>
                  <td><span className={`status ${r.status}`}>{r.status}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

        <style jsx>{`
          .investments-card { padding: 20px; }
  .table-wrap { overflow: auto; }
  .investments-table { width: 100%; border-collapse: collapse; }
  th { text-align: left; color: inherit; opacity: 0.75; font-weight: 700; padding: 12px 10px; font-size: 13px; }
  td { padding: 12px 10px; border-top: 1px solid var(--admin-border, var(--color-gray-100)); color: inherit; }
  .muted { opacity: 0.78; }
  .muted-light { opacity: 0.9; font-weight: 700; }
  .amount { font-weight: 800; }
  .status { padding: 6px 10px; border-radius: 999px; font-weight: 700; font-size: 13px; display: inline-block; }
  .status.pending { background: rgba(255,193,7,0.08); color: #d48800; border: 1px solid rgba(255,193,7,0.12); }
  .status.settled { background: rgba(76,175,80,0.08); color: #1f7a3a; border: 1px solid rgba(76,175,80,0.12); }
  .status.failed { background: rgba(255,77,77,0.06); color: #a33b3b; border: 1px solid rgba(255,77,77,0.10); }
        @media (max-width: 640px) { th, td { padding: 10px 6px; } }
      `}</style>
    </div>
  )
}
