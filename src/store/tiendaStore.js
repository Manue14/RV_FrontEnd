import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useTiendaStore = defineStore('tiendaStore', () => {
    const tiendas = ref([]);
    const tiendaSeleccionada = ref("");
    const tiendaSeleccionadaProvincia = ref("")
    const tiendaSeleccionadaCodigoPostal = ref("")
    const familias = ref([]);
    const familiaSeleccionada = ref("");

    const productoData = ref(null);
    const prediccionAnualTotal = ref(null);
    const prediccionMensual = ref(null);
    const tapb = ref(null);
    const tendenciaEstimacion = ref(null);
    const confiabilidad = ref(null);
    const ventasAnteriores = ref(null);

    return { tiendas, tiendaSeleccionada, tiendaSeleccionadaProvincia, tiendaSeleccionadaCodigoPostal, familias, familiaSeleccionada,
        productoData, prediccionAnualTotal, prediccionMensual, tapb, tendenciaEstimacion, confiabilidad, ventasAnteriores
     };
})








/*

*/