<script setup>
  import { ref, onMounted } from 'vue';
  import { getApiService } from './api/service';
  import Combox from "@/components/Combox.vue";

  const apiService = getApiService();
  const familias = ref([]);
  const provincias = ref([]);
  const familiaSeleccionada = ref(null);
  const provinciaSeleccionada = ref(null);

  const enviarDatos = async () => {
    if (!familiaSeleccionada.value || !provinciaSeleccionada.value) {
      alert('Por favor, seleccione tanto la familia como la provincia');
      return;
    }
    await apiService.predict(provinciaSeleccionada.value, familiaSeleccionada.value);
  };

  onMounted(async () => {
    familias.value = await apiService.getFamilias();
    provincias.value = await apiService.getProvincias();
  });
</script>

<template>
  <div>
    <Combox
      :data_list="familias"
      @update:modelValue="familiaSeleccionada = $event">
    </Combox>
  </div>
  <div>
    <Combox
      :data_list="provincias"
      @update:modelValue="provinciaSeleccionada = $event">
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
