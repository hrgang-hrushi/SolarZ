export default function FunFact() {
    const stats = [
        { number: '10+', label: 'years of experience' },
        { number: '500+', label: 'solar systems installed' },
        { number: '200+', label: 'satisfied clients' },
        { number: '50MW+', label: 'clean energy generated' },
    ]

    return (
        <>
            <section className="funfact section">
                <div className="container">
                    <div className="funfact__header">
                        <span className="section-label">Fun Fact</span>
                    </div>
                    <div className="funfact__grid">
                        {stats.map((s, i) => (
                            <div key={i} className="funfact__item">
                                <span className="funfact__number">{s.number}</span>
                                <span className="funfact__label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
        .funfact {
          background: var(--color-white);
        }
        .funfact__header {
          text-align: center;
          margin-bottom: 56px;
        }
        .funfact__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          text-align: center;
        }
        .funfact__item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .funfact__number {
          font-size: var(--font-size-5xl);
          font-weight: 900;
          color: var(--color-dark);
          letter-spacing: -0.03em;
        }
        .funfact__label {
          font-size: var(--font-size-base);
          color: var(--color-gray-500);
          text-transform: capitalize;
        }

        @media (max-width: 768px) {
          .funfact__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
        </>
    )
}
