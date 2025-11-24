<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-1">Products</h1>
        <p class="text-gray-500">Manage your inventory and view product performance.</p>
      </header>

      <main class="flex-1 overflow-y-auto px-8 py-6">
        <!-- Top Bar: Search, Filters, Add Button -->
        <div class="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <!-- Search Bar -->
          <div class="flex-1 w-full sm:max-w-md relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by product name..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <!-- Filters and Add Button -->
          <div class="flex gap-3 w-full sm:w-auto">
            <select
              v-model="selectedCategory"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="">Category</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>

            <select
              v-model="stockStatus"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="">Stock Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            <button
              @click="goToAddProduct"
              class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors font-medium flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New Product
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="productStore.isLoading" class="mt-8">
          <LoadingSpinner />
        </div>

        <!-- Error State -->
        <div v-else-if="productStore.error" class="mt-8 rounded-md bg-red-50 p-4">
          <div class="text-sm text-red-800">{{ productStore.error }}</div>
        </div>

        <!-- Products Table -->
        <div v-else-if="paginatedProducts.length > 0" class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="product in paginatedProducts"
                  :key="product.id"
                  class="hover:bg-gray-50 cursor-pointer transition-colors"
                  @click="viewProduct(product.id)"
                >
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <img
                        :src="product.thumbnail"
                        :alt="product.title"
                        class="h-12 w-12 rounded-full object-cover mr-4"
                        @error="handleImageError"
                      />
                      <div>
                        <div class="text-sm font-semibold text-gray-900">{{ product.title }}</div>
                        <div class="text-sm text-gray-500 line-clamp-1">
                          {{ truncateDescription(product.description) }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 text-xs font-medium rounded-full capitalize"
                      :class="getCategoryColor(product.category)"
                    >
                      {{ product.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900 font-medium">
                    ${{ product.price }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full" :class="getStockDotColor(product.stock)"></span>
                      <span class="text-sm text-gray-900" :class="getStockTextColor(product.stock)">
                        {{ getStockStatus(product.stock) }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <button
                      @click.stop="viewProduct(product.id)"
                      class="text-gray-400 hover:text-gray-600"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredProducts.length }} results
            </div>
            <div class="flex gap-2">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage >= totalPages"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="mt-8 text-center py-12 bg-white rounded-lg shadow-sm">
          <p class="text-gray-500">No products found matching your search criteria.</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import Sidebar from '@/components/Sidebar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const router = useRouter()
const productStore = useProductStore()

const searchQuery = ref('')
const selectedCategory = ref('')
const stockStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Fetch products on mount
onMounted(async () => {
  await productStore.fetchProducts()
})

// Get unique categories from products
const categories = computed(() => {
  const cats = new Set(productStore.products.map(p => p.category))
  return Array.from(cats).sort()
})

// Filter products based on search, category, and stock status
const filteredProducts = computed(() => {
  let filtered = productStore.products

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // Filter by stock status
  if (stockStatus.value) {
    if (stockStatus.value === 'in_stock') {
      filtered = filtered.filter(product => product.stock > 20)
    } else if (stockStatus.value === 'low_stock') {
      filtered = filtered.filter(product => product.stock > 0 && product.stock <= 20)
    } else if (stockStatus.value === 'out_of_stock') {
      filtered = filtered.filter(product => product.stock === 0)
    }
  }

  return filtered
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredProducts.value.length))
const paginatedProducts = computed(() => {
  return filteredProducts.value.slice(startIndex.value, endIndex.value)
})

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Watch filters to reset page
const resetPagination = () => {
  currentPage.value = 1
}

// Stock status helpers
const getStockStatus = (stock) => {
  if (stock === 0) return 'Out of Stock'
  if (stock <= 20) return `${stock} Low Stock`
  return `${stock} In Stock`
}

const getStockDotColor = (stock) => {
  if (stock === 0) return 'bg-red-500'
  if (stock <= 20) return 'bg-orange-500'
  return 'bg-green-500'
}

const getStockTextColor = (stock) => {
  if (stock === 0) return 'text-red-600'
  if (stock <= 20) return 'text-orange-600'
  return 'text-green-600'
}

const getCategoryColor = (category) => {
  const colors = {
    electronics: 'bg-blue-100 text-blue-800',
    groceries: 'bg-purple-100 text-purple-800',
    apparel: 'bg-pink-100 text-pink-800',
    beauty: 'bg-pink-100 text-pink-800',
    furniture: 'bg-yellow-100 text-yellow-800',
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

const truncateDescription = (description) => {
  if (!description) return ''
  return description.length > 60 ? description.substring(0, 60) + '...' : description
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/48?text=No+Image'
}

const viewProduct = (id) => {
  router.push(`/products/${id}`)
}

const goToAddProduct = () => {
  router.push('/products/new')
}
</script>
