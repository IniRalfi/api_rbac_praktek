# Kost-Ku 🏠

Aplikasi fullstack manajemen kost-kostan digital.
Dibangun sebagai monorepo dengan Clean Architecture.

## Tech Stack

- **Frontend**: Next.js 16 · TypeScript · Tailwind CSS · shadcn/ui
- **Backend**: Bun.js · Express · Prisma · PostgreSQL
- **Auth**: JWT + RBAC berbasis permission slug

## Struktur Project

\`\`\`
kost-ku/
├── frontend/ # Next.js App
└── backend/ # Bun.js + Express API
\`\`\`

## Quick Start

### Backend

\`\`\`bash
cd backend
bun install
bun run db:migrate
bun run db:seed
bun run dev
\`\`\`

### Frontend

\`\`\`bash
cd frontend
bun install
bun run dev
\`\`\`

## Akses

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api
