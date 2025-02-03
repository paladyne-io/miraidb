<template>

  <v-container class="justify-center">
    <v-card
      background="white"
      class="rounded-xl text-center pa-6"

      height="380"
      min-width="280"
    >
      <v-card-text>
        <!--
        :class="xs? 'pa-6' : 'pa-4'"

        props.headingColor3: {{ 'text'.concat('-', props.headingColor.toLowerCase()) }}
        props.link: {{ props.buttonLink }}
       -->

        <div
          v-if="props.icon"
          class="rounded-xl mx-auto"
          style="height: 70px; width: 70px;"
        >
             <!--
              elevation-1 border-md
             <virtag_icon
              :width="60"
              class="VirtagIcon"
            />
           -->
          <v-img src="images/virtagAppIconImg.png">
          </v-img>
        </div>

        <div class="pb-2">
          <div
            v-if="props.headingText"
            :class="'text'.concat('-', props.headingColor.toLowerCase())"
            class="word-breaker text-lg-h5 text-h6 font-weight-bold"
            v-for="words in splitWords($t(props.headingText))"
          >
            <span class="chunk"> {{ words }} </span>
          </div>
        </div>
        <div
          v-if="props.subHeadingText"
          class="word-breaker mt-2 text-h6 font-weight-bold"
        >
          {{ $t(props.subHeadingText) }}
        </div>

        <div class="pt-4">
          <div
            v-if="props.bodyText"
            v-for="words in splitWords(props.bodyText)"
            class="text-subtitle font-weight-medium"
          >
            <span class="chunk"> {{ words }} </span>
          </div>
        </div>

        <div
          v-if="props.hasVButton"
          class=""
        >
          <v-btn
            size="xl"
            :href="props.buttonLink"
            style="height: 52px; width: 194px;"
            class="virtag-btn virtag-btn-lg text-white text-capitalize "
          >
            {{ props.buttonLabel }}
          </v-btn>
        </div>

        <div
          v-if="pageLoaded && (props.hasAppStoreButton || props.hasPlayStoreButton)"
          class="mt-2 pt-6"
        >
          <v-btn
            v-if="props.hasAppStoreButton && props.appStoreLink"
            size="xl"
            flat
            class="app-button"
            :href="props.appStoreLink"
          >
            <appstore_icon :class="xs? 'vertical-app-store-btn' : 'horizontal-app-store-btn'" class="AppstoreIcon app-button" />
          </v-btn>

          <v-btn
            v-if="props.hasPlayStoreButton && props.playStoreLink"
            size="xl"
            flat
            class="app-button pl-4"
            :href="props.playStoreLink"
          >
            <playstore_icon :class="xs? 'vertical-play-store-btn' : 'horizontal-play-store-btn'" class="PlaystoreIcon app-button" />
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
const { xs } = useDisplay()

const pageLoaded = ref(false)

function splitWords(text) {
  return text.split("_");
}

const props = defineProps({
  imageSource: String,
  headingText: String,
  headingColor: String,
  subHeadingText: String,
  bodyText: String,
  icon: String,
  buttonLabel: String,
  hasVButton: Boolean,
  buttonLink: String,
  hasAppStoreButton: Boolean,
  hasPlayStoreButton: Boolean,
  playStoreLink: String,
  appStoreLink: String,
})

onMounted(() => {
  // await nextTick();
  pageLoaded.value = true
})

</script>

<style scoped>
.word-breaker {
  word-break: normal;
}

.vertical-app-store-btn{
  width: 128px;
  height: 46px;
  margin-left: 14px;
  margin-bottom: 10px;
}

.vertical-play-store-btn {
  width: 128px;
  height: 44px;
  margin-left: 0px;
  padding-bottom: 4px;
}

.horizontal-app-store-btn {
  margin-top: 16px;
  width: 120px;
  margin-left: 0px;
}

.horizontal-play-store-btn {
  margin-top: 16px;
  width: 130px;
  margin-left: 0px;
}

.chunk {
  display: inline-block;
}

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

</style>
