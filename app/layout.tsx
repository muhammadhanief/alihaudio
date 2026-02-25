import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alihaudio",
  description: "Platform Konversi Teks ke Audio Internal BPS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.puter.com/v2/"></script>
      </head>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Toaster position="bottom-center" toastOptions={{
          style: {
            background: '#ffffff',
            color: '#1a0d00',
            border: '1px solid rgba(249, 115, 22, 0.4)',
            borderRadius: '20px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 20px 25px -5px rgba(249, 115, 22, 0.15)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          },
          success: {
            iconTheme: {
              primary: '#ea580c',
              secondary: '#fff',
            },
          },
        }} />
        {children}
      </body>
    </html >
  );
}
