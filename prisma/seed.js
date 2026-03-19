const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@solarify.in' },
    update: {},
    create: {
      email: 'admin@solarify.in',
      password: adminPassword,
      name: 'System Admin',
      phone: '9999999999',
      role: 'ADMIN',
      kycStatus: 'VERIFIED'
    }
  })
  console.log('✅ Admin user created:', admin.email)

  // Create requested admin account
  const requestedAdminPassword = await bcrypt.hash('Hrushi@22', 12)
  const requestedAdmin = await prisma.user.upsert({
    where: { email: 'bussiwhrushi@gmail.com' },
    update: {
      password: requestedAdminPassword,
      name: 'Hrushikesh G',
      phone: '+1 9846876669',
      role: 'ADMIN',
      kycStatus: 'VERIFIED'
    },
    create: {
      email: 'bussiwhrushi@gmail.com',
      password: requestedAdminPassword,
      name: 'Hrushikesh G',
      phone: '+1 9846876669',
      role: 'ADMIN',
      kycStatus: 'VERIFIED'
    }
  })
  console.log('✅ Admin user created:', requestedAdmin.email)

  // Create test user
  const userPassword = await bcrypt.hash('user1234', 12)
  const testUser = await prisma.user.upsert({
    where: { email: 'investor@test.com' },
    update: {},
    create: {
      email: 'investor@test.com',
      password: userPassword,
      name: 'Test Investor',
      phone: '9876543210',
      role: 'USER',
      kycStatus: 'PENDING'
    }
  })
  console.log('✅ Test user created:', testUser.email)

  // Create sample projects
  const projects = [
    {
      slug: 'bright-horizon-solar-initiative',
      title: 'Bright Horizon Solar Initiative',
      excerpt: 'Community rooftop project bringing clean energy to neighbourhoods.',
      description: 'Bright Horizon is a community-driven rooftop solar deployment that supplies clean electricity to local businesses and households. Located in Bengaluru, this project aims to power over 200 homes with renewable energy.',
      imageUrl: 'https://framerusercontent.com/images/8VCVUCEnKrcoZHBL0GC2kvHr9FM.png',
      location: 'Bengaluru, Karnataka',
      panels: 120,
      costPerPanel: 20000,
      microsharePrice: 100,
      totalMicroshares: 24000,
      soldMicroshares: 16320,
      expectedIRR: '12%',
      ppaRate: 4.50,
      co2PerShareKg: 1.5,
      state: 'FUNDING_OPEN',
      fundingStartDate: new Date('2026-01-15')
    },
    {
      slug: 'sustainable-future-energy',
      title: 'Sustainable Future Energy',
      excerpt: 'Industrial rooftop deployment with performance guarantees.',
      description: 'A large-scale rooftop rollout focused on industrial facilities, optimized for revenue-share PPA contracts. This project provides guaranteed returns backed by Fortune 500 corporate PPAs.',
      imageUrl: 'https://framerusercontent.com/images/8VCVUCEnKrcoZHBL0GC2kvHr9FM.png',
      location: 'Pune, Maharashtra',
      panels: 340,
      costPerPanel: 19000,
      microsharePrice: 100,
      totalMicroshares: 81600,
      soldMicroshares: 27744,
      expectedIRR: '10%',
      ppaRate: 4.25,
      co2PerShareKg: 1.3,
      state: 'FUNDING_OPEN',
      fundingStartDate: new Date('2026-02-01')
    },
    {
      slug: 'delhi-warehouse-phase-1',
      title: 'Delhi Warehouse Phase 1',
      excerpt: 'Large-scale warehouse solar installation with 25-year PPA.',
      description: 'A flagship project covering 50,000 sq ft of warehouse rooftop in Delhi NCR. Backed by a 25-year Power Purchase Agreement with a leading logistics company.',
      imageUrl: 'https://framerusercontent.com/images/8VCVUCEnKrcoZHBL0GC2kvHr9FM.png',
      location: 'Gurugram, Delhi NCR',
      panels: 500,
      costPerPanel: 18500,
      microsharePrice: 100,
      totalMicroshares: 92500,
      soldMicroshares: 0,
      expectedIRR: '11%',
      ppaRate: 4.75,
      co2PerShareKg: 1.4,
      state: 'DRAFT',
      fundingStartDate: null
    },
    {
      slug: 'mumbai-tech-park-solar',
      title: 'Mumbai Tech Park Solar',
      excerpt: 'Premium tech park installation powering IT offices.',
      description: 'Solar installation at a premium IT park in Mumbai, powering leading technology companies. Premium PPA rates ensure strong returns for investors.',
      imageUrl: 'https://framerusercontent.com/images/8VCVUCEnKrcoZHBL0GC2kvHr9FM.png',
      location: 'Mumbai, Maharashtra',
      panels: 280,
      costPerPanel: 21000,
      microsharePrice: 100,
      totalMicroshares: 58800,
      soldMicroshares: 58800,
      expectedIRR: '13%',
      ppaRate: 5.00,
      co2PerShareKg: 1.6,
      state: 'ACTIVE',
      fundingStartDate: new Date('2025-06-01'),
      activeDate: new Date('2025-12-01')
    }
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project
    })
    console.log(`✅ Project created: ${project.title}`)
  }

  // Create sample generation data for active project
  const activeProject = await prisma.project.findUnique({
    where: { slug: 'mumbai-tech-park-solar' }
  })

  if (activeProject) {
    const today = new Date()
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      // Random generation between 800-1200 kWh per day
      const kwhProduced = 800 + Math.random() * 400
      const revenue = kwhProduced * Number(activeProject.ppaRate)
      
      await prisma.generation.upsert({
        where: {
          projectId_dateRecorded: {
            projectId: activeProject.id,
            dateRecorded: date
          }
        },
        update: { kwhProduced, revenue },
        create: {
          projectId: activeProject.id,
          kwhProduced,
          revenue,
          dateRecorded: date
        }
      })
    }
    console.log('✅ Sample generation data created for Mumbai Tech Park')
  }

  console.log('🎉 Database seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
