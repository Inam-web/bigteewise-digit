import { SERVICES } from '../../Data/content';
import { SITE_URL } from '@/lib/siteConfig';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id) || SERVICES[0];

  const title = `${service.title} Services`;
  const description = service.shortDesc || service.fullDesc;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${id}`,
    },
    openGraph: {
      title: `${service.title} | BigTeeWise Digital`,
      description,
      url: `${SITE_URL}/services/${id}`,
      siteName: 'BigTeeWise Digital',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | BigTeeWise Digital`,
      description,
    },
  };
}

export default function ServiceLayout({ children }) {
  return children;
}
