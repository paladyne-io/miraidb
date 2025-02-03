<!-- Context Manager AI Section -->
<template>
  <q-card class="col-8 extraction-section">
    <q-card-section>
      <h5>Extract and Manage AI Context</h5>

      <div class="file-upload-section">
        <div
          class="drop-zone"
          @dragover.prevent="onDragOver"
          @dragleave.prevent="onDragLeave"
          @drop.prevent="handleDrop"
          :class="{ 'drag-active': isDragActive }"
        >
          <p>Drag and Drop a URL (web link) or file here</p>
        </div>

        <div class="row items-center justify-between url-input-section q-mb-md">
          <div class="col-8">
            <q-input
              class="col "
              v-model="urlInput"
              placeholder="or enter a URL here"
              @keyup.enter="extractTextFromURL"
            />
          </div>
          <div class="col-auto">
            <q-btn
              class="q-ma-sm"
              @click="extractTextFromURL"
              :disabled="!urlInput"
              color="primary"
            >
              Extract URL Text
            </q-btn>
          </div>
        </div>

        <div class="file-input-section q-mb-md">
          <input
            type="file"
            ref="fileInput"
            @change="onFileSelect"
            accept=".pdf,.txt,.html,.rtf,.docx,.md"
          />
        </div>

        <!-- Error Display -->
        <q-banner
          v-if="errorMessage"
          class="bg-negative text-white q-mb-md"
        >
          {{ errorMessage }}
        </q-banner>

        <!-- Content Preview -->
        <q-expansion-item
          v-if="extractedContent"
          label="Extracted Content Preview"
          default-opened
          class="q-mb-md"
        >
          <q-card>
            <q-card-section>
              <div>
                {{ truncateContent(extractedContent) }}
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- Category Selection -->
      <div class="row justify-start q-pt-sm">
          <div class="col col-md-8 row q-gutter-sm">
            <div class="col">
              <q-select
                v-model="selectedCategory"
                :options="categories"
                label="Category"
                option-label="name"
                option-value="id"
                @update:model-value="loadSubCategories"
                outlined
                dense
              />
            </div>
            <div class="col">
              <q-select
                v-model="selectedSubCategory"
                :options="filteredSubCategories"
                label="Sub-Category"
                option-label="name"
                option-value="id"
                :disable="!selectedCategory"
                outlined
                dense
              />
            </div>
          </div>
        </div>
    </q-card-section>

  <q-card-actions align="center">
    <q-btn
      size="lg"
      padding="sm lg"
      @click="saveContext"
      color="positive"
      :disable="!canSaveContext"
      class="q-mb-md"
    >
      Save Context
    </q-btn>
  </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import { useSupabaseAPI } from '../composables/useSupabase.js'

// Supabase API Composable
const {
  fetchCategories,
  fetchSubCategories,
  fetchSavedContexts,
  SaveContextData
} = useSupabaseAPI()


import { FileProcessor } from '../../../utils/FileTextExtractionLib.ts'
// Reactive State
const url = ref('')

const urlInput = ref('')
const extractedContent = ref('')
const summarizedText = ref('')
const errorMessage = ref('')
const isDragActive = ref(false)
const fileInput = ref(null)

// Categories and Filtering
const categories = ref([])
const subCategories = ref([])
const selectedCategory = ref(null)
const selectedSubCategory = ref(null)
const savedContexts = ref([])
const selectedContexts = ref([{}])

const canSaveContext = computed(() =>
  extractedContent.value && selectedCategory.value
)

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

// Computed Properties
const filteredSubCategories = computed(() =>
  subCategories.value.filter(sub =>
    sub.category_id === selectedCategory.value?.id
  )
)

const filteredContexts = computed(() => {
  return savedContexts.value.filter(context => {
    const categoryMatch = !selectedCategory.value ||
      context.category_id === selectedCategory.value.id
    const subCategoryMatch = !selectedSubCategory.value ||
      context.sub_category_id === selectedSubCategory.value.id
    return categoryMatch && subCategoryMatch
  })
})

// New method to load sub-categories when a category is selected
const loadSubCategories = () => {
  // Reset sub-category when category changes
  selectedSubCategory.value = null
}


