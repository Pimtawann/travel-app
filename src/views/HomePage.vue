<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <div class="home-page">
    <Navbar />

    <!-- Welcome Section -->
    <section class="py-10 md:py-16">
      <div class="max-w-[1800px] mx-auto px-6 md:px-30">
        <div class="text-center max-w-4xl mx-auto">
          <p class="text-4xl md:text-7xl font-bold text-primary mb-4 leading-tight">
            Welcome to <span class="text-secondary">Travvy.</span>
          </p>

          <p class="text-xl md:text-3xl text-secondary mb-4">
            Let’s explore wonderful places together.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
