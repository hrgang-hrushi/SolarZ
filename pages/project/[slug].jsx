import { useRouter } from 'next/router'
import { PROJECTS } from '../../data/projects'
import FundingProgress from '../../components/FundingProgress'

export default function ProjectDetails(){
  const { query } = useRouter()
  const slug = query.slug
  const project = PROJECTS.find(p=> p.slug === slug)
  if(!project) return <main style={{padding: '48px 24px'}}><h2>Project not found</h2></main>

  return (
    <main style={{padding: '48px 24px',maxWidth:1000,margin:'0 auto'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:24,alignItems:'start'}}>
        <div>
          <h1 style={{marginTop:0}}>{project.title}</h1>
          <p style={{color:'#444'}}>{project.description}</p>

          <section style={{marginTop:20}}>
            <h3>Project details</h3>
            <ul>
              <li>Panels: {project.panels.toLocaleString()}</li>
              <li>Cost per panel: ₹{project.costPerPanel.toLocaleString()}</li>
              <li>Microshare price: ₹{project.microsharePrice}</li>
              <li>Expected IRR: {project.expectedIRR}</li>
              <li>CO₂ offset per share: {project.co2PerShareKg} kg/year</li>
            </ul>
          </section>

        </div>

        <aside style={{border:'1px solid #eee',padding:16,borderRadius:8,background:'#fff'}}>
          <div style={{textAlign:'center',marginBottom:12}}>
            <img src={`https://framerusercontent.com/images/8VCVUCEnKrcoZHBL0GC2kvHr9FM.png?width=400`} alt={project.title} style={{width:'100%',borderRadius:6}} />
          </div>
          <div style={{marginBottom:12}}>
            <FundingProgress percent={project.funded} />
            <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:13}}>
              <span>{project.funded}% funded</span>
              <span>{project.totalMicroshares.toLocaleString()} microshares</span>
            </div>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
            <strong>₹{project.microsharePrice}</strong>
            <button style={{background:'#1f8a3d',color:'#fff',border:'none',padding:'8px 12px',borderRadius:6}}>Invest</button>
          </div>
        </aside>
      </div>
    </main>
  )
}