// Utility Methods
const resetForm = () => {
  extractedContent.value = ''
  urlInput.value = ''
  selectedSubCategory.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const truncateContent = (content, maxLength = 500) =>
  content.length > maxLength
    ? content.substring(0, maxLength) + '...'
    : content

// Drag and Drop Handlers
const onDragOver = (event) => {
  event.preventDefault()
  isDragActive.value = true
}

const onDragLeave = () => {
  isDragActive.value = false
}

const handleDrop = async (e) => {
  isDragActive.value = false

  // Prevent default to stop browser from opening the file
  e.preventDefault()
  console.log("handleDrop.. ")

  // Check if files are dropped
  if (e.dataTransfer.files.length > 0) {
    const droppedFile = e.dataTransfer.files[0]

    console.log("Processing a dropped file.. ", droppedFile)
    console.log("file type:", droppedFile.type)
    if (!droppedFile.name.endsWith(".webloc")) {
      try {
        // Process the dropped file
        await processFile(droppedFile)
      } catch (error) {
        console.error('File drop processing error:', error)
        errorMessage.value = error.message
      }
    }
    return
  }
  // Check if a URL is dropped

  const droppedUrl = e.dataTransfer.getData('text/plain')
  if (droppedUrl) {
    console.log("droppedUrl: ", droppedUrl)
    urlInput.value = droppedUrl
    extractTextFromURL()
  }
}

// File Processing
const onFileSelect = async (event) => {
  const file = event.target.files[0]
  if (file) {
    await processFile(file)
  }
}

const processFile = async (file) => {
  try {
    const result = await FileProcessor.processFile(file)
    extractedContent.value = result.text
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = `File processing error: ${error.message}`
  }
}

// URL Extraction
const extractTextFromURL = async () => {
  if (!urlInput.value) {
    errorMessage.value = 'Please enter a valid URL'
    return
  }

  try {
    const response = await fetch(urlInput.value)
    const htmlContent = await response.text()

    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, 'text/html')

    // Extract main content
    const paragraphs = extractMainContent(doc)

    // Store full extracted text
    const extractedText = paragraphs.join('\n\n')

    // Generate comprehensive summary
    summarizedText.value = generateComprehensiveSummary(extractedText)

    extractedContent.value = summarizedText
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = `URL extraction error: ${error.message}`
  }
}

const extractMainContent = (doc) => {
  // More comprehensive text extraction strategy
  const extractors = [
    // Try different content extraction methods
    () => {
      // Extract main content from common semantic tags
      const mainSelectors = [
        'main',
        'article',
        '.main-content',
        '#main-content',
        '.content',
        '#content'
      ]

      for (let selector of mainSelectors) {
        const mainContent = doc.querySelector(selector)
        if (mainContent) {
          return Array.from(mainContent.querySelectorAll('p, h1, h2, h3, h4, h5, h6'))
            .map(el => el.textContent.trim())
            .filter(text => text.length > 0)
        }
      }
      return []
    },
    () => {
      // Fallback to all paragraphs
      return Array.from(doc.querySelectorAll('p'))
        .map(p => p.textContent.trim())
        .filter(text => text.length > 0)
    }
  ]

  // Try extractors until we find content
  for (let extractor of extractors) {
    const content = extractor()
    if (content.length > 0) return content

    return []
  }
}

const generateComprehensiveSummary = (text) => {
  // More advanced summarization approach
  if (!text || text.length === 0) return 'No content could be extracted.'

  // Break text into paragraphs
  const paragraphs = text.split('\n\n')

  // If too short, return full text
  if (paragraphs.length <= 3) return text

  // Extract key information
  const summary = []
  const keywordThresholds = [
    'summary', 'key points', 'main idea', 'important',
    'conclusion', 'highlights', 'overview'
  ]

  // Prioritize paragraphs with key information
  paragraphs.forEach(para => {
    const lowerPara = para.toLowerCase()
    const isKeyParagraph = keywordThresholds.some(keyword =>
      lowerPara.includes(keyword)
    )

    // Add paragraphs that seem important
    if (isKeyParagraph || para.length > 100) {
      summary.push(para)
    }
  })

  // If no key paragraphs found, take first few paragraphs
  if (summary.length === 0) {
    summary.push(...paragraphs.slice(0, 3))
  }

  return summary.join('\n\n')
}

// Context Saving
const saveContext = async () => {
  if (!canSaveContext.value) {
    errorMessage.value = 'Please select a category and provide content'
    return
  }

  try {
    const savedContext = await SaveContextData(
      urlInput.value || 'Uploaded Content',
      extractedContent.value,
      extractedContent.value.length / 1000, // size in KB
      selectedCategory.value.id,
      selectedSubCategory.value?.id
    )

    savedContexts.value.push(savedContext)
    resetForm()
  } catch (error) {
    errorMessage.value = `Save as context error: ${error.message}`
  }
}

</script>

<style scoped>
.drop-zone {
  height: 140px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  font-size: 18px;
  color: rgb(39, 137, 242);
  padding: 20px;
  text-align: center;
  background-color: #d7e8f0;
  vertical-align: middle;
  height: 100px;
  line-height: 50px;
  transition: background-color 0.3s;
}

.drop-zone.drag-active {
  background-color: #f0f0f0;
}
</style>