<!-- AI Interaction Section -->
<template>
  <q-card class="col-8 extraction-section">
    <q-card-section>
      <!-- Selected Contexts Display -->
      <div v-if="selectedContextDetails.length > 0" class="selected-contexts q-mb-md">
        <div class="text-h6">Selected Contexts</div>
        <q-list bordered separator>
          <q-item v-for="context in selectedContextDetails" :key="context.id">
            <q-item-section>
              <q-item-label>{{ context.original_url }}</q-item-label>
              <q-item-label caption>
                {{ getCategoryLabel(context) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- AI Query Section -->
      <div class="ai-query-section">
        <!-- Context Processing Method Selection -->
        <q-select
          v-model="contextProcessingMethod"
          :options="getContextProcessingOptions()"
          label="Context Processing Method"
          class="q-mb-md"
        />

        <q-input
          v-model="userQuery"
          label="AI Query"
          outlined
          type="textarea"
          class="q-mb-md"
        />
        <q-select
          v-model="selectedAIService"
          :options="aiServices"
          label="AI Service"
          @update:model-value="updateAIServiceOptions"
          class="q-mb-md"
        />
        <q-select
          v-model="selectedModel"
          :options="availableModels"
          label="AI Model"
          class="q-mb-md"
        />
        <q-btn
          @click="sendToAI"
          color="primary"
          :disable="!userQuery"
        >
          Send to AI
        </q-btn>

        <!-- AI Response -->
        <q-card
          v-if="aiResponse"
          class="q-mt-md"
        >
          <q-card-section>
            <div class="text-h6">AI Response</div>
            <p>{{ aiResponse }}</p>
          </q-card-section>
        </q-card>
      </div>

    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSupabaseAPI } from '../composables/useSupabase.js'

// Props
const props = defineProps({
  selectedContexts: {
    type: Array,
    default: () => []
  }
})

// Composables
const {
  fetchCategories,
  fetchSubCategories,
  fetchSavedContexts
} = useSupabaseAPI()

// Reactive State
const errorMessage = ref('')
const categories = ref([])
const subCategories = ref([])
const savedContexts = ref([])

// AI Query State
const userQuery = ref('')
const selectedAIService = ref('openai')
const aiServices = ['openai', 'anthropic']

const selectedModel = ref('gpt-4o-mini')
const availableModels = ref(['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'])

const aiResponse = ref(null)
const activeThreadId = ref(null) // Track active thread ID

// Context Processing Method
const contextProcessingOptions = ref(['Combine in Prompt'])
const contextProcessingMethod = ref('Combine in Prompt')

// AbortController for canceling requests
const abortController = new AbortController();

// Base URL for API
const baseURL = import.meta.env.MODE === 'production' 
  ? 'https://virtag-ai.fly.dev' 
  : 'http://localhost:3000';

// Lifecycle Hooks
onMounted(async () => {
  try {
    categories.value = await fetchCategories()
    subCategories.value = await fetchSubCategories()
    savedContexts.value = await fetchSavedContexts()
  } catch (error) {
    errorMessage.value = `Initialization error: ${error.message}`
  }
})

// Update AI service options
const updateAIServiceOptions = () => {
  console.log('updateAIServiceOptions: ' + selectedAIService.value)
  if (selectedAIService.value === 'openai') {
    availableModels.value = ['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo']
    contextProcessingOptions.value = ['Combine in Prompt', 'Upload as Files']
    contextProcessingMethod.value = 'Combine in Prompt'
  } else if (selectedAIService.value === 'anthropic') {
    availableModels.value = ['claude-3-5-haiku-20241022', 'claude-3-5-sonnet-20241022', 'claude-3-opus-20240229']
    contextProcessingOptions.value = ['Combine in Prompt']
    contextProcessingMethod.value = 'Combine in Prompt'
  }
  console.log('contextProcessingOptions: ' + contextProcessingOptions.value)
}

// Get context processing options based on current AI service
const getContextProcessingOptions = () => {
  return contextProcessingOptions.value
}

// Computed property to get full context details
const selectedContextDetails = computed(() => {
  return savedContexts.value.filter(context => 
    props.selectedContexts.includes(context.id)
  )
})

// Helper method to get category label
const getCategoryLabel = (context) => {
  const category = categories.value.find(c => c.id === context.category_id)
  const subCategory = subCategories.value.find(s => s.id === context.sub_category_id)
  return `${category?.name || 'Uncategorized'}${subCategory ? ` - ${subCategory.name}` : ''}`
}
  
// AI Query
const sendToAI = async () => {
  try {
    const endpoint = `${baseURL}/api/openai`;

    // Check if a thread is active, if not create one
    if (!activeThreadId.value) {
      const threadResponse = await fetch(`${endpoint}/createThread`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const threadData = await threadResponse.json();
      activeThreadId.value = threadData.id; // Store the active thread ID
    }

    // Add user query to the thread
    const messageResponse = await fetch(`${endpoint}/addMessageToThread`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        threadId: activeThreadId.value,
        content: userQuery.value
      })
    });

    // Run the thread
    const runResponse = await fetch(`${endpoint}/runThread`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        threadId: activeThreadId.value,
        assistantId: 'your_assistant_id' // Replace with actual assistant ID if needed
      })
    });

    aiResponse.value = await runResponse.json().then(data => data.response);
  } catch (error) {
    if (error.name === 'AbortError') {
      errorMessage.value = 'Request was canceled';
    } else {
      errorMessage.value = `AI query error: ${error.message}`;
    }
    console.error(error);
  }
}
</script>
