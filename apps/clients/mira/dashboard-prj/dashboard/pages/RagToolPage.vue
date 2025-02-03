<template>
  <q-page class="rag-tool-page">
    <div class="container">
      <h2 class="page-title">RAG Tool</h2>
      <div v-if="!user">
      <NotSignedInComponent  />
    </div>
    <div v-else class="rag-tool-content">
      <!-- Existing RAG Tool content 
      <RAGToolCategorySidePanel />
      -->
      <div class="main-content q-gutter-md">
        <RAGToolAIContextManager />
        <RagToolComponent />
      </div>
    </div>
  </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NotSignedInComponent from '../components/NotSignedInComponent.vue'
import RAGToolCategorySidePanel from '../components/RAGToolCategorySidePanel.vue'
import RAGToolAIContextManager from '../components/RAGToolAIContextManager.vue'
import RagToolComponent from '../components/RagToolComponent.vue'

import { useSupabaseAPI } from '../composables/useSupabase.js'

const { error, fetchCurrentUser, isUserSignedIn } = useSupabaseAPI();  
const user = ref()

// Lifecycle hook
onMounted(async () => {
  console.log('RagToolManagerPage mounted.')
  // Check if the user is signed in
  user.value = await fetchCurrentUser()
/*
  if (!user) {
    alert('You must be signed in to Supabase to use this feature.')
    return
  }
*/

})

// import { useSupabase } from '../composables/useSupabase'

// const { session } = useSupabase()

// const isUserSignedIn = computed(() => !!session.value)
</script>

<style scoped>

.rag-tool-content {
  display: flex;
}

.main-content {
  flex-grow: 1;
}
</style>
