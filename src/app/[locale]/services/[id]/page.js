import ServiceDetailPage from '../../../services/[id]/page';
import { SERVICES } from '@/app/Data/content';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_INFO, isValidLocale } from '@/i18n/config';
import { getLocalizedServiceById } from '@/i18n/localizedContent';
import { SITE_URL } from '@/lib/siteConfig';

export function generateStaticParams() {
  const params = [];
  const locales = SUPPORTED_LOCALES.filter((l) => l !== DEFAULT_LOCALE);
  for (const locale of locales) {
    for (const service of SERVICES) {
      params.push({
        locale,
        id: service.id,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  const activeLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  const service = getLocalizedServiceById(id, activeLocale) || SERVICES[0];

  const title = `${service.title} | BigTeeWise Digital`;
  const description = service.shortDesc || service.fullDesc;
  const ogLocale = LOCALE_INFO[activeLocale]?.ogLocale || 'en_GB';

  const baseUrl = SITE_URL.replace(/\/$/, '');

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${activeLocale}/services/${id}`,
      languages: {
        en: `${baseUrl}/services/${id}`,
        es: `${baseUrl}/es/services/${id}`,
        it: `${baseUrl}/it/services/${id}`,
        de: `${baseUrl}/de/services/${id}`,
        'x-default': `${baseUrl}/services/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${activeLocale}/services/${id}`,
      siteName: 'BigTeeWise Digital',
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@bigteewisedigital',
    },
  };
}

export default async function LocalizedServiceDetailPage({ params }) {
  const resolvedParams = await params;
  return <ServiceDetailPage />;
}
