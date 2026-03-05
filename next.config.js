/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/` : undefined,
  poweredByHeader: false,
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Baris di bawah ini opsional, biasanya membantu di cPanel
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Script: hanya dari server sendiri (Next.js butuh unsafe-inline untuk hydration)
              process.env.NODE_ENV === 'production' ? "script-src 'self' 'unsafe-inline'" : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              // Style: hanya dari server sendiri + inline (Tailwind/CSS-in-JS butuh ini)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Gambar: dari server sendiri, data URI, blob, dan CDN BPS serta FlagCDN
              "img-src 'self' data: blob: https://cdn.bps.go.id https://community.bps.go.id https://flagcdn.com http://localhost:3000",
              // Font: dari server sendiri dan Google Fonts
              "font-src 'self' data: https://fonts.gstatic.com",
              // Koneksi API: hanya ke server sendiri, API BPS, layanan audio, dan Vercel API
              "connect-src 'self' http://localhost:3000 ws://localhost:3000 https://jateng.web.bps.go.id https://api.soundoftext.com https://api.codetabs.com https://api-alihaudio.vercel.app https://translate.google.com https://storage.googleapis.com wss://jateng.web.bps.go.id",
              // Media audio: dari server sendiri, blob, dan storage Google
              "media-src 'self' blob: data: http://localhost:3000 https://storage.googleapis.com",
              // Frame/Iframe: hanya boleh dari server sendiri
              "frame-src 'self'",
              // Tidak ada plugin/object (Flash, Java, dsb)
              "object-src 'none'",
              // Web Worker: hanya dari server sendiri
              "worker-src 'self' blob:",
              // Manifest PWA
              "manifest-src 'self'",
              // Anti-Clickjacking
              "frame-ancestors 'self' http://localhost:3000 https://jateng.web.bps.go.id",
              // Form hanya submit ke server sendiri
              "form-action 'self' http://localhost:3000",
              // Base tag hanya boleh mengarah ke domain sendiri
              "base-uri 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ];
  },
};

module.exports = nextConfig;