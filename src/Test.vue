<script setup>
  import { ref, onMounted } from 'vue';
  import Combox from "@/components/Combox.vue";

  const familias = ref([]);
  const provincias = ref([]);
  const familiaSeleccionada = ref(null);
  const provinciaSeleccionada = ref(null);

  async function getFamilias() {
    const url = "http://127.0.0.1:5000/familias";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json();
      familias.value = json;
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getProvincias() {
    const url = "http://127.0.0.1:5000/provincias";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json();
      provincias.value = json;
    } catch (error) {
      console.error(error.message);
    }
  }

  const enviarDatos = async () => {
    if (!familiaSeleccionada.value || !provinciaSeleccionada.value) {
      alert('Por favor, seleccione tanto la familia como la provincia');
      return;
    }

    const datos = {
      familia: familiaSeleccionada.value,
      provincia: provinciaSeleccionada.value
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      alert('Datos enviados correctamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar los datos');
    }
  };

  onMounted(() => {
    getFamilias();
    getProvincias();
  });
</script>

<template>
  <div>
    <Combox
      :data_list="familias"
      @on-change="(familia) => familiaSeleccionada = familia">
    </Combox>
  </div>
  <div>
    <Combox
      :data_list="provincias"
      @on-change="(provincia) => provinciaSeleccionada = provincia">
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
