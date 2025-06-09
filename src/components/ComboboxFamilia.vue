<script setup>
import { CONSTANTS } from '@/constants/constants';
import { useMainStateStore } from '../store/main';
import { useTiendaStore } from '../store/tiendaStore';
import { useTemporadaStore } from '../store/temporadaStore';
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

const mainStateStore = useMainStateStore();
const tiendaStore = useTiendaStore();
const temporadaStore = useTemporadaStore();
</script>

<template>
  <span v-if="mainStateStore.selectedView == CONSTANTS.TIENDA_VIEW">
    <select @change="handleChange" class="combobox"
      :disabled="tiendaStore.tiendaSeleccionada == ''"
      v-model="tiendaStore.familiaSeleccionada">
    <option value="">Selecione unha opción</option>
    <option v-for="(value, key) in data_list"
            :key="key" :value="value">{{value}}</option>
  </select>
  </span>

  <span v-if="mainStateStore.selectedView == CONSTANTS.TEMPORADA_VIEW">
    <select @change="handleChange" class="combobox"
      :disabled="temporadaStore.temporadaSeleccionada == ''"
      v-model="temporadaStore.familiaSeleccionada">
    <option value="">Seleccione una opción</option>
    <option v-for="(value, key) in data_list"
            :key="key" :value="value">{{value}}</option>
  </select>
  </span>
  
</template>