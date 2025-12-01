<template>
  <nav class="w-full bg-cream-1 border-b border-primary">
    <div class="max-w-[1800px] mx-auto px-6 md:px-30 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div>
          <router-link to="/"
            class="text-4xl md:text-6xl font-bold text-primary cursor-pointer transition-colors duration-200">
            Travvy.
          </router-link>
        </div>

        <!-- Not Logged In -->
        <div v-if="!isAuthenticated">
          <router-link to="/login">
            <button
              class="px-6 py-2 md:w-[140px] bg-primary text-background rounded-xl font-medium text-xl hover:bg-secondary transition-colors duration-200 cursor-pointer">
              Login
            </button>
          </router-link>
        </div>

        <!-- Logged In -->
        <div v-else class="flex items-center md:gap-8">
          <!-- User Menu -->
          <div class="relative" ref="dropdownRef">
            <div @click="toggleDropdown"
              class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200">
              <span class="font-semibold text-primary text-lg md:text-xl">{{ user?.displayName }}</span>
              <svg class="w-4 h-4 text-primary transition-transform duration-200"
                :class="{ 'rotate-180': showDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>

            <!-- Dropdown Menu -->
            <div v-if="showDropdown"
              class="absolute -right-3 mt-2 w-40 md:w-50 bg-white rounded-xl shadow-2xl border-2 border-cream-3 py-2 z-50">
              <router-link to="/my-trips"
                class="flex items-center gap-3 px-4 py-3 hover:bg-cream-1 transition-colors cursor-pointer"
                @click="closeDropdown">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
                  </path>
                </svg>
                <span class="font-medium text-primary">My Trips</span>
              </router-link>

              <router-link to="/create-trip"
                class="md:hidden flex items-center gap-3 px-4 py-3 hover:bg-cream-1 transition-colors cursor-pointer"
                @click="closeDropdown">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <span class="font-medium text-primary">Create Trip</span>
              </router-link>

              <router-link to="/profile"
                class="flex items-center gap-3 px-4 py-3 hover:bg-cream-1 transition-colors cursor-pointer"
                @click="closeDropdown">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span class="font-medium text-primary">Profile</span>
              </router-link>

              <div class="border-t border-cream-3 my-2"></div>

              <button @click="handleLogout"
                class="w-full flex items-center gap-3 px-4 py-3 !bg-white !hover:bg-cream-1 transition-colors cursor-pointer text-left">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                  </path>
                </svg>
                <span class="font-medium text-primary">Logout</span>
              </button>
            </div>
          </div>
          <!-- Create Button -->
          <div>
            <router-link to="/create-trip">
              <button
                class="hidden md:block bg-primary text-background rounded-xl font-medium text-lg hover:bg-secondary transition-colors duration-200 cursor-pointer">
                + Create Trip
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { user, isAuthenticated, initAuth, clearUser } = useAuth()
const showDropdown = ref(false)
const dropdownRef = ref(null)

// Initialize auth on mount
onMounted(() => {
  initAuth()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

const handleLogout = () => {
  clearUser()
  closeDropdown()
  router.push('/')
}
</script>

<style scoped></style>
