'use client';

import { LanguageProvider } from '@/i18n/LanguageContext';

export default function LanguageWrapper({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}