export default function MetricCard({ label, value, delta }) {
  return (
    <div className="card card--compact metric-card">
      <p className="label">{label}</p>
      <div className="value">{value}</div>
      {delta && <div className="delta">{delta}</div>}

      <style jsx>{`
        .metric-card { padding: 10px 14px; background: transparent; box-shadow: none; }
        .label { margin: 0 0 6px; color: var(--color-gray-500); font-size: 13px; font-weight: 700; }
        .value { font-size: 26px; font-weight: 800; margin-bottom: 6px; color: inherit; }
        .delta { color: var(--color-lime); font-weight: 800; font-size: 13px; }
      `}</style>
    </div>
  )
}
