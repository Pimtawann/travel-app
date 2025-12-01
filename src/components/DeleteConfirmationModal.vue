<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-cream-2 bg-opacity-50 flex items-center justify-center z-50"
    @click.self="handleCancel">
    <div class="bg-white rounded-2xl shadow-2xl border-2 border-cream-3 p-8 max-w-md w-full mx-4">
      <h3 class="text-3xl font-semibold text-primary text-center mb-8">{{ title }}</h3>
      <div class="text-secondary text-center text-lg mb-8">
        <p class="text-secondary text-center">
          {{ message }}<span v-if="itemName" class="font-semibold text-primary">"{{ itemName }}"</span>{{ messageAfter }}
        </p>
        <span v-if="warning">{{ warning }}</span>
      </div>

      <div class="flex gap-3">
        <button
          @click="handleCancel"
          class="flex-1 px-6 py-3 border border-cream-3! text-primary! bg-cream-4! rounded-xl hover:bg-cream-2! transition-colors duration-200 font-semibold">
          {{ cancelText }}
        </button>
        <button
          @click="handleConfirm"
          :disabled="isLoading"
          class="flex-1 px-6 py-3 bg-red-500! text-white! rounded-xl border! hover:bg-red-400! border-red-500! transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isLoading ? loadingText : confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    default: ''
  },
  messageAfter: {
    type: String,
    default: '?'
  },
  warning: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  loadingText: {
    type: String,
    default: 'Processing...'
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
</style>
