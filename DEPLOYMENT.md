# Deployment Guide (Netlify + Next.js)

## Chosen strategy

This repo uses **Next.js static export** for `apps/web`.

- Next config sets `output: 'export'`.
- Netlify publishes the generated static files from `apps/web/out`.
- No Next.js runtime/plugin is required for this setup.

## Netlify settings

Defined in `netlify.toml`:

- **Base directory:** `apps/web`
- **Build command:** `npm run build`
- **Publish directory:** `out`

This ensures Netlify deploys the actual static output that includes `index.html`.

## Redirects and headers

- Redirects are defined in **one place**: `netlify.toml`.
- Security headers are defined in `apps/web/public/_headers`.
- Avoid duplicate/conflicting rules in other `_redirects`/`_headers` files.

## Verification checklist

1. Build the app in `apps/web`.
2. Confirm these files exist:
   - `apps/web/out/index.html`
   - `apps/web/out/404.html`
3. Deploy and verify:
   - `/` loads homepage (not Netlify default 404)
   - Known routes load
   - Unknown route returns project 404 page
