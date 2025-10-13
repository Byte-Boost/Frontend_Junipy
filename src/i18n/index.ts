import { createI18n } from "vue-i18n";

import en from "../locales/en.json";
import pt from "../locales/pt.json";

const messages = {
  en,
  pt,
};

const i18n = createI18n({
  locale: "pt-BR",
  fallbackLocale: "en",
  messages,
  legacy: false,
  globalInjection: true, // This enables $t in templates
});

export default i18n;
