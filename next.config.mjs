/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 80, 85], // ✅ ADDED: 85
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // ✅ ADDED for portfolio images
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net', // ✅ ADDED (common for CMS)
      },
    ],
  },
};

export default nextConfig;