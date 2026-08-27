// src/app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/siteConfig";
import LenisProvider from "@/components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // ✅ Prevents FOIT (Flash of Invisible Text)
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ✅ Enhanced Metadata for SEO & Social Sharing
export const metadata = {
  metadataBase: new URL(SITE_URL || "https://bigteewisedigital.com"),
  title: {
    default: "BigTeeWise Digital - Creative Agency & Author Branding",
    template: "%s | BigTeeWise Digital",
  },
  description: "Specialized book marketing, author branding, and creative design services. Transform your book into a bestseller with BigTeeWise Digital.",
  keywords: [
    "book marketing",
    "author branding",
    "book cover design",
    "digital marketing",
    "creative agency",
    "author website",
    "book launch",
    "Amazon marketing",
  ],
  authors: [{ name: "BigTeeWise Digital", url: SITE_URL }],
  creator: "BigTeeWise Digital",
  publisher: "BigTeeWise Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "BigTeeWise Digital",
    title: "BigTeeWise Digital - Creative Agency & Author Branding",
    description: "Specialized book marketing, author branding, and creative design services.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "BigTeeWise Digital - Creative Agency & Author Branding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BigTeeWise Digital - Creative Agency & Author Branding",
    description: "Specialized book marketing, author branding, and creative design services.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION || "",
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      es: `${SITE_URL}/es`,
      it: `${SITE_URL}/it`,
      de: `${SITE_URL}/de`,
    },
  },
  category: "Business",
  other: {
    "theme-color": "#2563eb",
    "msapplication-TileColor": "#2563eb",
  },
};

// ✅ Preconnect to important third-party domains
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className="scroll-smooth" 
      data-scroll-behavior="smooth"
    >
      <head>
        {/* ✅ Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* ✅ Favicon and Apple Touch Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
        {/* ✅ DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
      >
        {/* ✅ WRAP CHILDREN WITH LENIS PROVIDER FOR SMOOTH SCROLL */}
        <LenisProvider>
          {/* ✅ Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:bg-white focus:text-blue-600 focus:px-4 focus:py-3 focus:rounded-xl focus:shadow-lg focus:font-bold focus:ring-2 focus:ring-blue-600"
          >
            Skip to content
          </a>

          {/* ✅ Main Content */}
          <main id="main-content">
            {children}
          </main>

          {/* ✅ Role for screen readers */}
          <div role="status" aria-live="polite" className="sr-only">
            Page loaded successfully
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}