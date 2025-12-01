<template>
  <div class="flex min-h-screen bg-background">
    <!-- Sidebar -->
    <Sidebar />

    <main class="flex-1 p-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-2">Create New Trip</h1>
        <p class="text-xl text-secondary">Share your travel adventure with the world</p>
      </div>

      <!-- Form -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg border-2 border-cream-3 p-8">
          <form @submit.prevent="handleSubmit" class="space-y-3">
            <!-- Title -->
            <div>
              <label for="title" class="block text-lg font-semibold text-primary mb-2">
                Title <span class="text-red-600">*</span>
              </label>
              <input
                id="title"
                type="text"
                v-model="formData.title"
                @input="errors.title = ''"
                placeholder="Enter trip title"
                :class="[
                  'w-full px-4 py-3 border-2 rounded-xl text-primary placeholder-secondary/50 outline-none transition-colors duration-300',
                  errors.title ? 'border-red-500 focus:border-red-500' : 'border-cream-3 focus:border-secondary'
                ]"
              />
              <p class="text-red-600 text-sm mt-1 h-5">{{ errors.title }}</p>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-lg font-semibold text-primary mb-2">
                Description <span class="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                @input="errors.description = ''"
                placeholder="Describe your trip..."
                rows="5"
                :class="[
                  'w-full px-4 py-3 border-2 rounded-xl text-primary placeholder-secondary/50 outline-none transition-colors duration-300 resize-none',
                  errors.description ? 'border-red-500 focus:border-red-500' : 'border-cream-3 focus:border-secondary'
                ]"
              ></textarea>
              <p class="text-red-600 text-sm mt-1 h-5">{{ errors.description }}</p>
            </div>

            <!-- Location (Google Places Autocomplete) -->
            <div>
              <label for="location" class="block text-lg font-semibold text-primary mb-2">
                Location <span class="text-red-600">*</span>
              </label>
              <input
                id="location"
                ref="locationInput"
                type="text"
                v-model="formData.locationName"
                @input="errors.location = ''"
                placeholder="Search for a place..."
                :class="[
                  'w-full px-4 py-3 border-2 rounded-xl text-primary placeholder-secondary/50 outline-none transition-colors duration-300',
                  errors.location ? 'border-red-500 focus:border-red-500' : 'border-cream-3 focus:border-secondary'
                ]"
              />
              <div class="h-5 mt-1">
                <p v-if="formData.latitude && formData.longitude" class="text-xs text-secondary">
                  Coordinates: {{ formData.latitude.toFixed(6) }}, {{ formData.longitude.toFixed(6) }}
                </p>
                <p v-else class="text-red-600 text-sm">{{ errors.location }}</p>
              </div>
            </div>

            <!-- Tags -->
            <div>
              <label class="block text-lg font-semibold text-primary mb-2">
                Tags <span class="text-red-600">*</span>
              </label>
              <div class="flex gap-2 mb-2">
                <input
                  v-model="tagInput"
                  @keypress.enter.prevent="addTag"
                  @input="errors.tags = ''"
                  type="text"
                  placeholder="Add a tag and press Enter"
                  :class="[
                    'flex-1 px-4 py-3 border-2 rounded-xl text-primary placeholder-secondary/50 outline-none transition-colors duration-300',
                    errors.tags && formData.tags.length === 0 ? 'border-red-500 focus:border-red-500' : 'border-cream-3 focus:border-secondary'
                  ]"
                />
                <button
                  type="button"
                  @click="addTag"
                  class="px-6 py-3 rounded-xl transition-colors duration-200 font-semibold">
                  Add
                </button>
              </div>
              <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2 mb-2">
                <span
                  v-for="(tag, index) in formData.tags"
                  :key="index"
                  class="px-3 py-1 bg-background text-primary rounded-lg text-sm font-medium flex items-center gap-2">
                  {{ tag }}
                  <button type="button" @click="removeTag(index)" class="!bg-background !pr-0 !text-red-500 hover:!text-red-300 focus:!outline-none">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </span>
              </div>
              <p class="text-red-600 text-sm mt-1 h-5">{{ errors.tags }}</p>
            </div>

            <!-- Photos -->
            <div>
              <label class="block text-lg font-semibold text-primary mb-2">
                Photo URLs <span class="text-red-600">*</span>
              </label>
              <div class="flex gap-2 mb-2">
                <input
                  v-model="photoInput"
                  @keypress.enter.prevent="addPhoto"
                  @input="errors.photos = ''"
                  type="url"
                  placeholder="Enter photo URL and press Enter"
                  :class="[
                    'flex-1 px-4 py-3 border-2 rounded-xl text-primary placeholder-secondary/50 outline-none transition-colors duration-300',
                    errors.photos && formData.photos.length === 0 ? 'border-red-500 focus:border-red-500' : 'border-cream-3 focus:border-secondary'
                  ]"
                />
                <button
                  type="button"
                  @click="addPhoto"
                  class="px-6 py-3 bg-secondary text-background rounded-xl hover:bg-primary transition-colors duration-200 font-semibold">
                  Add URL
                </button>
              </div>
              <div class="flex gap-2 mb-2">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleFileUpload"
                  class="hidden"
                />
                <button
                  type="button"
                  @click="$refs.fileInput.click()"
                  :disabled="isUploading"
                  class="w-full px-6 py-3 bg-cream-3 text-primary rounded-xl hover:bg-cream-4 transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {{ isUploading ? 'Uploading...' : 'Upload Photo from Device' }}
                </button>
              </div>
              <div v-if="formData.photos.length > 0" class="space-y-2 mb-2">
                <div
                  v-for="(photo, index) in formData.photos"
                  :key="index"
                  class="flex items-center gap-2 p-2 bg-cream-1 rounded-lg">
                  <img :src="photo" alt="Preview" class="w-16 h-16 object-cover rounded-lg" />
                  <p class="flex-1 text-sm text-secondary truncate">{{ photo }}</p>
                  <button type="button" @click="removePhoto(index)" class="!bg-background !text-red-500 hover:!text-red-300 focus:!outline-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <p class="text-red-600 text-sm mt-1 h-5">{{ errors.photos }}</p>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="p-4 bg-red-50 border-2 border-red-500 rounded-xl">
              <p class="text-red-700 font-semibold">{{ error }}</p>
            </div>

            <div class="flex gap-4">
              <button
                type="button"
                @click="goBack"
                class="flex-1 px-6 py-3 border-2 !bg-cream-3 !border-cream-3 !text-primary rounded-xl hover:!bg-cream-2 transition-colors duration-200 font-semibold">
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex-1 px-6 py-3 bg-primary text-background rounded-xl hover:bg-secondary transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isSubmitting ? 'Creating...' : 'Create Trip' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <!-- Toast Notification -->
    <Toast
      :show="showToast"
      :message="toastMessage"
      :type="toastType"
      @close="closeToast"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import Toast from '../components/Toast.vue'
