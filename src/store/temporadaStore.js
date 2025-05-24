import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

export const useTemporadaStore = defineStore('temporadaStore', () => {
    const temporadas = ref({PV: "PV", OI: "OI"});
    const temporadaSeleccionada = ref("");
    const familias = ref([]);
    const familiaSeleccionada = ref("");

    const temporadaNombre = computed(() => {
        if (temporadaSeleccionada.value === 'PV') {
            return 'PRIMAVERA-VERANO';
        } else if (temporadaSeleccionada.value === 'OI') {
            return 'OTOÑO-INVIERNO';
        } else {
            return '';
        }
    });

    const mesesTemporada = computed(() => {
        const temporada = useTemporadaStore.temporadaSeleccionada;
        if (temporada === 'PV') {
            return 'MARZO-SEPTIEMBRE';
        } else if (temporada === 'OI') {
            return 'SEPTIEMBRE-FEBRERO';
        } else {
            return '';
        }
    });

    const productoData = ref(null);
    const prediccionAnual = ref(null);
    const prediccionAnualTotal = ref(null);
    const prediccionMensual = ref(null);
    const tapb = ref(null);
    const tendenciaEstimacion = ref(null);
    const confiabilidad = ref(null);
    const ventasAnteriores = ref(null);

    return { temporadas, temporadaSeleccionada, familias, familiaSeleccionada, temporadaNombre, mesesTemporada,
        productoData, prediccionAnual, prediccionAnualTotal, prediccionMensual, tapb, tendenciaEstimacion, confiabilidad, ventasAnteriores
     };
})