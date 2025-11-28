<template>
  <aside class="w-64 h-screen bg-cream-1 border-r border-primary sticky top-0 flex flex-col">
    <!-- Logo -->
    <div class="p-6">
      <h1 class="text-4xl font-bold text-primary hover:text-secondary transition-colors duration-200">
        Travvy.
      </h1>
    </div>

    <nav class="flex-1 py-6">
      <ul class="space-y-2">
        <!-- My Trips -->
        <li>
          <router-link to="/my-trips"
            class="flex items-center gap-3 px-6 py-3 text-primary bg-cream-2 hover:bg-cream-4 transition-colors duration-200 group"
            active-class="bg-cream-4 border-l-8 border-primary">
            <svg class="w-6 h-6 text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
              </path>
            </svg>
            <span class="font-medium text-lg">My Trips</span>
          </router-link>
        </li>

        <!-- Create Trip -->
        <li>
          <router-link to="/create-trip"
            class="flex items-center gap-3 px-6 py-3 text-primary bg-cream-2 hover:bg-cream-4 transition-colors duration-200 group"
            active-class="bg-background border-l-8 border-primary">
            <svg class="w-6 h-6 text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span class="font-medium text-lg">Crate Trip</span>
          </router-link>
        </li>

        <!-- Profile -->
        <li>
          <router-link to="/profile"
            class="flex items-center gap-3 px-6 py-3 text-primary bg-cream-2 hover:bg-cream-4 transition-colors duration-200 group"
            active-class="bg-background border-l-8 border-primary">
            <svg class="w-6 h-6 text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="font-medium text-lg">Profile</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="py-10 space-y-2">
      <!-- Homepage -->
      <router-link to="/"
        class="w-full flex items-center gap-3 px-6 py-3 text-primary bg-cream-2 hover:bg-cream-4 transition-colors duration-200 group">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
          </path>
        </svg>
        <span class="font-medium text-lg">Homepage</span>
      </router-link>

      <!-- Logout -->
      <button @click="handleLogout"
        class="w-full flex items-center gap-3 !px-6 !py-3 text-primary transition-colors duration-200 group">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
          </path>
        </svg>
        <span class="font-medium text-lg">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { clearUser } = useAuth()

const handleLogout = () => {
  clearUser()
  router.push('/')
}
</script>

<style scoped></style>
