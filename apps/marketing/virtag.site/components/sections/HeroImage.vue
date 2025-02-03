<template>
  <section id="hero" class="jp-font">
    <!--
    <header-pad></header-pad>
      height="calc(100vh - 214px)"
      min-height="560"
      max-height="580"
  -->
    <v-card
      class="d-flex justify-center align-top text-white"
      flat
      height="700"
      color="transparent"
      :image="imageData.backgroundImage"
    >
    <!-- flex-wrap-reverse
    :class="display.xs ? '' : 'fill-height'">
    <v-icon icon="uil:material-symbols:arrow-outward"></v-icon>
    -->
      <v-container :class="xs? '' : 'fill-height' ">
        <v-row no-gutters class="align-center">
          <v-col cols="12" sm="8">
              <v-card
              flat
               color="transparent"
               class="text-card d-flex text-left align-center overflow-x-visible"
              >
                <v-card-text>
                  <div class="mb-4 text-h4 text-lg-h2 text-md-h2 text-sm-h3 font-weight-bold virtag-font "
                  v-if="imageData.heading"

                >
                <div v-for="words in splitWords($t(imageData.heading))">
                  <span :class="locale === 'ja'? 'japanese-text' : 'english-text'" class="chunk text-capitalize"> {{ words }} </span>
                </div>
              </div>
                  <div :class="locale === 'ja'? 'japanese-text' : 'english-text'" class="text-subtitle2 font-weight-medium white--text virtag-sub-heading">
                    {{ $t (imageData.subHeading) }}
                  </div>
                </v-card-text>

              </v-card>
              <v-sheet :class="display.xs ? 'd-flex justify-center' : 'justify-left ml-4'"  color="transparent">

              <v-btn size="x-large"
              href="https://www.virtag.app"
              class="virtag-btn virtag-btn-lg text-capitalize text-white font-weight-bold"
              >
              {{ $t( callToActionLabel ) }}

            </v-btn>
          </v-sheet>
          </v-col>

          <v-col cols="12" sm="4" >
            <v-card
              color="transparent"
              flat
              :height="xs? '360' : 'auto' "
              :class="xs? 'd-flex align-center justify-center' :'order-last'"
              class="img-card"
            >
              <v-img
                :src="imageDataSub.src"
                :height="display.xs? 300 : height"
              ></v-img>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
    </v-card>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

const { locale } = useI18n()

const pageLoaded = ref(false)

const display = ref(useDisplay())
const absolute = false
// const overlay = true

const isMobile = display.value.mobile
// console.log("is Mobile: " + isMobile)

function splitWords(text) {
  return text.split("_");
}

const { mdAndDown, smAndUp, xs } = useDisplay()

const height = computed(() => {
    // name is reactive and
    // must use .value
    // console.log("height computed: " + display.value.name)
    if (!pageLoaded.value ) {
      return 300
    }

    switch (display.value.name) {
      case 'xs': return 240
      case 'sm': return 440
      case 'md': return 520
      case 'lg': return 540
      case 'xl': return 640
      case 'xxl': return 680
      default: 300
    }
  })

  const topMargin = computed(() => {
    // console.log("topMargin computed: " + display.value.name)
    if (!pageLoaded.value ) {
      return 'mt-6'
    }
    switch (display.value.name) {
      case 'xs': return 'mt-0'
      case 'sm': return 'mt-10'
      case 'md': return 'mt-14'
      case 'lg': return 'mt-14'
      case 'xl': return 'mt-16'
      case 'xxl': return 'mt-16'
      default: return 'mt-6'
    }
  })

const imageData = {
  backgroundImage: 'images/virtag_blue_bg.jpg',
  heading: 'hero_heading',
  subHeading: 'hero_subheading',
}

const callToActionLabel = 'free_registration'
const imageDataSub = {
  src: 'images/virtag_bilingual_profile.png'
}

onMounted(() => {
  // await nextTick();
  pageLoaded.value = true
})

</script>

<style>

.virtag-font:lang(en) {
  font-family: 'inter', sans-serif;
}

.virtag-font:lang(jp) {
  font-family: 'NotoSansJP', sans-serif;
}

.img-card{
z-index: 2
}
.text-card{
  z-index: 1
}

.large-container {
  max-width:1800px !important;
}

.gradient-fill .v-responsive__content {
  background: rgb(0, 0, 0);
  background: linear-gradient(to right,
      rgba(3, 12, 41, 0.75),
      rgba(5, 11, 31, 0.65));
}

.chunk {
  display: inline-block;
}

/*
.headingClass {}
.subtitleClass {}
*/

.virtag-sub-heading {
  font-size: 18px;
  line-height: 24px;
  text-align: left;
  justify-content: flex-start;
}

.no-break {
  word-break:keep-all;
}

.virtag-btn {
  height: 40px;

  align-content: center;
  align-items: center;
  background: linear-gradient(var(--g-angle), var(--g-color-0) var(--g-position-0), var(--g-color-1) var(--g-position-1));

  flex: none;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: hidden;
  overflow-y: hidden;

  justify-content: center;

  border-radius: 28px;
  padding: 8px 12px 8px 10px;

  --gap-h-ef8e16d5-4097-4179-9ec7-deb547fad7b8: 10px;
  --gap-v-ef8e16d5-4097-4179-9ec7-deb547fad7b8: 0px;
  --gap-uuid: ef8e16d5-4097-4179-9ec7-deb547fad7b8;
  max-width: 100%;
  --g-color-0: #fd7c02;
  --g-position-0: 0%;
  --g-color-1: #ffde02;
  --g-position-1: 100%;
  --g-color-2: #ffde02;
  --g-position-2: 100%;
  --g-color-3: #ffde02;
  --g-position-3: 100%;
  --g-color-4: #ffde02;
  --g-position-4: 100%;
  --g-color-5: #ffde02;
  --g-position-5: 100%;
  --g-color-6: #ffde02;
  --g-position-6: 100%;
  --g-color-7: #ffde02;
  --g-position-7: 100%;
  --g-color-8: #ffde02;
  --g-position-8: 100%;
  --g-color-9: #ffde02;
  --g-position-9: 100%;
  --g-color-10: #ffde02;
  --g-position-10: 100%;
  --g-color-11: #ffde02;
  --g-position-11: 100%;
  --g-angle: 90deg;
}

.virtag-btn-lg {
  height: 56px;
  font-size: 1.5em;
  border-radius: 128px;
  justify-content: center;
  margin: 30px 0px 0px 0px;
  /* padding: 0px 20px 0px 25px; */
  width: 250px;
}
</style>
