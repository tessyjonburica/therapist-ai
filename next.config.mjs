/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Enforce lint errors during builds
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Enforce type errors during builds
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
