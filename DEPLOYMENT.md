# Deployment Guide

## Build Configuration

**Build Command:**
```
corepack enable && pnpm -w install --frozen-lockfile && pnpm --filter @computer-buddy/web run build
```

**Publish Directory:** `apps/web/out`

**Node Version:** 20

## Technical Notes

- The original `tsconfig.json` in the web app extended `@computer-buddy/config/tsconfig` which caused resolution issues during Netlify builds
- Fixed by creating a local `tsconfig.base.json` at the root and updating the web app's tsconfig to reference it relatively
- Uses pnpm workspace filtering to build only the web app
- Includes corepack enable to ensure consistent package manager version

## Redirects & Headers

All redirect and header configurations are managed through the `netlify.toml` file in the root directory to avoid conflicts with duplicate rules.

## Local Testing

To test the build locally:
```
pnpm install
pnpm --filter @computer-buddy/web run build
```

The build output will be in `apps/web/out` which should match the publish directory configured in Netlify.
