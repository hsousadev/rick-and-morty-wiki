/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["rickandmortyapi.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
