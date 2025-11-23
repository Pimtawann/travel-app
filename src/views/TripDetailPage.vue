<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import PhotoGallery from '../components/PhotoGallery.vue'
import { tripsAPI } from '../api.js'
import { trio } from 'ldrs'

trio.register()

const route = useRoute()
const trip = ref(null)
const isLoading = ref(false)
const error = ref(null)

const mapUrl = computed(() => {
  if (!trip.value?.latitude || !trip.value?.longitude) return null
  return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${trip.value.latitude},${trip.value.longitude}&zoom=15`
})

onMounted(async () => {
  await fetchTrip()
})

const fetchTrip = async () => {
  try {
    isLoading.value = true
    error.value = null
    const data = await tripsAPI.getTripById(route.params.id)
    trip.value = data
  } catch (err) {
    console.error('Failed to load trip:', err)
    error.value = 'Failed to load trip details'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="trip-detail-page">
    <Navbar />

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
      <div class="text-center">
        <l-trio size="40" speed="1.3" color="#38220f"></l-trio>
        <p class="mt-4 text-secondary text-2xl">Loading trip details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center min-h-[50vh]">
      <div class="text-center">
        <p class="text-2xl md:text-3xl font-semibold text-red-600">{{ error }}</p>
      </div>
    </div>

    <!-- Trip Content -->
    <div v-else-if="trip" class="max-w-6xl mx-auto px-6 md:px-8 py-8">
      <!-- Photo Gallery -->
      <PhotoGallery v-if="trip.photos && trip.photos.length > 0" :photos="trip.photos" :title="trip.title"
        class="mb-8" />

      <!-- Trip Info -->
      <div class="space-y-6">
        <!-- Title -->
        <h1 class="text-4xl md:!text-4xl font-semibold text-primary">
          {{ trip.title }}
        </h1>

        <!-- Tags -->
        <div v-if="trip.tags && trip.tags.length > 0" class="flex flex-wrap gap-2">
          <span v-for="tag in trip.tags" :key="tag"
            class="!px-3 !py-1 !bg-background !border-2 !border-primary !text-primary !rounded-lg !text-sm !font-medium">
            {{ tag }}
          </span>
        </div>

        <!-- Author & Created Date -->
        <div v-if="trip.author" class="flex items-center gap-6 text-secondary flex-wrap">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="font-medium">By {{ trip.author.displayName || trip.author.email }}</span>
          </div>
          <template v-if="trip.createdAt">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span class="font-medium">{{ new Date(trip.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
            </div>
          </template>
        </div>

        <!-- Description & Location Grid -->
        <div class="flex flex-col md:flex-row gap-6 mt-6">
          <!-- Description -->
          <div v-if="trip.description" class="w-full md:flex-[0_0_calc(70%-0.75rem)]">
            <div class="prose prose-lg max-w-none">
              <p class="text-xl text-secondary whitespace-pre-line text-justify indent-10">{{ trip.description }}</p>
            </div>
          </div>

          <!-- Google Map -->
          <div v-if="trip.latitude && trip.longitude" class="w-full md:flex-[0_0_calc(30%-0.75rem)]">
            <div class="sticky top-24">
              <h2 class="text-2xl font-semibold text-primary mb-4">Location</h2>
              <div class="rounded-2xl overflow-hidden shadow-xl border-2 border-cream-3">
                <!-- Google Maps Embed - Simple version without API key -->
                <iframe width="100%" height="400" frameborder="0" style="border:0"
                  :src="`https://maps.google.com/maps?q=${trip.latitude},${trip.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`"
                  allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
