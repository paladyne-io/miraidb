<template>
  <q-list
    highlight
    separator
  >
    <q-item
      v-for="languageItem in localeOptions"
      clickable
      :key="languageItem.value"
      separator
      @click="changeLanguage(languageItem)"
    >
      {{ languageItem.label }}
    </q-item>
  </q-list>
</template>

<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

const localeOptions = [
  { value: 'en', active: true, label: 'English' },
  { value: 'ja', active: false, label: 'Japanese | 日本語' },
  { value: 'fr', active: false, label: 'French | Français' },
  { value: 'es', active: false, label: 'Spanish | Espanol' }
]

const { locale } = useI18n({ useScope: 'global' })
// console.log('locale: ' + JSON.stringify (locale))

const $q = useQuasar()

const langList = import.meta.glob('../../node_modules/quasar/lang/*.mjs')
// console.log('Quasar lang (def): ' + $q.lang.isoName)
const initialLocale = $q.lang.getLocale() // returns a string

console.log('Initial locale: ' + initialLocale)

let abrLocale = 'en'
if (initialLocale) {
  abrLocale = initialLocale.substring(0, 2)
}
locale.value = abrLocale
// console.log('useI18n.locale: ' + locale.value)

/*
try {
  console.log('checking if users local is available...')

  langList[`../../node_modules/quasar/lang/${initialLocale}.mjs`]().then(
    (lang) => {
      $q.lang.set(lang.default)
      console.log('set default lang to: ' + $q.lang.getLocale())
    }
  )
} catch (err) {
  // Requested Quasar Language Pack does not exist,
  // let's not break the app, so catching error
}
*/

function changeLanguage(lang) {
  // console.log('changeLanguage: ' + lang.value)
  locale.value = lang.value
  lang.active = true
}

watch(locale, () => {
  const langIso = 'en' // ... some logic to determine it (use Cookies Plugin?)
  try {
    langList[`../../node_modules/quasar/lang/${langIso}.mjs`]().then(
      (lang) => {
        $q.lang.set(lang.default)
      }
    )
  } catch (err) {
    // Requested Quasar Language Pack does not exist,
    // let's not break the app, so catching error
  }
})

</script>
