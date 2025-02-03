<!-- Side Panel for Categories -->
<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Categories</div>
      
      <!-- Category Selection -->
      <q-select
        class="q-mb-md"
        v-model="selectedCategory"
        :options="categories"
        label="Category"
        option-label="name"
        option-value="id"
        @update:model-value="loadSubCategories"
        outlined
        dense
      />

      <!-- Sub-Category Selection -->
      <q-select
        class="q-mb-md"
        v-model="selectedSubCategory"
        :options="filteredSubCategories"
        label="Sub-Category"
        option-label="name"
        option-value="id"
        :disable="!selectedCategory"
        outlined
        dense
      />

      <!-- Contexts List -->
      <div class="contexts-list q-pb-sm">
        <div class="text-h6">Saved Contexts</div>
        <q-list
          bordered
          separator
        >
          <q-item
            v-for="context in filteredContexts"
            :key="context.id"
            clickable
            @click="toggleContextSelection(context)"
          >
            <q-item-section>
              <q-item-label>{{ context.original_url }}</q-item-label>
              <q-item-label caption>
                {{ getCategoryLabel(context) }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox 
                :model-value="isContextSelected(context.id)"
                @update:model-value="toggleContextSelection(context)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Hierarchical Contexts Tree -->
      <q-tree
        :nodes="categorizedContexts"
        node-key="id"
        label-key="label"
        children-key="children"
        default-expand-all
        tick-strategy="leaf"
        :ticked="selectedContextIds"
        @update:ticked="updateSelectedContexts"
        class="contexts-tree q-mt-md"
      >
        <template v-slot:default-header="prop">
          <div class="row items-center full-width">
            <div class="col">{{ prop.node.label }}</div>
            <div v-if="prop.node.type === 'context'" class="col-shrink">
              <q-icon
                name="link"
                :title="prop.node.original_url"
                class="q-ml-xs"
              />
            </div>
          </div>
        </template>
      </q-tree>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSupabaseAPI } from '../composables/useSupabase.js'

// Emits
const emit = defineEmits(['update:selectedContexts'])

// Supabase API Composable
const {
  fetchCategories,
  fetchSubCategories,
  fetchSavedContexts,
  SaveContextData
} = useSupabaseAPI()
  
// Reactive State
const urlInput = ref('')
const extractedContent = ref('')
const summarizedText  = ref('')
const errorMessage = ref('')
const isDragActive = ref(false)
const fileInput = ref(null)
  
// Categories and Filtering
const categories = ref([])
const subCategories = ref([])
const selectedCategory = ref(null)
const selectedSubCategory = ref(null)
const savedContexts = ref([])
const selectedContextIds = ref([])

// Computed Properties
const filteredSubCategories = computed(() =>
  subCategories.value.filter(sub =>
    sub.category_id === selectedCategory.value?.id
  )
)
  
const getCategoryLabel = (context) => {
  const category = categories.value.find(c => c.id === context.category_id)
  const subCategory = subCategories.value.find(s => s.id === context.sub_category_id)
  return `${category?.name || 'Uncategorized'}${subCategory ? ` - ${subCategory.name}` : ''}`
}

const filteredContexts = computed(() => {
  return savedContexts.value.filter(context => {
    const categoryMatch = !selectedCategory.value ||
      context.category_id === selectedCategory.value.id
    const subCategoryMatch = !selectedSubCategory.value ||
      context.sub_category_id === selectedSubCategory.value.id
    return categoryMatch && subCategoryMatch
  })
})
  
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

// New method to load sub-categories when a category is selected
const loadSubCategories = () => {
  // Reset sub-category when category changes
  selectedSubCategory.value = null
}

// Check if a context is selected
const isContextSelected = (contextId) => {
  return selectedContextIds.value.includes(contextId)
}

// Toggle context selection
const toggleContextSelection = (context) => {
  const contextId = typeof context === 'object' ? context.id : context
  
  if (selectedContextIds.value.includes(contextId)) {
    selectedContextIds.value = selectedContextIds.value.filter(id => id !== contextId)
  } else {
    selectedContextIds.value.push(contextId)
  }
  
  // Emit the updated selected contexts
  emit('update:selectedContexts', selectedContextIds.value)
}

// Update selected contexts from tree
const updateSelectedContexts = (selectedIds) => {
  selectedContextIds.value = selectedIds
  emit('update:selectedContexts', selectedIds)
}

// New computed property to create hierarchical context structure
const categorizedContexts = computed(() => {
  const categoryMap = {}

  // Group contexts by category and subcategory
  savedContexts.value.forEach(context => {
    const category = categories.value.find(c => c.id === context.category_id)
    const subCategory = subCategories.value.find(s => s.id === context.sub_category_id)

    if (category) {
      // Ensure category exists
      if (!categoryMap[category.id]) {
        categoryMap[category.id] = {
          id: category.id,
          label: category.name,
          type: 'category',
          children: []
        }
      }

      // Add subcategory if it exists
      let subCategoryNode = subCategory 
        ? categoryMap[category.id].children.find(sc => sc.id === subCategory.id)
        : null

      if (subCategory && !subCategoryNode) {
        subCategoryNode = {
          id: subCategory.id,
          label: subCategory.name,
          type: 'subcategory',
          children: []
        }
        categoryMap[category.id].children.push(subCategoryNode)
      }

      // Add context to either subcategory or directly to category
      const contextNode = {
        id: context.id,
        label: context.original_url,
        type: 'context',
        original_url: context.original_url
      }

      if (subCategoryNode) {
        if (!subCategoryNode.children) subCategoryNode.children = []
        subCategoryNode.children.push(contextNode)
      } else {
        categoryMap[category.id].children.push(contextNode)
      }
    }
  })

  // Convert to array and return
  return Object.values(categoryMap)
})
</script>

<style scoped>

.contexts-tree {
  max-height: 800px;
  overflow-y: auto;
}
</style>
