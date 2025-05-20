<script setup>
import NavigationSidebar from './components/NavigationSidebar.vue';
</script>

<template>
  <div class="flex">
    <NavigationSidebar />
    <main class="flex-1 p-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
/* Tus estilos globales aquí */
</style>
