// src/app/layout.jsx
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
  title: "BigTeeWise Digital",
  description: "Creative Agency & Author Branding",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        {/* ✅ Floating WhatsApp Button - shows on all pages */}
      </body>
    </html>
  );
}