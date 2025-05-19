<script setup>
import {ref, onMounted, watchEffect} from 'vue';
  import { getApiService } from './api/service';
  import Combox from "@/components/Combox.vue";
  import ComboboxFamilia from "@/components/ComboboxFamilia.vue";

  const apiService = getApiService();
  const tiendas = ref([]);
  const tiendaSeleccionada = ref(null);
  const familias = ref([]);
  const familiaSeleccionada = ref(null);
  const tienda_state = ref(null)

  const enviarDatos = async () => {
    if (!tiendaSeleccionada.value || !tiendaSeleccionada.value) {
      alert('Por favor, seleccione tanto la tienda como la provincia');
      return;
    }
    await apiService.predict(provinciaSeleccionada.value, tiendaSeleccionada.value);
  };

  const handleTiendaChange = async (event) => {
    tienda_state.value = await apiService.postTienda(event);
  }

  watchEffect(() => {
    console.log(tienda_state.value?.productos)
  })


  onMounted(async () => {
    tiendas.value = await apiService.getTiendas();
    //familias.value = await apiService.getFamilias();
  });
</script>

<template>
  <div>
    <ComboboxFamilia
      :data_list="familias"
      @update:modelValue="handleTiendaChange">
    </ComboboxFamilia>
  </div>
  <div>
    <Combox
      :data_list="tiendas"
      @update:modelValue="handleTiendaChange">
    </Combox>
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







