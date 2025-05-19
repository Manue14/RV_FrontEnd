<script setup>
defineProps({
  data_list: {
    type: JSON,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const handleChange = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <select @change="handleChange">
    <option value="">Seleccione una opción</option>
    <option v-for="(value, key) in data_list"
            :key="key" :value="key">{{value}}</option>
  </select>
</template>

<style scoped>

</style>