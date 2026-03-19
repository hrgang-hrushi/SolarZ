import Link from 'next/link'
import ClarifyTitle from './ClarifyTitle'

export default function About() {
  const solutions = [
    'Curated, diligence-backed solar projects',
    'Transparent payout schedules and contracts',
    'Bank-verified escrow and settlements',
    'Live generation + revenue dashboards',
    'Compliance-first KYC/AML and audit trail',
    'Dedicated investor success support',
  ]

  return (
    <>
      <section className="about section">
        <div className="container">
          <div className="about__grid">
            <div className="about__left">
              <span className="section-label">About Solar Z</span>
              <ClarifyTitle text="Fractional solar investing built for real returns" />
              <p className="about__desc">
                Solar Z curates revenue-generating solar projects and makes them investable in fractional units. Investors get transparent yield, live performance dashboards, and compliant custody—without managing hardware, land, or maintenance.
              </p>
              <div className="about__funding">
                <span className="about__funding-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6c0-1.5 1-4 6-4s6 2.5 6 4h1.5a2.5 2.5 0 0 1 0 5H18" /><path d="M9 14v7M15 14v7M9 21h6" /><path d="M10 9a2 2 0 1 0 4 0" /></svg>
                </span>
                <span>Backed by <strong>real PPAs</strong> and <strong>audited payouts</strong></span>
              </div>
            </div>

            <div className="about__right">
              <div className="about__image-wrapper">
                <div className="about__image-placeholder">
                  <img src="/images/service-worker.png" alt="Solar energy solutions" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-xl)' }} />
                </div>
              </div>
              <div className="about__solutions">
                <h3 className="about__solutions-title">What investors get</h3>
                <ul className="about__solutions-list">
                  {solutions.map((s, i) => (
                    <li key={i} className="about__solutions-item">
                      <span className="about__check">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
                <Link href="/about" className="btn btn-dark btn-arrow" style={{ marginTop: '24px' }}>
                  About us
                  <span className="arrow-circle" style={{ background: 'var(--color-lime)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about {
          background: var(--color-off-white);
        }
        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 64px;
          align-items: start;
        }
        .about__desc {
          font-size: var(--font-size-base);
          color: var(--color-gray-500);
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .about__funding {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--color-white);
          border: 1px solid var(--color-gray-100);
          padding: 12px 20px;
          border-radius: var(--radius-full);
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
        }
        .about__funding-badge {
          font-size: 1.2rem;
        }

        .about__right {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .about__image-wrapper {
          width: 100%;
        }
        .about__image-placeholder {
          width: 100%;
          aspect-ratio: 1.6;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: linear-gradient(135deg, var(--color-gray-100), var(--color-gray-50));
        }
        .about__solutions-title {
          font-size: var(--font-size-xl);
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--color-dark);
        }
        .about__solutions-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .about__solutions-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
        }
        .about__check {
          width: 24px;
          height: 24px;
          background: var(--color-lime);
          color: var(--color-dark);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .about__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .about__solutions-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
