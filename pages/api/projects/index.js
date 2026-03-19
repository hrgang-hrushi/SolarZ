import prisma from '../../../lib/db'
import { withAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return getProjects(req, res)
  }

  if (req.method === 'POST') {
    return withAdmin(createProject)(req, res)
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

async function createProject(req, res) {
  try {
    const {
      title,
      slug,
      excerpt,
      description,
      imageUrl,
      location,
      panels,
      costPerPanel,
      microsharePrice,
      totalMicroshares,
      soldMicroshares,
      expectedIRR,
      co2PerShareKg,
      ppaRate,
      maintenanceFee,
      platformFee,
      state,
      fundingStartDate,
      fundingEndDate,
      constructionDate,
      activeDate
    } = req.body || {}

    if (!title || !description || !microsharePrice || !totalMicroshares) {
      return res.status(400).json({ error: 'title, description, microsharePrice and totalMicroshares are required' })
    }

    const normalizedSlug = (slug || title)
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    const existing = await prisma.project.findUnique({ where: { slug: normalizedSlug } })
    if (existing) {
      return res.status(409).json({ error: 'Project slug already exists' })
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug: normalizedSlug,
        excerpt: excerpt || description.slice(0, 140),
        description,
        imageUrl: imageUrl || null,
        location: location || null,
        panels: Number(panels) || 0,
        costPerPanel: costPerPanel ? Number(costPerPanel) : 0,
        microsharePrice: Number(microsharePrice),
        totalMicroshares: Number(totalMicroshares),
        soldMicroshares: Number(soldMicroshares) || 0,
        expectedIRR: expectedIRR || '—',
        co2PerShareKg: co2PerShareKg ? Number(co2PerShareKg) : 0,
        ppaRate: ppaRate ? Number(ppaRate) : 0,
        maintenanceFee: maintenanceFee ? Number(maintenanceFee) : 0,
        platformFee: platformFee ? Number(platformFee) : 0,
        state: state || 'FUNDING_OPEN',
        fundingStartDate: fundingStartDate ? new Date(fundingStartDate) : null,
        fundingEndDate: fundingEndDate ? new Date(fundingEndDate) : null,
        constructionDate: constructionDate ? new Date(constructionDate) : null,
        activeDate: activeDate ? new Date(activeDate) : null
      },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        state: true,
        totalMicroshares: true,
        soldMicroshares: true,
        microsharePrice: true,
        expectedIRR: true,
        createdAt: true
      }
    })

    return res.status(201).json({ project })
  } catch (error) {
    console.error('Create project error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
