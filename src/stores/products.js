import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productsAPI } from '@/api/dummyjson'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const currentProduct = ref(null)

  const fetchProducts = async (params = {}) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await productsAPI.getAll(params)
      products.value = response.products || []
      return { success: true, data: response }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch products'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchProductById = async (id) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Check if product is already in store
      const existingProduct = products.value.find(p => p.id === parseInt(id))
      if (existingProduct) {
        currentProduct.value = existingProduct
        isLoading.value = false
        return { success: true, data: existingProduct }
      }

      // Fetch from API
      const response = await productsAPI.getById(id)
      currentProduct.value = response
      
      // Update in products array if exists
      const index = products.value.findIndex(p => p.id === parseInt(id))
      if (index !== -1) {
        products.value[index] = response
      }
      
      return { success: true, data: response }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch product'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const addProduct = async (productData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await productsAPI.add(productData)
      products.value.unshift(response) // Add to beginning of array
      return { success: true, data: response }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to add product'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const updateProduct = async (id, productData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await productsAPI.update(id, productData)
      
      // Update in products array
      const index = products.value.findIndex(p => p.id === parseInt(id))
      if (index !== -1) {
        products.value[index] = response
      }
      
      // Update current product if it's the one being updated
      if (currentProduct.value?.id === parseInt(id)) {
        currentProduct.value = response
      }
      
      return { success: true, data: response }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update product'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const deleteProduct = async (id) => {
    isLoading.value = true
    error.value = null
    
    try {
      await productsAPI.delete(id)
      
      // Remove from products array
      products.value = products.value.filter(p => p.id !== parseInt(id))
      
      // Clear current product if it's the one being deleted
      if (currentProduct.value?.id === parseInt(id)) {
        currentProduct.value = null
      }
      
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete product'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    error,
    currentProduct,
    fetchProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  }
})

