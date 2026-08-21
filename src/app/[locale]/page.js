import Home from '../page';
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
  const title = translate(activeLocale, 'seo.homeTitle', 'BigTeeWise Digital | Creative Agency & Author Branding');
  const description = translate(activeLocale, 'seo.homeDesc', 'Full-service book marketing, Amazon KDP optimization, author branding, and digital growth agency.');
  const ogLocale = LOCALE_INFO[activeLocale]?.ogLocale || 'en_GB';

  const baseUrl = SITE_URL.replace(/\/$/, '');

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${activeLocale}`,
      languages: {
        en: `${baseUrl}/`,
        es: `${baseUrl}/es`,
        it: `${baseUrl}/it`,
        de: `${baseUrl}/de`,
        'x-default': `${baseUrl}/`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${activeLocale}`,
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

export default async function LocalizedHomePage({ params }) {
  const { locale } = await params;
  return <Home />;
}
