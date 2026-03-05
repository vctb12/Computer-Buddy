# Deployment Guide (Netlify + Next.js Static Export)

## Strategy
This repo uses **pnpm workspace root install/build** and Next.js static export for `apps/web`.

## Root cause fixed
`apps/web/tsconfig.json` extends `@computer-buddy/config/tsconfig`. Building from `apps/web` alone can break workspace package resolution. Build now runs from repo root with pnpm workspace linking.

## Netlify config
- Build command: `corepack enable && pnpm install && pnpm --filter @computer-buddy/web run build`
- Publish directory: `apps/web/out`
- Node version: `20`

## Rules
- Headers source: `apps/web/public/_headers`
- No duplicate redirect/header blocks in `netlify.toml`

## Local commands
```bash
corepack enable
pnpm install
pnpm --filter @computer-buddy/web run build
pnpm --filter @computer-buddy/web run test
```
