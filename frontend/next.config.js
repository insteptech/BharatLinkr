/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { domains: ["localhost", "bharatlinkr.onrender.com"] },
};

module.exports = nextConfig;
