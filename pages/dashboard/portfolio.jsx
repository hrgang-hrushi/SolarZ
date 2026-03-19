import DashboardLayout from '../../components/DashboardLayout'

function PortfolioPage() {
  return (
    <div className="placeholder">
      <h2>Portfolio</h2>
      <p>Portfolio analytics will appear here soon.</p>
      <style jsx>{`
        .placeholder { padding: 16px; color: #f5f7f2; }
        h2 { margin: 0 0 8px; }
        p { margin: 0; color: rgba(255,255,255,0.72); }
      `}</style>
    </div>
  )
}

PortfolioPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default PortfolioPage
