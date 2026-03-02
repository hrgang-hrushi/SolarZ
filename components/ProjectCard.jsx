import Link from 'next/link'

export default function ProjectCard({ project }){
  const percent = project.funded || 0
  return (
    <article style={{border:'1px solid #eee',padding:16,borderRadius:8,background:'#fff'}}>
      <div style={{height:140,background:'#f3f7f3',borderRadius:6,marginBottom:12,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src={`https://framerusercontent.com/images/58V5hgqiM4FNJ6iPSRmtNCbUc.png?width=400`} alt={project.title} style={{maxHeight:120,borderRadius:6}}/>
      </div>
      <h3 style={{marginTop:0,fontSize:18}}>{project.title}</h3>
      <p style={{color:'#555'}}>{project.excerpt}</p>
      <div style={{marginTop:12}}>
        <div className="progress-bar">
          <div className="progress-fill" style={{width:`${percent}%`}} />
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginTop:6}}>
          <span>{percent}% funded</span>
          <span>{project.totalMicroshares.toLocaleString()} microshares</span>
        </div>
      </div>
      <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Link href={`/project/${project.slug}`}>View Details</Link>
        <strong>₹{project.microsharePrice}</strong>
      </div>
    </article>
  )
}
