import DashboardLayout from '../../components/DashboardLayout'

function SettingsPage() {
  return (
    <div className="placeholder">
      <h2>Settings</h2>
      <p>Account preferences, payouts, and security controls will live here.</p>
      <style jsx>{`
        .placeholder { padding: 16px; color: #f5f7f2; }
        h2 { margin: 0 0 8px; }
        p { margin: 0; color: rgba(255,255,255,0.72); }
      `}</style>
    </div>
  )
}

SettingsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default SettingsPage
