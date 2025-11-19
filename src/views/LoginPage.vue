<template>
  <div class="login-page min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full">
      <!-- Logo/Brand -->
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
            class="w-full px-6 py-3 bg-primary text-background rounded-xl font-semibold text-lg hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center text-secondary">
          Don't have an account?
          <a
            @click.prevent="goToRegister"
            href="#"
            class="text-primary font-semibold hover:text-secondary transition-colors duration-200"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const loginError = ref('')

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

const handleLogin = () => {
  // Clear previous login error
  loginError.value = ''

  validateEmail()
  validatePassword()

  if (!emailError.value && !passwordError.value) {
    console.log('Login:', { email: email.value, password: password.value })

    setTimeout(() => {
      loginError.value = 'Invalid email or password. Please try again.'
    }, 500)
  }
}

const goToRegister = () => {
  console.log('Navigate to register')
}
</script>

<style scoped>
</style>
