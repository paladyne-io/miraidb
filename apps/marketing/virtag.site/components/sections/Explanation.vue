<template>
  <section class="section" :class="[ mdAndDown ? 'smallDisplay' : '', lg? 'largeDisplay' : '']"  id="about">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <div class="text-subtitle1 text-md-h5 text-center text-blue font-weight-bold py-2 mb-4">
            {{ $t(pre_heading) }}
            <h2 class="text-h4 text-md-h3 text-center font-weight-bold mt-3 virtag-heading">
              {{ $t(heading) }}
            </h2>
          </div>
          <div :class="smAndUp? 'body-text': 'small-device'"  class="text-sm-h6 text-left text-body-1 mb-4">
            {{ $t(body_text) }}
          </div>
          <div :class="smAndUp? 'body-text': 'small-device'" class="text-h5 text-subtitle text-left text-body-1 mb-6">
            {{ $t(body_text_post) }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(card, index) in cards"
          :key="index"
          cols="12"
          sm="4"
          class="text-center"
        >
          <v-avatar
            size="160"
            class="display-1 white primary--text mb-5"
            style="opacity: 1.15"
            rounded="0"
          >
            <v-img
              :src="card.image"
              cover
            ></v-img>
          </v-avatar>
          <div
            class="title text-subtitle-2 text-body-1 font-weight-black mt-1 mb-4"

          >{{ $t(card.title) }}</div>

          <p v-text="card.text"></p>

          <v-row no-gutters>
            <v-col cols="12"> </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!--
      <v-row no-gutters>
        <v-btn x-large rounded color="white primary--text mx-auto mt-10 px-16">
          <v-icon dark left> mdi-check-bold </v-icon>Buy It Now
        </v-btn>
      </v-row>
    -->
    </v-container>
  </section>
</template>

<script setup>
const heading = 'virtag_intro_heading'
const pre_heading = 'virtag_intro_subheading'
const body_text = 'virtag_intro_body'
const body_text_post = "virtag_intro_post"

import { useDisplay } from 'vuetify'
const { smAndUp, mdAndDown,lg } = useDisplay()

const cards = [
  {
    title: 'virtag_intro_illust_label_one',
    subtitle: '',
    text: '',
    image: 'images/features1.png'
  },
  {
    title: 'virtag_intro_illust_label_two',
    subtitle: '',
    text: '',
    image: 'images/features2.png'
  },
  {
    title: 'virtag_intro_illust_label_three',
    subtitle: '',
    text: '',
    image: 'images/features3.png'
  },
]
</script>

<style scoped>

.section {
  padding: 100px 0px 80px 0px;
}

.small-device {
  padding-left: 40px;
  padding-right: 40px;
}

.body-text{
  padding-left: 100px;
  padding-right: 100px;
}

.v-theme--light .virtag-heading {
  color:rgba(36, 37, 40);
}

.v-theme--dark .virtag-heading {
  color:rgb(255, 255, 255);
}
</style>
