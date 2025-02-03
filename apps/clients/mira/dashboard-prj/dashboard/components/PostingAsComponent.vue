<template>
    <span
    v-if="userProfile"
        class="q-mr-sm"
    >Posting as:</span>
    <q-avatar
  
        class="q-mr-sm"
        v-if="userProfile"
    >
        <Avatar :path="userProfile.avatar_url" size="20px"/>
    </q-avatar>
    <span
        class="text-weight-bold"
        v-if="userProfile"
    >
        <router-link :to="{ name: 'admin-profile' }">{{ userProfile.username }}</router-link>
    </span>
    <span v-else>
        Not signed in. <router-link to="/dashboard/admin-signin">Log in</router-link>
    </span>
</template>

<script setup>
import { onMounted, ref, toRefs, watch } from 'vue'
import Avatar from './Avatar.vue'
import { useSupabaseAPI } from '../composables/useSupabase.js'
const { loading, error, getSignedInUserProfile } = useSupabaseAPI();

const userProfile = ref(null)

onMounted(async () => {
   userProfile.value = await getSignedInUserProfile()
})

// const prop = defineProps([])
// const { path, size } = toRefs(prop)
</script>

<style></style>
