<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation Bar -->
    <header class="bg-white border-b border-gray-200 px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span class="text-lg font-semibold text-gray-900">Product Management</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search"
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            @click="goToProducts"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
          >
            Add Product
          </button>
          <button class="p-2 text-gray-600 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p class="text-gray-500">Enter the details below to add a new item to your inventory.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
        <!-- Product Information Section -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Product Information</h2>
          <div class="space-y-6">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                Product Title <span class="text-red-500">*</span>
              </label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter product title"
              />
              <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Provide a detailed description of the product"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Pricing & Inventory Section -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Pricing & Inventory</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  id="price"
                  v-model.number="formData.price"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
            </div>

            <div>
              <label for="stock" class="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                id="stock"
                v-model.number="formData.stock"
                type="number"
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter stock quantity"
              />
            </div>

            <div>
              <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                v-model="formData.category"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="groceries">Groceries</option>
                <option value="apparel">Apparel</option>
                <option value="beauty">Beauty</option>
                <option value="furniture">Furniture</option>
                <option value="books">Books</option>
                <option value="toys">Toys</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Media Section -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Media</h2>
          <div
            @drop.prevent="handleDrop"
            @dragover.prevent="dragover = true"
            @dragleave.prevent="dragover = false"
            @click="triggerFileInput"
            class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer transition-colors"
            :class="dragover ? 'border-primary bg-blue-50' : 'hover:border-gray-400'"
          >
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-gray-600 font-medium mb-1">Click to upload or drag and drop</p>
            <p class="text-sm text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            <p v-if="formData.thumbnail" class="mt-4 text-sm text-primary font-medium">
              {{ formData.thumbnail }}
            </p>
          </div>
          <div v-if="imagePreview" class="mt-4">
            <img :src="imagePreview" alt="Preview" class="max-w-xs h-auto rounded-lg border border-gray-300" />
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="submitError" class="rounded-md bg-red-50 p-4">
          <div class="text-sm text-red-800">{{ submitError }}</div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="rounded-md bg-green-50 p-4">
          <div class="text-sm text-green-800">{{ successMessage }}</div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="goToProducts"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <span v-if="submitting">Saving...</span>
            <span v-else>Save Product</span>
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'

const router = useRouter()
const productStore = useProductStore()

const fileInput = ref(null)
const dragover = ref(false)
const imagePreview = ref('')

const formData = ref({
  title: '',
  description: '',
  category: '',
  price: 0,
  stock: 0,
  thumbnail: '',
})

const errors = ref({})
const submitError = ref('')
const successMessage = ref('')
const submitting = ref(false)

const validateForm = () => {
  errors.value = {}

  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required'
  }

  if (formData.value.price < 0) {
    errors.value.price = 'Price must be a positive number'
  }

  return Object.keys(errors.value).length === 0
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    handleFile(file)
  }
}

const handleDrop = (event) => {
  dragover.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    handleFile(file)
  }
}

const handleFile = (file) => {
  // For now, just use the file name as URL
  // In a real app, you'd upload the file to a server
  formData.value.thumbnail = file.name
  
  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleSubmit = async () => {
  submitError.value = ''
  successMessage.value = ''

  if (!validateForm()) {
    return
  }

  submitting.value = true

  try {
    // If thumbnail is a file name, use a placeholder URL
    // In a real app, you'd upload the file first and get the URL
    const payload = {
      title: formData.value.title,
      ...(formData.value.description && { description: formData.value.description }),
      ...(formData.value.category && { category: formData.value.category }),
      ...(formData.value.price && { price: formData.value.price }),
      ...(formData.value.stock !== undefined && { stock: formData.value.stock }),
      ...(formData.value.thumbnail && { thumbnail: formData.value.thumbnail }),
    }

    const result = await productStore.addProduct(payload)

    if (result.success) {
      successMessage.value = 'Product added successfully!'
      setTimeout(() => {
        router.push(`/products/${result.data.id}`)
      }, 1000)
    } else {
      submitError.value = result.error || 'Failed to add product'
    }
  } catch (err) {
    submitError.value = 'An unexpected error occurred'
  } finally {
    submitting.value = false
  }
}

const goToProducts = () => {
  router.push('/products')
}
</script>
