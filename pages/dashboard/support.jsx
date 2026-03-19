import DashboardLayout from '../../components/DashboardLayout'

function SupportPage() {
  return (
    <div className="placeholder">
      <h2>Support</h2>
      <p>Need help? Raise a ticket or book a call with our team.</p>
      <style jsx>{`
        .placeholder { padding: 16px; color: #f5f7f2; }
        h2 { margin: 0 0 8px; }
        p { margin: 0; color: rgba(255,255,255,0.72); }
      `}</style>
    </div>
  )
}

SupportPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default SupportPage
