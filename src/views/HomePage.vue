<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import SearchBar from '../components/SearchBar.vue'
import TripCard from '../components/TripCard.vue'
import { tripsAPI } from '../api.js'
import { trio } from 'ldrs'

trio.register()

const searchQuery = ref('')
const trips = ref([])
const filteredTrips = ref([])
const isLoading = ref(false)

onMounted(async () => {
  await fetchTrips()
})

const fetchTrips = async () => {
  try {
    isLoading.value = true
    const data = await tripsAPI.getAllTrips()
    trips.value = data
    filteredTrips.value = data
  } catch (error) {
    console.error('Failed to load trips:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSearch = async (query) => {
  if (!query || query.trim() === '') {
    filteredTrips.value = trips.value
    return
  }

  try {
    isLoading.value = true
    const data = await tripsAPI.searchTrips(query)
    filteredTrips.value = data
  } catch (error) {
    console.error('Failed to search trips:', error)
  } finally {
    isLoading.value = false
  }
}

const handleTagClick = (tag) => {
  searchQuery.value = tag
  handleSearch(tag)
}
</script>

<template>
  <div class="home-page">
    <Navbar />

    <!-- Welcome Section -->
    <section class="pt-8 md:pt-14 md:pb-4">
      <div class="max-w-[1800px] mx-auto px-6 md:px-30">
        <div class="text-center max-w-4xl mx-auto">
          <p class="text-4xl md:text-7xl font-bold text-primary mb-4 leading-tight">
            Welcome to <span class="text-secondary">Travvy.</span>
          </p>

          <p class="text-xl md:text-3xl text-secondary mb-8">
            Let's explore wonderful places together.
          </p>

          <!-- Search Bar -->
          <div class="mt-8">
            <SearchBar v-model="searchQuery" @search="handleSearch" />
          </div>
        </div>
      </div>
    </section>

    <!-- Trips Section -->
    <section class="py-10 md:pb-16 bg-cream-1">
      <div class="max-w-[1800px] mx-auto px-6 md:px-30">
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-12">
          <l-trio size="40" speed="1.3" color="#38220f"></l-trio>
          <p class="mt-4 text-secondary text-2xl">Loading trips...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredTrips.length === 0" class="text-center py-12">
          <p class="text-2xl md:text-3xl font-semibold text-secondary">No trips found</p>
        </div>

        <!-- Trips List -->
        <div v-else class="max-w-5xl mx-auto space-y-6">
          <TripCard
            v-for="trip in filteredTrips"
            :key="trip.id"
            :trip="trip"
            @tag-click="handleTagClick"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
