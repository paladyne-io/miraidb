import { createI18n } from 'vue-i18n'
import messages from '../blog/i18n/index.js'
// import en from '../src/i18n/en';
// import ja from '../src/i18n/ja';

const numberFormats = {
  en: {
    currency: {
      style: 'currency',
      currency: 'USD'
    }
  },
  'en-US': {
    currency: {
      style: 'currency',
      currency: 'USD'
    }
  },
  'ja-JP': {
    currency: {
      style: 'currency',
      currency: 'JPY',
      currencyDisplay: 'symbol'
    }
  },
  'fr-FR': {
    currency: {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol'
    }
  },
  'es-ES': {
    // Spain
    currency: {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol'
    }
  },
  'es-BO': {
    // Bolivia
    currency: {
      style: 'currency',
      currency: 'BOB',
      currencyDisplay: 'symbol'
    }
  }
}

const i18n =createI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  legacy:false,
  messages
})

export default i18n;