export default function Partners() {
    const logos = [
        'Logoipsum', 'Logoipsum', 'Logoipsum', 'Logoipsum', 'Logoipsum', 'Logoipsum',
        'Logoipsum', 'Logoipsum', 'Logoipsum', 'Logoipsum', 'Logoipsum', 'Logoipsum',
    ]

    return (
        <>
            <section className="partners">
                <div className="container">
                    <p className="partners__text">Supported by the world's top venture capitalists</p>
                </div>
                <div className="partners__logos">
                    <div className="marquee-container">
                        <div className="marquee-track" style={{ animationDuration: '35s' }}>
                            {logos.map((logo, i) => (
                                <span key={i} className="partners__logo-item">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect width="24" height="24" rx="4" fill="var(--color-gray-300)" />
                                        <rect x="4" y="8" width="16" height="2" rx="1" fill="var(--color-gray-400)" />
                                        <rect x="4" y="13" width="10" height="2" rx="1" fill="var(--color-gray-400)" />
                                    </svg>
                                    <span>{logo}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .partners {
          padding: 60px 0 40px;
          background: var(--color-off-white);
          text-align: center;
        }
        .partners__text {
          font-size: var(--font-size-lg);
          color: var(--color-gray-500);
          margin-bottom: 32px;
        }
        .partners__logos {
          border-top: 1px solid var(--color-gray-100);
          padding-top: 24px;
        }
        .partners__logo-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 40px;
          font-size: var(--font-size-lg);
          font-weight: 700;
          color: var(--color-gray-400);
          white-space: nowrap;
        }
      `}</style>
        </>
    )
}
