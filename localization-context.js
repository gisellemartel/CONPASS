import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const SetLocaleContext = () => {
// Set the key-value pairs for the different languages to support.
  i18n.translations = {
    en: {
      welcome: 'Hello',
      search: 'Search for a place',
      calendar: 'Calendar',
      accessibility: 'Accessibility',
      help: 'Help',
      back: 'Back',
      destinationSearch:'Choose your destination'
    },
    fr: {
      welcome: 'Bonjour',
      search: 'Rechercher un lieu',
      calendar: 'Calendrier',
      accessibility: 'Accessibilité',
      help: 'Aide',
      back: 'Retour',
      destinationSearch:'Choisissez votre destination'
    },
    sp: {
      welcome: 'Hola',
      search: 'Buscar...',
      calendar: 'Calendario',
      accessibility: 'Accesibilidad',
      help: 'Ayuda',
      back: 'Atrás',
      destinationSearch:'Elige tu destino'
    }
  };

  // Set the locale once at the beginning of app.
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
};


export default SetLocaleContext;
