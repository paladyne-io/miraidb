import { createApp } from 'vue';
import App from './App.vue';
import { createWebHistory, createMemoryHistory, createRouter } from 'vue-router'
import routes from './router/routes_dashboard.js'
import { Quasar } from 'quasar'
import i18n from '../../shared/i18n.js';
import { createPinia } from 'pinia'; // Import Pinia

// import router from '/shared/mainRouter.js'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

//import router from '../../shared/mainRouter.js';

// Import local css
// import './assets/main.css'

// console.log("main.js routes: " + JSON.stringify(routes))

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

const app = createApp(App);
const pinia = createPinia(); // Create Pinia instance
app.use(pinia); // Use Pinia with the app
app.use(i18n);
app.use(router);
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})
// app.provide('supabase', supabase)
app.mount('#dashboard');
// app.mount('#app');
