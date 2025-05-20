<script setup>
import {ref, onMounted, watch, watchEffect, provide} from 'vue';
import { getApiService } from './api/service';
import Sidebar from './components/Sidebar.vue';

const apiService = getApiService();
const tiendas = ref([]);
const tiendaSeleccionada = ref(null);
const tiendaSeleccionadaState = ref(null)
const familias = ref([]);
const familiaSeleccionada = ref(null);

provide("tiendas", tiendas);
provide("tiendaSeleccionada", tiendaSeleccionada);
provide("familias", familias);
provide("familiaSeleccionada", familiaSeleccionada);
provide("tiendaSeleccionadaState", tiendaSeleccionadaState);

watch(tiendaSeleccionada, async() => {
  tiendaSeleccionadaState.value = await apiService.getTienda(tiendaSeleccionada.value);
  familias.value = tiendaSeleccionadaState.value.productos;
})

const enviarDatos = async () => {
  if (!tiendaSeleccionada.value || !tiendaSeleccionada.value) {
    alert('Por favor, seleccione tanto la tienda como la provincia');
    return;
  }
  console.log("Tienda: ", tiendaSeleccionada.value, " Familia: ", familiaSeleccionada.value);
  await apiService.predict(provinciaSeleccionada.value, tiendaSeleccionada.value);
};

watchEffect(() => {
  console.log("Tienda: ", tiendaSeleccionada.value);
  console.log("Familia: ", familiaSeleccionada.value);
})


onMounted(async () => {
  tiendas.value = await apiService.getTiendas();
});
</script>

<template>
  <Sidebar>
    <button v-if="tiendaSeleccionadaState"
      @click="enviarDatos"
      class="btn-enviar">
      Enviar selección
    </button>
    <button v-else
      class="btn-enviar"
      disabled>
      Enviar selección
    </button>
  </Sidebar>
  <div class="data-pane">
    <div class="data-subpane">

    </div>
    <div class="data-subpane">

    </div>
  </div>
  <div class="graph-pane"></div>
</template>

<style scoped>
.btn-enviar {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-enviar:hover {
  background-color: #45a049;
}

.btn-enviar:disabled {
  cursor: unset;
  background-color: #72c475;
}
</style>