/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { domains: ["localhost", "https://bharatlinkr.onrender.com/"] },
};

module.exports = nextConfig;
