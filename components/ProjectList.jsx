import ProjectCard from './ProjectCard'
import { PROJECTS } from '../data/projects'

export default function ProjectList(){
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:20}}>
      {PROJECTS.map(p=> <ProjectCard key={p.slug} project={p} />)}
    </div>
  )
}
