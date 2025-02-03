<template>
  <v-btn
    class="app-button"
    :width=props.width
    :href="props.appStoreLink"
  >
    <appstore_icon class="AppstoreIcon" />
  </v-btn>
</template>

<script setup>
const props = defineProps({
  appStoreLink: String,
  width: Number,
})
</script>
