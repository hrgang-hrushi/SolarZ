import Hero from '../components/Hero'
import Partners from '../components/Partners'
import Features from '../components/Features'
import Services from '../components/Services'
import About from '../components/About'
import Pricing from '../components/Pricing'
import MarqueeBand from '../components/MarqueeBand'
import Team from '../components/Team'
import FunFact from '../components/FunFact'
import FAQ from '../components/FAQ'
import Blog from '../components/Blog'

export default function Home() {
  return (
    <main>
      <Hero />
      <Partners />
      <Features />
      <Services />
      <About />
      <MarqueeBand />
      <Pricing />
      <Team />
      <FunFact />
      <FAQ />
      <Blog />
    </main>
  )
}
