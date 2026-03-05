/** @type {import('next').NextConfig} */
const nextConfig = {
  // IMPORTANT: removing static export to enable Route Handlers, Auth.js, webhooks, DB access, etc.
  // output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  },
};

module.exports = nextConfig;
