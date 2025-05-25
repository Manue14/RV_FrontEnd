<!--
  @component SidebarLayout
  @description Layout principal que integra la barra lateral y el área de contenido
  @slot default - Contenido principal
  @slot tienda - Contenido específico para la sección tienda
  @slot estadisticas - Contenido específico para la sección estadísticas
  @slot ajustes - Contenido específico para la sección ajustes
-->
<template>
  <div class="flex h-screen bg-[#1A1C2E]">
    <Sidebar @section-change="handleSectionChange" />
    <ContentArea>
      <slot :name="currentSection">
        <slot>
          <p class="text-gray-400 text-lg">
            Aquí se cargará el contenido
          </p>
        </slot>
      </slot>
    </ContentArea>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import Sidebar from './Sidebar.vue';
import ContentArea from './ContentArea.vue';

const currentSection = ref('tienda');

// Proporcionamos el estado actual a los componentes hijos
provide('currentSection', currentSection);

const handleSectionChange = (section) => {
  currentSection.value = section;
};
</script>

<style scoped>
/* Aseguramos que el layout ocupe toda la pantalla */
.flex {
  min-height: 100vh;
}
</style> 