<template>
  <v-sheet color="transparent">
    <v-card
      flat
      color="transparent"
    >
   <!-- :class="smAndUp? 'body-text': 'small-device'" -->
      <v-card-text >
        <div
        class=" text-lg-h5 text-h6 font-weight-bold text-black">
          {{ props.headingText }}
          <div
            v-if="props.bodyText"
            class="mt-6 text-body1 font-weight-medium text-black"
          >
            {{ props.bodyText }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script setup>
// import { ref } from 'vue'
// import { useDisplay } from 'vuetify'
// const { smAndUp } = useDisplay()

const props = defineProps({
  imageSource: String,
  headingText: String,
  bodyText: String
})

</script>

<style scoped>
.subtext-grey {
  color: rgba(36, 37, 40, 0.7);
}

/*
.small-device {
  padding-left: 0px;
  padding-right: 0px;
}

.body-text{
  padding-left: 60px;
  padding-right: 60px;
}
*/

</style>
