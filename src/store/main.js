import { defineStore } from 'pinia'
import { CONSTANTS } from '@/constants/constants';
import { ref } from 'vue';

export const useMainStateStore = defineStore('mainState', () => {
    const selectedView = ref(CONSTANTS.HOME_VIEW);
    const viewMode = ref(CONSTANTS.MODO_NOCHE);
    const waitingForApi = ref(false);
    const topProductos = ref(null)

    return { selectedView, viewMode, waitingForApi, topProductos };
})