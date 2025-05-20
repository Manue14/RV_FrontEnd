<template>
  <nav class="sidebar-nav">
    <button class="sidebar-btn" @click="$emit('toggle-sidebar')">Abrir menú lateral</button>
    <button class="sidebar-btn" @click="alert('Dashboard')">Dashboard</button>
    <button class="sidebar-btn" @click="alert('Modo noche')">Modo noche</button>
    <button class="sidebar-btn" @click="alert('Refrescar')">Refrescar</button>
    <button class="sidebar-btn" @click="alert('Notificaciones')">Notificaciones</button>
    <button class="sidebar-btn" @click="alert('Ajustes')">Ajustes</button>
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
  height: 100%;
  min-height: 100%;
  width: 120px;
  padding: 1rem 0;
  gap: 1rem;
}
.sidebar-btn {
  width: 100px;
  padding: 0.5rem 0.5rem;
  background: #35365a;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}
.sidebar-btn:hover {
  background: #4a4b7d;
}
</style> 