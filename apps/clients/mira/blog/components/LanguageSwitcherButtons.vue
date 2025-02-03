<template>
  <div class="q-pr-sm">
    <div class="q-gutter-md">
      <q-btn-toggle v-model="locale" class="language-switcher" size="16px" outline no-caps dense flat toggle-color="green"
        :options="localeOptions" emit-value>
        <template v-slot:english>
          <!--
          <q-icon left name="directions_car" />
          -->
          <div style="width: 8px"></div>
          <div style="border-right: 1px solid white; height: 1px"></div>
          <q-tooltip>English</q-tooltip>
        </template>

        <template v-slot:japanese>
          <q-tooltip>日本語</q-tooltip>
          <div style="width: 8px"></div>
          <div style="border-right: 1px solid white; height: 1px"></div>
          <q-space />
        </template>

        <template v-slot:spanish>
          <q-tooltip>Español</q-tooltip>
          <div style="width: 8px"></div>
          <div style="border-right: 1px solid white; height: 1px"></div>
          <q-space />
        </template>

        <template v-slot:french>
          <q-tooltip>Français</q-tooltip>
          <q-space />
        </template>
      </q-btn-toggle>
    </div>
  </div>
</template>

<script>
import { watch, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { Preferences } from '@capacitor/preferences'

export default {
  setup() {
    const { locale } = useI18n({
      useScope: 'global'
    })
    const langList = import.meta.glob('../../node_modules/quasar/lang/*.mjs')
    const $q = useQuasar() // console.log('Quasar lang (def): ' + $q.lang.isoName)
    const langIso = ref('en') // ... some logic to determine it (use Cookies Plugin?)

    const localeOptions = [
      { value: 'en', label: 'En', slot: 'english' },
      { value: 'ja', label: 'Ja ', slot: 'japanese' },
      { value: 'es', label: 'Es', slot: 'spanish' },
      { value: 'fr', label: 'Fr', slot: 'french' }
    ]
    const initialLocale = ref('en')

    // if (initialLocale.value !== 'en-US') {
    initialLocale.value = $q.lang.getLocale().split('-')[0] // returns a string
    // }
    // console.log('initial (requested) Locale: ' + initialLocale.value)
    // console.log('initial (requested) Locale options: ' + JSON.stringify(localeOptions))

    console.log(
      'inititalLocale found: ' +
      localeOptions.find((el) => el.value === initialLocale.value)
    )

    if (
      initialLocale.value &&
      localeOptions.find((el) => el.value === initialLocale.value)
    ) {
      //  && localeOptions.value contains initialLocale
      console.log('found initial locale in available locale options')
      langIso.value = initialLocale
    }

    locale.value = initialLocale

    // console.log('langIso.value: ' + langIso.value)

    watch(locale, () => {
      // console.log('Watch locale: ' + locale.value)
      // console.log('Quasar lang ISO: ' + $q.lang.isoName)
      // console.log('Quasar version: ' + $q.version)

      // this.$i18n.locale = lang.value
      // set quasar's language too!!

      /* gives an error
      TypeError: Module specifier, 'quasar/lang/fr' does not start with "/", "./", or "../".

      import(`quasar/lang/${locale.value}`).then(language => {
        console.log('Setting quasar locale to : ' + language.default)
        $q.lang.set(language.default) // console.log('Quasar lang: ' + $q.lang.getLocale())
        console.log('Quasar lang2: ' + $q.lang.isoName)
      })
      */

      try {
        // langList[`../../node_modules/quasar/lang/${langIso.value}.mjs`]().then(
        langList[`../../node_modules/quasar/lang/${locale.value}.mjs`]().then(
          (lang) => {
            $q.lang.set(lang.default)
            // console.log('set quasar lang to: ' + JSON.stringify(lang))
            saveLanguage(locale.value)
          }
        )
      } catch (err) {
        // Requested Quasar Language Pack does not exist,
        // let's not break the app, so catching error
      }
      // $q.lang.set(lang.default)
    })

    const getSetLanguage = async () => {
      const { value } = await Preferences.get({ key: 'language' })
      console.log(`set Language to: ${value}`)
      if (!value) {
        return
      }
      locale.value = value
    }

    const saveLanguage = async (language) => {
      // console.log(`save language: ${language}`)
      await Preferences.set({
        key: 'language',
        value: language
      })
      console.log(`Saved language: ${language}`)
    }

    onMounted(() => {
      getSetLanguage()
    })

    return {
      locale,
      localeOptions
    }
  }
}
</script>
