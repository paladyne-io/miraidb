<template>
  <v-layout class="align-center justify-center">
    <v-sheet
      color="transparent"
      class="align-center justify-center"
    >

      <v-sheet
        class="rounded-lg text-center vertical-overlap"
        color="blue"
        max-width="140"
        height="36"
      >
        <h6 class="text-capitalize font-weight-bold text-center mb-4">
          {{ props.stepLabel }}
        </h6>
      </v-sheet>
      <!-- :image="props.imageSource" -->

      <v-card
        flat
        class="rounded-xl align-center justify-center"
        :class="xs ? 'fixed-card-width' : ''"
      >
        <v-img :src="props.imageSource"> </v-img>
      </v-card>

      <v-card
        flat
        color="transparent"
        :class="xs ? 'fixed-card-width' : ''"
      >
        <v-card-text class="pl-0">
          <div class="text-h6 text-lg-h5 text-white text-center font-weight-bold">
            {{ props.headingText }}

          </div>
          <div
              v-if="props.bodyText"
              class="mt-2 text-sm-subtitle1 text-md-h6 text-subtitle2 font-weight-medium text-white"
            >
              {{ props.bodyText }}

          </div>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-layout>
</template>

<script setup>
// import { ref } from 'vue'
import { useDisplay } from 'vuetify'
const { xs } = useDisplay()

const props = defineProps({
  imageSource: String,
  headingText: String,
  bodyText: String,
  textAfter: { type: Boolean, default: false },
  stepLabel: String
})

// const display = ref(useDisplay())

const imageData = {
  src: 'images/virtag_blue_bg.jpg',
  heading: 'デジタル名刺でサスティナブルな未来を。',
  subHeading: '「Virtag」は、プロフィールなどのコンテンツを作成し、NFCタグやQRコードで共有できるサービスです。オリジナルコンテンツを作って共有しよう！',
}
const imageDataSub = {
  src: 'images/virtag_bilingual_profile.png'
}

</script>

<style scoped>
.vertical-overlap {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  top: 16px;
  z-index: 1000;
}

.subtext-grey {
  color: rgba(36, 37, 40, 0.7);
}

.fixed-card-width {
  max-width: 320px;

}

.smallDisplay{
  padding: 100px 0px 100px 0px;
}

.largeDisplay{
  padding: 60px 100px 60px 100px;
}

</style>
