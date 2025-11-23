<template>
  <div v-if="totalPages > 1" class="flex justify-center items-center gap-1.5 mt-6">
    <!-- Previous Button -->
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      :class="[
        '!px-3 !py-1.5 !rounded-md !text-sm !font-medium !transition-colors !duration-200',
        currentPage === 1
          ? '!bg-cream-3 !text-secondary/50 !cursor-not-allowed'
          : '!bg-white !border-2 !border-primary !text-primary hover:!bg-primary hover:!text-white'
      ]"
    >
      Previous
    </button>

    <!-- Page Numbers -->
    <div class="flex gap-1.5">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="[
          '!px-3 !py-1.5 !rounded-md !text-sm !font-medium !transition-colors !duration-200 !min-w-[36px]',
          page === currentPage
            ? '!bg-primary !text-white'
            : '!bg-white !border-2 !border-primary !text-primary hover:!bg-primary hover:!text-white'
        ]"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next Button -->
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      :class="[
        '!px-3 !py-1.5 !rounded-md !text-sm !font-medium !transition-colors !duration-200',
        currentPage === totalPages
          ? '!bg-cream-3 !text-secondary/50 !cursor-not-allowed'
          : '!bg-white !border-2 !border-primary !text-primary hover:!bg-primary hover:!text-white'
      ]"
    >
      Next
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true,
    default: 1
  }
})

const emit = defineEmits(['page-change'])

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>

<style scoped>
</style>
