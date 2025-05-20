<!--
  @component ContentArea
  @description Área de contenido principal con estilo y placeholder
-->
<template>
  <div class="
    flex-grow
    rounded-lg
    shadow-inner
    bg-white/5
    flex items-center justify-center
    p-6
  ">
    <slot>
      <p class="text-gray-400 text-lg">
        Aquí se cargará el contenido
      </p>
    </slot>
  </div>
</template>

<script setup>
// No props necesarios
</script> 