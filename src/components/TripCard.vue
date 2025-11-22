<template>
  <div class="trip-card bg-white rounded-2xl shadow-lg border-2 border-cream-3 overflow-hidden hover:shadow-xl transition-all duration-300 h-auto md:h-72">
    <div class="flex flex-col md:flex-row h-full">
      <!-- Photo Section -->
      <router-link :to="`/trip/${trip.id}`" class="md:w-2/5 flex-shrink-0">
        <div v-if="trip.photos && trip.photos.length > 0" class="relative h-64 md:h-full bg-cream-2 cursor-pointer group overflow-hidden">
          <img
            :src="trip.photos[0]"
            :alt="trip.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            @error="handleImageError"
          />
        </div>
        <div v-else class="h-64 md:h-full bg-cream-2 flex items-center justify-center cursor-pointer group">
          <svg class="w-20 h-20 text-secondary group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
      </router-link>

      <!-- Content Section -->
      <div class="p-6 md:w-3/5 flex flex-col justify-between">
        <div class="flex-1 overflow-hidden">
          <!-- Title -->
          <router-link :to="`/trip/${trip.id}`">
            <h3 class="text-2xl md:text-2xl font-semibold text-primary mb-3 line-clamp-2 hover:text-secondary transition-colors duration-200 cursor-pointer">
              {{ trip.title }}
            </h3>
          </router-link>

          <!-- Description -->
          <p v-if="trip.description" class="text-secondary mb-4 line-clamp-3">
            {{ trip.description }}
          </p>
        </div>

        <!-- Tags -->
        <div v-if="trip.tags && trip.tags.length > 0" class="flex flex-wrap gap-2">
          <button
            v-for="tag in trip.tags"
            :key="tag"
            @click.stop="handleTagClick(tag)"
            class="!px-3 !py-1 !bg-background !border-2 !border-primary !text-primary !rounded-lg !text-sm !font-medium hover:!bg-primary hover:!text-white !transition-colors !duration-200 !cursor-pointer"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  trip: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['tagClick'])

const handleTagClick = (tag) => {
  emit('tagClick', tag)
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