import { useAuth } from '../composables/useAuth.js'
import { tripsAPI, fileAPI } from '../api.js'

const router = useRouter()
const { isAuthenticated } = useAuth()

const formData = ref({
  title: '',
  description: '',
  locationName: '',
  latitude: null,
  longitude: null,
  tags: [],
  photos: []
})

const tagInput = ref('')
const photoInput = ref('')
const error = ref('')
const isSubmitting = ref(false)
const isUploading = ref(false)
const locationInput = ref(null)
const fileInput = ref(null)
let autocomplete = null

// Field errors
const errors = ref({
  title: '',
  description: '',
  location: '',
  tags: '',
  photos: ''
})

// Toast state
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

onMounted(async () => {
  // Check if user is authenticated
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  // Initialize Google Places Autocomplete
  initAutocomplete()
})

const initAutocomplete = () => {
  // Check if Google Maps API is loaded
  if (!window.google || !window.google.maps) {
    console.error('Google Maps API not loaded')
    return
  }

  // Initialize autocomplete
  autocomplete = new window.google.maps.places.Autocomplete(locationInput.value, {
    fields: ['name', 'geometry']
  })

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()

    if (place.geometry) {
      formData.value.locationName = place.name
      formData.value.latitude = place.geometry.location.lat()
      formData.value.longitude = place.geometry.location.lng()
    }
  })
}

const addTag = () => {
  if (tagInput.value.trim() && !formData.value.tags.includes(tagInput.value.trim())) {
    formData.value.tags.push(tagInput.value.trim())
    tagInput.value = ''
    errors.value.tags = ''
  }
}

const removeTag = (index) => {
  formData.value.tags.splice(index, 1)
}

const addPhoto = () => {
  if (photoInput.value.trim()) {
    formData.value.photos.push(photoInput.value.trim())
    photoInput.value = ''
    errors.value.photos = ''
  }
}

const removePhoto = (index) => {
  formData.value.photos.splice(index, 1)
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Please select an image file'
    return
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    error.value = 'File size must be less than 5MB'
    return
  }

  try {
    isUploading.value = true
    error.value = ''

    // Upload file and get URL
    const url = await fileAPI.uploadFile(file)

    // Add URL to photos array
    formData.value.photos.push(url)
    errors.value.photos = ''

    // Clear file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (err) {
    console.error('Failed to upload file:', err)
    error.value = 'Failed to upload photo. Please try again with a different file.'
  } finally {
    isUploading.value = false
  }
}

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    error.value = ''

    // Clear all previous errors
    errors.value = {
      title: '',
      description: '',
      location: '',
      tags: '',
      photos: ''
    }

    // Validate all required fields
    let hasError = false

    if (!formData.value.title.trim()) {
      errors.value.title = 'Required'
      hasError = true
    }

    if (!formData.value.description.trim()) {
      errors.value.description = 'Required'
      hasError = true
    }

    if (!formData.value.locationName.trim() || !formData.value.latitude || !formData.value.longitude) {
      errors.value.location = 'Required'
      hasError = true
    }

    if (formData.value.tags.length === 0) {
      errors.value.tags = 'Required'
      hasError = true
    }

    if (formData.value.photos.length === 0) {
      errors.value.photos = 'Required'
      hasError = true
    }

    // Stop if there are errors
    if (hasError) {
      isSubmitting.value = false
      return
    }

    // Prepare trip data
    const tripData = {
      title: formData.value.title,
      description: formData.value.description,
      latitude: formData.value.latitude,
      longitude: formData.value.longitude,
      tags: formData.value.tags,
      photos: formData.value.photos
    }

    // Create trip
    await tripsAPI.createTrip(tripData)

    // Show success toast
    showSuccessToast('Trip created successfully!')

    // Redirect to My Trips page after a short delay
    setTimeout(() => {
      router.push('/my-trips')
    }, 1500)
  } catch (err) {
    console.error('Failed to create trip:', err)
    error.value = 'Failed to create trip. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  router.back()
}

const showSuccessToast = (message) => {
  toastMessage.value = message
  toastType.value = 'success'
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const closeToast = () => {
  showToast.value = false
}
</script>
