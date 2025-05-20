<script setup>
import Combox from "@/components/Combox.vue";
import ComboboxFamilia from "@/components/ComboboxFamilia.vue";
import { inject } from 'vue'

const tiendas = inject("tiendas");
const tiendaSeleccionada = inject("tiendaSeleccionada");
const familias = inject("familias");
const familiaSeleccionada = inject("familiaSeleccionada");
const tiendaSeleccionadaState = inject("tiendaSeleccionadaState");

const handleTiendaChange = (event) => {
    tiendaSeleccionada.value = event;
}

const handleFamiliaChange = (event) => {
    familiaSeleccionada.value = event;
}
</script>

<template>
  <div class="sidebar">
    <h2>Tienda</h2>
    <div class="tienda_div">
        <Combox
        :data_list="tiendas"
        @on-change="handleTiendaChange">
        </Combox>
        <div class="tienda_data_div">
            <p>Provincia:
                <span v-if="tiendaSeleccionadaState">{{ tiendaSeleccionadaState.provincia }}</span>
                <span v-else class="placeholder_span">PONTEVEDRA</span>
            </p>
            <p>CP:
                <span v-if="tiendaSeleccionadaState">{{ tiendaSeleccionadaState.codigo_postal }}</span>
                <span v-else class="placeholder_span">00000</span>
            </p>
        </div>
    </div>

    <h2>Familia</h2>
    <div class="familia_div">
        <ComboboxFamilia
        :data_list="familias"
        @on-change="handleFamiliaChange">
        </ComboboxFamilia>
    </div>

    <div class="slot">
        <slot></slot>
    </div>

  </div>
</template>

<style scoped>
.tienda_div, .familia_div {
    padding-left: 1%;
    margin-bottom: 20%;
}

.tienda_data_div {
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