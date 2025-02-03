<template>
  <div>
    <q-layout
      view="lHh lpr lFf"
      @scroll="scrollHandler"
    >
      <q-header v-if="isDesktop || isAndroid || useHeader">
        <transition name="fade"
        >
          <q-toolbar
            class="q-pb-sm"
            v-show="showToolbar"
          >
            <q-space />
            <q-space />
            <transition name="fade"
            >
            <!-- <Transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          > -->
            <q-tabs
              v-if='header_icons_expanded'
              no-caps
              indicator-color="transparent"
            >
              <!--
              <HideShowFooter
                class="header-btn"
                @footerVisibilityChanged="revealFooter"
                :avatar="false"
                :noPadding="false"
                :showLabel="false"
                :ignoreDarkMode="true"
              />
              -->
              <DarkModeSwitcher
                class="header-btn"
                :ignore-dark-mode="true"
                :avatar="true"
                :="false"
                :noPadding="true"
                key="darkmode"
              />

              <!-- <transition-group
                appear
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
              >
              -->
              <q-route-tab
                name="Profile"
                key="profile"
                to="/profile"
                class="v-route-tab"
                active-class="route-tab-active"
              >
                <div class="text-center text-h6">
                  <!--  {{ $t('profile') }} -->
                  Profile
                </div>
              </q-route-tab>
              <q-route-tab
                class="header-btn"
                key="Blog"
                name="Blog"
                exact
                to="/blog"
                active-class="route-tab-active"
              >
                <div class="text-center text-h6">
                  Blog
                </div>
              </q-route-tab>

              <q-route-tab
                name="Blog (new)"
                key="tags"
                to="/new-post"
                class="
                  v-route-tab"
                active-class="route-tab-active"
              >
                <div class="text-center text-h6">
                  New Post
                </div>
              </q-route-tab>

              <!--  </transition-group> -->
            </q-tabs>
            </transition>
            <q-space />

            <q-btn
              size="lg"
              flat
              dense
              round
              :icon="leftDrawerOpen ? 'close' : 'menu'"
              aria-label="Menu"
              @click="toggleLeftDrawer"
            />
          </q-toolbar>
          <!--
          <q-toolbar style="height: 32px;"
            v-else
          />
        -->
        </transition>
      </q-header>

      <!--
      <transition
        appear
        enter-active-class="animated fadeIn slideInLeft"
        :duration="3000"
      > -->
      <q-drawer
        class="sidebar text-blue-10 text-subtitle2"
        :width='270'
        :breakpoint="1800"
        v-model="leftDrawerOpen"
        @before-show="drawerShown(evt)"
        show-if-above
        bordered
      >
        <q-list>
          <q-item-label header>Settings</q-item-label>
          <DarkModeSwitcher
            :avatar="true"
            :ignore-dark-mode="false"
            :showLabel="true"
          />
          <!--
          <q-item>
            <LanguageSwitcher style="min-width:280px;"> </LanguageSwitcher>
          </q-item>
          -->
          <q-expansion-item
            v-model="showLanguages"
            clickable
            label="Choose Language"
            active-class="my-menu-link"
          >
            <q-item>
              <LanguageSwitcherMenu
                @click="leftDrawerOpen = !leftDrawerOpen"
                style="min-width:280px;"
              >
              </LanguageSwitcherMenu>
            </q-item>
            <q-separator />
          </q-expansion-item>

          <q-item-label header>Navigation</q-item-label>

          <q-item
            clickable
            v-ripple
            to="/"
            @click="link = '/'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="fa fa-home" />
            </q-item-section>
            <q-item-section>Home</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="new-post"
            @click="link = 'blog_new'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="fa fa-home" />
            </q-item-section>
            <q-item-section>New Blog Post</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="signin"
            @click="link = 'signin'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>
            <q-item-section>Login</q-item-section>
          </q-item>

          <q-item
            v-if="hasUser"
            clickable
            v-ripple
            to="signin"
            @click="link = 'signin'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-circle-user" />
            </q-item-section>

            <q-item-section>Profile</q-item-section>
          </q-item>
          <q-item
            v-else
            disable
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-circle-user" />
            </q-item-section>
            <q-item-section> My Profile</q-item-section>
          </q-item>

          <q-item
            :disable="!hasUser"
            clickable
            v-ripple
            to="/"
            @click="signOut"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>Sign out</q-item-section>
          </q-item>

          <q-separator />

          <q-item
            clickable
            v-ripple
            to="AppInfo"
            @click="link = 'ripple'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>

          </q-item>

          <q-item
            clickable
            v-ripple
            to="privacy_notice"
            @click="link = 'privacy_notice'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="fa fa-shield" />
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="terms_conditions"
            @click="link = 'terms_conditions'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="fa fa-handshake" />
            </q-item-section>

            <q-item-section>Terms and Conditions</q-item-section>
          </q-item>

        </q-list>

      </q-drawer>
      <!-- </transition> -->
      <!--
      <VuePageTransition name="fade-in-right">
      -->
      <q-page-container>
        <router-view :key="$route.fullPath"/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
