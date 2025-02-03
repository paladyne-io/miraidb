<template>
  <div
    dark
    :class="$vuetify.theme.dark ? 'grey darken-4' : 'white'"
  >

    <!--
    <v-navigation-drawer v-model="drawer" fixed app temporary>
      <v-list dense>

       <v-list-group v-for="(item, i) in items" :key="i" color="primary">
          <v-list-item v-if="!item.submenu" :to="item.to">
            <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="item.title.toUpperCase()" />
          </v-list-item>

          <v-list-group v-else :prepend-icon="item.icon" no-action>
            <template v-slot:activator>
              <v-list-item-title
                  v-text="item.title.toUpperCase()"
                ></v-list-item-title>

            </template>
<v-list-item
  v-for="child in item.submenu"
  :key="child.title"
  :to="child.to"
>
  <v-list-item-title v-text="child.title"></v-list-item-title>
</v-list-item>
</v-list-group>

</v-list-group>
</v-list>
</v-navigation-drawer>
-->

    <v-app-bar
      fixed
      flat
      app
      hide-on-scroll
      height="90"
      elevate-on-scroll
      density="compact"
    >
      <!---
      <v-icon
        class="py-6"
        icon="icons/virtag_logo.png"
      ></v-icon>
     -->

      <div class="px-6">
        <virtag_icon class="VirtagIcon" />
      </div>

      <!---
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = true" />
            <v-spacer />
      -->
      <!--

      <template v-for="(name, menuitem) in items">
        <template v-if="name.submenu">
          <v-menu
            :key="menuitem"
            open-on-hover
            offset-y
            transition="slide-y-transition"
            bottom
          >

          <v-list dense>
            <v-list-item
              v-for="(item, index) in name.submenu"
              :key="index"
              link
              :to="item.to"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
          </v-menu>
        </template>
      </template>
      -->
      <v-spacer />
      <v-row>
        <v-col>
          <div
            style="max-width:600px;"
            class="text-center virtag-menu d-flex flex-wrap justify-center"
          >
            <template
              v-if="mdAndUp"
              v-for="(s, i) in menu"
              :key="i"
            >
              <a
                class="virtag-menu-item virtag-font"
                :href="s.link"
                v-text="$t(s.text)"
              />

              <v-responsive
                v-if="i < menu.length - 1"
                :key="`divider-${i}`"
                class="mx-4 shrink "
                max-height="18"
              >
                <v-divider vertical />
              </v-responsive>

            </template>
          </div>

        </v-col>
      </v-row>
      <v-spacer />

      <div class="menu-buttons">

        <v-btn
          href="https://virtag.theshop.jp"
          size="md"
          no-caps
          class="text-capitalize virtag-btn text-white font-weight-bold"
        >
          Virtag Store
        </v-btn>

        <v-btn
          size="md"
          href="mailto:virtag@paladyne.co"
          class="mx-2 virtag-btn text-capitalize  text-white font-weight-bold"
        >
          {{ $t('contact') }}
        </v-btn>

        <v-btn
          v-if="locale === 'ja'"
          size="md"
          variant="plain"
          :to="switchLocalePath('en')"
          class="mx-2 pa-2 text-capitalize english-text lang-switcher-btn font-weight-bold"
        >
          English
        </v-btn>

        <v-btn
          v-else
          variant="plain"
          size="md"
          :to="switchLocalePath('ja')"
          class="mx-2 pa-2 text-capitalize japanese-text lang-switcher-btn font-weight-bold"
        > 日本語
        </v-btn>

        <!--
        {{ locale }}

        <div class="mx-4 shrink flex-center text-capitalize">
          <nuxt-link
            v-if="locale === 'ja'"
            :to="switchLocalePath('en')"
          > English </nuxt-link>
          <nuxt-link
            v-else
            :to="switchLocalePath('ja')"
          > {{ '日本語' }} </nuxt-link>
        </div>
      -->

      </div>

      <v-btn
        v-if="hasDarkModeSwitcher"
        icon
        @click="changeThemeColor()"
      >
        <v-icon>{{darkTheme ? 'mdi-white-balance-sunny' : 'mdi-weather-night'}}
        </v-icon>
      </v-btn>

    </v-app-bar>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import { useDisplay } from 'vuetify'
// import { useI18n } from 'vue-i18n';

const { mdAndUp } = useDisplay()
const darkTheme = ref(false)
const theme = useTheme()

const hasDarkModeSwitcher = false

const { locale, locales } = useI18n() //, setLocale
const switchLocalePath = useSwitchLocalePath() // Nuxt i18n plugin

const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})

function changeThemeColor() {
  // console.log("changeThemeColor: " + darkTheme.value)
  darkTheme.value = !darkTheme.value
  theme.global.name.value = darkTheme.value ? 'dark' : 'light'
}

// const changeTheme = () => {
//   theme.global.name.value = darkTheme.value ? 'dark' : 'light'
// }

// const drawer = ref(false)

const menu = [
  { text: 'what_is_virtag', link: '#about' },
  { text: 'features', link: '#features' },
  { text: 'how_to', link: '#howto' },
  { text: 'prices', link: '#prices' },
  { text: 'faq', link: '#faqs' }
]

/*
const items = [
  {
    icon: 'mdi-folder-home-outline',
    title: 'Home',
    to: '/',
  },
  {
    icon: 'mdi-account',
    title: 'About',
    to: '/about',
  },
  {
    icon: 'mdi-tools',
    title: 'Services',
    to: '/services',
    submenu: [
      {
        title: 'Services Page',
        to: '/services',
      },
      {
        title: 'Static Websites',
        to: '/#',
      },
      {
        title: 'Mobile Applications',
        to: '/#',
      },
      {
        title: 'Corporate websites',
        to: '/#',
      },
      {
        title: 'Editorial Sites',
        to: '/#',
      },
      {
        title: 'Ecommerce and Store',
        to: '/#',
      },
      {
        title: 'Block Chain Devemopment',
        to: '/#',
      },
    ],
  },
  {
    icon: 'mdi-cash-usd',
    title: 'Pricing',
    to: '/pricing',
  },
  {
    icon: 'mdi-folder-image',
    title: 'Gallery',
    to: '/gallery',
  },
  {
    icon: 'mdi-blogger',
    title: 'Blog',
    to: '/blog',
  },
  {
    icon: 'mdi-contacts',
    title: 'Contact',
    to: '/contact',
  },
]
*/
</script>

<style scoped>

.lang-switcher-btn {
  color: rgb(19, 49, 94);
  width: 100px;
}

.my-toolbar {
  width: 80%;
  left: 10%;
}

/*
.submenubtn {
  cursor: default;
}
*/

.menu-buttons {
  display: inline-flex;
  height: 42px;
}

.virtag-menu :any-link {
  text-decoration: none;
  font-size: 16px;
}

.v-theme--light .virtag-menu :any-link {
  color: rgba(36, 37, 40);
}

.v-theme--dark .virtag-menu :any-link {
  color: rgb(255, 255, 255);
}

.VirtagIcon {
  width: 92px;
  height: 92px;
  transform: rotateY(360deg);
  animation: turn 3.0s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
