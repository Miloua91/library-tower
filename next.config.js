/** @type {import('next').NextConfig} */
/*
const nextConfig = {
    experimental: {
        swcPlugins: [['@swc-jotai/react-refresh', {}]],
      }
}

module.exports = nextConfig

*/

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

module.exports = withPWA({
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
  }
});
