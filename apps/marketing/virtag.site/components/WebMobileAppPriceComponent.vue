<template>
  <v-container id="price-component">
    <v-divider v-if="smAndDown" class="border-opacity-100"></v-divider>

    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
        md="8"
      >
        <v-card
          flat
          color="transparent"

        >

        <!--
        <v-divider v-if="mdAndUp" class="border-opacity-75"></v-divider>
        <v-divider vertical v-if="smAndUp" class="border-opacity-100"></v-divider>
        -->

          <v-card-text>
            <div :class="locale==='ja'? 'japanese-text':'english-text'"  class="mb-4 text-md-h5 text-lg-h5 text-h5 font-weight-bold">
              {{ $t( props.headingText) }}
            </div>
            <div class="mb-1">
              <span class="mt-2 text-h4 text-lg-h6 font-weight-medium ">
                {{ props.currency }}
              </span>
              <span class="ml-2 mt-8 text-h2 font-weight-medium ">
                {{ props.price }}
              </span>
            </div>
            <div
              v-if="props.bodyText"
              class="mt-2 text-lg-h6 text-body1 text-blue font-weight-medium"
            >
              {{ $t(props.bodyText) }}
            </div>

          </v-card-text>
        </v-card>

      </v-col>

      <v-col
        cols="9"
        md="10"
        sm="6"
      >

      <v-card
      flat
      color="transparent"
    >
        <v-list v-if="props.checkItems">
          <v-list-item class="lg-h5 text-h6 font-weight-medium"
            v-for="checkedItem in props.checkItems"
            :key="checkedItem"
          >
            <v-list-item-title class="text-wrap text-capitalize">
              {{  $t(checkedItem) }}
            </v-list-item-title>
            <template v-slot:prepend>
              <v-icon>mdi-check</v-icon>
            </template>
          </v-list-item>

          <v-list-item class="lg-h5 text-h6 font-weight-medium"
            v-for="checkedItem in props.checkItemsHilited"
            :key="checkedItem"

          >
            <v-list-item-title class="text-wrap text-capitalize text-red">
              {{ $t( checkedItem) }}
            </v-list-item-title>
            <template v-slot:prepend>
              <v-icon color="red">mdi-check</v-icon>
            </template>

          </v-list-item>
        </v-list>
      </v-card>

      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>
// import { ref } from 'vue'
import { useDisplay } from 'vuetify'
// const display = ref(useDisplay())
const { mdAndUp,mdAndDown,smAndUp,smAndDown,lg } = useDisplay()

const { locale } = useI18n()

const props = defineProps({
  imageSource: String,
  headingText: String,
  bodyText: String,
  price: String,
  currency: String,
  checkItems: Array,
  checkItemsHilited: Array
})

</script>

<style scoped>

.subtext-grey {
  color: rgba(36, 37, 40, 0.7);
}
</style>
