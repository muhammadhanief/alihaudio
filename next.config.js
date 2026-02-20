/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/alihaudio',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Baris di bawah ini opsional, biasanya membantu di cPanel
  reactStrictMode: true,
};

module.exports = nextConfig;