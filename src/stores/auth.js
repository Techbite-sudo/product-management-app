import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '@/api/dummyjson'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token') || null)
  const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'))

  const isAuthenticated = computed(() => !!token.value)

  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password)
      
      // DummyJSON returns accessToken, not token
      if (response.accessToken) {
        token.value = response.accessToken
        user.value = response
        
        // Persist to localStorage
        localStorage.setItem('auth_token', response.accessToken)
        localStorage.setItem('auth_user', JSON.stringify(response))
        
        return { success: true }
      } else {
        return { success: false, error: 'No access token received' }
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed. Please check your credentials.',
      }
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    router.push('/login')
  }

  const restoreSession = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')
    
    if (savedToken) {
      token.value = savedToken
      if (savedUser) {
        user.value = JSON.parse(savedUser)
      }
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    restoreSession,
  }
})

