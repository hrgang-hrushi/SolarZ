import prisma from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return getProjects(req, res)
  }
  
  return res.status(405).json({ error: 'Method not allowed' })
}

async function getProjects(req, res) {
  try {
    const { state, sortBy, order } = req.query

    // Build where clause
    const where = {}
    if (state) {
      where.state = state
    } else {
      // By default, only show public projects (FUNDING_OPEN or ACTIVE)
      where.state = { in: ['FUNDING_OPEN', 'ACTIVE', 'SOLD_OUT'] }
    }

    // Build orderBy
    let orderBy = { createdAt: 'desc' }
    if (sortBy) {
      orderBy = { [sortBy]: order === 'asc' ? 'asc' : 'desc' }
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        description: true,
        imageUrl: true,
        panels: true,
        costPerPanel: true,
        microsharePrice: true,
        totalMicroshares: true,
        soldMicroshares: true,
        expectedIRR: true,
        co2PerShareKg: true,
        ppaRate: true,
        state: true,
        location: true,
        createdAt: true
      }
    })

    // Calculate funding percentage for each project
    const projectsWithFunding = projects.map(project => ({
      ...project,
      funded: Math.round((project.soldMicroshares / project.totalMicroshares) * 100),
      remainingMicroshares: project.totalMicroshares - project.soldMicroshares
    }))

    res.status(200).json({ projects: projectsWithFunding })

  } catch (error) {
    console.error('Get projects error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
