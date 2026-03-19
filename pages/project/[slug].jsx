import FundingProgress from '../../components/FundingProgress'

export default function ProjectDetails({ project }){
  if(!project) return <main style={{padding: '48px 24px'}}><h2>Project not found</h2></main>

  const fundedPercent = project.funded ?? Math.round((project.soldMicroshares / project.totalMicroshares) * 100)

  return (
    <main style={{padding: '48px 24px',maxWidth:1000,margin:'0 auto'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:24,alignItems:'start'}}>
        <div>
          <h1 style={{marginTop:0}}>{project.title}</h1>
          <p style={{color:'#444'}}>{project.description}</p>

          <section style={{marginTop:20}}>
            <h3>Project details</h3>
            <ul>
              {project.panels != null && <li>Panels: {Number(project.panels).toLocaleString()}</li>}
              {project.costPerPanel != null && <li>Cost per panel: ₹{Number(project.costPerPanel).toLocaleString()}</li>}
              <li>Microshare price: ₹{Number(project.microsharePrice).toLocaleString()}</li>
              {project.expectedIRR && <li>Expected IRR: {project.expectedIRR}</li>}
              {project.co2PerShareKg != null && <li>CO₂ offset per share: {project.co2PerShareKg} kg/year</li>}
              {project.location && <li>Location: {project.location}</li>}
              {project.state && <li>Status: {project.state.replace(/_/g, ' ')}</li>}
            </ul>
          </section>

        </div>

        <aside style={{border:'1px solid #eee',padding:16,borderRadius:8,background:'#fff'}}>
          <div style={{textAlign:'center',marginBottom:12}}>
            <img src={project.imageUrl || `https://framerusercontent.com/images/8VCVUCEnKrcoZHBL0GC2kvHr9FM.png?width=400`} alt={project.title} style={{width:'100%',borderRadius:6, objectFit:'cover'}} />
          </div>
          <div style={{marginBottom:12}}>
            <FundingProgress percent={fundedPercent} />
            <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:13}}>
              <span>{fundedPercent}% funded</span>
              <span>{Number(project.totalMicroshares).toLocaleString()} microshares</span>
            </div>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
            <strong>₹{Number(project.microsharePrice).toLocaleString()}</strong>
            <button style={{background:'#1f8a3d',color:'#fff',border:'none',padding:'8px 12px',borderRadius:6}}>Invest</button>
          </div>
        </aside>
      </div>
    </main>
  )
}

export async function getServerSideProps({ params, req }) {
  const base = process.env.NEXT_PUBLIC_API_BASE || `http://${req?.headers.host}`
  try {
    const res = await fetch(`${base}/api/projects/${params.slug}`)
    if (!res.ok) {
      return { notFound: true }
    }
    const data = await res.json()
    return { props: { project: data.project || null } }
  } catch (e) {
    console.error('Project detail fetch failed', e)
    return { notFound: true }
  }
}
