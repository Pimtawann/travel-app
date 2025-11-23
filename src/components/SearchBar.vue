<template>
  <div class="search-bar max-w-3xl mx-auto">
    <!-- Input Container -->
    <div class="relative flex items-center gap-3 bg-white rounded-xl md:rounded-2xl shadow-lg border-2 border-cream-3 p-3 md:p-2 hover:border-secondary transition-colors duration-300">
      <div class="hidden md:block pl-4 text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search destinations, cities, countries, or tags..."
        class="flex-1 px-3 md:px-4 md:py-4 text-base md:text-lg text-primary placeholder-secondary/50 bg-transparent outline-none"
        @keyup.enter="handleSearch"
      />

      <!-- Search Button (Desktop only) -->
      <button
        @click="handleSearch"
        class="hidden md:block px-8 py-3 bg-primary text-background rounded-xl font-semibold text-lg hover:bg-secondary transition-all duration-300 whitespace-nowrap"
      >
        Search
      </button>
    </div>

    <!-- Search Button (Mobile only) -->
    <button
      @click="handleSearch"
      class="md:hidden w-full mt-3 px-6 !py-3 bg-primary text-background rounded-lg font-semibold text-base hover:bg-secondary transition-all duration-300"
    >
      Search
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const searchQuery = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const handleSearch = () => {
  emit('search', searchQuery.value.trim())
}
</script>

<style scoped>
</style>
