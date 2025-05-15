<script setup>
  async function getFamilias() {
    const url = "http://127.0.0.1:5000/familias";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json();
      console.log("Hola");
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }
  getFamilias();
</script>

<template>

</template>

<style scoped>

</style>