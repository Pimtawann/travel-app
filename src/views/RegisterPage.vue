<template>
  <div class="register-page min-h-screen flex items-center justify-center px-8">
    <!-- Success Modal -->
    <SuccessModal :show="showSuccessModal" message="Logging you in..." />

    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-primary mb-2">Travvy.</h1>
        <p class="text-lg text-secondary">Create your account</p>
      </div>

      <!-- Register Form -->
      <div class="bg-white rounded-2xl shadow-xl border-2 border-cream-3 p-8">
        <h2 class="flex justify-center text-2xl font-bold text-primary mb-6">Register</h2>

        <form @submit.prevent="handleRegister" class="space-y-2">
          <!-- Display Name Input -->
          <div>
            <label for="displayName" class="block text-sm font-semibold text-primary mb-2">
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              v-model="displayName"
              @blur="validateDisplayName"
              @input="clearDisplayNameError"
              placeholder="Enter your display name"
              :class="[
                'w-full px-4 py-3 border-2 rounded-xl text-primary placeholder-secondary/50 outline-none transition-colors duration-300',
                displayNameError ? 'border-red-500 focus:border-red-500' : 'border-cream-3 focus:border-secondary'
              ]"
            />
            <div class="h-6 mt-1">
              <p v-if="displayNameError" class="text-sm text-red-500">
                {{ displayNameError }}
              </p>
            </div>
          </div>

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
            <!-- Register Error Message -->
            <div class="h-6 mt-1">
              <p v-if="registerError" class="text-sm text-red-500 text-center">
                {{ registerError }}
              </p>
            </div>
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
            {{ isSubmitting ? 'Registering...' : 'Register' }}
          </button>
        </form>

        <div class="mt-6 text-center text-secondary">
          Already have an account?
          <router-link
            to="/login"
            class="text-primary font-semibold hover:text-secondary transition-colors duration-200"
          >
            Login
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
import SuccessModal from '../components/SuccessModal.vue'

const router = useRouter()
const { setUser } = useAuth()
const displayName = ref('')
const email = ref('')
const password = ref('')
const displayNameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const registerError = ref('')
const isSubmitting = ref(false)
const showSuccessModal = ref(false)

// Display name validation
const validateDisplayName = () => {
  if (!displayName.value) {
    displayNameError.value = 'Display name is required'
  } else if (displayName.value.length < 3) {
    displayNameError.value = 'Must be at least 3 characters'
  } else if (displayName.value.length > 100) {
    displayNameError.value = 'Must not exceed 100 characters'
  } else {
    displayNameError.value = ''
  }
}

// Email validation
const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email.value) {
    emailError.value = 'Email is required'
  } else if (!emailPattern.test(email.value)) {
    emailError.value = 'Invalid email format'
  } else {
    emailError.value = ''
  }
}

// Password validation
const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'Password is required'
  } else if (password.value.length < 6) {
    passwordError.value = 'Must be at least 6 characters'
  } else {
    passwordError.value = ''
  }
}

// Clear errors when user starts typing
const clearDisplayNameError = () => {
  if (displayNameError.value) {
    displayNameError.value = ''
  }
  if (registerError.value) {
    registerError.value = ''
  }
}

const clearEmailError = () => {
  if (emailError.value) {
    emailError.value = ''
  }
  if (registerError.value) {
    registerError.value = ''
  }
}

const clearPasswordError = () => {
  if (passwordError.value) {
    passwordError.value = ''
  }
  if (registerError.value) {
    registerError.value = ''
  }
}

const handleRegister = async () => {
  // Clear previous register error
  registerError.value = ''

  // Validate all fields
  validateDisplayName()
  validateEmail()
  validatePassword()

  // If any validation errors, don't proceed
  if (displayNameError.value || emailError.value || passwordError.value) {
    return
  }

  // Prevent multiple submissions
  if (isSubmitting.value) {
    return
  }

  try {
    isSubmitting.value = true

    // Call backend API to register
    await authAPI.register(email.value, password.value, displayName.value)

    // Show success modal
    showSuccessModal.value = true

    // Auto login (run in parallel with modal display)
    const token = await authAPI.login(email.value, password.value)

    // Save token and user data to localStorage
    tokenService.saveToken(token)
    localStorage.setItem('displayName', displayName.value)

    // Set user in auth state
    setUser({
      email: email.value,
      displayName: displayName.value
    })

    // Wait at least 1.5 seconds to show modal
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Redirect to homepage
    router.push('/')
  } catch (error) {
    console.error('Registration error:', error)
    const errorMessage = error.message || ''

    if (errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('already exists')) {
      emailError.value = 'This email is already registered. Please use a different email or try logging in.'
    } else {
      registerError.value = 'Registration failed. Please check your information and try again.'
    }
  } finally {
    isSubmitting.value = false
    showSuccessModal.value = false
  }
}
</script>

<style scoped>
</style>
