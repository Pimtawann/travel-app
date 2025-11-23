<script setup>
import { ref } from 'vue'

const props = defineProps({
  photos: {
    type: Array,
    required: true,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  }
})

const currentPhotoIndex = ref(0)

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const previousPhoto = () => {
  if (!props.photos || props.photos.length === 0) return
  currentPhotoIndex.value = (currentPhotoIndex.value - 1 + props.photos.length) % props.photos.length
}

const nextPhoto = () => {
  if (!props.photos || props.photos.length === 0) return
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % props.photos.length
}
</script>

<template>
  <div v-if="photos && photos.length > 0" class="photo-gallery">
    <!-- Main Photo Carousel -->
    <div class="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl bg-cream-2">
      <img
        :src="photos[currentPhotoIndex]"
        :alt="`${title} - Photo ${currentPhotoIndex + 1}`"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />

      <!-- Previous Button -->
      <button
        v-if="photos.length > 1"
        @click="previousPhoto"
        class="absolute left-4 top-1/2 -translate-y-1/2 !bg-white/60 hover:!bg-white !text-primary !p-3 !rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <!-- Next Button -->
      <button
        v-if="photos.length > 1"
        @click="nextPhoto"
        class="absolute right-4 top-1/2 -translate-y-1/2 !bg-white/60 hover:!bg-white !text-primary !p-3 !rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      <!-- Photo Counter -->
      <div v-if="photos.length > 1" class="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
        {{ currentPhotoIndex + 1 }} / {{ photos.length }}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
