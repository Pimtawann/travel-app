<template>
  <div class="flex min-h-screen bg-background">
    <!-- Sidebar -->
    <Sidebar />

    <main class="flex-1 p-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-2">My Trips</h1>
        <p class="text-xl text-secondary">Manage and view all your travel adventures</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
        <div class="text-center">
          <l-trio size="40" speed="1.3" color="#38220f"></l-trio>
          <p class="mt-4 text-secondary text-2xl">Loading your trips...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex justify-center items-center min-h-[50vh]">
        <div class="text-center">
          <svg class="w-16 h-16 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h3 class="text-2xl md:text-3xl font-semibold text-primary mb-2">Unable to load your trips</h3>
          <p class="text-secondary mb-6">Please try refreshing the page or logging in again.</p>
        </div>
      </div>

      <!-- Trips Table -->
      <div v-else class="bg-white rounded-2xl shadow-lg border-2 border-cream-3 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-cream-2 border-b-2 border-cream-3">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-primary">Title</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-primary">Tags</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-primary">Created Date</th>
                <th class="px-6 py-3 text-center text-sm font-semibold text-primary"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-cream-3">
              <tr v-for="trip in myTrips" :key="trip.id">

                <!-- Title -->
                <td class="px-6 py-4">
                  <p class="font-semibold text-primary">{{ trip.title }}</p>
                </td>

                <!-- Tags -->
                <td class="px-6 py-4">
                  <div v-if="trip.tags && trip.tags.length > 0" class="flex flex-wrap gap-1">
                    <span v-for="tag in trip.tags.slice(0, 2)" :key="tag"
                      class="px-2 py-1 bg-background border border-primary text-primary rounded-lg text-xs font-medium">
                      {{ tag }}
                    </span>
                    <span v-if="trip.tags.length > 2" class="px-2 py-1 text-secondary text-xs font-medium">
                      +{{ trip.tags.length - 2 }}
                    </span>
                  </div>
                  <span v-else class="text-secondary text-sm">No tags</span>
                </td>

                <!-- Created Date -->
                <td class="px-6 py-4">
                  <div v-if="trip.createdAt" class="flex items-center gap-2 text-secondary text-sm">
                    <span>{{ formatDate(trip.createdAt) }}</span>
                  </div>
                  <span v-else class="text-secondary text-sm">-</span>
                </td>

                <td class="px-6 py-4">
                  <div class="flex justify-center gap-3">
                    <!-- Edit Icon -->
                    <button @click="goToEditTrip(trip.id)"
                      class="!p-2 !text-primary !bg-cream-4 hover:!bg-cream-2 rounded-lg transition-colors duration-200"
                      title="Edit trip">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                        </path>
                      </svg>
                    </button>

                    <!-- Delete Icon -->
                    <button @click="openDeleteModal(trip)"
                      class="!p-2 !text-red-600 !bg-cream-4 hover:!bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete trip">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div v-if="myTrips.length === 0" class="text-center py-12">
            <h3 class="text-2xl font-semibold text-primary mb-2">No trips</h3>
            <p class="text-secondary mb-6">Start creating your travel adventures!</p>
            <router-link to="/create-trip"
              class="inline-block px-6 py-3 bg-primary text-background rounded-lg hover:bg-secondary transition-colors duration-200 font-semibold">
              Create Your First Trip
            </router-link>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      title="Delete Trip Confirmation"
      message="Are you sure you want to delete "
      :item-name="tripToDelete?.title"
      message-after="?"
      warning="This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      loading-text="Deleting..."
      :is-loading="isDeleting"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.vue'
import { useAuth } from '../composables/useAuth.js'
import { tripsAPI } from '../api.js'
import { trio } from 'ldrs'

trio.register()

const router = useRouter()
const { isAuthenticated } = useAuth()
const myTrips = ref([])
const isLoading = ref(false)
const error = ref(null)
const showDeleteModal = ref(false)
const tripToDelete = ref(null)
const isDeleting = ref(false)

onMounted(async () => {
  // Check if user is authenticated
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  await fetchMyTrips()
})

const fetchMyTrips = async () => {
  try {
    isLoading.value = true
    error.value = null

    const data = await tripsAPI.getMyTrips()
    myTrips.value = data
  } catch (err) {
    console.error('Failed to load trips:', err)
    error.value = 'Unable to load your trips'
  } finally {
    isLoading.value = false
  }
}

const goToEditTrip = (tripId) => {
  router.push(`/edit-trip/${tripId}`)
}

const openDeleteModal = (trip) => {
  tripToDelete.value = trip
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  tripToDelete.value = null
}

const confirmDelete = async () => {
  if (!tripToDelete.value) return

  try {
    isDeleting.value = true
    await tripsAPI.deleteTrip(tripToDelete.value.id)

    // Remove trip from list
    myTrips.value = myTrips.value.filter(trip => trip.id !== tripToDelete.value.id)

    // Close modal
    closeDeleteModal()
  } catch (err) {
    console.error('Failed to delete trip:', err)
    // Close modal and show error in a user-friendly way
    closeDeleteModal()
    error.value = 'Failed to delete trip. Please try again.'

    // Clear error after 5 seconds
    setTimeout(() => {
      error.value = null
    }, 5000)
  } finally {
    isDeleting.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
