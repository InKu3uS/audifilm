// i18n.init.ts
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export function initI18Next(): Promise<void> {
  return i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({
      fallbackLng: 'en',
      debug: false,
      ns: ['translation'],
      defaultNS: 'translation',
      backend: {
        loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
      returnObjects: true,
      load: 'languageOnly',
    })
    .then(() => {
      const savedLang = localStorage.getItem('lang') || i18next.language || 'en';
      i18next.changeLanguage(savedLang);
    })
    .catch((err) => {
      console.error('i18next init failed', err);
    });
}
