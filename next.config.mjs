/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {

    qualities: [75, 80, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'gsap', 'lenis', '@gsap/react'],
  },
};

export default nextConfig;