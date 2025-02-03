<template>
  <section class="section" id="examples" :class="mdAndDown ? 'smallDisplay' : '', lg? 'largeDisplay' : ''">
    <v-layout>
      <v-row justify="center">
        <v-col
          cols="12"
          class="text-center"
        >
          <div :class="locale==='ja'? 'japanese-text':'english-text'" class="text-subtitle1 text-md-h5 font-weight-bold text-center text-blue mb-4">
            {{ $t(pre_heading) }}
            <div class="text-h4 text-md-h3  text-center font-weight-bold mt-3 virtag-heading">
              {{ $t(heading) }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-layout>

    <v-layout class="ma-8" v-if="pageLoaded">
      <v-row>
        <v-col cols="12" v-for="example in examples"
        :key="example.heading">
          <ExampleComponent
            :imageSource="example.image"
            :headingText="$t(example.heading)"
            :bodyText="$t(example.bodyText)"
          >
          </ExampleComponent>
        </v-col>
      </v-row>
    </v-layout>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ExampleComponent from '~/components/ExampleComponent.vue'

import { useDisplay } from 'vuetify'
const { mdAndDown,lg } = useDisplay()

const { locale } = useI18n()
const pageLoaded = ref(false)

const heading = 'virtag_examples_heading'
const pre_heading = 'virtag_examples_subheading'

const examples = [
  {
    heading: 'virtag_examples_example1_heading',
    bodyText: 'virtag_examples_example1_copy',
    bodyTextPost: '',
    image: ''
  },
  {
    heading: 'virtag_examples_example2_heading',
    bodyText: 'virtag_examples_example2_copy',
    bodyTextPost: '',
    image: ''
  },
  {
    heading: 'virtag_examples_example3_heading',
    bodyText: 'virtag_examples_example3_copy',
    bodyTextPost: '',
    image: ''
  },
]

onMounted(() => {
  // await nextTick();
  pageLoaded.value = true
})

</script>

<style scoped>
.section {
  background: #f8fbff;
  padding: 100px 0px 40px 0px;
  border:solid rgb(188, 184, 184) 0.5px;
}

.virtag-heading {
  color:rgba(36, 37, 40);
}

.smallDisplay{
  padding: 100px 0px 100px 0px;
}

.largeDisplay{
  padding: 60px 100px 60px 100px;
}

</style>
