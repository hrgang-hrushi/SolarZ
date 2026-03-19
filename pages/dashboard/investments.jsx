import DashboardLayout from '../../components/DashboardLayout'

function InvestmentsPage() {
  return (
    <div className="placeholder">
      <h2>Investments</h2>
      <p>We’re preparing a detailed view of all your allocations and cashflows.</p>
      <style jsx>{`
        .placeholder { padding: 16px; color: #f5f7f2; }
        h2 { margin: 0 0 8px; }
        p { margin: 0; color: rgba(255,255,255,0.72); }
      `}</style>
    </div>
  )
}

InvestmentsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default InvestmentsPage
