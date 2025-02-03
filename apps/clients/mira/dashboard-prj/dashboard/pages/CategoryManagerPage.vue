<template>
  <q-card flat class="category-management">
    <div class="container">
    <h2 class="page-title">Category Management</h2>
      <div v-if="!user">
      <NotSignedInComponent  />
    </div>
      <div v-else class="category-section">
        <div class="add-category-card">
          <h3 class="category-title q-pb-md">Create a New Category</h3>
          <div class="input-group">
            <input 
              v-model="newCategory.name" 
              placeholder="Category Name" 
              type="text"
              class="form-input"
            />
            <textarea 
              v-model="newCategory.description" 
              placeholder="Category Description (Optional)"
              class="form-textarea"
            ></textarea>
            <q-btn @click="addCategoryInDB" class="btn-primary">
              <i class="fas fa-plus"></i> Add Category
            </q-btn>
            <div class="modal-actions">
              <button @click="updateCategoryInDB">Save</button>
              <button @click="cancelEditCategory">Cancel</button>
            </div>
            
          </div>
        </div>

        <div class="categories-grid">
          <div 
            v-for="category in categories" 
            :key="category.id" 
            class="category-card"
          >
            <div class="category-header">
              <h3>{{ category.name }}</h3>
              <div class="category-actions">
                <button 
                  @click="startEditCategory(category)" 
                  class="btn-edit"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button 
                  @click="deleteCategoryInDB(category.id)" 
                  class="btn-delete"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            
            <p class="category-description">
              {{ category.description || 'No description' }}
            </p>

            <div class="subcategory-section">
              <div class="add-subcategory-form">
                <div v-if="subcategoryInputs[category.id]" class="input-group">
                  <input 
                    v-model="subcategoryInputs[category.id].name" 
                    placeholder="Subcategory Name" 
                    class="form-input"
                  />
                  <textarea 
                    v-model="subcategoryInputs[category.id].description" 
                    placeholder="Subcategory Description"
                    class="form-textarea"
                  ></textarea>
                  <q-btn 
                    @click="addSubcategoryInDB(category.id)" 
                    class="btn-secondary"
                  >
                    <i class="fas fa-plus"></i> Add Subcategory
                  </q-btn>
            
                </div>
              </div>

              <div class="subcategories-list">
                <div 
                  v-for="subcategory in subcategories.filter(sub => sub.category_id === category.id)" 
                  :key="subcategory.id" 
                  class="subcategory-item"
                >
                  <div class="subcategory-content">
                    <span class="subcategory-name">{{ subcategory.name }}</span>
                    <div class="subcategory-actions">
                      <button 
                        @click="startEditSubcategory(subcategory)" 
                        class="btn-edit-small"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button 
                        @click="deleteSubcategoryInDB(subcategory.id)" 
                        class="btn-delete-small"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <p class="subcategory-description">
                    {{ subcategory.description || 'No description' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  
<!-- Edit Category Modal -->
<div v-if="editingCategory" class="modal">
  <div class="modal-content">
    <h2>Edit Category</h2>
    <input 
      v-model="editingCategory.name" 
      placeholder="Category Name" 
    />
    <textarea 
      v-model="editingCategory.description" 
      placeholder="Category Description"
    ></textarea>
    <div class="modal-actions">
      <button @click="updateCategoryInDB">Save</button>
      <button @click="cancelEditCategory">Cancel</button>
    </div>
  </div>
</div>

<!-- Edit Subcategory Modal -->
<div v-if="editingSubcategory" class="modal">
  <div class="modal-content">
    <h2>Edit Subcategory</h2>
    <input 
      v-model="editingSubcategory.name" 
      placeholder="Subcategory Name" 
    />
    <textarea 
      v-model="editingSubcategory.description" 
      placeholder="Subcategory Description"
    ></textarea>
    <div class="modal-actions">
      <button @click="updateSubcategoryInDB">Save</button>
      <button @click="cancelEditSubcategory">Cancel</button>
    </div>
  </div>
</div>
  </q-card>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useSupabaseCategoryManagementAPI } from '../composables/useSupabaseCategoryManagement.js'
import NotSignedInComponent from '../components/NotSignedInComponent.vue'

const { error, isUserSignedIn, fetchCurrentUser, fetchCategories, fetchSubCategories, addCategory, updateCategory, deleteCategory, addSubcategory, deleteSubcategory, updateSubcategory } = useSupabaseCategoryManagementAPI();

import { 
  sanitizeInput, 
  validateCategory, 
  validateSubcategory 
} from '../../../utils/validation.ts'

/*
import { createClient } from '@supabase/supabase-js'

// Supabase client initialization
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
*/

// Reactive state
const user = ref()
const categories = ref([])
const subcategories = ref([])
const newCategory = reactive({
  name: '',
  description: ''
})
const newSubcategory = reactive({})
const editingCategory = ref(null)
const editingSubcategory = ref(null)

const subcategoryInputs = reactive({})

// Safe initialization of subcategory inputs
const initSubcategoryInputs = () => {
  categories.value.forEach(category => {
    // Use Vue's reactive set to ensure reactivity
    if (!(category.id in subcategoryInputs)) {
      subcategoryInputs[category.id] = {
        name: '',
        description: ''
      }
    }
  })
}
/* Initialize subcategory inputs when categories are loaded
const initSubcategoryInputs = () => {
  categories.value.forEach(category => {
    console.log('Initializing subcategory inputs for category: ' + category.name)
    if (!subcategoryInputs[category.id]) {
      console.log('No subcategory inputs found for category: ' + category.name)
      subcategoryInputs[category.id] = {
        name: 'Unitled',
        description: 'No description'
      }
    }
  })
}
  */


// Category Operations
const addCategoryInDB = async () => {

  // Sanitize inputs
  const sanitizedName = sanitizeInput(newCategory.name)
  const sanitizedDescription = newCategory.description 
    ? sanitizeInput(newCategory.description) 
    : ''

  // Validate
  const { isValid, errors } = validateCategory({
    name: sanitizedName,
    description: sanitizedDescription
  })

  if (!isValid) {
    // Display errors to the user
    alert(errors.join('\n'))
    return
  }

    const result = await addCategory(newCategory.name, newCategory.description)
  if (result) {
    console.error('Add category success.')
    newCategory.name = ''
    newCategory.description = ''
    categories.value = await fetchCategories()
    alert('The new category was added successfully.')
  }
  else {
    alert('Failed to add category.')
  }
/*
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        name: newCategory.name.trim(),
        description: newCategory.description?.trim() || null
      })
      .select()

    if (error) throw error

    // Reset form and refresh list
    newCategory.name = ''
    newCategory.description = ''
    await fetchCategories()
  } catch (error) {
    console.error('Add category error:', error)
    alert('Failed to add category')
  }
    */
}

const deleteCategoryInDB = async (categoryId) => {
  if (!confirm('Are you sure you want to delete this category? This will also delete associated subcategories.')) {
    return
  }
  const result = await deleteCategory(categoryId)
  if (result) {
    console.error('Delete category success.')
    categories.value  = await fetchCategories()
  }
  else {
    alert('Failed to delete category.')
  }
  /*
  try {
    // First, delete associated subcategories
    await supabase
      .from('sub_categories')
      .delete()
      .eq('category_id', categoryId)

    // Then delete the category
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId)

    if (error) throw error

    await fetchCategories()
  } catch (error) {
    console.error('Delete category error:', error)
    alert('Failed to delete category')
  }
    */
}

const startEditCategory = (category) => {
  editingCategory.value = { ...category }
}

const updateCategoryInDB = async () => {
  if (!editingCategory.value?.name.trim()) {
    alert('Category name is required')
    return
  }

  // Sanitize inputs
  const sanitizedName = sanitizeInput(editingCategory.value?.name)
  const sanitizedDescription = editingCategory.value?.description 
    ? sanitizeInput(editingCategory.value?.description) 
    : ''

  // Validate
  const { isValid, errors } = validateCategory({
    name: sanitizedName,
    description: sanitizedDescription
  })

  if (!isValid) {
    // Display errors to the user
    alert(errors.join('\n'))
    return
  }

  const result = await updateCategory(editingCategory.value.id, editingCategory.value.name, editingCategory.value.description)
  if (result) {
    console.error('Update category success.')
    editingCategory.value = null
    categories.value  = await fetchCategories()
  }
  else {
    alert('Failed to update category.')
  }
/*
  try {
    const { error } = await supabase
      .from('categories')
      .update({
        name: editingCategory.value.name.trim(),
        description: editingCategory.value.description?.trim() || null
      })
      .eq('id', editingCategory.value.id)

    if (error) throw error

    await fetchCategories()
    editingCategory.value = null
  } catch (error) {
    console.error('Update category error:', error)
    alert('Failed to update category')
  }
  */
}

const cancelEditCategory = () => {
  editingCategory.value = null
}

// Subcategory Operations
const getSubcategoriesForCategory = (categoryId) => {
  return subcategories.value.filter(sub => sub.category_id === categoryId)
}

const addSubcategoryInDB = async (categoryId) => {
  console.log('addSubcategoryInDB categoryId: ' + categoryId)

  if (!subcategoryInputs[categoryId]) {
    subcategoryInputs[categoryId] = { name: '', description: '' }
  }
  // Sanitize inputs
  const subcatData = subcategoryInputs[categoryId]

  const sanitizedName = sanitizeInput(subcatData.name)
  const sanitizedDescription = subcatData.description 
    ? sanitizeInput(subcatData.description) 
    : ''

  // Validate
  const { isValid, errors } = validateSubcategory({
    name: sanitizedName,
    description: sanitizedDescription,
    categoryId: categoryId
  })

  if (!isValid) {
    // Display errors to the user
    alert(errors.join('\n'))
    return
  }

  // const subcatData = subcategoryInputs[categoryId]

  // console.log('subcatData name: ' + subcatData.name)
  // console.log('subcatData name trim: ' + subcatData.name.trim())
  
  if (!subcatData.name || !subcatData.name.trim()) {
    alert('Subcategory name is required')
    return
  }
  const result = await addSubcategory(categoryId, subcatData.name, subcatData.description)
  if (result) {
    console.log('Added subcategory.')
    // Reset form for this category and refresh list
    subcategoryInputs[categoryId].name = ''
    subcategoryInputs[categoryId].description = ''
    subcategories.value = await fetchSubCategories()
  }
  else {
    alert('Failed to add subcategory.')
  }
}

const deleteSubcategoryInDB = async (subcategoryId) => {
  if (!confirm('Are you sure you want to delete this subcategory?')) {
    return
  }
  const result = await deleteSubcategory(subcategoryId)
  if (result) {
    console.error('Delete subcategory success.')
    subcategories.value = await fetchSubCategories()
  }
  else {
    alert('Failed to delete subcategory.')
  }
  /*
  try {
    const { error } = await supabase
      .from('sub_categories')
      .delete()
      .eq('id', subcategoryId)

    if (error) throw error

    await fetchCategories()
  } catch (error) {
    console.error('Delete subcategory error:', error)
    alert('Failed to delete subcategory')
  }
    */
}

const startEditSubcategory = (subcategory) => {
  editingSubcategory.value = { ...subcategory }
}

const updateSubcategoryInDB = async () => {
  if (!editingSubcategory.value?.name.trim()) {
    alert('Subcategory name is required')
    return
  }
  const result = await updateSubcategory(editingSubcategory.value.id, editingSubcategory.value.name, editingSubcategory.value.description)
  if (result ) {
    console.error('Update subcategory success.')
    editingSubcategory.value = null
  }
  else {
    alert('Failed to update subcategory.')
  }
 /*
  try {
    const { error } = await supabase
      .from('sub_categories')
      .update({
        name: editingSubcategory.value.name.trim(),
        description: editingSubcategory.value.description?.trim() || null
      })
      .eq('id', editingSubcategory.value.id)

    if (error) throw error

    await fetchCategories()
    editingSubcategory.value = null
  } catch (error) {
    console.error('Update subcategory error:', error)
    alert('Failed to update subcategory')
  }
  */
}

const cancelEditSubcategory = () => {
  editingSubcategory.value = null
}
// Fetch categories and sub-categories
const fetchCategoriesFromDB = async () => {
  const categoryData = await fetchCategories()
  categories.value = categoryData || []

  const subcategoryData = await fetchSubCategories()
  subcategories.value = subcategoryData || []

  initSubcategoryInputs()
}

// Lifecycle hook
onMounted(async () => {
  console.log('CategoryManagerPage mounted.')
  // Check if the user is signed in
  user.value = await fetchCurrentUser()
  /*
  if (!aUser) {
    alert('You must be signed in to Supabase to use this feature.')
    return
  }
  */
  console.log('CategoryManagerPage mounted. Fetching categories...')
  fetchCategoriesFromDB()
})
</script>

<style scoped>

.add-category-card {
  background: white;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.add-category-card:hover {
  transform: translateY(-5px);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: white;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.category-card:hover {
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  transform: translateY(-5px);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--background-light);
  padding-bottom: 0.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-input, 
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-input:focus, 
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.btn-primary, 
.btn-secondary {
  color:blue;
  width:180px;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn-primary:hover, 
.btn-secondary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.category-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit, 
.btn-delete,
.btn-edit-small,
.btn-delete-small {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.btn-edit, 
.btn-edit-small {
  color: var(--primary-color);
}

.btn-delete,
.btn-delete-small {
  color: #e74c3c;
}

.subcategory-section {
  margin-top: 1.5rem;
}

.subcategories-list {
  margin-top: 1rem;
}

.subcategory-item {
  background-color: var(--background-light);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  transition: background-color 0.3s ease;
}

.subcategory-item:hover {
  background-color: #f0f0f0;
}

.subcategory-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subcategory-actions {
  display: flex;
  gap: 0.5rem;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>