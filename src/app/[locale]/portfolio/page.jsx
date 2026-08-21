import PortfolioPage from '../../portfolio/page';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_INFO, isValidLocale } from '@/i18n/config';
import { translate } from '@/i18n/getTranslations';
import { SITE_URL } from '@/lib/siteConfig';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const activeLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  const title = translate(activeLocale, 'seo.portfolioTitle', 'Portfolio & Case Studies | BigTeeWise Digital');
  const description = translate(activeLocale, 'seo.portfolioDesc', 'Explore our hand-picked portfolio of bestselling book covers, 3D mockups, and campaigns.');
  const ogLocale = LOCALE_INFO[activeLocale]?.ogLocale || 'en_GB';

  const baseUrl = SITE_URL.replace(/\/$/, '');

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${activeLocale}/portfolio`,
      languages: {
        en: `${baseUrl}/portfolio`,
        es: `${baseUrl}/es/portfolio`,
        it: `${baseUrl}/it/portfolio`,
        de: `${baseUrl}/de/portfolio`,
        'x-default': `${baseUrl}/portfolio`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${activeLocale}/portfolio`,
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

export default async function LocalizedPortfolioPage({ params }) {
  const { locale } = await params;
  return <PortfolioPage />;
}
