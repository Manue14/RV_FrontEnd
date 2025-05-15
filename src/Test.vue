<script setup>
  import { ref, onMounted } from 'vue';
  import Combox from "@/components/Combox.vue";

  const familias = ref([]);
  const provincias = ref([]);

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

  onMounted(() => {
    getFamilias();
    getProvincias();
  });
</script>

<template>
  <div>
    <Combox :data_list="familias"></Combox>
  </div>
  <div>
    <Combox :data_list="provincias"></Combox>
  </div>

</template>

<style scoped>

</style>