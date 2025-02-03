<template>
  <section class="section" id="features" :class="mdAndDown ? 'smallDisplay' : '', lg? 'largeDisplay' : ''"  >
    <v-layout>
      <v-row justify="center">
        <v-col
          class="text-center"
        >
          <div :class="locale==='ja'? 'japanese-text':'english-text'" v-if="pageLoaded" class="text-subtitle1 text-md-h5 font-weight-bold text-center text-blue mb-14">
            {{ $t(pre_heading) }}
            <h2 class="text-h4 text-md-h3 text-center font-weight-bold mt-3 virtag-heading">
              {{ $t(heading) }}
            </h2>
          </div>
        </v-col>
      </v-row>
    </v-layout>

    <v-container v-if="pageLoaded"
      v-for="feature in features"
      :key="feature.heading"
    >
      <ImageTextComponent :class="locale==='ja'? 'japanese-text' : 'english-text'"
        :imageSource="feature.image"
        :headingText="$t(feature.heading)"
        :bodyText="$t(feature.bodyText)"
        :hasButton="false"
        :textAfter="feature.textAfter"
      >
      </ImageTextComponent>
    </v-container>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ImageTextComponent from '~/components/ImageTextComponent.vue'
// const buttonText = ''
// const buttonColor = ''
// const buttonAlignment = ''

const { locale } = useI18n()

import { useDisplay } from 'vuetify'
const { mdAndDown,lg } = useDisplay()

const pageLoaded = ref(false)

const heading = 'virtag_features_heading'
const pre_heading = 'virtag_features_subheading'

// const imagePath = 'images/app_on_desk.png'
// const heading2 = 'テンプレートがあるから、NFCタグを簡単に登録→書き込みができる'
// const bodyText = 'クライアントや友人との連絡先交換のためのデジタル名刺が Virtagアプリを使うことで簡単に作成できます。連絡先の他、SNSの共有が簡単に行え、NFCタグの他、QRコード、URLも発行できます。バイリンガルで言語を登録できるので、日本語用、その他の言語と名刺を複数枚用意する必要がなくコスト削減につながります。'
// const bodyTextPost = ""

const features = [
  {
    heading: 'virtag_features_feature1_heading',
    bodyText: 'virtag_features_feature1_copy',
    bodyTextPost: '',
    image: 'images/app_on_desk.png',
    textAfter: true
  },
  {
    heading: 'virtag_features_feature2_heading',
    bodyText: 'virtag_features_feature2_copy',
    bodyTextPost: '',
    image: 'images/app_closeup.png',
    textAfter: false
  },
  {
    heading: 'virtag_features_feature3_heading',
    bodyText: 'virtag_features_feature3_copy',
    bodyTextPost: '',
    image: 'images/fashion_tag.png',
    textAfter: true
  },
]

onMounted(() => {
  // await nextTick();
  pageLoaded.value = true
})

</script>

<style scoped>

.section {
  /* padding: 100px 50px 100px 50px; */
  background: #f8fbff;
  border:solid grey 1px;
}

.smallDisplay{
  padding: 100px 30px 100px 30px;
}

.largeDisplay{
  padding: 60px 100px 60px 100px;
}

.virtag-heading {
  color:rgba(36, 37, 40);
}

</style>
