<template>
  <div>
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

    <v-app-bar fixed app hide-on-scroll height="64" elevate-on-scroll>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = true" />
      <v-spacer />

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

      <v-btn icon @click="changeThemeColor()">
        <v-icon>{{
          darkTheme ? 'mdi-white-balance-sunny' : 'mdi-weather-night'
        }}</v-icon>
      </v-btn>
    </v-app-bar>
  </div>

</template>

<script setup>
  import { ref } from 'vue'

  import { useTheme } from 'vuetify'

  const darkTheme = ref(false)

  const theme = useTheme()

  function  changeThemeColor() {
    console.log("changeThemeColor: " +  darkTheme.value)
    darkTheme.value = ! darkTheme.value
    theme.global.name.value = darkTheme.value ? 'dark' : 'light'


   // if (vuetify.theme.dark === true) {
    //  $vuetify.theme.dark = false
    //} else {
    //   $vuetify.theme.dark = true
   // }

  }


const changeTheme = () => {
  theme.global.name.value = darkTheme.value ? 'dark' : 'light'
}

  // const clipped = ref( false)

  const drawer= ref( false)
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

</script>

<style scoped>
.submenubtn {
  cursor: default;
}
</style>
