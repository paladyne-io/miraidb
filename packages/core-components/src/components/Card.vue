<template>
  <div class="miraidb-card" :class="{ 'miraidb-card--hoverable': hoverable }">
    <div v-if="$slots.header" class="miraidb-card__header">
      <slot name="header" />
    </div>
    <div class="miraidb-card__content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="miraidb-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CardProps {
  hoverable?: boolean
}

defineProps<CardProps>()
</script>

<style scoped>
.miraidb-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  transition: all 0.2s;
}

.miraidb-card--hoverable:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transform: translateY(-2px);
}

.miraidb-card__header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.miraidb-card__content {
  padding: 1rem;
}

.miraidb-card__footer {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
}
</style>
