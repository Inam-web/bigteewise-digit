// src/app/[locale]/layout.jsx
import { LanguageProvider } from '@/i18n/LanguageContext';
import { DEFAULT_LOCALE, isValidLocale } from '@/i18n/config';
import '../globals.css';

// ✅ Generate static params for all locales
export async function generateStaticParams() {
  const locales = ['en', 'es', 'it', 'de'];
  return locales.map((locale) => ({ locale }));
}

// ✅ Metadata for locale-specific pages
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const activeLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  
  const localeNames = {
    en: 'English',
    es: 'Español',
    it: 'Italiano',
    de: 'Deutsch',
  };

  return {
    title: {
      default: `BigTeeWise Digital - ${localeNames[activeLocale]}`,
      template: `%s | BigTeeWise Digital - ${localeNames[activeLocale]}`,
    },
    alternates: {
      canonical: `https://bigteewisedigital.com/${activeLocale}`,
      languages: {
        en: 'https://bigteewisedigital.com/en',
        es: 'https://bigteewisedigital.com/es',
        it: 'https://bigteewisedigital.com/it',
        de: 'https://bigteewisedigital.com/de',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const activeLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;

  return (
    <LanguageProvider initialLocale={activeLocale}>
      <div lang={activeLocale} dir={activeLocale === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageProvider>
  );
}