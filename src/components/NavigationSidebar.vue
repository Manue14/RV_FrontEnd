<template>
  <nav class="sidebar-nav">
    <!-- Botón de abrir menú lateral (icono grafica) -->
    <button class="sidebar-btn icon-btn top-btn" @click="$emit('toggle-sidebar')">
      <img src="/src/assets/grafica.png" alt="Panel" class="icon-img" />
    </button>
    <button class="sidebar-btn icon-btn top-btn" @click="$emit('tienda-click')"> <!--Botón de predicciones por tienda-->
      <img src="/src/assets/grafica.png" alt="Panel" class="icon-img" />
    </button>
    <button class="sidebar-btn icon-btn top-btn" @click="$emit('temporada-click')"> <!--Botón de predicciones por temporada-->
      <img src="/src/assets/grafica.png" alt="Panel" class="icon-img" />
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