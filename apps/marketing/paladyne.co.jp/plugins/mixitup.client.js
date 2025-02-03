import mixitup from 'mixitup'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window !== 'undefined') {
    return {
      provide: {
        mixitup: mixitup
      }
    }
  }
})
