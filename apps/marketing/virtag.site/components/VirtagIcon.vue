// VirtagIcon.vue
<template>
  <img src="/icons/virtag_icon.svg" :width="props.width">
</template>

<script setup>
const props = defineProps({
  width: {type: Number, default:120}
})
</script>

<style scoped>

.LogoAnimation {
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}

</style>
