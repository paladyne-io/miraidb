// Sanitization helpers
export const sanitizeInput = (input: string): string => {
  // Remove HTML tags
  const sanitizedInput = input.replace(/<[^>]*>/g, '')
  
  // Trim whitespace
  return sanitizedInput.trim()
}

// Validation rules
export const validateCategory = (category: {
  name: string
  description?: string
}) => {
  const errors: string[] = []

  // Name validation
  if (!category.name) {
    errors.push('Category name is required')
  } else if (category.name.length < 2) {
    errors.push('Category name must be at least 2 characters long')
  } else if (category.name.length > 50) {
    errors.push('Category name cannot exceed 50 characters')
  }

  // Description validation (optional)
  if (category.description) {
    if (category.description.length > 500) {
      errors.push('Description cannot exceed 500 characters')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateSubcategory = (subcategory: {
  name: string
  description?: string
  categoryId: string
}) => {
  const errors: string[] = []

  // Name validation
  if (!subcategory.name) {
    errors.push('Subcategory name is required')
  } else if (subcategory.name.length < 2) {
    errors.push('Subcategory name must be at least 2 characters long')
  } else if (subcategory.name.length > 50) {
    errors.push('Subcategory name cannot exceed 50 characters')
  }

  // Category ID validation
  if (!subcategory.categoryId) {
    errors.push('A parent category must be selected')
  }

  // Description validation (optional)
  if (subcategory.description) {
    if (subcategory.description.length > 500) {
      errors.push('Description cannot exceed 500 characters')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateExtractedContent = (content: {
  url: string
  text: string
  categoryId: string
}) => {
  const errors: string[] = []

  // URL validation
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  if (!content.url) {
    errors.push('URL is required')
  } else if (!urlPattern.test(content.url)) {
    errors.push('Invalid URL format')
  }

  // Text validation
  if (!content.text) {
    errors.push('Content text is required')
  } else if (content.text.length < 10) {
    errors.push('Content must be at least 10 characters long')
  } else if (content.text.length > 100000) {
    errors.push('Content is too long (max 100,000 characters)')
  }

  // Category validation
  if (!content.categoryId) {
    errors.push('A category must be selected')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}