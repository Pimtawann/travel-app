<template>
  <div class="register-page min-h-screen flex items-center justify-center px-8">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-primary mb-2">Travvy.</h1>
        <p class="text-lg text-secondary">Create your account</p>
      </div>

      <!-- Register Form -->
      <div class="bg-white rounded-2xl shadow-xl border-2 border-cream-3 p-8">
        <h2 class="flex justify-center text-2xl font-bold text-primary mb-6">Register</h2>

        <form @submit.prevent="handleRegister" class="space-y-3">
          <!-- Username Input -->
          <div>
            <label for="username" class="block text-sm font-semibold text-primary mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              v-model="username"
              @blur="validateUsername"
              @input="clearUsernameError"
              placeholder="Enter your username"
              :class="[
                'w-full px-4 py-3 border-2 rounded-xl text-primary placeholder-secondary/50 outline-none transition-colors duration-300',
                usernameError ? 'border-red-500 focus:border-red-500' : 'border-cream-3 focus:border-secondary'
              ]"
            />
            <div class="h-6 mt-1">
              <p v-if="usernameError" class="text-sm text-red-500">
                {{ usernameError }}
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
          </div>

          <button
            type="submit"
            class="w-full px-6 py-3 bg-primary text-background rounded-xl font-semibold text-lg hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Register
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

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const usernameError = ref('')
const emailError = ref('')
const passwordError = ref('')

// Simulate existing users in database
const existingUsernames = ['admin', 'user123', 'testuser']
const existingEmails = ['admin@example.com', 'user@test.com']

// Username validation
const validateUsername = () => {
  if (!username.value) {
    usernameError.value = 'Username is required'
  } else if (username.value.length < 3) {
    usernameError.value = 'Must be at least 3 characters'
  } else if (username.value.length > 20) {
    usernameError.value = 'Must not exceed 20 characters'
  } else if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
    usernameError.value = 'Only letters, numbers, and underscores'
  } else {
    usernameError.value = ''
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
const clearUsernameError = () => {
  if (usernameError.value) {
    usernameError.value = ''
  }
}

const clearEmailError = () => {
  if (emailError.value) {
    emailError.value = ''
  }
}

const clearPasswordError = () => {
  if (passwordError.value) {
    passwordError.value = ''
  }
}

const handleRegister = () => {
  // Validate all fields (basic validation)
  validateUsername()
  validateEmail()
  validatePassword()

  // Check for duplicates for fields that passed basic validation
  setTimeout(() => {
    // Check username duplicate only if passed basic validation
    if (!usernameError.value && username.value) {
      if (existingUsernames.includes(username.value.toLowerCase())) {
        usernameError.value = 'Username already taken'
      }
    }

    // Check email duplicate only if passed basic validation
    if (!emailError.value && email.value) {
      if (existingEmails.includes(email.value.toLowerCase())) {
        emailError.value = 'Email already registered'
      }
    }

    // Only proceed if ALL fields are valid (after duplicate check)
    setTimeout(() => {
      if (!usernameError.value && !emailError.value && !passwordError.value) {
        console.log('Registration successful! Redirecting to login...')
        router.push('/login')
      }
    }, 100)
  }, 500)
}
</script>

<style scoped>
</style>
