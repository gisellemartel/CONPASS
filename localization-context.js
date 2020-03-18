import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const SetLocaleContext = () => {
// Set the key-value pairs for the different languages to support.
  i18n.translations = {
    en: {
      welcome: 'Hello',
      search: 'Search...',
      shuttleBusSchedule: 'Shuttle Bus Schedule',
      calendar: 'Calendar',
      accessibility: 'Accessibility',
      help: 'Help',
      back: 'Back',
      destinationSearch: 'Choose your destination',
      LOCATION_ALERT_TITLE: 'Location Services Required',
      LOCATION_ALERT_MESSAGE: 'Location services has not been enabled. Please allow this app to use your location.',
      LOCATION_ALERT_BUTTON: 'Open Settings'
    },
    fr: {
      welcome: 'Bonjour',
      search: 'Chercher...',
      calendar: 'Calendrier',
      shuttleBusSchedule: 'Horaire des Navettes',
      accessibility: 'Accessibilité',
      help: 'Aide',
      back: 'Retour',
      LOCATION_ALERT_TITLE: 'Services de localisation requis',
      LOCATION_ALERT_MESSAGE: 'Les services de localisation n\'ont pas été activés. Veuillez autoriser cette application à utiliser vos informations de localisation.',
      LOCATION_ALERT_BUTTON: 'Ouvrir les paramètres'
    },
    sp: {
      welcome: 'Hola',
      search: 'Buscar...',
      calendar: 'Calendario',
      shuttleBusSchedule: 'Horario de Autobuses',
      accessibility: 'Accesibilidad',
      help: 'Ayuda',
      back: 'Atrás',
      LOCATION_ALERT_TITLE: 'Servicios de ubicación requeridos',
      LOCATION_ALERT_MESSAGE: 'Los servicios de ubicación no se han habilitado. Permita que esta aplicación use su información de ubicación.',
      LOCATION_ALERT_BUTTON: 'Configuración abierta'
    }
  };

  // Set the locale once at the beginning of app.
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
};


export default SetLocaleContext;
