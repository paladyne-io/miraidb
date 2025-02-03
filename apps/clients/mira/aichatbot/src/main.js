import { createApp } from 'vue'
// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
import router from './router'

import { Quasar } from 'quasar'

import './assets/main.css'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})

app.use(router)
app.mount('#app')