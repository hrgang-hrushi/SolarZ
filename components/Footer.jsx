import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            {/* About Column */}
            <div className="footer__col footer__col--about">
              <Link href="/" className="footer__logo">
                <span className="footer__logo-icon">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="18" fill="var(--color-lime)" />
                    <path d="M18 8l3 8h-2v4l-4-6h2V8z" fill="var(--color-dark)" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="footer__logo-text">Solar Z</span>
              </Link>
              <h4 className="footer__title">About Solar Z</h4>
              <p className="footer__desc">
                Solar Z is a professional and conversion-focused Framer template designed for solar panel companies, renewable energy providers, electrical installers, and clean-tech businesses.
              </p>
            </div>

            {/* Links Column */}
            <div className="footer__col">
              <h4 className="footer__title">Useful links</h4>
              <ul className="footer__links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/service">Services</Link></li>
                <li><Link href="/about">Team</Link></li>
                <li><Link href="/blog">News</Link></li>
                <li><Link href="/contact">Contact us</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="footer__col">
              <h4 className="footer__title">Contact information</h4>
              <ul className="footer__contact">
                <li>
                  1635 Franklin Street Montgomery,<br />Near Sherwood Mall. AL 36104
                </li>
                <li><a href="mailto:info@solarz.com">info@solarz.com</a></li>
                <li><a href="tel:+1234567890">+123-456-7890</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="footer__col footer__col--newsletter">
              <h4 className="footer__title">Our newsletter</h4>
              <p className="footer__desc" style={{ marginBottom: '20px' }}>
                Sign up to our newsletter to get the latest news and offers.
              </p>
              <form className="footer__form" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Your email address" required className="footer__input" />
                <button type="submit" className="footer__submit">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="footer__bottom">
            <div className="footer__copyright">
              Copyright © {new Date().getFullYear()} Solar Z all rights reserved.
            </div>
            <div className="footer__legal">
              <Link href="/privacy">Privacy policy</Link>
              <Link href="/cookies">Cookie policy</Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background: var(--color-dark-footer);
          color: var(--color-white);
          padding: 80px 0 32px;
        }
        .footer__grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 48px;
          margin-bottom: 64px;
        }
        .footer__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: var(--font-size-xl);
          color: var(--color-white);
          text-decoration: none;
          margin-bottom: 32px;
        }
        .footer__title {
          font-size: var(--font-size-lg);
          font-weight: 700;
          margin-bottom: 24px;
        }
        .footer__desc {
          font-size: var(--font-size-sm);
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
        }
        .footer__links,
        .footer__contact {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer__links a,
        .footer__contact a,
        .footer__contact li {
          font-size: var(--font-size-sm);
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: color var(--transition-fast);
          line-height: 1.6;
        }
        .footer__links a:hover,
        .footer__contact a:hover {
          color: var(--color-lime);
        }
        .footer__form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer__input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 16px 20px;
          border-radius: var(--radius-full);
          color: var(--color-white);
          font-family: inherit;
        }
        .footer__input:focus {
          outline: none;
          border-color: var(--color-lime);
        }
        .footer__submit {
          background: var(--color-lime);
          color: var(--color-dark);
          padding: 16px 20px;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: transform var(--transition-fast);
        }
        .footer__submit:hover {
          transform: translateY(-2px);
          background: var(--color-lime-dark);
        }
        .footer__bottom {
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: var(--font-size-sm);
          color: rgba(255,255,255,0.5);
        }
        .footer__legal {
          display: flex;
          gap: 24px;
        }
        .footer__legal a {
          color: inherit;
          text-decoration: none;
        }
        .footer__legal a:hover {
          color: var(--color-white);
        }

        @media (max-width: 1024px) {
          .footer__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }
        @media (max-width: 768px) {
          .footer__grid {
            grid-template-columns: 1fr;
          }
          .footer__bottom {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }
        }
      `}</style>
    </>
  )
}
