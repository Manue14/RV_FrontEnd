<script setup>
import { useMainStateStore } from '@/store/main';
import { useTiendaStore } from '@/store/tiendaStore';
import { useTemporadaStore } from '@/store/temporadaStore';
import { CONSTANTS } from '@/constants/constants';
import { ref } from 'vue';
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
  <select @change="handleChange" v-model="selectedValue">
    <option value="">Selecione unha opción</option>
    <option v-for="(value, key) in data_list"
            :key="value" :value="value">{{value}}</option>
  </select>
</template>

<style scoped>
select {
  background-color: #1e1e2f;
  color: #e0f7fa;
  border: 1px solid #3a3a4d;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  width: 95%;
  outline: none;
  transition: border 0.3s, box-shadow 0.3s;
  cursor: pointer;
  box-shadow: 0 0 0 2px transparent;
}

select:focus {
  border-color: #42f5ce;
  box-shadow: 0 0 8px #42f5ce33;
}

select option {
  background-color: #1e1e2f;
  color: #e0f7fa;
}

select:disabled {
  background-color: #2e2e3e;
  color: #777b8a;
  border-color: #3a3a4d;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>