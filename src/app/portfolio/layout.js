import { SITE_URL } from '@/lib/siteConfig';

export const metadata = {
  title: 'Portfolio & Case Studies',
  description: 'Explore featured author branding, book marketing campaigns, custom book cover designs, and digital growth projects by BigTeeWise Digital.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Portfolio & Case Studies | BigTeeWise Digital',
    description: 'Explore featured author branding, book marketing campaigns, custom book cover designs, and digital growth projects by BigTeeWise Digital.',
    url: `${SITE_URL}/portfolio`,
    siteName: 'BigTeeWise Digital',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Case Studies | BigTeeWise Digital',
    description: 'Explore featured author branding, book marketing campaigns, custom book cover designs, and digital growth projects by BigTeeWise Digital.',
  },
};

export default function PortfolioLayout({ children }) {
  return children;
}
