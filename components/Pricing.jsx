import { useState } from 'react'
import Link from 'next/link'
import ClarifyTitle from './ClarifyTitle'

export default function Pricing() {
  const [activePlan, setActivePlan] = useState(1)

  const plans = [
    {
      name: 'Starter Investor',
      price: '₹10k min',
      period: 'Per project ticket',
      description: 'Dip your toes with smaller tickets into curated solar assets. Great for first-time investors exploring the platform.',
      features: [
        { label: 'Access to open solar projects', included: true },
        { label: 'Standard payouts (quarterly)', included: true },
        { label: 'Live performance dashboard', included: true },
        { label: 'Email support', included: true },
        { label: 'Priority liquidity support', included: false },
      ],
    },
    {
      name: 'Growth Investor',
      price: '₹50k min',
      period: 'Per project ticket',
      popular: true,
      description: 'Build a diversified solar portfolio with faster support and enhanced reporting for payouts and tax readiness.',
      features: [
        { label: 'All Starter benefits', included: true },
        { label: 'Priority KYC & onboarding', included: true },
        { label: 'Enhanced payout statements', included: true },
        { label: 'Portfolio diversification guidance', included: true },
        { label: 'Dedicated CSM', included: false },
      ],
    },
    {
      name: 'Institutional',
      price: '₹5L+ commits',
      period: 'Custom mandates',
      description: 'For family offices and funds needing structured allocations, custom reporting, and white-glove operations.',
      features: [
        { label: 'All Growth benefits', included: true },
        { label: 'Custom mandates & allocations', included: true },
        { label: 'Dedicated CSM & SLA', included: true },
        { label: 'Bank/escrow integrations', included: true },
        { label: 'API/export for reporting', included: true },
      ],
    },
  ]

  return (
    <>
      <section className="pricing section">
        <div className="container">
          <div className="pricing__layout">
            <div className="pricing__left">
              <span className="section-label">Investment tiers</span>
              <ClarifyTitle text="Pick the ticket size that fits your strategy" />
              <div className="pricing__buttons">
                <Link href="/contact" className="btn btn-lime btn-arrow">
                  Get in touch
                  <span className="arrow-circle" style={{ background: 'var(--color-dark)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </span>
                </Link>
              </div>
            </div>

            <div className="pricing__right">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={`pricing__card${i === activePlan ? ' pricing__card--active' : ''}`}
                  onClick={() => setActivePlan(i)}
                >
                  <div className="pricing__card-left">
                    <h3 className="pricing__plan-name">{plan.name}</h3>
                    <div className="pricing__price">
                      <strong>{plan.price}</strong>
                      <span>{plan.period}</span>
                    </div>
                    <p className="pricing__plan-desc">{plan.description}</p>
                    <Link href="/contact" className="btn btn-dark">
                      Purchase plan
                    </Link>
                  </div>
                  <div className="pricing__card-right">
                    <h4 className="pricing__whats-included">Whats included ?</h4>
                    <ul className="pricing__features">
                      {plan.features.map((f, j) => (
                        <li key={j} className="pricing__feature-item">
                          <span className={`pricing__feature-icon${f.included ? ' pricing__feature-icon--yes' : ''}`}>
                            {f.included ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            )}
                          </span>
                          {f.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .pricing {
          background: var(--color-white);
        }
        .pricing__layout {
          display: grid;
          grid-template-columns: 0.4fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .pricing__left {
          position: sticky;
          top: 120px;
        }
        .pricing__buttons {
          margin-top: 32px;
        }
        .pricing__right {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .pricing__card {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          background: var(--color-off-white);
          border: 1px solid var(--color-gray-100);
          border-radius: var(--radius-xl);
          padding: 40px;
          transition: all var(--transition-base);
          cursor: pointer;
        }
        .pricing__card--active {
          border-color: var(--color-dark);
          box-shadow: var(--shadow-md);
        }
        .pricing__plan-name {
          font-size: var(--font-size-xl);
          font-weight: 700;
          margin-bottom: 12px;
        }
        .pricing__price {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 16px;
        }
        .pricing__price strong {
          font-size: var(--font-size-4xl);
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .pricing__price span {
          font-size: var(--font-size-sm);
          color: var(--color-gray-500);
        }
        .pricing__plan-desc {
          font-size: var(--font-size-sm);
          color: var(--color-gray-500);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .pricing__whats-included {
          font-size: var(--font-size-base);
          font-weight: 700;
          margin-bottom: 20px;
        }
        .pricing__features {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .pricing__feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
        }
        .pricing__feature-icon {
          width: 22px;
          height: 22px;
          background: var(--color-gray-200);
          color: var(--color-gray-500);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .pricing__feature-icon--yes {
          background: var(--color-lime);
          color: var(--color-dark);
        }

        @media (max-width: 1024px) {
          .pricing__layout {
            grid-template-columns: 1fr;
          }
          .pricing__left {
            position: static;
          }
        }
        @media (max-width: 768px) {
          .pricing__card {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 24px;
          }
        }
      `}</style>
    </>
  )
}
