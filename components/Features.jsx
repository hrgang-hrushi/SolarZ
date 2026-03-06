import Link from 'next/link'

export default function Features() {
  const features = [
    {
      title: 'Five year warranty',
      description: 'Enjoy peace of mind with our comprehensive five-year warranty covering performance, durability, and system reliability—so your investment stays protected long after installation.',
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="var(--color-dark)" strokeWidth="1.5">
          <rect x="12" y="18" width="22" height="18" rx="2" />
          <path d="M12 24h22" />
          <line x1="16" y1="30" x2="24" y2="30" />
          <circle cx="40" cy="18" r="6" />
          <path d="M40 15v6" /><path d="M37 18h6" />
          <path d="M18 36v6l4-2 4 2v-6" />
        </svg>
      ),
    },
    {
      title: 'Parts and maintenance',
      description: 'We provide ongoing maintenance and high-quality replacement parts to ensure your energy system operates efficiently, safely, and at peak performance year after year.',
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="var(--color-dark)" strokeWidth="1.5">
          <circle cx="28" cy="12" r="5" />
          <path d="M28 7v-2" /><path d="M28 17v2" />
          <path d="M23 12h-2" /><path d="M35 12h-2" />
          <rect x="14" y="24" width="28" height="20" rx="2" />
          <path d="M22 30l4 4 8-8" />
        </svg>
      ),
    },
    {
      title: 'Sustainable energy',
      description: 'Our solutions are built around clean, renewable energy technologies that help reduce carbon footprints while delivering long-term savings and energy independence.',
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="var(--color-dark)" strokeWidth="1.5">
          <circle cx="24" cy="12" r="5" />
          <path d="M24 7v-2" /><path d="M24 17v2" />
          <rect x="14" y="24" width="16" height="10" rx="1" />
          <path d="M18 34v8" /><path d="M26 34v8" />
          <path d="M36 20l-4 8h6l-4 8" strokeWidth="2" />
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
              <span className="section-label">Excellent Services</span>
              <h2 className="features__title">
                Innovations in green technology and environmental solutions
              </h2>
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
          font-weight: 800;
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
