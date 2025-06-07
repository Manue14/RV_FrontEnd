<script setup>
import Combox from "@/components/Combox.vue";
import ComboboxFamilia from "@/components/ComboboxFamilia.vue";
import { useMainStateStore } from '../store/main'
import { useTiendaStore } from '../store/tiendaStore';
import { useTemporadaStore } from '../store/temporadaStore';
import { CONSTANTS } from '../constants/constants';
import { ref, onUpdated } from 'vue';

const mainStateStore = useMainStateStore();
const tiendaStore = useTiendaStore();
const temporadaStore = useTemporadaStore();

const nombreTemporada = ref("");
const mesesTemporada = ref("");

const handleTiendaChange = (event) => {
    tiendaStore.tiendaSeleccionada = event;
}

const handleTiendaFamiliaChange = (event) => {
    tiendaStore.familiaSeleccionada = event;
}

const handleTemporadaChange = (event) => {
    temporadaStore.temporadaSeleccionada = event;
    nombreTemporada.value = temporadaStore.temporadaNombre;
    mesesTemporada.value = temporadaStore.temporadaMeses;
}

const handleTemporadaFamiliaChange = (event) => {
    temporadaStore.familiaSeleccionada = event;
}
</script>

<template>
  <div class="sidebar">
    <span v-if="mainStateStore.selectedView == CONSTANTS.TIENDA_VIEW">
        <h2>Tenda</h2>
        <div class="data_div">
            <Combox
            :data_list="tiendaStore.tiendas"
            @on-change="handleTiendaChange">
            </Combox>
            <div class="subdata_div">
                <p class="provincia-paragraph">Provincia:
                    <span v-if="tiendaStore.tiendaSeleccionada != ''">{{ tiendaStore.tiendaSeleccionadaProvincia }}</span>
                    <span v-else class="placeholder_span">PONTEVEDRA</span>
                </p>
                <p class="postal-paragraph">CP:
                    <span v-if="tiendaStore.tiendaSeleccionada != ''">{{ tiendaStore.tiendaSeleccionadaCodigoPostal }}</span>
                    <span v-else class="placeholder_span">00000</span>
                </p>
            </div>
        </div>
        <h2>Familia</h2>
        <div class="familia_div">
            <ComboboxFamilia
            :data_list="tiendaStore.familias"
            @on-change="handleTiendaFamiliaChange">
            </ComboboxFamilia>
        </div>
    </span>

    <span v-if="mainStateStore.selectedView == CONSTANTS.TEMPORADA_VIEW">
        <h2>Temporada</h2>
        <div class="data_div">
            <Combox
            :data_list="temporadaStore.temporadas"
            @on-change="handleTemporadaChange">
            </Combox>
            <div class="subdata_div">
                <p class="period-paragraph">Periodo:
                    <span v-if="temporadaStore.temporadaSeleccionada != ''">{{ nombreTemporada }}</span>
                    <span v-else class="placeholder_span">SEPTIEMBRE-FEBRERO</span>
                </p>
                <p class="month-paragraph">Meses:
                    <span v-if="temporadaStore.temporadaSeleccionada != ''">{{ mesesTemporada }}</span>
                    <span v-else class="placeholder_span">2025</span>
                </p>
            </div>
        </div>
        <h2>Familia</h2>
        <div class="familia_div">
            <ComboboxFamilia
            :data_list="temporadaStore.familias"
            @on-change="handleTemporadaFamiliaChange">
            </ComboboxFamilia>
        </div>
    </span>

    <div class="slot">
        <slot></slot>
    </div>

  </div>
</template>

<style scoped>
.sidebar {
    height: 96vh;
}
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
    flex-direction: column;
    align-items: center;
    width: 100%;
}

h2 {
    margin-top: 2rem;
}

@media screen and (max-width: 1890px) {
  .sidebar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: unset;
    }
    .sidebar > span {
        display: flex;
        align-items: center;
    }
    .slot {
       width: fit-content;
       height: fit-content;
    }
    .data_div {
        padding-left: unset;
        margin-bottom: unset;
        display: flex;
        align-items: center;
        margin-right: 8%;
    }
    .familia_div {
        padding-left: unset;
        margin-bottom: unset;
        width: 50%;
    }
    .subdata_div {
        margin-top: unset;
        margin-left: 6%;
    }
    .postal-paragraph, .period-paragraph, .month-paragraph {
        display: none;
    }
    h2 {
        margin-top: unset;
    }
}
</style>