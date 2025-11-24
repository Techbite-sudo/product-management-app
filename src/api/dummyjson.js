import axios from 'axios'

const API_BASE_URL = 'https://dummyjson.com'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
// Note: DummyJSON may use different token formats, adjust if needed
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      // DummyJSON typically uses Bearer token format
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (username, password) => {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    })
    return response.data
  },
}

// Products API
export const productsAPI = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/products', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await apiClient.get(`/products/${id}`)
    return response.data
  },

  add: async (product) => {
    const response = await apiClient.post('/products/add', product)
    return response.data
  },

  update: async (id, product) => {
    const response = await apiClient.put(`/products/${id}`, product)
    return response.data
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/products/${id}`)
    return response.data
  },
}

export default apiClient

