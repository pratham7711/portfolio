import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'd8j0ntlcm91z4.cloudfront.net' },
      { protocol: 'https', hostname: 'd2ol7oe51mr4n9.cloudfront.net' },
    ],
  },
  async headers() {
    return [
      {
        source: '/media/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
