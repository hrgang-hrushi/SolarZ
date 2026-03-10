import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const { slug } = req.query

  if (req.method === 'GET') {
    return getProject(slug, res)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

async function getProject(slug, res) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { investments: true }
        }
      }
    })

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    // Calculate additional metrics
    const projectWithMetrics = {
      ...project,
      funded: Math.round((project.soldMicroshares / project.totalMicroshares) * 100),
      remainingMicroshares: project.totalMicroshares - project.soldMicroshares,
      investorCount: project._count.investments
    }

    delete projectWithMetrics._count

    res.status(200).json({ project: projectWithMetrics })

  } catch (error) {
    console.error('Get project error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
