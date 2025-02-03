<template>
  <section class="section" id="faqs">

    <v-layout>
      <v-row justify="center">
        <v-col
          cols="12"
          class="text-center"
        >
          <div :class="locale==='ja'? 'japanese-text':'english-text'" class="text-subtitle1 text-md-h5 font-weight-bold text-center text-blue mb-4">
            {{ $t(pre_heading) }}
            <h2 class="text-h4 text-md-h3 text-center font-weight-bold mt-2 virtag-heading">
              {{ $t(heading) }}
            </h2>
          </div>
        </v-col>
      </v-row>
    </v-layout>

    <v-layout>
      <v-row>
        <v-col cols="12" v-for="faq in faqs"
        :key="faq.question">
          <FAQComponent
            :question="$t(faq.question)"
            :answer="$t(faq.answer)"
          >
          </FAQComponent>
        </v-col>
      </v-row>
    </v-layout>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FAQComponent from '~/components/FAQComponent.vue'

const { locale } = useI18n()
const pageLoaded = ref(false)

const heading = 'faqs_heading'
const pre_heading = ''

const faqs = [
  {
    question: 'faqs_faq1_question',
    answer: 'faqs_faq1_answer'
  },
  {
    question: 'faqs_faq2_question',
    answer: 'faqs_faq2_answer'
  },
  {
    question: 'faqs_faq3_question',
    answer: 'faqs_faq3_answer'
  },
  {
    question: 'faqs_faq4_question',
    answer: 'faqs_faq4_answer'
  },
  {
    question: 'faqs_faq5_question',
    answer: 'faqs_faq5_answer'
  }
]

onMounted(() => {
  // await nextTick();
  pageLoaded.value = true
})

</script>

<style scoped>
.section {
  padding: 80px 40px 60px 40px;
  background: #f8fbff;
  border:solid rgb(188, 184, 184) 0.5px;
}

.virtag-heading {
  color:rgba(36, 37, 40);
}
</style>

