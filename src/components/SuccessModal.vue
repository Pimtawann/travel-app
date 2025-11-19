<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-primary/20 backdrop-blur-sm"></div>

    <!-- Modal -->
    <div class="relative bg-white rounded-2xl shadow-2xl border-2 border-cream-3 p-8 max-w-md mx-4 animate-fade-in">
      <div class="text-center">
        <!-- Success Icon -->
        <div class="mx-auto w-16 h-16 bg-tertiary/20 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <!-- Message -->
        <h3 class="text-2xl font-bold text-primary mb-2">Registration Successful!</h3>
        <p class="text-secondary">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: 'Logging you in...'
  }
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>
