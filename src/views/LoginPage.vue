<template>
  <div class="login-page min-h-screen flex items-center justify-center px-8">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-primary mb-2">Travvy.</h1>
        <p class="text-lg text-secondary">Welcome back!</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-2xl shadow-xl border-2 border-cream-3 p-8">
        <h2 class="flex justify-center text-2xl font-bold text-primary mb-6">Login</h2>

        <form @submit.prevent="handleLogin" class="space-y-3">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-semibold text-primary mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              v-model="email"
              @blur="validateEmail"
              @input="clearEmailError"
              placeholder="Enter your email"
              :class="[
                'w-full px-4 py-3 border-2 rounded-xl text-primary placeholder-secondary/50 outline-none transition-colors duration-300',
                emailError ? 'border-red-500 focus:border-red-500' : 'border-cream-3 focus:border-secondary'
              ]"
            />
            <div class="h-6 mt-1">
              <p v-if="emailError" class="text-sm text-red-500">
                {{ emailError }}
              </p>
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-semibold text-primary mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              v-model="password"
              @blur="validatePassword"
              @input="clearPasswordError"
              placeholder="Enter your password"
              :class="[
                'w-full px-4 py-3 border-2 rounded-xl text-primary placeholder-secondary/50 outline-none transition-colors duration-300',
                passwordError ? 'border-red-500 focus:border-red-500' : 'border-cream-3 focus:border-secondary'
              ]"
            />
            <div class="h-6 mt-1">
              <p v-if="passwordError" class="text-sm text-red-500">
                {{ passwordError }}
              </p>
            </div>
            <!-- Login Error Message -->
            <div class="h-6 mt-1">
              <p v-if="loginError" class="text-sm text-red-500 text-center">
                {{ loginError }}
              </p>
            </div>
          </div>

          <div class="text-right">
            <a href="#" class="text-sm text-secondary hover:text-primary transition-colors duration-200">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            :class="[
              'w-full px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg',
              isSubmitting
                ? 'bg-secondary/50 text-background/70 cursor-not-allowed'
                : 'bg-primary text-background hover:bg-secondary hover:shadow-xl'
            ]"
          >
            {{ isSubmitting ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center text-secondary">
          Don't have an account?
          <router-link
            to="/register"
            class="text-primary font-semibold hover:text-secondary transition-colors duration-200"
          >
            Register
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI, tokenService } from '../api.js'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { setUser } = useAuth()
const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const loginError = ref('')
const isSubmitting = ref(false)

// Get redirect URL from query parameter
const redirectTo = router.currentRoute.value.query.redirect || '/'

// Email validation
const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email.value) {
    emailError.value = 'Email is required'
  } else if (!emailPattern.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
}

// Password validation
const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'Password is required'
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters long'
  } else {
    passwordError.value = ''
  }
}

// Clear error when user starts typing
const clearEmailError = () => {
  if (emailError.value) {
    emailError.value = ''
  }
  // Clear login error when user starts typing
  if (loginError.value) {
    loginError.value = ''
  }
}

const clearPasswordError = () => {
  if (passwordError.value) {
    passwordError.value = ''
  }
  // Clear login error when user starts typing
  if (loginError.value) {
    loginError.value = ''
  }
}

const handleLogin = async () => {
  // Clear previous login error
  loginError.value = ''

  validateEmail()
  validatePassword()

  // If any validation errors, don't proceed
  if (emailError.value || passwordError.value) {
    return
  }

  // Prevent multiple submissions
  if (isSubmitting.value) {
    return
  }

  try {
    isSubmitting.value = true

    const token = await authAPI.login(email.value, password.value)

    tokenService.saveToken(token)

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const displayName = payload.displayName || email.value

      if (payload.displayName) {
        localStorage.setItem('displayName', payload.displayName)
      }

      setUser({
        email: email.value,
        displayName: displayName
      })
    } catch (decodeError) {
      setUser({
        email: email.value,
        displayName: email.value
      })
    }

    // Success - redirect to original page or homepage
    router.push(redirectTo)
  } catch (error) {
    loginError.value = error.message || 'Invalid email or password. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
</style>
