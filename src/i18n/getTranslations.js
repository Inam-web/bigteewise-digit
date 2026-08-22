// getTranslations.js
import * as enModule from './translations/en';
import * as esModule from './translations/es';
import * as itModule from './translations/it';
import * as deModule from './translations/de';
import { DEFAULT_LOCALE, isValidLocale } from './config';

// Extract the actual translation objects
const en = enModule.en || enModule.default || enModule;
const es = esModule.es || esModule.default || esModule;
const it = itModule.it || itModule.default || itModule;
const de = deModule.de || deModule.default || deModule;

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