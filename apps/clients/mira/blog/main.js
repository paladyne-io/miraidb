import { createApp } from 'vue';
import App from './App.vue';
import { isNavigationFailure, NavigationFailureType, createWebHistory,createMemoryHistory, createRouter } from 'vue-router'
// import routes from './router/routes.js'
import { Quasar } from 'quasar'
import i18n from '/shared/i18n.js';
import { createPinia } from 'pinia'; // Import Pinia

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Import local css
import './assets/main.css'

import router from '/shared/mainRouter.js'

/*
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
*/

const app = createApp(App);
const pinia = createPinia(); // Create Pinia instance
app.use(pinia); // Use Pinia with the app
app.use(i18n);
app.use(router);
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})
// app.provide('supabase', supabase)
app.mount('#blog');
