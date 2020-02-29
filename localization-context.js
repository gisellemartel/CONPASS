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
      language_description: 'Choose the preffered language for navigation menu, names etc.',
      help: 'Help',
      back: 'Back'
    },
    fr: {
      welcome: 'Bonjour',
      search: 'Chercher...',
      setCalendar: 'Calendrier',
      accessibility: 'Accessibilité',
      language: 'Language',
      language_description: 'Choisissez la langue préférée pour le menu de navigation, les noms, etc.',
      help: 'Aide',
      back: 'Retour'
    },
    sp: {
      welcome: 'Hola',
      search: 'Buscar...',
      setCalendar: 'Calendario',
      accessibility: 'Accesibilidad',
      language: 'Idioma',
      language_description: 'Elija el idioma preferido para el menú de navegación, nombres, etc.',
      help: 'Ayuda',
      back: 'Atrás'
    }
  };

  // Set the locale once at the beginning of app.
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
};


export default SetLocaleContext;
