<template>
  <main v-if="!error">
    <RouterView />
  </main>
  <main v-else>
    <div
      class="container text-center"
      style="padding: 100px 20px 0"
    >
    {{ error }}
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router' // useRoute,
import { useSupabaseAPI } from './composables/useSupabase.js';
import { useQuasar } from 'quasar'

const $q = useQuasar()

const router = useRouter()
// const session = ref()
// const error = ref()

const { error, getSignedInUser } = useSupabaseAPI();

onMounted(() => {
  console.log("Blog app mounted")
  const user = getSignedInUser()
  // console.log("Blog App mounted. User:",  JSON.stringify(user))

  // watch(darkMode, () => {
  // const modeValueString = JSON.stringify(darkMode.value)
  // console.log('Watch darkMode: ' + modeValueString)
  $q.dark.set(true)
  // console.log(  $q.dark.value)
  //})

  // Works OK
  // console.log("Push to blog...")
  // router.push({ name: 'blog' })

  /*
  const user = getSignedInUser()
  if (user) {
    console.log("Go to blog page...")
    router.push('blog' )
  } else {
    router.push('signin')
  }
  */
})

/*
supabase.auth.onAuthStateChange((_, _session) => {
  router.push({ name: 'account' })
})
*/

</script>