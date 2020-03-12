import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const SetLocaleContext = () => {
// Set the key-value pairs for the different languages to support.
  i18n.translations = {
    en: {
      welcome: 'Hello',
      search: 'Search...',
      calendar: 'Calendar',
      accessibility: 'Accessibility',
      help: 'Help',
      back: 'Back'
    },
    fr: {
      welcome: 'Bonjour',
      search: 'Chercher...',
      calendar: 'Calendrier',
      accessibility: 'Accessibilité',
      help: 'Aide',
      back: 'Retour'
    },
    sp: {
      welcome: 'Hola',
      search: 'Buscar...',
      calendar: 'Calendario',
      accessibility: 'Accesibilidad',
      help: 'Ayuda',
      back: 'Atrás'
    }
  };

  // Set the locale once at the beginning of app.
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
};


export default SetLocaleContext;
