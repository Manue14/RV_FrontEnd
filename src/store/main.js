import { defineStore } from 'pinia'
import { CONSTANTS } from '@/constants/constants';
import { ref } from 'vue';

export const useMainStateStore = defineStore('mainState', () => {
    const isSideBarToggled = ref(false)
    const selectedView = ref(CONSTANTS.TIENDA_VIEW);
    const viewMode = ref(CONSTANTS.MODO_NOCHE);
    const waitingForApi = ref(false);
    const topProductos = ref(null)

    return { isSideBarToggled, selectedView, viewMode, waitingForApi, topProductos };
})