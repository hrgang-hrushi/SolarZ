Solarify frontend skeleton

This is a minimal Next.js skeleton that ports the Framer UI structure into a React/Next app.

Quick start

1. cd solarify-frontend
2. npm install
3. npm run dev

The dev server runs on port 3001 by default.

Files of interest

- `pages/` – route pages (index, about, service, project, contact, blog)
- `components/` – Layout, Header, Footer, Hero, ProjectList, ProjectCard placeholders
- `lib/api.js` – small adapter that reads `NEXT_PUBLIC_API_BASE` and exposes simple methods

Next steps

- Replace placeholder components with final UI from Framer
- Wire `NEXT_PUBLIC_API_BASE` to your backend (staging) or implement backend per API spec
- Add authentication / KYC flows and payments integration

Environment

Create `.env.local` from `.env.local.example` and set real values:

```
NEXT_PUBLIC_API_BASE=http://localhost:3001
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB
JWT_SECRET=strong-secret
JWT_EXPIRES_IN=7d
PRISMA_CLIENT_ENGINE_TYPE=library
```

Database

- The Prisma schema lives in `prisma/schema.prisma` (users, projects, investments, contact_messages, etc.).
- After configuring `DATABASE_URL`, run `npm run db:push` (or `npm run db:migrate`) to align the database.

API routes

- `GET /api/projects` – list public projects with funding stats; supports `state`, `sortBy`, `order` query params.
- `POST /api/projects` – admin-only create project (uses JWT + `role === ADMIN`).
- `GET /api/projects/[slug]` – project details with metrics.
- `POST /api/contact` – store contact submissions (name, email, message, optional phone/topic/source).
- `GET /api/auth/verify` – token check; returns user payload when valid.
