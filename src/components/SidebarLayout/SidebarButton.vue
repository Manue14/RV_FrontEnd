<!--
  @component SidebarButton
  @description Botón circular para el sidebar con tooltip y estados interactivos
  @prop {String} tooltip - Texto del tooltip
  @prop {Boolean} isActive - Estado activo del botón
  @emit {Event} click - Evento emitido al hacer clic en el botón
-->
<template>
  <div class="relative group">
    <button
      @click="$emit('click')"
      :class="[
        'w-12 h-12 rounded-full',
        'flex items-center justify-center',
        'transition-all duration-300',
        isActive 
          ? 'bg-[#2A2C3B] shadow-lg shadow-green-400/50' 
          : 'bg-[#2A2C3B] hover:shadow-md'
      ]"
    >
      <slot name="icon"></slot>
    </button>
    <div class="
      absolute left-full ml-2 px-2 py-1
      bg-gray-800 text-white text-sm rounded
      opacity-0 group-hover:opacity-100
      transition-opacity duration-300
      pointer-events-none
    ">
      {{ tooltip }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  tooltip: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);
</script> 