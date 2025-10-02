import { useI18n } from 'vue-i18n'
import type { I18nKeys } from '@/types/global'

// Create a typed version of useI18n with auto-generated keys
export const useTypedI18n = () => {
  const { t, locale } = useI18n()
  
  const typedT = (key: I18nKeys): string => {
    return t(key)
  }
  
  return { 
    t: typedT,
    locale 
  }
}