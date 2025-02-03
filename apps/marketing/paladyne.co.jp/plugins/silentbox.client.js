import VueSilentbox from 'vue-silentbox'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window !== 'undefined') {
    nuxtApp.vueApp.use(VueSilentbox)
  }
})
