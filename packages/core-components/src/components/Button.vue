<template>
  <button
    :class="[
      'miraidb-button',
      `miraidb-button--${variant}`,
      { 'miraidb-button--loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'text'
  loading?: boolean
  disabled?: boolean
}

defineProps<ButtonProps>()
defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<style scoped>
.miraidb-button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.miraidb-button--primary {
  background-color: #3b82f6;
  color: white;
}

.miraidb-button--primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.miraidb-button--secondary {
  background-color: #e5e7eb;
  color: #374151;
}

.miraidb-button--secondary:hover:not(:disabled) {
  background-color: #d1d5db;
}

.miraidb-button--text {
  background-color: transparent;
  color: #3b82f6;
  padding: 0;
}

.miraidb-button--text:hover:not(:disabled) {
  color: #2563eb;
}

.miraidb-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.miraidb-button--loading {
  position: relative;
  color: transparent;
}

.miraidb-button--loading::after {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 50%;
  left: 50%;
  margin: -0.5rem 0 0 -0.5rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: button-loading 0.75s linear infinite;
}

@keyframes button-loading {
  to {
    transform: rotate(360deg);
  }
}
</style>
