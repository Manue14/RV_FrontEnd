<script setup>
import { inject } from 'vue'
defineProps({
  data_list: {
    type: JSON,
    required: true,
  },
});

const emit = defineEmits(['onChange']);
const handleChange = (event) => {
  emit('onChange', event.target.value);
};

const tiendaSeleccionadaState = inject("tiendaSeleccionadaState");
</script>

<template>
  <select @change="handleChange" v-if="tiendaSeleccionadaState">
    <option value="">Seleccione una opción</option>
    <option v-for="(value, key) in data_list"
            :key="key" :value="key">{{value}}</option>
  </select>
  <select v-else disabled></select>
</template>

<style scoped>
select {
  width: 95%;
}
</style>