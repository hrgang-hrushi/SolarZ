export default function QuickActions({ actions = [] }) {
  return (
  <div className="card quickactions-card">
      <header className="card-head">
        <div>
          <p className="eyebrow">Quick actions</p>
          <h3>Take action</h3>
        </div>
      </header>

      <div className="actions">
        {actions.length === 0 ? (
          <div className="muted">No quick actions</div>
        ) : (
          actions.map((a, i) => (
            <button key={i} className="action-btn" onClick={a.onClick}>
              {a.label}
            </button>
          ))
        )}
      </div>

      <style jsx>{`
        .quickactions-card { /* complements global .card */ }
        .actions { display: flex; flex-direction: column; gap: 10px; }
        .action-btn { text-align: left; padding: 12px 14px; border-radius: 10px; background: var(--color-gray-50); color: var(--color-dark); border: 1px solid var(--color-gray-100); font-weight: 700; }
        .action-btn:hover { background: var(--color-lime); color: var(--color-dark); border-color: var(--color-lime-dark); }
        .muted { color: var(--color-gray-500); padding: 8px 0; }
      `}</style>
    </div>
  )
}
