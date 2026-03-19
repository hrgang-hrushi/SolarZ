import Link from 'next/link'
import ClarifyTitle from './ClarifyTitle'

export default function Services() {
  const services = [
    { title: 'Curated solar projects', slug: 'curated-solar-projects' },
    { title: 'Fractional investment units', slug: 'fractional-investment-units' },
    { title: 'Bank-verified payouts', slug: 'bank-verified-payouts' },
    { title: 'Live performance dashboards', slug: 'live-performance-dashboards' },
    { title: 'Compliance-first KYC/AML', slug: 'compliance-first-kyc-aml' },
  ]

  const serviceCards = [
    {
      title: 'Diligence-backed\nsolar pipeline',
      image: '/images/service-rooftop.png',
    },
    {
      title: 'Transparent\ncashflow rails',
      image: '/images/service-wind.png',
    },
    {
      title: 'Monitoring &\nreporting suite',
      image: '/images/service-worker.png',
    },
  ]

  const serviceDetails = [
    {
      title: 'Sourcing & diligence',
      desc: 'We underwrite each plant—PPAs, off-takers, EPC partners, warranties, and generation history—before it goes live on Solar Z.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v12H4z" /><path d="M9 8h6" /><path d="M9 12h6" /><path d="M4 20h16" /></svg>,
    },
    {
      title: 'Fractional issuance',
      desc: 'Projects are broken into microshares with clear terms, expected IRR, and payout cadence—so you can size your ticket precisely.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="12" r="3" /><circle cx="16" cy="12" r="3" /><path d="M11 12h2" /></svg>,
    },
    {
      title: 'Cashflow operations',
      desc: 'Bank-verified escrow, automated reconciliations, and scheduled disbursals keep payouts timely and auditable.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10h18v10H3z" /><path d="M7 10V6a5 5 0 0 1 10 0v4" /><path d="M12 14v2" /><path d="M9 14h6" /></svg>,
    },
    {
      title: 'Live performance data',
      desc: 'Generation, downtime, and revenue dashboards give you real-time confidence in asset performance.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v12H3z" /><path d="M7 9l2.5 2.5L13 8l4 4" /><path d="M3 19h18" /></svg>,
    },
    {
      title: 'Compliance & KYC/AML',
      desc: 'Integrated KYC/AML, audit logs, and role-based access keep investors and regulators aligned.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a4 4 0 0 0-4 4v2h8V7a4 4 0 0 0-4-4Z" /><path d="M6 9h12v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z" /><path d="M10 14h4" /></svg>,
    },
    {
      title: 'Investor success',
      desc: 'White-glove support for onboarding, payouts, statements, and tax-ready reports.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" /><path d="M3 21a9 9 0 0 1 18 0" /></svg>,
    },
  ]

  return (
    <>
      {/* Services Intro + Image Cards */}
      <section className="services-intro section">
        <div className="container">
          <div className="services-intro__header">
            <span className="section-label">How Solar Z works</span>
            <ClarifyTitle
              text="Invest in solar without building or operating a plant"
              style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 16px' }}
            />
            <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 56px' }}>
              We source, diligence, and operate revenue-generating solar projects—then open them up as fractional, compliance-ready investments with transparent payouts and live performance data.
            </p>
          </div>

          <div className="services-intro__cards">
            {serviceCards.map((card, i) => (
              <div key={i} className="services-intro__card">
                <img src={card.image} alt={card.title} className="services-intro__card-img" />
                <div className="services-intro__card-overlay" />
                <div className="services-intro__card-content">
                  <div className="services-intro__card-icon">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--color-lime)" strokeWidth="1.5">
                      <circle cx="10" cy="8" r="4" /><path d="M10 4v-2" /><path d="M10 12v2" />
                      <rect x="4" y="18" width="14" height="10" rx="1" />
                      <path d="M24 14l4-2v12l-4-2z" />
                    </svg>
                  </div>
                  <h3 className="services-intro__card-title" style={{ whiteSpace: 'pre-line' }}>{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Marquee */}
      <div className="services-marquee__track">
        <div className="marquee-container">
          <div className="marquee-track" style={{ animationDuration: '25s' }}>
            {[...services, ...services, ...services].map((s, i) => (
              <span key={i} className="services-marquee__item">
                <span className="services-marquee__arrow">→</span>
                {s.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Service Detail Cards */}
      <section className="services-detail section">
        <div className="container">
          <div className="services-detail__header">
            <span className="section-label">Built for investors</span>
            <ClarifyTitle text="From sourcing to payouts, all in one platform" />
          </div>
          <div className="services-detail__grid">
            {serviceDetails.map((s, i) => (
              <div key={i} className="services-detail__card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="services-detail__card-icon">{s.icon}</div>
                <h4 className="services-detail__card-title">{s.title}</h4>
                <p className="services-detail__card-desc">{s.desc}</p>
                <span className="services-detail__card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-intro {
          background: var(--color-white);
          text-align: center;
        }
        .services-intro__cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .services-intro__card {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          aspect-ratio: 0.85;
          cursor: pointer;
        }
        .services-intro__card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }
        .services-intro__card:hover .services-intro__card-img {
          transform: scale(1.05);
        }
        .services-intro__card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%);
        }
        .services-intro__card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 28px;
          text-align: left;
        }
        .services-intro__card-icon {
          margin-bottom: 12px;
        }
        .services-intro__card-title {
          font-size: var(--font-size-2xl);
          font-weight: 800;
          color: var(--color-white);
          line-height: 1.2;
        }

        .services-marquee__track {
          padding: 20px 0;
          border-top: 1px solid var(--color-gray-200);
          border-bottom: 1px solid var(--color-gray-200);
          background: var(--color-off-white);
        }
        .services-marquee__item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 0 32px;
          font-size: var(--font-size-lg);
          font-weight: 600;
          color: var(--color-dark);
          white-space: nowrap;
        }
        .services-marquee__arrow {
          color: var(--color-lime-dark);
          font-size: 1.2rem;
        }

        .services-detail {
          background: var(--color-off-white);
        }
        .services-detail__header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 56px;
        }
        .services-detail__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .services-detail__card {
          background: var(--color-white);
          border: 1px solid var(--color-gray-100);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          position: relative;
          transition: all var(--transition-base);
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }
        .services-detail__card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-dark);
        }
        .services-detail__card-icon {
          width: 48px;
          height: 48px;
          background: var(--color-off-white);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          margin-bottom: 18px;
        }
        .services-detail__card-title {
          font-size: var(--font-size-base);
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--color-dark);
        }
        .services-detail__card-desc {
          font-size: var(--font-size-sm);
          color: var(--color-gray-500);
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .services-detail__card-arrow {
          color: var(--color-gray-300);
          transition: all var(--transition-base);
        }
        .services-detail__card:hover .services-detail__card-arrow {
          color: var(--color-dark);
        }

        @media (max-width: 1024px) {
          .services-intro__cards {
            grid-template-columns: repeat(2, 1fr);
          }
          .services-detail__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .services-intro__cards,
          .services-detail__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
