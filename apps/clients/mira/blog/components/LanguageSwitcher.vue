<template>
  <q-select
    class="text-h6 q-ml-lg"
    v-model="locale"
    popup-content-class="text-subtitle1"
    :options="localeOptions"
    label="Language"
    borderless
    emit-value
    map-options
    options-dense
    style="max-width: 100px"
  />
</template>

<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

const { t, locale } = useI18n({ useScope: 'global' })
const $q = useQuasar()

const localeOptions = [
  { value: 'en', label: 'English' },
  { value: 'ja', label: 'Japanese | 日本語' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish | Espanol' }
]

const langList = import.meta.glob('../../node_modules/quasar/lang/*.mjs')

watch(locale, () => {
  const langIso = locale.value // Get the selected locale

  try {
    langList[`../../node_modules/quasar/lang/${langIso}.mjs`]().then(
      (lang) => {
        $q.lang.set(lang.default)
      }
    )
  } catch (err) {
    // Handle error if the requested Quasar Language Pack does not exist
  }
})
</script>
