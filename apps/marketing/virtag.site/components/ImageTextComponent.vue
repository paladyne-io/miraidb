<template>
  <v-layout>
    <v-row no-gutters >
      <v-col
        cols="12"
        sm="6"
        :class="(props.textAfter || display.smAndDown) ? 'order-last' : 'order-first'"
      >
        <v-sheet
          color="transparent"
        >
          <v-card
            style="min-height:200px; max-height:480px;"
            flat
            color="transparent"
            class="ml-0 text-left"
            :class="locale==='ja'? 'japanese-text' : 'english-text'"
          >
            <v-card-text class="pt-0">
              <div class="pb-2 text-lg-h4 text-h5 font-weight-bold virtag-heading">
                {{ props.headingText }}
              </div>

              <div v-if="props.bodyText"
              class="text-lg-body1 text-subtitle1 font-weight-medium subtext-grey "
            >
              {{ props.bodyText }}
            </div>
          </v-card-text>
            <v-btn
              v-if="props.hasButton"
              size="x-large"
              class="ml-3 virtag-btn text-white font-weight-bold "
            >
              {{ props.buttonLabel }}
            </v-btn>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col
        cols="12"
        sm="6"
      >
        <v-sheet
          class="pa-2"
          color="transparent"
          style="min-height:300px; max-height:420px;"
        >
          <v-card class="rounded-lg" >
            <v-img :src="props.imageSource"></v-img>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-layout>

</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-I18n'

const { locale, locales } = useI18n()

const props = defineProps({
  imageSource: String,
  headingText: String,
  bodyText: String,
  hasButton: { type: Boolean, default: false },
  textAfter: { type: Boolean, default: false },
  buttonLabel: String
})

const display = ref(useDisplay())

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
.subtext-grey {
  color: rgba(36, 37, 40, 0.7);
}
.virtag-heading {
  color: rgba(22, 22, 22, 0.8);
}
</style>
