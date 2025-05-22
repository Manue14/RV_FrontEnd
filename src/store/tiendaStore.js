import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useTiendaStore = defineStore('tiendaStore', () => {
    const tiendas = ref([]);
    const tiendaSeleccionada = ref("");
    const tiendaSeleccionadaState = ref(null)
    const familias = ref([]);
    const familiaSeleccionada = ref("");

    return { tiendas, tiendaSeleccionada, tiendaSeleccionadaState, familias, familiaSeleccionada };
})








/*

*/