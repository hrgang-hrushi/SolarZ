import { useEffect, useRef, useState } from 'react'

export default function ClarifyTitle({ text, className = 'section-title', style = {}, tag: Tag = 'h2' }) {
  const words = text.split(' ')
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const baseDelay = 0.05
  const gap = 0.07

  return (
    <Tag ref={containerRef} className={className} style={style}>
      {words.map((w, i) => (
        <span
          key={i}
          className={`clarify-word${visible ? ' clarify-word--visible' : ''}`}
          style={visible ? { animationDelay: `${baseDelay + i * gap}s` } : undefined}
        >
          {w}
        </span>
      ))}
    </Tag>
  )
}
