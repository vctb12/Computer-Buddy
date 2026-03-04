# Deployment Guide (Netlify + Next.js)

## Chosen strategy

This repo uses **Next.js static export** for `apps/web`, built from the **monorepo root** so workspace packages resolve correctly.

### Why
`apps/web/tsconfig.json` extends `@computer-buddy/config/tsconfig`, which is a local workspace package in `packages/config`. Building only from `apps/web` can miss workspace linking and fail TypeScript resolution.

## Netlify settings

Defined in `netlify.toml`:

- **Base directory:** `/`
- **Build command:** `npm ci && npm run --workspace @computer-buddy/web build`
- **Publish directory:** `apps/web/out`
- **Node version:** `20`

This ensures Netlify installs/link workspaces from root and publishes the correct static export output containing `index.html`.

## Redirects and headers

- **Single source of truth for headers:** `apps/web/public/_headers`
- No redirect rules are defined in `netlify.toml`.
- No `_redirects` files are used.

## Verification checklist

1. Run root install + build:
   - `npm ci`
   - `npm run --workspace @computer-buddy/web build`
2. Confirm output artifacts:
   - `apps/web/out/index.html`
   - `apps/web/out/404.html`
   - `apps/web/out/_headers`
3. Deploy and verify:
   - `/` renders the homepage
   - unknown routes show project 404 page (not Netlify default error page)
