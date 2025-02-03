<template>
  <v-sheet color="transparent">
    <v-card
      flat
      class="rounded-lg"
      color="white"
    >
      <v-card-text>
        <div class="mb-6 text-md-h5 text-black text-lg-h5 text-h5 font-weight-bold">
          <v-list-item class="pl-0">
              <v-list-item-title class="text-wrap text-black text-lg-h5 text-h6 font-weight-bold">
              {{ props.question }}
              </v-list-item-title>
            <template v-slot:prepend>
              <span class="question-icon text-black text-lg-h5 text-h5 font-weight-bold">
                Q
              </span>
            </template>
          </v-list-item>

          <div
            v-if="props.answer"
            class="mt-2 text-lg-h6 text-black text-body1 font-weight-medium"
          >
           {{ props.answer }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script setup>
const props = defineProps({
  question: String,
  answer: String
})
</script>

<style>

.question-icon {
  padding-right:8px;
}
</style>
