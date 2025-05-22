<script setup>
import {ref, onMounted, watch } from 'vue';
import { getApiService } from './api/service';
import { useMainStateStore } from './store/main';
import { useTiendaStore } from './store/tiendaStore';
import { CONSTANTS } from './constants/constants';
import Sidebar from './components/Sidebar.vue';
import NavigationSidebar from './components/NavigationSidebar.vue';
import PredictionsDashboard from './components/PredictionsDashboard.vue';
import PredictionsDashboardPlaceholder from './components/PredictionsDashboardPlaceholder.vue';

const apiService = getApiService();
const mainStateStore = useMainStateStore();
const tiendaStore = useTiendaStore();

const chartData = ref({
  labels: [],
  datasets: []
})

watch(() => tiendaStore.tiendaSeleccionada, async() => {
  if (tiendaStore.tiendaSeleccionada == "") {
    tiendaStore.tiendaSeleccionadaProvincia = "";
    tiendaStore.tiendaSeleccionadaCodigoPostal = "";
    tiendaStore.familiaSeleccionada = "";
    return
  }
  const data = await apiService.getTienda(tiendaStore.tiendaSeleccionada);
  tiendaStore.familias = data.productos;
  tiendaStore.tiendaSeleccionadaProvincia = data.provincia;
  tiendaStore.tiendaSeleccionadaCodigoPostal = data.codigo_postal;
  tiendaStore.familiaSeleccionada = "";
})

const enviarDatos = async () => {
  if (!tiendaStore.tiendaSeleccionada || !tiendaStore.familiaSeleccionada) {
    alert('Por favor, seleccione tanto la tienda como la provincia');
    return;
  }
  const data = await apiService.predict(tiendaStore.tiendaSeleccionada, tiendaStore.familiaSeleccionada);

  // Actualizar variables con los datos adicionales
  tiendaStore.productoData = data.producto;
  tiendaStore.prediccionAnualTotal = data.prediccion_anual_total;
  tiendaStore.tapb = data.tapb;
  tiendaStore.tendenciaEstimacion = data.tendencia_estimacion;
  tiendaStore.confiabilidad = data.confiabilidad;
  tiendaStore.prediccionMensual = data.prediccion_mensual;
  tiendaStore.ventasAnteriores = data.ventas_anteriores;
};

onMounted(async () => {
  tiendaStore.tiendas = await apiService.getTiendas();
});

function toggleSidebar() {
  mainStateStore.isSideBarToggled = !mainStateStore.isSideBarToggled;
}

// Handlers para eventos del NavigationSidebar
const handleDashboardClick = () => {
  console.log('Botón Dashboard clickeado');
  // Aquí puedes añadir la lógica para navegar o realizar acciones
};

const handleModoNocheClick = () => {
  console.log('Botón Modo noche clickeado');
  // Aquí puedes añadir la lógica para cambiar el modo noche
};

const handleTiendaClick = () => {
  mainStateStore.selectedView = CONSTANTS.TIENDA_VIEW;
};

const handleTemporadaClick = () => {
  mainStateStore.selectedView = CONSTANTS.TEMPORADA_VIEW;
};

const handleAjustesClick = () => {
  console.log('Botón Ajustes clickeado');
  // Aquí puedes añadir la lógica para abrir ajustes
};
</script>

<template>
  <div class="dashboard-root">
    <NavigationSidebar 
      @toggle-sidebar="toggleSidebar"
      @tienda-click="handleTiendaClick"
      @temporada-click="handleTemporadaClick"
      @dashboard-click="handleRefrescarClick"
      @modo-noche-click="handleNotificacionesClick"
      @ajustes-click="handleAjustesClick"
    />
    <transition name="drawer">
      <aside v-if="mainStateStore.isSideBarToggled" class="drawer-sidebar">
        <Sidebar>
          <div style="min-height: 120px; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
            <button :disabled="tiendaStore.tiendaSeleccionada == null || tiendaStore.familiaSeleccionada == ''"
              @click="enviarDatos"
              class="btn-enviar">
              Enviar selección
            </button>
            <div v-if="tiendaStore.tiendaSeleccionada == '' || tiendaStore.familiaSeleccionada == ''" style="margin-top: 1rem; color: #aaa; text-align: center;">
              Selecciona una tienda y una familia para continuar.
            </div>
          </div>
        </Sidebar>
      </aside>
    </transition>
    <PredictionsDashboard v-if="tiendaStore.productoData"
    :ventas-anteriores="tiendaStore.ventasAnteriores"
    :prediccion-anual="tiendaStore.prediccionAnualTotal"
    :prediccion-mensual="tiendaStore.prediccionMensual"
    :producto-data="tiendaStore.productoData"
    :tapb="tiendaStore.tapb"
    :tendencia-estimacion="tiendaStore.tendenciaEstimacion"
    :confiabilidad="tiendaStore.confiabilidad"></PredictionsDashboard>
    <PredictionsDashboardPlaceholder v-if="!tiendaStore.productoData"></PredictionsDashboardPlaceholder>
  </div>
</template>

<style scoped>
.dashboard-root {
  display: flex;
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  /* Degradado de fondo más profundo */
  background: radial-gradient(ellipse at 60% 40%, #23243a 60%, #18192b 100%), 
              linear-gradient(135deg, #23243a 0%, #2b2e44 100%);
  padding: 1.2rem;
  box-sizing: border-box;
  align-items: stretch;
}

.drawer-sidebar {
  width: 340px;
  max-width: 90vw;
  height: 100%;
  background: rgba(40, 42, 65, 0.7);
  box-shadow: 2px 0 16px rgba(0,0,0,0.25);
  border-radius: 18px 0 0 18px;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  overflow-y: auto;
  position: relative;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.08);
}

.drawer-enter-active, .drawer-leave-active {
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
}
.drawer-enter-from, .drawer-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.drawer-enter-to, .drawer-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.btn-enviar {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(90deg, #45FF9A 0%, #5A6BFF 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px 0 rgba(90,107,255,0.15);
  transition: background 0.2s, box-shadow 0.2s;
}

.btn-enviar:hover {
  background: linear-gradient(90deg, #5A6BFF 0%, #45FF9A 100%);
  box-shadow: 0 4px 16px 0 rgba(90,107,255,0.25);
}

.btn-enviar:disabled {
  cursor: unset;
  background: linear-gradient(90deg, #93f5bf 0%, #9fa7f5 100%);
  opacity: 0.7;
}
</style>