import { boot } from '../quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from '../i18n'

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

export default boot(({ app }) => {
  const i18n = createI18n({
    numberFormats,
    legacy: false,
    locale: 'en',
    fallbackWarn: false,
    globalInjection: true,
    messages
  })

  // Set i18n instance on app
  app.use(i18n)
})
