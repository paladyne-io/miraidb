import colors from 'vuetify/lib/util/colors'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// const path = require('path')

export default defineNuxtConfig ({
  /*
  nitro: {
    output: {
      publicDir: path.join(__dirname, 'dist/public')
    }
  },

  target: 'static',
  ssr: true,
  */

  // Global page headers (https://go.nuxtjs.dev/config-head)
  app:{
    head: {
    titleTemplate: '%s - Virtag',
    title: 'Home',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Use Virtag to create your own online content and link it to NFC tags with the Virtag NFC app',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Virtag is a microservice platform for creating NFC tags and unique QR codes',
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content:
          'https://www.virtag.site/images/OG_English_1200x630px.jpg',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],

    script: [
      {'src': 'https://virtag-ai.fly.dev/chatbotfileserver/ChatGPT_Assistant.js/?id=12345', tagPosition: 'bodyClose'}
    ]
  },
},

  //{'src': '/javascript/ChatGPT_Assistant_Widget.js', tagPosition: 'bodyClose'}, ,

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['vuetify/styles', '/assets/css/app.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)

  vite: {
    // @ts-ignore
    // curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
    ssr: {
        noExternal: ['vuetify'], // add the vuetify vite plugin
    },
},

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',,
    "@nuxtjs/vuetify"
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)

  vuetify: {
    customVariables: ['~/assets/variables.scss'],

    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)

  build: {
    transpile: ['vuetify','quasar'],
    /*
    extend(config, ctx) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          fix: true,
        },
      })
    },
    */
  },

  modules: [
    'nuxt-quasar-ui', 'nuxt-icon-tw', '@nuxtjs/i18n', 'nuxt-gtag', '@nuxtjs/tailwindcss',

    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  gtag: {
    id: 'G-E0R4VW60DL'
  },

  i18n: {
    defaultLocale: "ja",
    /* module options */
    lazy: true,
    fallbackLocale: "en",
    langDir: "locales/",
    locales: [
      {
        //name: "English",
        code: "en",
        iso: "en",
        file: "en.js",
        //dir: 'en-US'
      },
      {
        //name: "日本語",
        code: "ja",
        iso: "ja",
        file: "ja.js",
        //dir: 'ja'
      },
    ],
  },

  quasar: { /* */ }
  /*
  vite: {
    vue: {
      template: {
        transformAssetUrls
      },
    },
  }
  */,

  compatibilityDate: '2025-02-03',
})