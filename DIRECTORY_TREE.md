# Computer Buddy - Directory Structure

```
computer-buddy/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── release.yml
│       └── pr-check.yml
├── apps/
│   ├── web/                    # Next.js frontend application
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   └── auth/
│   │   │   ├── (auth)/
│   │   │   ├── (shop)/
│   │   │   │   ├── cart/
│   │   │   │   ├── checkout/
│   │   │   │   ├── products/
│   │   │   │   │   └── [id]/
│   │   │   │   └── search/
│   │   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   ├── globals.css
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   ├── public/
│   │   ├── hooks/
│   │   ├── providers/
│   │   ├── types/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── api/                    # NestJS backend API
│       ├── src/
│       │   ├── app.module.ts
│       │   ├── main.ts
│       │   ├── auth/
│       │   ├── products/
│       │   ├── orders/
│       │   ├── users/
│       │   ├── compatibility/
│       │   ├── payments/
│       │   ├── digital-keys/
│       │   └── utils/
│       ├── test/
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── ui/                     # Shared UI components
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── config/                 # Shared configuration
│       ├── eslint-config/
│       ├── prettier-config/
│       ├── tailwind-config/
│       ├── tsconfig/
│       └── package.json
├── scripts/
│   └── submit-pr.sh            # PR automation script
├── docker/
│   ├── postgres/
│   ├── redis/
│   ├── nginx/
│   └── docker-compose.yml
├── prisma/
│   └── schema.prisma           # Database schema
├── .gitignore
├── .env.example
├── LICENSE
├── README.md
├── ROADMAP.md
├── DIRECTORY_TREE.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── package.json               # Root package.json for monorepo
```