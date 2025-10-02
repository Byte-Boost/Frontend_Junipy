import { createI18n } from 'vue-i18n'

import en from '../locales/en.json'
// Add more languages as you create them
// import es from '../locales/es.json'
// import fr from '../locales/fr.json'

const messages = {
  en,
  // es,
  // fr,
}

const i18n = createI18n({
  locale: 'en', 
  fallbackLocale: 'en', 
  messages,
  legacy: false,
  globalInjection: true, // This enables $t in templates
})

export default i18n