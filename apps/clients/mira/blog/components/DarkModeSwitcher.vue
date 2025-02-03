<template>
  <q-item
    clickable
    :class="noPadding ? 'q-px-none' : ''"
    @click="darkMode = !darkMode"
  >
    <q-item-section :avatar="avatar">
      <q-checkbox
        :class="ignoreDarkMode ? 'checkbox' : ' darkmode-checkbox'"
        v-model="darkMode"
        checked-icon="fas fa-circle-half-stroke"
        unchecked-icon="fas fa-circle-half-stroke"
      />
    </q-item-section>
    <q-item-section v-if="props.showLabel">{{ darkMode ? $t('lightmode') : $t('darkmode') }}</q-item-section>
  </q-item>
</template>

<!--
checked-icon="fa-solid fa-yin-yang"
unchecked-icon="fa-regular fa-yin-yang"
-->

<script setup>
import { watch, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { Preferences } from '@capacitor/preferences'
import useDetectPlatform from '../composables/UseDetectPlatform'

const props = defineProps({
  avatar: Boolean,
  showLabel: { type: Boolean, default: false },
  noPadding: { type: Boolean, default: false },
  ignoreDarkMode: { type: Boolean, default: false }
})

// console.log('Dark mode switcher...')

// console.log('Dark mode switcher...')
const $q = useQuasar()
const isDark = ref($q.dark)
const darkMode = ref(isDark.value)

const { isDesktop } = useDetectPlatform()
// console.log('Quasar lang (def): ' + $q.lang.isoName)

const getSetMode = async () => {
  const { value } = await Preferences.get({ key: 'darkmode' })
  // console.log(`set darkmode to: ${value}`)
  if (!value) {
    if (isDesktop.value) {
      darkMode.value = false
    } else {
      darkMode.value = true
    }
    saveMode(JSON.stringify(darkMode.value))
    return
  }
  darkMode.value = value === 'true'
}

const saveMode = async (modeValue) => {
  await Preferences.set({
    key: 'darkmode',
    value: modeValue
  })
  // console.log(`Saved (dark) mode: ${modeValue}`)
}

watch(darkMode, () => {
  const modeValueString = JSON.stringify(darkMode.value)
  // console.log('Watch darkMode: ' + modeValueString)
  $q.dark.set(darkMode.value)
  saveMode(modeValueString)
})

onMounted(() => {
  getSetMode()
})
</script>

<style></style>
