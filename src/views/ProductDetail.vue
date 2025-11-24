<template>
  <div class="min-h-screen bg-white">
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
            @click="goToAddProduct"
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

    <main class="max-w-7xl mx-auto px-8 py-6">
      <!-- Breadcrumbs -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <router-link to="/products" class="text-gray-500 hover:text-primary">Products</router-link>
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900 font-medium">{{ product?.title || 'Loading...' }}</li>
        </ol>
      </nav>

      <!-- Loading State -->
      <div v-if="productStore.isLoading" class="mt-8">
        <LoadingSpinner />
      </div>

      <!-- Error State -->
      <div v-else-if="productStore.error" class="mt-8 rounded-md bg-red-50 p-4">
        <div class="text-sm text-red-800">{{ productStore.error }}</div>
        <button
          @click="goBack"
          class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900"
        >
          Go Back
        </button>
      </div>

      <!-- Product Details -->
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Product Image -->
        <div class="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
          <img
            :src="product.thumbnail || product.images?.[0]"
            :alt="product.title"
            class="max-w-full h-auto rounded-lg"
            @error="handleImageError"
          />
        </div>

        <!-- Product Info -->
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ product.title }}</h1>
          <p class="text-gray-600 mb-6 text-lg">
            {{ product.description }}
          </p>

          <button
            @click="handleEdit"
            class="mb-8 px-6 py-3 bg-purple-100 text-primary rounded-lg hover:bg-purple-200 transition-colors font-medium flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Product
          </button>

          <div class="space-y-6">
            <div>
              <label class="text-sm font-medium text-gray-500 uppercase">Price</label>
              <p class="text-3xl font-bold text-primary mt-1">${{ product.price }}</p>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-500 uppercase">Category</label>
              <div class="mt-2">
                <span class="px-4 py-2 bg-purple-100 text-primary rounded-full text-sm font-medium capitalize">
                  {{ product.category }}
                </span>
              </div>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-500 uppercase">Stock</label>
              <div class="mt-2 flex items-center gap-3">
                <span class="px-4 py-2 rounded-full text-sm font-medium"
                  :class="product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
                </span>
                <span class="text-gray-600">{{ product.stock }} units</span>
              </div>
            </div>

            <div v-if="product.description" class="pt-4 border-t border-gray-200">
              <label class="text-sm font-medium text-gray-500 uppercase mb-2 block">Description</label>
              <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
            </div>
          </div>

          <!-- Delete Button -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <button
              @click="handleDelete"
              :disabled="deleting"
              class="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <span v-if="deleting">Deleting...</span>
              <span v-else>Delete Product</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Customer Reviews Section -->
      <div v-if="product && product.rating" class="bg-white border border-gray-200 rounded-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        
        <div class="flex items-center gap-4 mb-6">
          <div class="text-5xl font-bold text-gray-900">{{ product.rating }}</div>
          <div>
            <div class="flex items-center gap-1 mb-2">
              <svg v-for="i in 5" :key="i" class="w-6 h-6" :class="i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-sm text-gray-600">Based on {{ Math.floor(Math.random() * 200 + 50) }} reviews</p>
          </div>
        </div>

        <!-- Rating Breakdown -->
        <div class="space-y-2">
          <div v-for="star in 5" :key="star" class="flex items-center gap-4">
            <span class="text-sm text-gray-600 w-12">{{ 6 - star }} star{{ 6 - star > 1 ? 's' : '' }}</span>
            <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-yellow-400 rounded-full" :style="{ width: getRatingPercentage(6 - star) + '%' }"></div>
            </div>
            <span class="text-sm text-gray-600 w-12">{{ getRatingPercentage(6 - star) }}%</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const deleting = ref(false)

const product = computed(() => productStore.currentProduct)

onMounted(async () => {
  const productId = route.params.id
  await productStore.fetchProductById(productId)
})

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400?text=No+Image'
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    return
  }

  deleting.value = true
  const result = await productStore.deleteProduct(route.params.id)
  deleting.value = false

  if (result.success) {
    router.push('/products')
  } else {
    alert('Failed to delete product: ' + result.error)
  }
}

const handleEdit = () => {
  // For now, just show an alert. In a real app, this would navigate to an edit page
  alert('Edit functionality can be implemented here')
}

const goBack = () => {
  router.push('/products')
}

const goToAddProduct = () => {
  router.push('/products/new')
}

const getRatingPercentage = (starLevel) => {
  // Mock rating distribution - in a real app, this would come from actual review data
  const distribution = {
    5: 75,
    4: 15,
    3: 5,
    2: 3,
    1: 2,
  }
  return distribution[starLevel] || 0
}
</script>
