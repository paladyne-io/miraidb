// plugins/vuetify.ts

 import '@mdi/font/css/materialdesignicons.css'
 import { createVuetify } from 'vuetify'
 import 'vuetify/styles'
 import * as components from 'vuetify/components'
 // import colors from 'vuetify/lib/util/colors'

 import * as directives from 'vuetify/directives'
 import { aliases, md } from 'vuetify/iconsets/md'
 import '@fortawesome/fontawesome-free/css/all.css' // Ensure your project is capable of handling css files
 import { fa } from 'vuetify/iconsets/fa'
 import { mdi } from 'vuetify/iconsets/mdi-svg'


 import { mdiAccount } from '@mdi/js'

 export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        // your config will come here
        components,
        directives
    })

    nuxtApp.vueApp.use(vuetify)

})
import VueRouter from 'vue-router'

