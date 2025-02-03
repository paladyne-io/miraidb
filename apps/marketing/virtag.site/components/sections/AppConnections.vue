<template>
  <section class="section">
    <!--
    <v-row align="start">
      <v-col>
        <v-img contain :src="backgroundImageSource2" max-width="300"></v-img>
   </v-col>
   </v-row>
    smAndDown: {{ smAndDown }}
      md: {{ md }}
      sm: {{ sm }}
      lg: {{ lg }}
    -->

    <v-card
      class="align-top text-white"
      min-height="680"
      color="transparent"
      :image="smAndDown? (sm? backgroundImageSourceSm : backgroundImageSourceXs ): (md? backgroundImageSource: backgroundImageSource )"
    >
      <v-container
        fill-height
        fluid
      >

        <div class="text-center pt-12">
          <h2 class="text-h4 text-md-h4 text-center text-black font-weight-bold text-white">
            {{ $t(heading) }}
          </h2>
        </div>
        <v-layout class="pt-6">
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              md="6"
              v-for="app in apps"
              :key="app.heading"
              class="align-center justify-center"
            >
              <AppLinksComponent
                class="appPanel"
                :header="heading"
                :subHeadingText="app.subHeading"
                :headingColor="app.headingColor"
                :imageSource="backgroundImageSource"
                :headingText="app.heading"
                :bodyText="$t(app.bodyText)"
                :buttonLabel="$t(app.buttonLabel)"
                :icon="app.icon"
                :hasVButton="app.hasVButton"
                :buttonLink="app.buttonLink"
                :hasAppStoreButton="app.hasAppStoreButton"
                :hasPlayStoreButton="app.hasPlayStoreButton"
                :appStoreLink="app.appStoreLink"
                :playStoreLink="app.playStoreLink"
              >
              </AppLinksComponent>
            </v-col>
          </v-row>
        </v-layout>
      </v-container>
    </v-card>
  </section>
</template>

<script setup>
import AppLinksComponent from '~/components/AppLinksComponent.vue'

const heading = 'app_connections_heading'

const backgroundImageSource = 'images/app_download_background.jpg'
const backgroundImageSourceSm = 'images/app_download_background_sm.jpg'
const backgroundImageSourceXs =  'images/app_download_background_xs.jpg'

import { useDisplay } from 'vuetify'
const { smAndUp, mdAndDown, xs, sm, md,lg, smAndDown} = useDisplay()

const apps = [
  {
    icon: '',
    heading: 'app_connections_webapp_heading',
    headingColor: 'orange',
    subHeading: 'app_connections_webapp_subheading',
    bodyText: 'app_connections_webapp_copy',
    buttonLabel: 'app_connections_webapp_button_label',
    buttonLink: 'https://www.virtag.app',
    hasVButton: true,
    hasAppStoreButton: false,
    hasPlayStoreButton: false,
    playStoreLink: '',
    appStoreLink: ''
  },
  {
    icon: 'icons/virtag_icon',
    heading: '',
    headingColor: '',
    subHeading: 'app_connections_mobile_app_subheading',
    bodyText: 'app_connections_mobile_app_copy',
    buttonLabel: '',
    hasVButton: false,
    hasAppStoreButton: true,
    hasPlayStoreButton: true,
    playStoreLink: 'https://play.google.com/store/apps/details?id=jp.co.paladyne.virtag.app',
    appStoreLink: 'https://apps.apple.com/jp/app/virtag-nfc/id1632357617'
  }
]
</script>

<style scoped>

.appPanel {
  max-width: 380px;
}

.section {
  padding: 60px 10px 60px 10px;
}
</style>
