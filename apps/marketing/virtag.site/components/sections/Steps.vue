<template>
  <section class="section" id="howto" :class="mdAndDown ? 'smallDisplay' : '', lg? 'largeDisplay' : ''">
    <v-layout>
      <v-row justify="center">
        <v-col
          cols="12"
          class="text-center"
        >
          <div :class="locale==='ja'? 'japanese-text'  : 'english-text'" class="text-subtitle1 text-md-h5 font-weight-bold text-center text-orange mb-10">
            {{ $t(pre_heading)}}
            <div class="text-h4 text-md-h3 text-center font-weight-bold text-white mt-3">
              {{$t(heading)}}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-layout>

    <v-layout>
      <v-row class="mx-4">
        <v-col cols="12" sm="4" v-for="step in steps"
        :key="step.heading">
          <StepComponent
            :stepLabel="step.stepLabel"
            :imageSource="step.image"
            :headingText="$t(step.heading)"
            :bodyText="$t(step.bodyText)"
            :hasButton="false"
            :textAfter="step.textAfter"
          >
          </StepComponent>
        </v-col>
      </v-row>
    </v-layout>
  </section>
</template>

<script setup>

import StepComponent from '~/components/StepComponent.vue'

import { useDisplay } from 'vuetify'
const { mdAndDown,lg } = useDisplay()

const { locale } = useI18n()

const heading = 'virtag_3steps_heading'
const pre_heading = 'virtag_3steps_subheading'

const steps = [
  {
    stepLabel: 'STEP 1',
    heading: 'virtag_3steps_step1_heading',
    bodyText: 'virtag_3steps_step1_copy',
    bodyTextPost: '',
    image: '/images/step1a.png',
    textAfter: true
  },
  {
    stepLabel: 'STEP 2',
    heading: 'virtag_3steps_step2_heading',
    bodyText: 'virtag_3steps_step2_copy',
    bodyTextPost: '',
    image: '/images/step2a.png',
    textAfter: false
  },
  {
    stepLabel: 'STEP 3',
    heading: 'virtag_3steps_step3_heading',
    bodyText: 'virtag_3steps_step3_copy',
    bodyTextPost: '',
    image: 'images/step3a.png',
    textAfter: true
  },
]
</script>

<style scoped>
.section {
  /* padding: 100px 30px 60px 30px; */
  background: rgb(2, 33, 83);
}

/*
.condensed { font-size: 0.75%; }
*/

.smallDisplay{
  padding: 100px 2px 100px 2px;
}

.largeDisplay{
  padding: 100px 50px 100px 50px;
}
</style>
