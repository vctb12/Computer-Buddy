/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for Netlify
  trailingSlash: true, // Ensure consistent URLs
  images: {
    unoptimized: true, // Since we're using static export
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
  // Disable server-side features not compatible with static export
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;