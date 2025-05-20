<!--
  @component Sidebar
  @description Barra lateral de navegación con botones interactivos
  @emit {String} section-change - Evento emitido cuando cambia la sección activa
-->
<template>
  <aside class="
    w-20 h-full
    bg-[#2A2C3B]
    flex flex-col items-center
    py-6 gap-6
  ">
    <SidebarButton
      :tooltip="'Tienda'"
      :is-active="activeSection === 'tienda'"
      @click="handleSectionChange('tienda')"
    >
      <template #icon>
        <span class="text-white">🏪</span>
      </template>
    </SidebarButton>

    <SidebarButton
      :tooltip="'Estadísticas'"
      :is-active="activeSection === 'estadisticas'"
      @click="handleSectionChange('estadisticas')"
    >
      <template #icon>
        <span class="text-white">📊</span>
      </template>
    </SidebarButton>

    <SidebarButton
      :tooltip="'Ajustes'"
      :is-active="activeSection === 'ajustes'"
      @click="handleSectionChange('ajustes')"
    >
      <template #icon>
        <span class="text-white">⚙️</span>
      </template>
    </SidebarButton>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import SidebarButton from './SidebarButton.vue';

const activeSection = ref('tienda');
const emit = defineEmits(['section-change']);

const handleSectionChange = (section) => {
  activeSection.value = section;
  emit('section-change', section);
};
</script>

<style scoped>
/* Aseguramos que el sidebar ocupe toda la altura */
aside {
  min-height: 100vh;
}
</style> 