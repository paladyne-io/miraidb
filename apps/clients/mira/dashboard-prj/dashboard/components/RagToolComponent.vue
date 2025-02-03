<template>
  <q-card flat class="ai-context-manager">
    <div class="row">
      <!-- Side Panel for Categories -->
      <div class="col-4 category-side-panel" >
        <div class="q-pr-md">
        <RAGToolCategorySidePanel @update:selectedContexts="handleSelectedContexts"></RAGToolCategorySidePanel>
      </div>
      </div>

      <div class="col-8 extraction-section">
         <!--
        <RAGToolAIContextManager></RAGToolAIContextManager>
         -->
        <!-- AI Query Section -->
        <div class="ai-query-section">
          <RAGToolAIInteractionComponent :selected-contexts="selectedContexts"></RAGToolAIInteractionComponent>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RAGToolCategorySidePanel from './RAGToolCategorySidePanel.vue'
import RAGToolAIContextManager from './RAGToolAIContextManager.vue'
import RAGToolAIInteractionComponent from './RAGToolAIInteractionComponent.vue'

import { useSupabaseCategoryManagementAPI } from '../composables/useSupabaseCategoryManagement.js'

const { error, fetchCurrentUser, fetchCategories, fetchSubCategories } = useSupabaseCategoryManagementAPI();

// Reactive state to hold selected contexts
const selectedContexts = ref([])

// Method to handle selected contexts from the side panel
const handleSelectedContexts = (contexts) => {
  selectedContexts.value = contexts
}
// Lifecycle hook
onMounted(async () => {
  console.log('RagToolManagerPage mounted.')
  // Check if the user is signed in
  const user = await fetchCurrentUser()

  if (!user) {
    alert('You must be signed in to Supabase to use this feature.')
    return
  }
  console.log('CategoryManagerPage mounted.')
  // fetchCategoriesFromDB()
})

</script>

<style scoped>
.category-side-panel {
  /* background-color: #f5f5f5; */
  border-right: 1px solid #e0e0e0;
}
</style>
