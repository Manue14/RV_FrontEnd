<script setup>
import { useTiendaStore } from '../store/tiendaStore';
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

const tiendaStore = useTiendaStore();
</script>

<template>
  <select @change="handleChange" :disabled="tiendaStore.tiendaSeleccionada == ''" v-model="tiendaStore.familiaSeleccionada">
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