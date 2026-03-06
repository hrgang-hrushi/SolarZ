export default function MarqueeBand() {
  const topItems = ['Future with the Sun', 'Power of Solar Innovation', 'Renewable Energy', 'Green Technology']
  const bottomItems = ['Solar Solutions', 'Sun Energy', 'Bright Tomorrow', 'Renewable Revolution', 'Clean Energy']

  return (
    <>
      <section className="marquee-band">
        <div className="marquee-band__top">
          <div className="marquee-container">
            <div className="marquee-track" style={{ animationDuration: '28s' }}>
              {[...topItems, ...topItems, ...topItems, ...topItems].map((item, i) => (
                <span key={i} className="marquee-band__item">
                  <span className="marquee-band__star">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" /></svg>
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="marquee-band__bottom">
          <div className="marquee-container">
            <div className="marquee-track-reverse" style={{ animationDuration: '28s' }}>
              {[...bottomItems, ...bottomItems, ...bottomItems, ...bottomItems].map((item, i) => (
                <span key={i} className="marquee-band__item marquee-band__item--light">
                  <span className="marquee-band__star">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" /></svg>
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .marquee-band {
          overflow: hidden;
        }
        .marquee-band__top {
          padding: 18px 0;
          background: var(--color-off-white);
          border-top: 1px solid var(--color-gray-200);
          border-bottom: 1px solid var(--color-gray-200);
        }
        .marquee-band__bottom {
          padding: 18px 0;
          background: var(--color-dark);
        }
        .marquee-band__item {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 0 32px;
          font-size: var(--font-size-xl);
          font-weight: 700;
          color: var(--color-dark);
          white-space: nowrap;
        }
        .marquee-band__item--light {
          color: var(--color-white);
        }
        .marquee-band__star {
          font-size: 0.9rem;
          opacity: 0.6;
        }
      `}</style>
    </>
  )
}
