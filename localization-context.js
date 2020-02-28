import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const SetLocaleContext = () => {
// Set the key-value pairs for the different languages to support.
  i18n.translations = {
    en: {
      welcome: 'Hello',
      search: 'Search...',
      setCalendar: 'Set Calendar',
      accessibility: 'Accessibility',
      language: 'Language',
      help: 'Help',
    },
    fr: {
      welcome: 'Bonjour',
      search: 'Chercher...',
      setCalendar: 'Calendrier',
      accessibility: 'Accessibilité',
      language: 'Language',
      help: 'Aide',
    },
    sp: {
      welcome: 'Hola',
      search: 'Buscar...',
      setCalendar: 'Calendario',
      accessibility: 'Accesibilidad',
      language: 'Idioma',
      help: 'Ayuda',
    }
  };

  // Set the locale once at the beginning of app.
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
};


export default SetLocaleContext;
