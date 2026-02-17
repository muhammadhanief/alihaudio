import type { NextConfig } from "next";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/alihaudio',
  assetPrefix: '/alihaudio',
  images: { unoptimized: true }, // Disarankan untuk hosting cPanel
};
module.exports = nextConfig;