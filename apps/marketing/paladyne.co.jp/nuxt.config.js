// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Paladyne',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-CRKCS60K3V',
          async: true
        },
        { src: '/js/analytics.js' }
      ]
    }
  },

  css: [
    '@/assets/css/font-awesome-pro.min.css',
    '@/assets/css/pe-icon-7-stroke.css',
    '@/assets/css/muli-font.css',
    '@/assets/scss/style.scss',
    '@/assets/css/main.css'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss";'
        }
      }
    }
  },

  modules: [
    '@nuxtjs/i18n'
  ],

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'ja',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        iso: 'en',
        file: 'en.js'
      },
      {
        code: 'ja',
        iso: 'ja',
        file: 'ja.js'
      }
    ]
  },

  build: {
    transpile: ['swiper', 'aos']
  },

  postcss: {
    plugins: {
      autoprefixer: {}
    }
  },

  nitro: {
    preset: 'node-server'
  },

  // Plugins will be auto-imported from the plugins directory
  plugins: [
    { src: '~/plugins/aos.client', mode: 'client' },
    { src: '~/plugins/swiper.client', mode: 'client' },
    { src: '~/plugins/mixitup.client', mode: 'client' },
    { src: '~/plugins/silentbox.client', mode: 'client' },
    { src: '~/plugins/parallax.client', mode: 'client' }
  ],

  // Auto-import components
  components: true,

  experimental: {
    payloadExtraction: false
  },

  // For static site generation
  ssr: true,

  target: 'static',
  compatibilityDate: '2025-02-02'
})
