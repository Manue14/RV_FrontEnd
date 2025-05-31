<template>
  <LoadingOverlay :is-loading="mainStateStore.waitingForApi"></LoadingOverlay>
  <div class="dashboard-root">
    <NavigationSidebar 
      @home-click="handleHomeClick"
      @tienda-click="handleTiendaClick"
      @temporada-click="handleTemporadaClick"
      @top-click="handleTopProductosClick"
    >
      <button
        @click="handleLogout"
        class="logout-button"
      >
        Cerrar sesión
      </button>
    </NavigationSidebar>
    <transition name="drawer">
      <aside v-if="mainStateStore.selectedView != CONSTANTS.TOP_PRODUCTOS_VIEW && mainStateStore.selectedView != CONSTANTS.HOME_VIEW" class="drawer-sidebar">
        <Sidebar>
          <div style="min-height: 120px; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
            <button
              :disabled="(mainStateStore.selectedView == CONSTANTS.TIENDA_VIEW && (tiendaStore.tiendaSeleccionada == null || tiendaStore.familiaSeleccionada == '')) || (mainStateStore.selectedView == CONSTANTS.TEMPORADA_VIEW && (temporadaStore.temporadaSeleccionada == null || temporadaStore.familiaSeleccionada == ''))"
              @click="enviarDatos"
              class="btn-enviar">
              Enviar selección
            </button>
          </div>
        </Sidebar>
      </aside>
    </transition>
    <LandingPage v-if="mainStateStore.selectedView == CONSTANTS.HOME_VIEW"></LandingPage>
    <PredictionsDashboard v-if="tiendaStore.productoData && mainStateStore.selectedView == CONSTANTS.TIENDA_VIEW"
    :ventas-anteriores="tiendaStore.ventasAnteriores"
    :prediccion-anual="tiendaStore.prediccionAnual"
    :prediccion-anual-total="tiendaStore.prediccionAnualTotal"
    :prediccion-mensual="tiendaStore.prediccionMensual"
    :producto-data="tiendaStore.productoData"
    :tapb="tiendaStore.tapb"
    :tendencia-estimacion="tiendaStore.tendenciaEstimacion"
    :confiabilidad="tiendaStore.confiabilidad"></PredictionsDashboard>
    <PredictionsDashboard v-if="temporadaStore.productoData && mainStateStore.selectedView == CONSTANTS.TEMPORADA_VIEW"
    :ventas-anteriores="temporadaStore.ventasAnteriores"
    :prediccion-anual="temporadaStore.prediccionAnual"
    :prediccion-anual-total="temporadaStore.prediccionAnualTotal"
    :prediccion-mensual="temporadaStore.prediccionMensual"
    :producto-data="temporadaStore.productoData"
    :tapb="temporadaStore.tapb"
    :tendencia-estimacion="temporadaStore.tendenciaEstimacion"
    :confiabilidad="temporadaStore.confiabilidad"></PredictionsDashboard>
    <PredictionsDashboardPlaceholder v-if="(!tiendaStore.productoData && mainStateStore.selectedView == CONSTANTS.TIENDA_VIEW) || (!temporadaStore.productoData && mainStateStore.selectedView == CONSTANTS.TEMPORADA_VIEW)"></PredictionsDashboardPlaceholder>
    <TopProductosDashboard :productos="mainStateStore.topProductos" v-if="mainStateStore.selectedView == CONSTANTS.TOP_PRODUCTOS_VIEW"></TopProductosDashboard>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { getApiService } from '../api/service';
