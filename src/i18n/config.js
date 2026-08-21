// config.js
export const SUPPORTED_LOCALES = ['en', 'es', 'it', 'de'];
export const DEFAULT_LOCALE = 'en';

export const LOCALE_INFO = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    htmlLang: 'en-GB',
    ogLocale: 'en_GB',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    htmlLang: 'es-ES',
    ogLocale: 'es_ES',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    htmlLang: 'it-IT',
    ogLocale: 'it_IT',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    htmlLang: 'de-DE',
    ogLocale: 'de_DE',
  },
};

export function isValidLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale);
}

export function getLocaleFromPath(pathname) {
  if (!pathname) return DEFAULT_LOCALE;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0])) {
    return segments[0];
  }
  return DEFAULT_LOCALE;
}

export function formatLocalizedPath(path, targetLocale = DEFAULT_LOCALE) {
  if (!path) return targetLocale === DEFAULT_LOCALE ? '/' : `/${targetLocale}`;

  // Handle external or protocols
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }

  // Extract query params and hashes
  let cleanPath = path;
  let queryAndHash = '';

  const searchIndex = cleanPath.search(/[?#]/);
  if (searchIndex !== -1) {
    queryAndHash = cleanPath.slice(searchIndex);
    cleanPath = cleanPath.slice(0, searchIndex) || '/';
  }

  // Strip existing locale prefix
  const segments = cleanPath.split('/').filter(Boolean);
  if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0])) {
    segments.shift();
  }
  const purePath = `/${segments.join('/')}`.replace(/\/+/g, '/');

  // Build target path
  if (targetLocale === DEFAULT_LOCALE) {
    const result = purePath === '/' ? '' : purePath;
    return `${result}${queryAndHash}` || '/';
  } else {
    const result = purePath === '/' ? `/${targetLocale}` : `/${targetLocale}${purePath}`;
    return `${result}${queryAndHash}`;
  }
}