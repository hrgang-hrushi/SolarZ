import Link from 'next/link'

export default function Team() {
  const members = [
    { name: 'James Carter', role: 'Chief Executive Officer', image: '/images/blog-1.png' },
    { name: 'Emily Johnson', role: 'Chief Technology Officer', image: '/images/blog-2.png' },
    { name: 'Michael Brown', role: 'Product Director', image: '/images/service-worker.png' },
    { name: 'Amy Walker', role: 'Sales Manager', image: '/images/blog-1.png' },
    { name: 'Liam Harris', role: 'Growth Strategist', image: '/images/blog-2.png' },
    { name: 'Mia Walker', role: 'Client Relations Manager', image: '/images/service-worker.png' },
    { name: 'Noah Lewis', role: 'Sales Manager', image: '/images/blog-1.png' },
  ]

  return (
    <>
      <section className="team section">
        <div className="container">
          <div className="team__grid">
            {/* Intro card */}
            <div className="team__intro-card">
              <div className="team__intro-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--color-lime)" strokeWidth="1.5">
                  <circle cx="24" cy="16" r="8" />
                  <path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" />
                </svg>
              </div>
              <h2 className="team__intro-title">Our awarded speakers & mentors</h2>
              <Link href="/about" className="btn btn-lime btn-arrow btn-sm">
                View all member
                <span className="arrow-circle" style={{ background: 'var(--color-dark)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </span>
              </Link>
            </div>

            {/* Member cards */}
            {members.map((m, i) => (
              <div key={i} className="team__card">
                <div className="team__avatar">
                  <img src={m.image} alt={m.name} />
                </div>
                <h4 className="team__name">{m.name}</h4>
                <p className="team__role">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .team {
          background: var(--color-off-white);
        }
        .team__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .team__intro-card {
          background: var(--color-dark);
          border-radius: var(--radius-xl);
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 380px;
        }
        .team__intro-icon {
          margin-bottom: 24px;
        }
        .team__intro-title {
          font-size: var(--font-size-2xl);
          font-weight: 800;
          color: var(--color-white);
          line-height: 1.2;
          margin-bottom: 24px;
        }
        .team__card {
          text-align: center;
        }
        .team__avatar {
          width: 100%;
          aspect-ratio: 0.85;
          border-radius: var(--radius-xl);
          overflow: hidden;
          margin-bottom: 14px;
          background: var(--color-gray-100);
        }
        .team__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .team__name {
          font-size: var(--font-size-base);
          font-weight: 700;
          margin-bottom: 2px;
          color: var(--color-dark);
        }
        .team__role {
          font-size: var(--font-size-sm);
          color: var(--color-gray-400);
        }

        @media (max-width: 1024px) {
          .team__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .team__grid {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  )
}
