<script setup>
import Combox from "@/components/Combox.vue";
import ComboboxFamilia from "@/components/ComboboxFamilia.vue";
import { useMainStateStore } from '../store/main'
import { useTiendaStore } from '../store/tiendaStore';
import { CONSTANTS } from '../constants/constants';

const mainStateStore = useMainStateStore();
const tiendaStore = useTiendaStore();

const handleTiendaChange = (event) => {
    tiendaStore.tiendaSeleccionada = event;
}

const handleFamiliaChange = (event) => {
    tiendaStore.familiaSeleccionada = event;
}
</script>

<template>
  <div class="sidebar">
    <span v-if="mainStateStore.selectedView == CONSTANTS.TIENDA_VIEW">
        <h2>Tienda</h2>
        <div class="data_div">
            <Combox
            :data_list="tiendaStore.tiendas"
            v-model="tiendaStore.tiendaSeleccionada"
            @on-change="handleTiendaChange">
            </Combox>
            <div class="subdata_div">
                <p>Provincia:
                    <span v-if="tiendaStore.tiendaSeleccionadaState">{{ tiendaStore.tiendaSeleccionadaState.provincia }}</span>
                    <span v-else class="placeholder_span">PONTEVEDRA</span>
                </p>
                <p>CP:
                    <span v-if="tiendaStore.tiendaSeleccionadaState">{{ tiendaStore.tiendaSeleccionadaState.codigo_postal }}</span>
                    <span v-else class="placeholder_span">00000</span>
                </p>
            </div>
        </div>
    </span>

    <span v-if="mainStateStore.selectedView == CONSTANTS.TEMPORADA_VIEW">
        <h2>Temporada</h2>
        <div class="data_div">
            <Combox
            :data_list="tiendaStore.tiendas"
            @on-change="handleTiendaChange">
            </Combox>
            <div class="subdata_div">
                <p>Periodo:
                    <span v-if="tiendaStore.tiendaSeleccionadaState">{{ tiendaStore.tiendaSeleccionadaState.provincia }}</span>
                    <span v-else class="placeholder_span">SEPTIEMBRE-FEBRERO</span>
                </p>
                <p>Año:
                    <span v-if="tiendaStore.tiendaSeleccionadaState">{{ new Date().getFullYear() }}</span>
                    <span v-else class="placeholder_span">2025</span>
                </p>
            </div>
        </div>
    </span>

    <h2>Familia</h2>
    <div class="familia_div">
        <ComboboxFamilia
        :data_list="tiendaStore.familias"
        @on-change="handleFamiliaChange">
        </ComboboxFamilia>
    </div>

    <div class="slot">
        <slot></slot>
    </div>

  </div>
</template>

<style scoped>
.data_div, .familia_div {
    padding-left: 1%;
    margin-bottom: 20%;
}

.subdata_div {
    margin-top: 8%;
}

.placeholder_span {
    background-color: var(--color-background);
    color: var(--color-background);
}

.slot {
    display: flex;
    justify-content: center;
}
</style>