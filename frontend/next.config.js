/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint:{
    ignoreDuringBuilds:true,
  },
  images: { domains: ["localhost"] },
};

module.exports = nextConfig;
