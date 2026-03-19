import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import { api } from '../lib/api'

export default function ProjectList(){
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError('')
      const data = await api.projects.list()
      if (!mounted) return
      if (!data || data.error) {
        setError('Unable to load projects right now.')
        setProjects([])
      } else {
        setProjects(data.projects || [])
      }
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  if (loading) {
    return <div style={{padding:'20px 0', color:'#555'}}>Loading projects…</div>
  }

  if (error) {
    return <div style={{padding:'20px 0', color:'#c00'}}>{error}</div>
  }

  if (!projects.length) {
    return <div style={{padding:'20px 0', color:'#555'}}>No projects available yet.</div>
  }

  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:20}}>
      {projects.map(p=> <ProjectCard key={p.slug} project={p} />)}
    </div>
  )
}
