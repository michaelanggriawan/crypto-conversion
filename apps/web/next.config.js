/** @type {import('next').NextConfig} */

const path = require("node:path");

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL
  },
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
}

module.exports = nextConfig
