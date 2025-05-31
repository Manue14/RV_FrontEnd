<script setup>
import { useMainStateStore } from '@/store/main';
import { useTiendaStore } from '@/store/tiendaStore';
import { useTemporadaStore } from '@/store/temporadaStore';
import { CONSTANTS } from '@/constants/constants';
defineProps({
  data_list: {
    type: JSON,
    required: true,
  },
});
const mainStateStore = useMainStateStore();
const tiendaStore = useTiendaStore();
const temporadaStore = useTemporadaStore();
const emit = defineEmits(['onChange']);
let selectedValue = ""

const handleChange = (event) => {
  emit('onChange', event.target.value);
};

if (mainStateStore.selectedView == CONSTANTS.TIENDA_VIEW && tiendaStore.tiendaSeleccionada != "") {
  selectedValue = tiendaStore.tiendaSeleccionada
}
if (mainStateStore.selectedView == CONSTANTS.TEMPORADA_VIEW && temporadaStore.temporadaSeleccionada != "") {
  console.log("Vista Temporada")
  selectedValue = temporadaStore.temporadaSeleccionada
}
</script>

<template>
  <select @change="handleChange" v-model="selectedValue" class="combobox">
    <option value="">Selecione unha opción</option>
    <option v-for="(value, key) in data_list"
            :key="value" :value="value">{{value}}</option>
  </select>
</template>