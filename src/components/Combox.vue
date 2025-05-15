<script setup>
defineProps({
  data_list: {
    type: JSON,
    required: true,
  },
})
</script>

<template>
  <select>
    <option v-for="(value, key) in data_list"
            :key="key" :value="key">
                {{value}}</option>
  </select>
</template>
<style scoped>

</style>