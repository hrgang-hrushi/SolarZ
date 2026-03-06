import { useState, useEffect, useRef } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const [count, setCount] = useState(1)
  const statRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 1;
        const end = 10;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / end));

        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          }
        }, stepTime);
        observer.disconnect();
      }
    });

    if (statRef.current) observer.observe(statRef.current);
    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: 'How long does a solar installation usually take?',
      answer: 'Most residential solar installations are completed within 1–3 days, depending on system size. Commercial projects may take longer based on complexity and scale.',
    },
    {
      question: 'Do solar panels work on cloudy days?',
      answer: 'Yes! Solar panels still generate electricity on cloudy days, though at reduced efficiency. Modern panels are designed to capture diffused sunlight effectively.',
    },
    {
      question: 'What maintenance do solar systems require?',
      answer: 'Solar systems require minimal maintenance—typically just periodic cleaning and annual inspections. Most systems come with monitoring tools to track performance in real-time.',
    },
    {
      question: 'What is grid tie solar solution?',
      answer: 'A grid-tie solar system connects your solar panels to the electrical grid, allowing excess energy to be fed back for credits while drawing power when solar output is low.',
    },
  ]

  return (
    <>
      <section className="faq section">
        <div className="container">
          <div className="faq__grid">
            <div className="faq__left">
              <div className="faq__stat" ref={statRef}>
                <span className="faq__stat-number">{count}+</span>
                <span className="faq__stat-label">Years of experience and expertise</span>
              </div>
              <p className="faq__prompt">Have any questions?</p>
            </div>

            <div className="faq__right">
              <h2 className="section-title">Have any questions? Here are some answers for you</h2>
              <div className="faq__list">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`faq__item${openIndex === i ? ' faq__item--open' : ''}`}
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  >
                    <div className="faq__question">
                      <h4 className="faq__question-text">{faq.question}</h4>
                      <span className="faq__toggle">{openIndex === i ? '−' : '+'}</span>
                    </div>
                    <div className="faq__answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .faq {
          background: var(--color-off-white);
        }
        .faq__grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 64px;
          align-items: start;
        }
        .faq__left {
          position: sticky;
          top: 120px;
        }
        .faq__stat {
          background: var(--color-dark);
          color: var(--color-white);
          border-radius: var(--radius-xl);
          padding: 48px 36px;
          margin-bottom: 24px;
        }
        .faq__stat-number {
          display: block;
          font-size: var(--font-size-6xl);
          font-weight: 900;
          line-height: 1;
          margin-bottom: 8px;
        }
        .faq__stat-label {
          font-size: var(--font-size-lg);
          opacity: 0.9;
        }
        .faq__prompt {
          font-size: var(--font-size-xl);
          font-weight: 700;
          color: var(--color-dark);
        }

        .faq__list {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .faq__item {
          background: var(--color-white);
          border: 1px solid var(--color-gray-100);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-base);
        }
        .faq__item:hover {
          border-color: var(--color-gray-200);
        }
        .faq__item--open {
          border-color: var(--color-dark);
          box-shadow: var(--shadow-sm);
        }
        .faq__question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          gap: 16px;
        }
        .faq__question-text {
          font-size: var(--font-size-base);
          font-weight: 600;
          color: var(--color-dark);
        }
        .faq__toggle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--color-gray-50);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 300;
          color: var(--color-dark);
          flex-shrink: 0;
          transition: all var(--transition-base);
        }
        .faq__item--open .faq__toggle {
          background: var(--color-dark);
          color: var(--color-white);
        }
        .faq__answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height var(--transition-base), padding var(--transition-base);
        }
        .faq__item--open .faq__answer {
          max-height: 200px;
          padding: 0 24px 20px;
        }
        .faq__answer p {
          font-size: var(--font-size-sm);
          color: var(--color-gray-500);
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .faq__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .faq__left {
            position: static;
          }
        }
      `}</style>
    </>
  )
}
