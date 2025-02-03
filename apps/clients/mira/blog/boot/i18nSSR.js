import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../i18n'
import langEn from 'quasar/lang/en-us'
import langAr from 'quasar/lang/ar'
import langZhHans from 'quasar/lang/zh-hans'

let langs = { 'en-us': langEn, ar: langAr, 'zh-hans': langZhHans }
Vue.use(VueI18n)

let i18n = null

const res = async ({ app, ssrContext }) => {
  return new Promise(async (resolve, reject) => {
    let langIso = 'en-us' // ... some logic to determine it (use Cookies Plugin?)
    if (app.$q.cookies.has('locale')) langIso = app.$q.cookies.get('locale')
    i18n = new VueI18n({
      locale: langIso,
      fallbackLocale: 'en-us',
      messages
    })
    app.$q.lang.set(langs[langIso])
    app.i18n = i18n
    app.i18n.locale = langIso
    resolve()
  })
}
export default res

export { i18n }
