<template>
  <v-app dark>
    <VSiteHeader />
    <v-main>
      <slot />
    </v-main>
    <VSiteFooter/>
  </v-app>
</template>


<script setup>
// import siteHeader from '~/components/siteHeader.vue'
// import footerTop from '~/components/footerTop.vue'
import VSiteHeader from '~/components/VSiteHeader.vue'
import VSiteFooter from '~/components/VSiteFooter.vue'

/*
  head() {
    return {
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX',
        },
      ],
    }
  },
}
*/
</script>

<style>
</style>
