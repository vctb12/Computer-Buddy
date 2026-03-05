# Deployment Guide (SaaS Foundation)

This app now uses server capabilities (Auth.js route handlers + Prisma/Postgres), so it is **not static-export only** anymore.

## Local setup

```bash
pnpm install
cp .env.example .env
# set DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Demo staff login:
- email: `admin@demo-retailer.ae`
- password: `Admin123!`
- tenant: `demo-retailer`

## Notes
- NextAuth route handler is at `/api/auth/[...nextauth]` and runs on Node runtime.
- Prisma schema lives at `prisma/schema.prisma`.
- Staff routes:
  - `/sign-in`
  - `/app`
  - `/app/[tenantSlug]`
