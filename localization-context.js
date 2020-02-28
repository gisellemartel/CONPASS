import React from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import * as languages from './localization-data';

// Set the key-value pairs for the different languages to support.
i18n.translations = {
  en: languages.english,
  fr: languages.french,
  sp: languages.spanish
};

// Set the locale once at the beginning of app.
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export const localeContext = i18n;

export const Locale = React.createContext(
  localeContext.locale,
  localeContext.translations
);
