<template>
  <Transition name="toast">
    <div
      v-if="show"
      class="fixed bottom-6 right-6 z-50 max-w-md"
      role="alert">
      <div
        :class="[
          'rounded-xl shadow-2xl border-2 p-4 flex items-center gap-3',
          typeClasses
        ]">
        <!-- Icon -->
        <div class="flex-shrink-0">
          <!-- Success Icon -->
          <svg v-if="type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <!-- Error Icon -->
          <svg v-else-if="type === 'error'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <!-- Info Icon -->
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        <!-- Message -->
        <div class="flex-1">
          <p class="font-semibold text-sm">{{ message }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'info'].includes(value)
  }
})

const emit = defineEmits(['close'])

const typeClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-50 border-green-500 text-green-700'
    case 'error':
      return 'bg-red-50 border-red-500 text-red-700'
    case 'info':
      return 'bg-blue-50 border-blue-500 text-blue-700'
    default:
      return 'bg-green-50 border-green-500 text-green-700'
  }
})

const close = () => {
  emit('close')
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
