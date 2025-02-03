<template>
  <main>
    <!-- key="route.fullPath"-->
    <RouterView />
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// import AdminBlogPage from './pages/AdminBlogPage.vue';
// import DashboardLayout from './layouts/DashboardLayout.vue';
// import AccountPage from './pages/AccountPage.vue'
// import AuthPage from './pages/AuthPage.vue'

import { useRoute, useRouter } from 'vue-router' // useRoute,
import { useSupabaseAPI } from './composables/useSupabase.js';

const router = useRouter()
const route = useRoute()
// const session = ref()
// const error = ref()

const { error, getSignedInUser } = useSupabaseAPI();

onMounted(() => {
  console.log("Dashboard App mounted")
  const user = getSignedInUser()
  console.log("Dashboard App mounted. User:",  JSON.stringify(user))
  // console.log("Dashboard App mounted" getSignedInUser)
  console.log("Push to dashboard...")
  router.push({ name: 'dashboard' })
})

/*
supabase.auth.onAuthStateChange((_, _session) => {
  router.push({ name: 'account' })
})
*/

</script>

<style>
  @import './assets/styles/variables.css';
</style>s