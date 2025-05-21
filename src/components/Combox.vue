<script setup>
defineProps({
  data_list: {
    type: JSON,
    required: true,
  },
});

const emit = defineEmits(['onChange']);

const handleChange = (event) => {
  emit('onChange', event.target.value);
};
</script>

<template>
  <select @change="handleChange">
    <option value="">Seleccione una opción</option>
    <option v-for="(value, key) in data_list"
            :key="value" :value="value">{{value}}</option>
  </select>
</template>

<style scoped>
select {
  width: 55%;
}
</style>