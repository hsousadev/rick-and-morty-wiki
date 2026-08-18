/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
};

module.exports = nextConfig;
