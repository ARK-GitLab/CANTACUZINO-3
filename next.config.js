/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Only run ESLint on build in production
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig 