import { LanguageProvider } from '@/i18n/LanguageContext';
import { DEFAULT_LOCALE, isValidLocale } from '@/i18n/config';
import '../globals.css';

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const activeLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;

  return (
    <LanguageProvider initialLocale={activeLocale}>
      {children}
    </LanguageProvider>
  );
}