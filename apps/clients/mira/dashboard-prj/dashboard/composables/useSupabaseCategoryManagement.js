import { ref } from 'vue'
import { supabase } from '../../../shared/supabase'

// Format date helper function
export const formatDate = dateString => {
  if (!dateString) return ''
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

let user = null
// let session = null

const fetchCurrentUser = async () => {
  console.log('Fetching user...')
  const {
    data: { user: fetchedUser },
    error
  } = await supabase.auth.getUser()
  if (error) {
    console.error('Error fetching user:', error)
    return null
  }
  user = fetchedUser
  return user
}

fetchCurrentUser()

export const useSupabaseCategoryManagementAPI = () => {
  const posts = ref([])
  const loading = ref(false)
  const commentsLoading = ref(false)
  const error = ref(null)

  // Fetch categories and sub-categories
const fetchCategories = async () => {
  console.log('Fetching categories...')
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  if (categoryError) {
    console.error('Category fetch error:', categoryError)
    return []
  }
  console.log('Category fetch success.')
  // console.log('categoryData: ' + JSON.stringify(categoryData))
  return categoryData
}

  // Fetch categories and sub-categories
  const fetchSubCategories = async () => {
    console.log('Fetching SubCategories...')
    const { data: subCategoryData, error: subCategoryError } = await supabase
      .from('sub_categories')
      .select('*')
      .order('name')

    if (subCategoryError) {
      console.error('Sub-category fetch error:', subCategoryError)
      return []
    }
    console.log('SubCategory fetch success.')
    // console.log('SubCategory: ' + JSON.stringify(subCategoryData))
    return subCategoryData
    // return subCategoryData || []
  }

  // Fetch saved contexts
  const fetchSavedContexts = async () => {
    console.log('Fetching saved contexts...')
    const { data, error } = await supabase
      .from('extracted_content')
      .select('*')
      .order('extracted_at', { ascending: false })

    if (error) {
      console.error('fetchSavedContexts error:', error)
      return []
    }
    console.log('Fetched context records: ', data.length)
    return data
    // savedContexts.value = data
  }

// Fetch saved contexts with filtering
const fetchSavedContextsWithFilter = async (categoryID, subCategoryID) => {
  console.log('Fetching saved contexts with filter...')
  let query = supabase.from('extracted_content').select(`
    *,
    categories(name),
    sub_categories(name)
  `)

  // Apply category filter if selected
  if (categoryID) { // selectedFilterCategory
    query = query.eq('category_id', categoryID)
  }

  // Apply sub-category filter if selected
  if (subCategoryID) { // selectedSubFilterSubCategory
    query = query.eq('sub_category_id', subCategoryID)
  }
  query = query.order('extracted_at', { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error('Fetch error:', error)
    // return null
    return []
  }
  return data
  // savedContexts.value = data
}

const addCategory = async (name, description) => {
  if (!name.trim()) {
    console.error('Category name is required')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        name: name.trim(),
        description: description?.trim() || null,
        user_id: user.id // Add the current user's ID
      })
      .select()

    if (error) throw error

    return data

    // Reset form and refresh list
    // newCategory.name = ''
    // newCategory.description = ''
    // await fetchCategories()
  } catch (error) {
    console.error('Add category error:', error)
    // alert('Failed to add category')
    return null
  }
}

const deleteCategory = async (categoryId) => {

  if (!confirm('Are you sure you want to delete this category? This will also delete associated subcategories.')) {
    return
  }

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
    return true
    // await fetchCategories()
  } catch (error) {
    console.error('Delete category error:', error)
    // alert('Failed to delete category')
    return false
  }
}

const updateCategory = async (id, name, description) => {
  if (!name.trim()) {
    alert('Category name is required')
    return false
  }

  try {
    const { error } = await supabase
      .from('categories')
      .update({
        name: name.trim(),
        description: description?.trim() || null,
        user_id: user.id // Add the current user's ID
      })
      .eq('id', id)

    if (error) throw error

    // await fetchCategories()
    // editingCategory.value = null
      return true
  } catch (error) {
    console.error('Update category error:', error)
    // alert('Failed to update category')
    return false
  }
}

const addSubcategory = async (categoryId, name, description) => {
  // const subcatData = newSubcategory[categoryId]
  
  if (!name.trim()) {
    alert('Subcategory name is required')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('sub_categories')
      .insert({
        name: name.trim(),
        category_id: categoryId,
        description: description?.trim() || null,
        user_id: user.id // Add the current user's ID
      })
      .select()

    if (error) throw error

    return data

    // Reset form and refresh list
    // newSubcategory[categoryId] = { name: '', description: '' }
    // await fetchCategories()
  } catch (error) {
    console.error('Failed to add subcategory. error:', error)
    return null
    // alert('Failed to add subcategory')
  }
}

const deleteSubcategory = async (subcategoryId) => {
  if (!confirm('Are you sure you want to delete this subcategory?')) {
    return false
  }

  try {
    const { error } = await supabase
      .from('sub_categories')
      .delete()
      .eq('id', subcategoryId)

    if (error) throw error
    return true
    // await fetchCategories()
  } catch (error) {
    console.error('Delete subcategory error:', error)
    // alert('Failed to delete subcategory')
    return false
  }
}

const updateSubcategory = async (id, name, description) => {
  if (name.trim()) {
    alert('Subcategory name is required')
    return false
  }

  try {
    const { error } = await supabase
      .from('sub_categories')
      .update({
        name: name.trim(),
        description: description?.trim() || null,
        user_id: user.id // Add the current user's ID
      })
      .eq('id', id)

    if (error) throw error
      return true
    // await fetchCategories()
    // editingSubcategory.value = null
  } catch (error) {
    console.error('Update subcategory error:', error)
    return false
    // alert('Failed to update subcategory')
  }
}

  return {
    user,
    isUserSignedIn: () => user !== null,

    fetchCurrentUser,

    addCategory,
    deleteCategory,
    updateCategory,

    addSubcategory,
    deleteSubcategory,
    updateSubcategory,

    fetchCategories,
    fetchSubCategories,
    fetchSavedContextsWithFilter,
    fetchSavedContexts,
    formatDate
  }
}
