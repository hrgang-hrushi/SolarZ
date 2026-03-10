import Link from 'next/link'
import ClarifyTitle from './ClarifyTitle'

export default function Services() {
  const services = [
    { title: 'Rooftop solar panel installation', slug: 'rooftop-solar-panel-installation' },
    { title: 'Solar system maintenance', slug: 'solar-system-maintenance' },
    { title: 'Off grid solar installation', slug: 'off-grid-solar-installation' },
    { title: 'Solar panel cleaning services', slug: 'solar-panel-cleaning-services' },
    { title: 'Wind turbine repair services', slug: 'wind-turbine-repair-services' },
  ]

  const serviceCards = [
    {
      title: 'Rooftop solar\npanel installation',
      image: '/images/service-rooftop.png',
    },
    {
      title: 'Solar system\nmaintenance',
      image: '/images/service-wind.png',
    },
    {
      title: 'Off grid\nsolar installation',
      image: '/images/service-worker.png',
    },
  ]

  const serviceDetails = [
    {
      title: 'Solar panel cleaning services',
      desc: 'Keep your panels performing at peak efficiency with professional, safe, and thorough cleaning.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13L13 3l8 8-10 10zM14 6l4 4" /><path d="M3 21v-4l4-4" /></svg>,
    },
    {
      title: 'Off-grid solar installation',
      desc: 'Reliable off-grid solar systems designed for energy independence in remote or rural locations.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
    },
    {
      title: 'Solar inverter repair services',
      desc: 'Fast and reliable inverter repairs to restore performance and minimize downtime.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 6V5A2 2 0 0 0 17 3H7a2 2 0 0 0-2 2v1" /><path d="M4 11h16A1 1 0 0 1 21 12v3a1 1 0 0 1-1 1h-2v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z" /><rect x="8" y="15" width="8" height="2" /></svg>,
    },
    {
      title: 'Solar maintenance services',
      desc: 'Ongoing maintenance to ensure long-term efficiency, safety, and system reliability.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
    },
    {
      title: 'Wind turbine repair services',
      desc: 'Expert diagnostics and repairs to keep your wind energy systems running smoothly.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.54 15H17M21 12a1.5 1.5 0 0 0-1.5-1.5H16M21 9a2 2 0 0 0-2-2H13.6a3 3 0 0 0-2 2c0 1.6 1.3 3 3 3h4.4A1.5 1.5 0 0 1 20 13v1a2 2 0 0 1-2 2h-4a2 2 0 0 0-2 2 1.5 1.5 0 0 0 1.5 1.5H18M5 12h8" /><circle cx="5" cy="12" r="3" /></svg>,
    },
    {
      title: 'Rooftop solar panel installation',
      desc: 'Professional installation of rooftop solar panels for maximum energy generation.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>,
    },
  ]

  return (
    <>
      {/* Services Intro + Image Cards */}
      <section className="services-intro section">
        <div className="container">
          <div className="services-intro__header">
            <span className="section-label">Our Services</span>
            <ClarifyTitle
              text="Customized solar energy systems that fit your needs"
              style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 16px' }}
            />
            <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 56px' }}>
              Our team designs and installs tailored solar energy systems based on your unique energy usage, property layout, and budget—ensuring maximum efficiency, long-term savings, and energy independence.
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
            <span className="section-label">Excellent Services</span>
            <ClarifyTitle text="10+ years of experience in the solar industry" />
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
