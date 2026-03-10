import Link from 'next/link'
import ClarifyTitle from './ClarifyTitle'

export default function Blog() {
  const posts = [
    {
      title: 'How a high-converting solar website generates more leads',
      readTime: '4 min read',
      slug: 'how-a-high-converting-solar-website-generates-more-leads',
    },
    {
      title: 'Solar website design trends to watch in 2025',
      readTime: '3 min read',
      slug: 'solar-website-design-trends-to-watch-in-2025',
    },
    {
      title: 'Create stunning online presence for solar solutions',
      readTime: '2 min read',
      slug: 'create-stunning-online-presence-for-solar-solutions',
    },
  ]

  return (
    <>
      <section className="blog section">
        <div className="container">
          <div className="blog__header">
            <div>
              <span className="section-label">Latest News</span>
              <ClarifyTitle text="Insights and innovations in green technology" />
            </div>
            <Link href="/blog" className="btn btn-outline btn-sm blog__more">
              More news
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="blog__grid">
            {posts.map((post, i) => (
              <article key={i} className="blog__card" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="blog__card-image">
                  <div className="blog__card-image-placeholder">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary, var(--color-lime))" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    </svg>
                  </div>
                </div>
                <div className="blog__card-body">
                  <div className="blog__card-meta">
                    <span className="blog__card-source">Solar Z</span>
                    <span className="blog__card-dot">·</span>
                    <span className="blog__card-time">{post.readTime}</span>
                  </div>
                  <h4 className="blog__card-title">{post.title}</h4>
                  <span className="blog__card-link">Read More →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .blog {
          background: var(--color-white);
        }
        .blog__header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
          gap: 24px;
        }
        .blog__more {
          text-decoration: none;
          flex-shrink: 0;
        }
        .blog__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .blog__card {
          background: var(--color-off-white);
          border: 1px solid var(--color-gray-100);
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-base);
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }
        .blog__card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
        }
        .blog__card-image {
          height: 200px;
          overflow: hidden;
        }
        .blog__card-image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--color-primary-bg), #d4edc4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          transition: transform var(--transition-slow);
        }
        .blog__card:hover .blog__card-image-placeholder {
          transform: scale(1.08);
        }
        .blog__card-body {
          padding: 24px;
        }
        .blog__card-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
          font-size: var(--font-size-xs);
          color: var(--color-gray-400);
        }
        .blog__card-source {
          font-weight: 600;
          color: var(--color-primary);
        }
        .blog__card-title {
          font-size: var(--font-size-base);
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 12px;
          color: var(--color-dark);
        }
        .blog__card-link {
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--color-primary);
          transition: gap var(--transition-fast);
        }
        .blog__card:hover .blog__card-link {
          text-decoration: underline;
        }

        @media (max-width: 1024px) {
          .blog__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .blog__grid {
            grid-template-columns: 1fr;
          }
          .blog__header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  )
}
