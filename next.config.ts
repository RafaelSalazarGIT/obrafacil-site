import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ['zuhrszsk.manus.space', 'obrafacil.com.br', 'obrafacilbr.com.br'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['zuhrszsk.manus.space', 'obrafacil.com.br', 'obrafacilbr.com.br', 'localhost:3000']
    }
  },
}

export default nextConfig
