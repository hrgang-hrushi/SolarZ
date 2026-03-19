import Link from 'next/link'

function ClarifyWord({ children, delay, accent }) {
  return (
    <span
      className={`clarify-word${accent ? ' hero__title-accent' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  )
}

export default function Hero() {
  const titleLine1 = ['Invest', 'in']
  const titleLine2 = ['fractional', 'solar']
  const titleLine3 = [{ text: 'assets', accent: true }, { text: 'with', accent: false }, { text: 'Solar', accent: true }, { text: 'Z', accent: true }]

  const subtitleWords = 'Own a slice of revenue-generating solar projects with transparent payouts, live performance dashboards, and bank-grade compliance built in.'.split(' ')

  const baseDelay = 0.1
  const gap = 0.07

  // Pre-compute offsets for each group
  const line1Start = 0
  const line2Start = titleLine1.length
  const line3Start = line2Start + titleLine2.length
  const subStart = line3Start + titleLine3.length
  const actionsDelay = baseDelay + (subStart + subtitleWords.length) * gap

  return (
    <>
      <section className="hero">
        <div className="hero__bg">
          <img src="/images/hero-bg-sunset.jpg" alt="Solar panel farm at sunset" className="hero__bg-img" />
          <div className="hero__overlay" />
        </div>

        <div className="container hero__content">
          <h1 className="hero__title">
            {titleLine1.map((w, i) => (
              <ClarifyWord key={i} delay={baseDelay + (line1Start + i) * gap}>{w}</ClarifyWord>
            ))}
            <br />
            {titleLine2.map((w, i) => (
              <ClarifyWord key={i} delay={baseDelay + (line2Start + i) * gap}>{w}</ClarifyWord>
            ))}
            <br />
            {titleLine3.map((w, i) => (
              <ClarifyWord key={i} delay={baseDelay + (line3Start + i) * gap} accent={w.accent}>{w.text}</ClarifyWord>
            ))}
          </h1>

          <div className="hero__content-bottom">
            <div className="hero__subtitle-col">
              <p className="hero__subtitle">
                {subtitleWords.map((w, i) => (
                  <ClarifyWord key={i} delay={baseDelay + (subStart + i) * gap}>{w}</ClarifyWord>
                ))}
              </p>
            </div>

            <div className="hero__actions-col hero__clarify" style={{ animationDelay: `${actionsDelay}s` }}>
              {/* Explore Button Placeholder */}
              <div id="hero-action-placeholder" style={{ minWidth: '200px' }}></div>

              <div className="hero__explore-wrap">
                <Link href="/service" style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', fontWeight: 600, fontSize: '15px', color: '#1a1a1a', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#1a1a1a' }}>Explore now</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', background: '#c8ee44', borderRadius: '50%', color: '#1a1a1a', fontSize: '18px', flexShrink: 0 }}>→</span>
                </Link>
              </div>

              <div className="hero__reviews">
                <div className="hero__avatars">
                  {['/images/blog-1.png', '/images/blog-2.png', '/images/service-worker.png'].map((src, i) => (
                    <span key={i} className="hero__avatar">
                      <img src={src} alt="" />
                    </span>
                  ))}
                </div>
                <div className="hero__review-data">
                  <div className="hero__review-top">100+ reviews</div>
                  <div className="hero__review-score">4.96 of 5</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="hero__bg-text">
          <span className="hero__bg-text-track">
            Solar Z &nbsp;&nbsp; Solar Z &nbsp;&nbsp; Solar Z &nbsp;&nbsp; Solar Z &nbsp;&nbsp; Solar Z &nbsp;&nbsp; Solar Z &nbsp;&nbsp;
          </span>
        </div>
      </section>

      {/* Marquee bar */}
      <div className="hero__marquee-bar">
        <div className="marquee-container">
          <div className="marquee-track" style={{ animationDuration: '20s' }}>
            {[...Array(6)].map((_, i) => (
              <span key={i} className="hero__marquee-item">
                <span className="hero__marquee-dot">●</span> Fractional ownership
                <span className="hero__marquee-dot">●</span> Targeted 14–18% IRR
                <span className="hero__marquee-dot">●</span> Bank-verified payouts
                <span className="hero__marquee-dot">●</span> Live generation data
                <span className="hero__marquee-dot">●</span> ESG-aligned returns
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: flex-end;
          padding: 0;
          overflow: hidden;
        }
        .hero__bg {
          position: absolute;
          inset: 0;
        }
        .hero__bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.2) 0%,
            rgba(0,0,0,0.35) 40%,
            rgba(0,0,0,0.7) 100%
          );
        }

        .hero__content {
          position: relative;
          z-index: 2;
          color: var(--color-white);
          margin-left: 0;
          padding-left: 40px;
          padding-right: 0px;
          max-width: 100%;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-bottom: 50px;
        }
        .hero__title {
          font-size: 6rem;
          font-weight: 500;
          line-height: 0.9;
          margin-bottom: 40px;
          max-width: 900px;
          letter-spacing: -0.04em;
          text-align: left;
        }

        /* ---------- Clarify word-by-word animation ---------- */
        @keyframes clarify {
          0% {
            opacity: 0;
            filter: blur(12px);
            transform: translateY(14px);
          }
          50% {
            opacity: 0.7;
            filter: blur(4px);
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0);
          }
        }
        .hero__title :global(.clarify-word),
        .hero__subtitle :global(.clarify-word) {
          display: inline-block;
          opacity: 0;
          animation: clarify 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          margin-right: 0.27em;
        }
        .hero__clarify {
          opacity: 0;
          animation: clarify 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero__title :global(.hero__title-accent) {
          color: var(--color-lime);
        }
        .hero__content-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          gap: 60px;
        }
        .hero__subtitle-col {
          flex: 1;
          max-width: 480px;
        }
        .hero__subtitle {
          font-size: var(--font-size-base);
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
          margin: 0;
        }
        .hero__actions-col {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        .hero__explore-wrap {
          display: inline-flex;
          align-items: center;
          background: #ffffff;
          border-radius: 100px;
          padding: 5px 5px 5px 28px;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 0 0px 0px rgba(200,238,68,0);
        }
        .hero__explore-wrap:hover {
          transform: scale(1.04);
          animation: glowSpread 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes glowSpread {
          0% {
            box-shadow: 0 0 0px 0px rgba(200,238,68,0.05);
          }
          15% {
            box-shadow: 0 0 8px 2px rgba(200,238,68,0.12);
          }
          35% {
            box-shadow: 0 0 18px 6px rgba(200,238,68,0.2);
          }
          55% {
            box-shadow: 0 0 28px 10px rgba(200,238,68,0.28);
          }
          75% {
            box-shadow: 0 0 40px 15px rgba(200,238,68,0.35);
          }
          100% {
            box-shadow: 0 0 55px 22px rgba(200,238,68,0.4);
          }
        }
        .hero__explore-wrap:active {
          transform: scale(0.98);
        }
        .hero__explore-link {
          display: inline-flex;
          align-items: center;
          gap: 24px;
          font-weight: 700;
          font-size: 18px;
          color: #1a1a1a;
          text-decoration: none;
          white-space: nowrap;
        }
        .hero__explore-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          background: #c8ee44;
          border-radius: 14px;
          color: #1a1a1a;
          font-size: 22px;
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .hero__explore-wrap:hover .hero__explore-arrow {
          transform: translateX(4px);
          background: #d4f355;
        }
        .hero__reviews {
          display: flex;
          align-items: center;
          gap: 4px;
          padding-bottom: 4px;
          margin-right: 40px;
        }
        .hero__avatars {
          display: flex;
        }
        .hero__avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-left: -15px;
          border: 2px solid rgba(255,255,255,0.1);
        }
        .hero__avatar:first-child { margin-left: 0; }
        .hero__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero__review-data {
          color: var(--color-white);
        }
        .hero__review-top {
          font-size: 14px;
          font-weight: 700;
        }
        .hero__review-score {
          font-size: 12px;
          color: var(--color-lime);
          font-weight: 600;
        }
        .hero__framer-badge {
          background: var(--color-white);
          color: var(--color-dark);
          padding: 10px 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          height: fit-content;
          margin-bottom: 2px;
        }
        
        .hero__bg-text {
          position: absolute;
          bottom: -40px;
          left: 0;
          width: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }
        .hero__bg-text-track {
          display: inline-block;
          font-size: 250px;
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.2);
          line-height: 1;
          white-space: nowrap;
          animation: bgTextScroll 25s linear infinite;
        }
        @keyframes bgTextScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .hero__marquee-bar {
          background: var(--color-lime);
          color: var(--color-dark);
          padding: 14px 0;
          font-size: var(--font-size-sm);
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .hero__marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 0 24px;
        }
        .hero__marquee-dot {
          font-size: 6px;
          opacity: 0.5;
        }

        @media (max-width: 1024px) {
          .hero__title { font-size: var(--font-size-5xl); }
        }
        @media (max-width: 768px) {
          .hero {
            min-height: 85vh;
            padding-bottom: 60px;
          }
          .hero__title { 
            font-size: 3.5rem; 
            margin-bottom: 24px;
          }
          .hero__bg-text-track {
            font-size: 100px;
          }
          .hero__bg-text {
            bottom: 0;
          }
          .hero__content-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }
          .hero__subtitle { font-size: var(--font-size-sm); }
          .hero__actions { 
            width: 100%;
            justify-content: space-between;
          }
          .hero__framer-badge {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