import { useMainStateStore } from '../store/main';
import { useTiendaStore } from '../store/tiendaStore';
import { useTemporadaStore } from '../store/temporadaStore';
import { CONSTANTS } from '../constants/constants';
import Sidebar from '../components/Sidebar.vue';
import NavigationSidebar from '../components/NavigationSidebar.vue';
import PredictionsDashboard from '../components/PredictionsDashboard.vue';
import PredictionsDashboardPlaceholder from '../components/PredictionsDashboardPlaceholder.vue';
import LoadingOverlay from '../components/LoadingOverlay.vue';
import TopProductosDashboard from '../components/TopProductosDashboard.vue';
import LandingPage from '@/components/LandingPage.vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const apiService = getApiService();
const mainStateStore = useMainStateStore();
const tiendaStore = useTiendaStore();
const temporadaStore = useTemporadaStore();
const auth = useAuthStore();
const router = useRouter();

const chartData = ref({
  labels: [],
  datasets: []
})

watch(() => mainStateStore.selectedView, () => {
  
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
  mainStateStore.waitingForApi = true;
  if (mainStateStore.selectedView == CONSTANTS.TIENDA_VIEW) {
    await predecirPorTienda();
  } else if (mainStateStore.selectedView == CONSTANTS.TEMPORADA_VIEW) {
    await predecirPorTemporada();
  }
  mainStateStore.waitingForApi = false;
};

const predecirPorTienda = async () => {
  const data = await apiService.predictByTienda(tiendaStore.tiendaSeleccionada, tiendaStore.familiaSeleccionada);

  if (data == null) {
    return;
  }
  tiendaStore.productoData = data.producto;
  tiendaStore.prediccionAnual = data.prediccion_anual;
  tiendaStore.prediccionAnualTotal = data.prediccion_anual_total;
  tiendaStore.tapb = data.tapb;
  tiendaStore.tendenciaEstimacion = data.tendencia_estimacion;
  tiendaStore.confiabilidad = data.confiabilidad;
  tiendaStore.prediccionMensual = data.prediccion_mensual;
  tiendaStore.ventasAnteriores = data.ventas_anteriores;
}

const predecirPorTemporada = async () => {
  const data = await apiService.predictByTemporada(temporadaStore.temporadaSeleccionada, temporadaStore.familiaSeleccionada);

  if (data == null) {
    return;
  }
  temporadaStore.productoData = data.producto;
  temporadaStore.prediccionAnual = data.prediccion_anual;
  temporadaStore.prediccionAnualTotal = data.prediccion_anual_total;
  temporadaStore.tapb = data.tapb;
  temporadaStore.tendenciaEstimacion = data.tendencia_estimacion;
  temporadaStore.confiabilidad = data.confiabilidad;
  temporadaStore.prediccionMensual = data.prediccion_mensual;
  temporadaStore.ventasAnteriores = data.ventas_anteriores;
}

onMounted(async () => {
  tiendaStore.tiendas = await apiService.getTiendas();
  temporadaStore.familias = await apiService.getTopFamilias();
  mainStateStore.topProductos = await apiService.getTopProductos();
});

const handleHomeClick = () => {
  mainStateStore.selectedView = CONSTANTS.HOME_VIEW;
};

const handleTiendaClick = () => {
  mainStateStore.selectedView = CONSTANTS.TIENDA_VIEW;
};

const handleTemporadaClick = () => {
  mainStateStore.selectedView = CONSTANTS.TEMPORADA_VIEW;
};

const handleTopProductosClick = () => {
  mainStateStore.selectedView = CONSTANTS.TOP_PRODUCTOS_VIEW;
}

const handleLogout = async () => {
  try {
    await auth.logout();
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
</script>

<style scoped>
.dashboard-root {
  display: flex;
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
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
  background: linear-gradient(0deg, #45FF9A 0%,#46C4BD 50%, #34A4EE 100%);
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
  background: linear-gradient(18deg, #45FF9A 0%, #68c5bf 50%, #2d9fea 100%);
  box-shadow: 0 4px 16px 0 rgba(90,107,255,0.25);
}

.btn-enviar:disabled {
  cursor: unset;
  background: linear-gradient(0deg, #93f5bf 0%, #9fa7f5 100%);
  opacity: 0.7;
}

.logout-button {
  padding: 0.5rem 1rem;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background: #ff6666;
}
</style> 