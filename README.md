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
