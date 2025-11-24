import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/',
    redirect: '/products',
  },
  {
    path: '/products',
    name: 'ProductList',
    component: () => import('@/views/ProductList.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/products/new',
    name: 'AddProduct',
    component: () => import('@/views/AddProduct.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),
    meta: { requiresAuth: true },
  },
]

// Get base path from import.meta.env (set by Vite)
// This matches the base path in vite.config.js
// BASE_URL is automatically set by Vite based on the 'base' config option
const base = import.meta.env.BASE_URL

const router = createRouter({
  history: createWebHistory(base),
  routes,
})

// Route guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Restore session on first load
  if (!authStore.token) {
    authStore.restoreSession()
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
    return
  }

  // Check if route requires guest (logged out users only)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'ProductList' })
    return
  }

  next()
})

export default router

