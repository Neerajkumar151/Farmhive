
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend'; // 👈 Import the backend loader

i18n
  // 1. Add the backend plugin to load translation files over HTTP
  .use(HttpBackend)
  // 2. Pass i18n instance to react-i18next
  .use(initReactI18next)
  .init({
    // IMPORTANT: Remove the hardcoded 'resources' object!
    
    lng: 'en', // Default language
    fallbackLng: 'en',
    
    backend: {
      // Path where resources get loaded from.
      // Assumes your JSON files are in public/locales/{{lng}}/{{ns}}.json
      loadPath: '/locales/{{lng}}/{{ns}}.json', 
    },
    
    // Default namespace (file name)
    ns: ['translation'],
    defaultNS: 'translation',
    
    // Configuration for React
    react: {
      useSuspense: true, // Recommended for production React apps
    },
    
    interpolation: {
      escapeValue: false, // React already escapes values
    }
  });

export default i18n;