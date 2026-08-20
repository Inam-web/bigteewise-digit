import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BigTeeWise Digital | Creative Agency & Author Branding",
    template: "%s | BigTeeWise Digital",
  },
  description: "Full-service book marketing, Amazon KDP optimization, author branding, and digital growth agency for authors and creators.",
  keywords: [
    "Book Marketing",
    "Author Branding",
    "Amazon KDP Optimization",
    "Book Cover Design",
    "3D Book Mockups",
    "Digital Growth Agency",
    "BigTeeWise Digital",
  ],
  authors: [{ name: "BigTeeWise Digital" }],
  creator: "BigTeeWise Digital",
  publisher: "BigTeeWise Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "BigTeeWise Digital | Creative Agency & Author Branding",
    description: "Full-service book marketing, Amazon KDP optimization, author branding, and digital growth agency for authors and creators.",
    url: SITE_URL,
    siteName: 'BigTeeWise Digital',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BigTeeWise Digital | Creative Agency & Author Branding",
    description: "Full-service book marketing, Amazon KDP optimization, author branding, and digital growth agency for authors and creators.",
    creator: '@bigteewisedigital',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'BigTeeWise Digital',
  url: SITE_URL,
  description: 'Full-service book marketing, Amazon KDP optimization, author branding, and digital growth agency for authors and creators.',
  telephone: '+2348073527146',
  email: 'petergodswill52@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'UK',
  },
  sameAs: [
    'https://facebook.com',
    'https://x.com',
    'https://instagram.com',
    'https://linkedin.com',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}