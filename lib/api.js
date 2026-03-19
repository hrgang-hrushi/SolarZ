const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''

export const api = {
  projects: {
    list: async () => {
      try {
        const res = await fetch(`${API_BASE}/api/projects`)
        if (!res.ok) return []
        return await res.json()
      } catch (e) {
        console.warn('projects.list failed', e)
        return []
      }
    },
    detail: async (slug) => {
      if (!slug) return null
      try {
        const res = await fetch(`${API_BASE}/api/projects/${slug}`)
        if (!res.ok) return null
        const data = await res.json()
        return data?.project || null
      } catch (e) {
        console.warn('projects.detail failed', e)
        return null
      }
    }
  },
  contact: async (payload) => {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    return res.ok ? await res.json() : { error: true }
  }
}
