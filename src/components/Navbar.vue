<template>
  <nav class="w-full bg-cream-1 border-b border-primary">
    <div class="max-w-[1800px] mx-auto px-6 md:px-30 py-4">
      <div class="flex justify-between items-center">
        <div>
          <router-link to="/" class="text-4xl md:text-6xl font-bold text-primary cursor-pointer hover:text-secondary transition-colors duration-200">
            Travvy.
          </router-link>
        </div>

        <div>
          <router-link to="/login">
            <button class="px-6 py-2 md:w-[140px] bg-primary text-background rounded-xl font-medium text-xl hover:bg-secondary transition-colors duration-200">
              Login
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
</style>
