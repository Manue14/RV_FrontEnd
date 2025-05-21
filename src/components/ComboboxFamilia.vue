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

const tiendaSeleccionada = inject("tiendaSeleccionada");
const familiaSeleccionada = inject("familiaSeleccionada");
</script>

<template>
  <select @change="handleChange" :disabled="tiendaSeleccionada == null" v-model="familiaSeleccionada">
    <option value="">Seleccione una opción</option>
    <option v-for="(value, key) in data_list"
            :key="key" :value="value">{{value}}</option>
  </select>
</template>

<style scoped>
select {
  width: 95%;
}
</style>