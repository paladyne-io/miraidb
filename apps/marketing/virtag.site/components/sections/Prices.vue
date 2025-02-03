<template>
  <section class="section" id="prices">
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          class="text-center"
        >
          <div :class="locale==='ja'? 'japanese-text':'english-text'" class="text-subtitle1 text-md-h5 font-weight-bold text-center text-blue mb-4">
            {{ $t(pre_heading) }}
            <h2 class="text-h4 text-md-h3 text-center font-weight-bold mt-3 virtag-heading">
              {{ $t(heading) }}
            </h2>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="pageLoaded" :class="pageLoaded && mdAndUp? 'largeDisplay' : ''" style="max-width:1040px">
      <v-row>
        <v-col cols="12" md="6" v-for="product in priceList"
        :key="product.heading">
          <WebMobileAppPriceComponent
            :imageSource="product.image"
            :headingText="$t(product.heading)"
            :bodyText="$t(product.bodyText)"
            :checkItems="product.checkItems"
            :checkItemsHilited="product.checkItemsHilited"
            :price="product.price"
            :currency="$t(product.currency)"
          >
          </WebMobileAppPriceComponent>

        </v-col>

      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import WebMobileAppPriceComponent from '~/components/WebMobileAppPriceComponent.vue'

import { useDisplay } from 'vuetify'

const { mdAndUp,mdAndDown,smAndUp,smAndDown,lg } = useDisplay()

const { locale } = useI18n()
const pageLoaded = ref(false)

const heading = 'prices_heading'
const pre_heading = 'prices_subheading'

const priceList = [
  {
    heading: 'prices_webapp_name',
    bodyText: 'prices_webapp_details',
    image: '',
    price:'0',
    checkItems: ['prices_webapp_detail1', 'prices_webapp_detail2', 'prices_webapp_detail3'],
    checkItemsHilited: [],
    currency:'prices_webapp_currency'
  },
  {
    heading: 'prices_mobile_app_name',
    bodyText: 'prices_mobile_app_details',
    image: '',
    price:'2,000',
    checkItems: ['prices_mobile_app_detail1','prices_mobile_app_detail2', 'prices_mobile_app_detail3'],
    checkItemsHilited: ['prices_mobile_app_detail4', 'prices_mobile_app_detail5'],
    currency:'prices_mobile_app_currency'
  }
]

onMounted(() => {
  // await nextTick();
  pageLoaded.value = true
})
</script>

<style scoped>
.section {
  padding: 80px 20px 50px 20px;
}

.v-theme--light .virtag-heading {
  color:rgba(36, 37, 40);
}

.v-theme--dark .virtag-heading {
  color:rgb(255, 255, 255);
}

.largeDisplay{
  max-width:700px;
}
</style>
