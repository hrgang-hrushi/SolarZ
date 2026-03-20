import { useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import { useAuth } from '../../context/AuthContext'

export default function AdminSettings() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const redirect = encodeURIComponent(router.asPath)
      router.replace(`/login?redirect=${redirect}`)
    }
  }, [loading, isAuthenticated, router])

  if (loading || !isAuthenticated) return <div className="admin-loader">Loading settings…</div>

  return (
    <div className="admin-page">
      <header className="actions">
        <div>
          <h2>Settings</h2>
          <p>Platform flags, disclosures, and branding.</p>
        </div>
        <div className="action-buttons">
          <button className="ghost">Discard</button>
          <button className="primary">Save</button>
        </div>
      </header>

      <section className="card form">
        <h3>Platform</h3>
        <label>Brand name
          <input defaultValue="Solarify" />
        </label>
        <label>Support email
          <input defaultValue="support@solarify.example" />
        </label>
        <label>App URL
          <input defaultValue="https://solarify.example" />
        </label>
      </section>

      <section className="card form">
        <h3>Compliance</h3>
        <label className="check"><input type="checkbox" defaultChecked /> Require KYC before investment</label>
        <label className="check"><input type="checkbox" defaultChecked /> Show risk disclosure on invest flow</label>
        <label className="check"><input type="checkbox" /> Escrow/wallet mode enabled</label>
        <label className="check"><input type="checkbox" defaultChecked /> ESG education page linked</label>
      </section>

      <section className="card form">
        <h3>API keys (placeholder)</h3>
        <label>JWT secret
          <input type="password" defaultValue="•••••••" />
        </label>
        <label>Payment provider key
          <input placeholder="Add when payments are live" />
        </label>
      </section>

      <style jsx>{`
        .admin-page { display: flex; flex-direction: column; gap: 14px; }
        .actions { display: flex; justify-content: space-between; align-items: center; }
        .action-buttons { display: flex; gap: 10px; }
        .ghost { padding: 10px 12px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #f5f7f2; font-weight: 700; }
        .primary { padding: 10px 14px; border-radius: 10px; background: linear-gradient(135deg, #d4ed31, #c1d92a); color: #111; font-weight: 800; border: none; }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 14px; }
        .form { display: grid; gap: 10px; }
        label { display: grid; gap: 6px; font-size: 14px; color: rgba(255,255,255,0.82); }
        input { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 9px; color: #f5f7f2; }
        .check { display: flex; align-items: center; gap: 8px; }
      `}</style>
    </div>
  )
}

AdminSettings.getLayout = function getLayout(page) {
  return <AdminLayout title="Settings" subtitle="Platform flags and compliance">{page}</AdminLayout>
}
