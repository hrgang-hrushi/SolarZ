import Hero from '../components/Hero'
import ProjectList from '../components/ProjectList'

export default function Home() {
  return (
    <main>
      <Hero />
      <section style={{ padding: '48px 24px' }}>
        <h2>Featured projects</h2>
        <ProjectList />
      </section>
    </main>
  )
}