// import EssentialLink from 'components/EssentialLink.vue'

import { ref, watch, onMounted, inject } from 'vue' // defineComponent, computed
import { useRoute } from 'vue-router' // useRouter

const hasUser = true

// import { store } from 'boot/store.js'
// import { useQuasar } from 'quasar' //, setCssVar
// import { useSupabase } from 'boot/supabase' // getLoggedinUser,
import useDetectPlatform from '../composables/UseDetectPlatform'

// import UserAvatar from '../components/user/UserAvatar.vue'
// import { useAvatarStore } from 'stores/avatar'
// import { storeToRefs } from 'pinia'

import DarkModeSwitcher from '../components/DarkModeSwitcher.vue'
// import LanguageSwitcherButtons from '../components/LanguageSwitcherButtons.vue'
// import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import LanguageSwitcherMenu from '../components/LanguageSwitcherMenu.vue'

// import HideShowFooter from 'src/components/HideShowFooter.vue'
// import HideShowHeaderIcons from 'src/components/HideShowHeaderIcons.vue'

// const { supabaseClient } = useSupabase()
const { isAndroid, isIOS, isDesktop } = useDetectPlatform() // isNativeMobile, isIPhone,

const essentialLinks = [
  /*
  {
    title: 'About Paladyne', // `{{ $t("about_paladyne") }}`
    caption: 'Company website',
    icon: 'link',
    link: 'https://paladyne.co'
  }
  */
  {
    title: 'Dashboard', // `{{ $t("about_paladyne") }}`
    caption: 'Location and access metrics',
    icon: 'link',
    link: 'https://'
  }
]

const useHeader = ref(true)
const showToolbar = ref(false)

// the authenticated user or null if none
// const user = ref()
// const guestUser = ref()
// const avatar_editable;

// const avatarStore = useAvatarStore()
// const { avatarSrc } = storeToRefs(avatarStore)
// const avatarSrc = ref()

const leftDrawerOpen = ref(false)
// const avatarUrl = ref('icons/avatar.png')
const src = ref('icons/avatar.png')

const route = useRoute()
// const route = ref()

// console.log('Route: ' + JSON.stringify(route.path))

const showFooter = ref(false)
const showLanguages = ref(true)
const header_icons_expanded = ref(true)

// const guest_user_warning_message =
// 'You are not logged in. Login or register to access additional features.'

function signOut() {
  try {
    const { error } = supabaseClient.auth.signOut()
    if (error) throw error
  } catch (error) {
    // alert(error.message);
    console.log('Sign out error: ' + error.message)
  }
}

onMounted(async () => {
  // await checkForUser()
  // console.log('route: ' + route)
  // testBus()
})


function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const drawerShown = evt => {
  // console.log('hasUser: ' + hasUser())
  // $q.notify('shown')
}

// Hide or show the toolbar based on the scroll position
function scrollHandler(e) {
  // showToolbar.value = (e.position < 20)
}

</script>


<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.q-icon {
  font-size: 22px;
}

.body--dark .q-layout__section--marginal {
  color: #ffffff;
  background: rgba(94, 93, 93, 0.5);
}

.body--light .q-layout__section--marginal {
  color: #000;
  background: rgba(160, 194, 232, 0.5);
}

.t-header {
  position: relative;
  padding: 0 12px;
  min-height: 50px;
  width: 100%;
}

.fa-top-icon {
  color: 'green';
  padding-bottom: 2px;
  padding-left: 8px;
}

.fa-top-icon2 {
  padding-top: 5px;
  padding-bottom: 12px;
  padding-left: 8px;
  border-radius: 50%;
  border-color: black;
}

.nav-icon-toggle .q-checkbox__icon {
  font-size: 1.3em;
  color: rgb(161, 199, 211)
}

.q-checkbox__inner {
  color: blue
}

.route-tab-active {
  color: rgb(57, 208, 49);
}

/*
.body--light .route-tab-active {
  color: rgb(183, 145, 232);
}

.body--dark .route-tab-active {
  color: rgb(36, 219, 63);
}
*/

.q-tab__label {
  font-size: 16px;
}

@media only screen and (min-width: 33.75em) {

  .header-btn {
    padding-left: 12px;
    padding-right: 12px;
  }
}

@media only screen and (min-width: 45em) {

  .header-btn {
    padding-left: 16px;
    padding-right: 16px;
  }

  .hidden-sm {
    display: block;
  }
}

@media only screen and (min-width: 60em) {

  /* 960px */
  .container {
    width: 75%;
    max-width: 60rem;
  }

  .header-btn {
    padding-left: 24px;
    padding-right: 24px;
  }

  /* 960px */
  .footer>div:first-child {
    display: flex;
  }

  .footer>div:nth-child(2) {
    justify-content: center;
  }
}

@media only screen and (max-width: 539px) {
  .header-btn {
    padding-left: 8px;
    padding-right: 8px;
  }
}

@media only screen and (max-width: 340px) {
  .header-btn {
    padding-left: 5px;
    padding-right: 5px;
  }

  .back-btn {
    display: none;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
