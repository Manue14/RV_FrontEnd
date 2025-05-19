<script setup>
import {ref, onMounted, watchEffect} from 'vue';
  import { getApiService } from './api/service';
  import Combox from "@/components/Combox.vue";
  import ComboboxFamilia from "@/components/ComboboxFamilia.vue";

  const apiService = getApiService();
  const tiendas = ref([]);
  const tiendaSeleccionada = ref(null);
  const tiendaSeleccionadaState = ref(null)
  const familias = ref([]);
  const familiaSeleccionada = ref(null);

  const enviarDatos = async () => {
    if (!tiendaSeleccionada.value || !tiendaSeleccionada.value) {
      alert('Por favor, seleccione tanto la tienda como la provincia');
      return;
    }
    await apiService.predict(provinciaSeleccionada.value, tiendaSeleccionada.value);
  };

  const handleTiendaChange = async (event) => {
    tiendaSeleccionadaState.value = await apiService.getTienda(event);
    tiendaSeleccionada.value = event;
  }

  const handleFamiliaChange = async (event) => {
    familiaSeleccionada.value = event;
  }

  watchEffect(() => {
    console.log("Tienda: ", tiendaSeleccionada.value);
    console.log("Familia: ", familiaSeleccionada.value);
  })


  onMounted(async () => {
    tiendas.value = await apiService.getTiendas();
  });
</script>

<template>
  <div>
    <Combox
      :data_list="tiendas"
      @update:modelValue="handleTiendaChange">
    </Combox>
  </div>
  <div v-if="tiendaSeleccionadaState">
    <ComboboxFamilia
      :data_list="tiendaSeleccionadaState.productos"
      @update:modelValue="handleFamiliaChange">
    </ComboboxFamilia>
    <div>{{ tiendaSeleccionadaState.provincia }}</div>
    <div>{{ tiendaSeleccionadaState.codigo_postal }}</div>
  </div>
  <div>
    <button
      @click="enviarDatos"
      class="btn-enviar">
      Enviar selección
    </button>
  </div>
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
</style>