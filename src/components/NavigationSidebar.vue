<template>
  <nav class="sidebar-nav">
    <!-- Botón de abrir menú lateral (icono grafica) -->
    <button class="sidebar-btn icon-btn top-btn" @click="$emit('toggle-sidebar')">
      <svg width="100" height="100" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#B35BC7">
        <rect x="16" y="80" width="480" height="64" rx="32"/>
        <rect x="16" y="224" width="480" height="64" rx="32"/>
        <rect x="16" y="368" width="480" height="64" rx="32"/>
      </svg>
    </button>
    <button class="sidebar-btn icon-btn top-btn" @click="$emit('tienda-click')"> <!--Botón de predicciones por tienda-->
      <svg data-name="Layer 1" id="Layer_1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#B35BC7">
        <title/>
        <path d="M46.34,20.52l-21-19a2,2,0,0,0-2.68,0l-21,19a2,2,0,1,0,2.68,3L24,5.7,43.66,23.48a2,2,0,0,0,2.68-3Z"/>
        <path d="M42,26a2,2,0,0,0-2,2V43H8V28a2,2,0,0,0-4,0V45a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V28A2,2,0,0,0,42,26Z"/>
      </svg>
    </button>
    <button class="sidebar-btn icon-btn top-btn" @click="$emit('temporada-click')"> <!--Botón de predicciones por temporada-->
      <svg data-name="Layer 2" id="a866a81f-2948-4418-8bd5-1a5193c5f74e" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg" fill="#B35BC7">
        <path d="M29.545,34.75H5.455a5.211,5.211,0,0,1-5.2-5.2V8.56a5.21,5.21,0,0,1,5.205-5.2h24.09a5.21,5.21,0,0,1,5.2,5.205V29.545A5.211,5.211,0,0,1,29.545,34.75ZM5.455,5.855A2.708,2.708,0,0,0,2.75,8.56V29.545a2.709,2.709,0,0,0,2.705,2.7h24.09a2.708,2.708,0,0,0,2.7-2.7V8.56a2.707,2.707,0,0,0-2.7-2.7Z"/><path d="M33.5,17.331H1.541a1.25,1.25,0,0,1,0-2.5H33.5a1.25,1.25,0,0,1,0,2.5Z"/><path d="M9.459,9.155a1.249,1.249,0,0,1-1.25-1.25V1.5a1.25,1.25,0,0,1,2.5,0V7.905A1.25,1.25,0,0,1,9.459,9.155Z"/>
        <path d="M25.542,9.155a1.249,1.249,0,0,1-1.25-1.25V1.5a1.25,1.25,0,0,1,2.5,0V7.905A1.25,1.25,0,0,1,25.542,9.155Z"/>
      </svg>
    </button>
    <div class="spacer"></div>
    <!-- Botón de ajustes (icono ajustes) -->
    <button class="sidebar-btn icon-btn bottom-btn" @click="$emit('ajustes-click')">
      <img src="/src/assets/ajustes.png" alt="Ajustes" class="icon-img" />
    </button>
  </nav>
</template>

<script setup>
// No se necesitan props ni imports de iconos
</script>

<style scoped>
.sidebar-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #23243a;
  height: 99%;
  width: 120px;
  padding: 2rem 0 2rem 0;
}
.spacer {
  flex: 1 1 auto;
  width: 100%;
}
.icon-btn {
  background: transparent;
  border: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: background 0.2s;
  margin: 0.5rem 0;
}
.icon-btn:hover {
  background: #35365a;
}
.icon-img {
  width: 40px;
  height: 40px;
}
.top-btn {
  margin-top: 0.5rem;
}
.bottom-btn {
  margin-bottom: 0.5rem;
}
</style> 