import Link from 'next/link'
import ClarifyTitle from './ClarifyTitle'

export default function Features() {
  const features = [
    {
      title: 'Curated solar pipeline',
      description: 'Institutional-grade diligence on each plant, with PPAs, off-takers, and engineering vetted before it goes live for investors.',
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="var(--color-dark)" strokeWidth="1.5">
          <rect x="10" y="12" width="30" height="18" rx="2" />
          <path d="M10 20h30" />
          <path d="M18 30v10" /><path d="M32 30v10" />
          <path d="M44 12v14" />
        </svg>
      ),
    },
    {
      title: 'Transparent cashflows',
      description: 'Bank-verified escrow, scheduled payouts, and dashboards that track generation, revenue, and your share of distributions.',
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="var(--color-dark)" strokeWidth="1.5">
          <circle cx="20" cy="20" r="8" />
          <path d="M16 20h8M20 16v8" />
          <rect x="12" y="32" width="32" height="12" rx="3" />
          <path d="M24 32v12M32 32v12" />
        </svg>
      ),
    },
    {
      title: 'Compliance-first custody',
      description: 'KYC/AML, audit logs, and secure tokenization rails so you can invest with confidence and clear documentation.',
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="var(--color-dark)" strokeWidth="1.5">
          <path d="M18 18a10 10 0 0 1 20 0v4h-20v-4Z" />
          <rect x="14" y="22" width="28" height="18" rx="3" />
          <path d="M22 30h12" />
          <circle cx="28" cy="30" r="2" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <section className="features">
        <div className="container">
          <div className="features__grid">
            <div className="features__left">
              <span className="section-label">Why Solar Z</span>
              <ClarifyTitle text="Invest in solar, without building a plant yourself" className="section-title" />
              <Link href="/contact" className="btn btn-dark btn-arrow">
                Get started now
                <span className="arrow-circle" style={{ background: 'var(--color-white)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </span>
              </Link>
            </div>

            <div className="features__right">
              {features.map((f, i) => (
                <div key={i} className="features__item">
                  <div className="features__icon">{f.icon}</div>
                  <div className="features__item-content">
                    <h3 className="features__item-title">{f.title}</h3>
                    <p className="features__item-desc">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .features {
          background: var(--color-lime);
          padding: 100px 0;
        }
        .features :global(.section-label) {
          background: rgba(0,0,0,0.08);
          color: var(--color-dark);
        }
        .features__grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: start;
        }
        .features__left {
          position: sticky;
          top: 120px;
        }
        .features__title {
          font-size: var(--font-size-5xl);
          font-weight: 500;
          line-height: 1.08;
          color: var(--color-dark);
          margin-bottom: 36px;
          letter-spacing: -0.02em;
        }
        .features__right {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .features__item {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }
        .features__icon {
          flex-shrink: 0;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .features__item-content {
          flex: 1;
        }
        .features__item-title {
          font-size: var(--font-size-xl);
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--color-dark);
        }
        .features__item-desc {
          font-size: var(--font-size-sm);
          color: rgba(0,0,0,0.65);
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .features__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .features__left {
            position: static;
          }
          .features__title {
            font-size: var(--font-size-3xl);
          }
        }
      `}</style>
    </>
  )
}
