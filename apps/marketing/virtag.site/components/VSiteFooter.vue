<template>

  <v-footer
    :class="$vuetify.theme.dark
        ? 'blue-grey darken-4 grey--text text--lighten-1'
        : 'grey lighten-3 grey--text text--darken-4'
      "
    class="site-footer"
  >
    <v-container>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="7">
          <div

            class="text-center virtag-menu d-flex flex-wrap justify-center"
          >

            <template
              v-if="smAndUp"
              v-for="(s, i) in menu"
              :key="i"
            >

            <a class="text--secondary pa-md-0 virtag-menu-item" :href="s.link" >
              {{ $t(s.text)  }}
        </a>
              <v-responsive
                v-if="i < menu.length - 1"
                :key="`divider-${i}`"
                class="shrink"
              >
              </v-responsive>
            </template>

          </div>
        </v-col>

        <v-col  cols="5" class="text--secondary text-right">
          <div>© {{ new Date().getFullYear() }} Paladyne LLC</div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { smAndUp,mdAndUp } = useDisplay()

const menu = [
  { text: 'contact', link: 'mailto:info@virtag.app' },
  { text: 'company_info', link: '#' },
  { text: 'virtag_store', link: 'https://virtag.theshop.jp' },
  { text: 'usage_policy', link: '#' }
]
</script>

<style>
.site-footer a {
  text-decoration: none;
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
</style>
