import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useTemporadaStore = defineStore('temporadaStore', () => {
    const temporadas = ref([]);
    const temporadaSeleccionada = ref("");
    const temporadaSeleccionadaState = ref(null)
    const familias = ref([]);
    const familiaSeleccionada = ref("");

    return { temporadas, temporadaSeleccionada, temporadaSeleccionadaState, familias, familiaSeleccionada };
})