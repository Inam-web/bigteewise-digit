'use client';

import React, { createContext, useContext, useState, useEffect, useTransition, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_INFO, isValidLocale, getLocaleFromPath, formatLocalizedPath } from './config';
import { getDictionary, getNestedValue } from './getTranslations';

// Cache dictionaries to prevent reloading
const dictionaryCache = {};

function getCachedDictionary(locale) {
  const targetLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  if (dictionaryCache[targetLocale]) {
    return dictionaryCache[targetLocale];
  }
  const dict = getDictionary(targetLocale);
  dictionaryCache[targetLocale] = dict;
  return dict;
}

const LanguageContext = createContext({
  locale: DEFAULT_LOCALE,
  locales: SUPPORTED_LOCALES,
  localeInfo: LOCALE_INFO[DEFAULT_LOCALE],
  dict: {},
  t: (key, fallback) => fallback || key,
  setLocale: () => {},
  switchLanguage: () => {},
  getLocalizedHref: (path, targetLocale) => path,
  isPending: false,
});

export function LanguageProvider({ children, initialLocale = DEFAULT_LOCALE }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Detect locale from pathname or fallback to initialLocale
  const currentPathLocale = getLocaleFromPath(pathname);
  const activeLocale = isValidLocale(currentPathLocale)
    ? currentPathLocale
    : (isValidLocale(initialLocale) ? initialLocale : DEFAULT_LOCALE);

  const [locale, setLocaleState] = useState(activeLocale);

  // Sync state and HTML lang attribute if pathname or locale changes
  useEffect(() => {
    const detected = getLocaleFromPath(pathname);
    if (detected !== locale) {
      setLocaleState(detected);
    }

    const currentInfo = LOCALE_INFO[detected] || LOCALE_INFO[DEFAULT_LOCALE];
    if (typeof document !== 'undefined' && currentInfo?.htmlLang) {
      document.documentElement.lang = currentInfo.htmlLang;
      
      // Add RTL support for specific languages (optional)
      const rtlLocales = ['ar', 'he', 'ur'];
      document.documentElement.dir = rtlLocales.includes(detected) ? 'rtl' : 'ltr';
    }
  }, [pathname, locale]);

  // Load active dictionary with useMemo for performance
  const dict = useMemo(() => getCachedDictionary(locale), [locale]);

  // Safe translation accessor with parameter interpolation support
  const t = useCallback(
    (key, params, fallback) => {
      let interpolations = params;
      let fallbackValue = fallback;

      if (typeof params === 'string') {
        fallbackValue = params;
        interpolations = {};
      }

      const val = getNestedValue(dict, key);
      let targetVal = val;

      // Fallback to English dictionary
      if ((targetVal === undefined || targetVal === null) && locale !== DEFAULT_LOCALE) {
        const enDict = getCachedDictionary(DEFAULT_LOCALE);
        targetVal = getNestedValue(enDict, key);
      }

      if (targetVal === undefined || targetVal === null) {
        targetVal = fallbackValue !== undefined ? fallbackValue : key;
      }

      // Interpolate variables if dynamic object passed
      if (typeof targetVal === 'string' && interpolations && typeof interpolations === 'object') {
        return targetVal.replace(/\{(\w+)\}/g, (_, k) => {
          return interpolations[k] !== undefined ? interpolations[k] : `{${k}}`;
        });
      }

      return targetVal;
    },
    [dict, locale]
  );

  // Localized URL generator with useCallback
  const getLocalizedHref = useCallback(
    (path, targetLocale = locale) => {
      return formatLocalizedPath(path, targetLocale);
    },
    [locale]
  );

  // Switch language handler with persistence and transition execution
  const switchLanguage = useCallback(
    (newLocale) => {
      if (!isValidLocale(newLocale) || newLocale === locale) return;

      // Persist choice in cookie for 1 year
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      try {
        localStorage.setItem('NEXT_LOCALE', newLocale);
      } catch (e) {
        // Handle incognito / privacy mode restrictions
      }

      setLocaleState(newLocale);

      // Compute target URL on equivalent path
      const currentFull = pathname || '/';
      const targetUrl = formatLocalizedPath(currentFull, newLocale);

      startTransition(() => {
        router.push(targetUrl);
      });
    },
    [locale, pathname, router]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    locale,
    locales: SUPPORTED_LOCALES,
    localeInfo: LOCALE_INFO[locale] || LOCALE_INFO[DEFAULT_LOCALE],
    dict,
    t,
    setLocale: switchLanguage,
    switchLanguage,
    getLocalizedHref,
    isPending,
  }), [locale, dict, t, switchLanguage, getLocalizedHref, isPending]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}