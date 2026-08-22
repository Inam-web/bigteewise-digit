'use client';

import React, { createContext, useContext, useState, useEffect, useTransition, useCallback, useMemo, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_INFO, isValidLocale, getLocaleFromPath, formatLocalizedPath } from './config';
import { getDictionary, getNestedValue } from './getTranslations';

// ✅ Cache dictionaries to prevent reloading
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
  
  // ✅ Use ref to track if this is the first render
  const isFirstRender = useRef(true);

  // ✅ Detect locale from pathname
  const currentPathLocale = getLocaleFromPath(pathname);
  const activeLocale = isValidLocale(currentPathLocale)
    ? currentPathLocale
    : (isValidLocale(initialLocale) ? initialLocale : DEFAULT_LOCALE);

  const [locale, setLocaleState] = useState(activeLocale);

  // ✅ Only update locale when pathname changes AND it's different
  useEffect(() => {
    const detected = getLocaleFromPath(pathname);
    
    // ✅ Skip if same locale to prevent unnecessary updates
    if (detected === locale) return;
    
    if (isValidLocale(detected)) {
      setLocaleState(detected);
    }

    // ✅ Update HTML lang attribute
    const currentInfo = LOCALE_INFO[detected] || LOCALE_INFO[DEFAULT_LOCALE];
    if (typeof document !== 'undefined' && currentInfo?.htmlLang) {
      document.documentElement.lang = currentInfo.htmlLang;
      const rtlLocales = ['ar', 'he', 'ur'];
      document.documentElement.dir = rtlLocales.includes(detected) ? 'rtl' : 'ltr';
    }
  }, [pathname]); // ✅ Removed locale from dependencies to prevent loops

  // ✅ Load dictionary with useMemo
  const dict = useMemo(() => getCachedDictionary(locale), [locale]);

  // ✅ Memoized translation function
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

      if ((targetVal === undefined || targetVal === null) && locale !== DEFAULT_LOCALE) {
        const enDict = getCachedDictionary(DEFAULT_LOCALE);
        targetVal = getNestedValue(enDict, key);
      }

      if (targetVal === undefined || targetVal === null) {
        targetVal = fallbackValue !== undefined ? fallbackValue : key;
      }

      if (typeof targetVal === 'string' && interpolations && typeof interpolations === 'object') {
        return targetVal.replace(/\{(\w+)\}/g, (_, k) => {
          return interpolations[k] !== undefined ? interpolations[k] : `{${k}}`;
        });
      }

      return targetVal;
    },
    [dict, locale]
  );

  // ✅ Memoized URL generator
  const getLocalizedHref = useCallback(
    (path, targetLocale = locale) => {
      return formatLocalizedPath(path, targetLocale);
    },
    [locale]
  );

  // ✅ OPTIMIZED: Switch language with minimal re-renders
  const switchLanguage = useCallback(
    (newLocale) => {
      // ✅ Early exit if invalid or same locale
      if (!isValidLocale(newLocale) || newLocale === locale) return;

      // ✅ Persist preference
      try {
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        localStorage.setItem('NEXT_LOCALE', newLocale);
      } catch (e) {
        // Handle incognito mode
      }

      // ✅ Immediately update state to prevent flash of wrong content
      setLocaleState(newLocale);

      const currentFull = pathname || '/';
      const targetUrl = formatLocalizedPath(currentFull, newLocale);

      // ✅ Use startTransition for smoother navigation
      startTransition(() => {
        router.push(targetUrl);
      });
    },
    [locale, pathname, router]
  );

  // ✅ Memoized context value
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