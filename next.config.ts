import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  // output: 'export',
  basePath: '/euquerozeus',
  trailingSlash: true,
}

export default nextConfig
