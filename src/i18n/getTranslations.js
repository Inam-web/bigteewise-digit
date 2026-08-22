import { en } from './translations/en';
import { es } from './translations/es';
import { it } from './translations/it';
import { de } from './translations/de';
import { DEFAULT_LOCALE, isValidLocale } from './config';

const dictionaries = {
  en,
  es,
  it,
  de,
};

export function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === undefined || current === null || typeof current !== 'object') {
      return undefined;
    }
    current = current[key];
  }
  
  return current;
}

export function getDictionary(locale = DEFAULT_LOCALE) {
  const targetLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  return dictionaries[targetLocale] || dictionaries[DEFAULT_LOCALE];
}

export function translate(locale, path, params = {}, fallback) {
  let interpolations = params;
  let fallbackValue = fallback;

  if (typeof params === 'string') {
    fallbackValue = params;
    interpolations = {};
  }

  const dict = getDictionary(locale);
  let value = getNestedValue(dict, path);

  if ((value === undefined || value === null) && locale !== DEFAULT_LOCALE) {
    value = getNestedValue(dictionaries[DEFAULT_LOCALE], path);
  }

  if (value === undefined || value === null) {
    value = fallbackValue !== undefined ? fallbackValue : path;
  }

  if (typeof value === 'string' && Object.keys(interpolations).length > 0) {
    return value.replace(/\{(\w+)\}/g, (_, key) => {
      return interpolations[key] !== undefined ? interpolations[key] : `{${key}}`;
    });
  }

  return value;
}