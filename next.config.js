/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["rickandmortyapi.com"],
  },
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  modularizeImports: {
    "@phosphor-icons/react": {
      transform: "@phosphor-icons/react/{{member}}",
    },
  },
};

module.exports = nextConfig;
