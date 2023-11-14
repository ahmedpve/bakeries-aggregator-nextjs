/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", process.env.NEXT_PUBLIC_API_URL],
  },
};

module.exports = nextConfig;
