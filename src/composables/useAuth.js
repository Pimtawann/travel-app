import { ref, computed } from 'vue'
import { tokenService } from '../api.js'

const user = ref(null)

export function useAuth() {
  const isAuthenticated = computed(() => !!tokenService.getToken())

  const setUser = (userData) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
    tokenService.removeToken()
  }

  const initAuth = () => {
    const token = tokenService.getToken()
    if (token) {
      // Decode token to get user info (JWT token contains user data)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        // Prioritize localStorage displayName over token payload
        // This ensures updated displayName persists across page reloads
        const displayName = localStorage.getItem('displayName') || payload.displayName || payload.sub
        user.value = {
          email: payload.sub,
          displayName: displayName
        }
      } catch (error) {
        console.error('Failed to decode token:', error)
        clearUser()
      }
    }
  }

  return {
    user,
    isAuthenticated,
    setUser,
    clearUser,
    initAuth
  }
}
