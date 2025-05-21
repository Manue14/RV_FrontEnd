<script setup>
import {ref, onMounted, watch, watchEffect, provide} from 'vue';
import { getApiService } from './api/service';
import Sidebar from './components/Sidebar.vue';
import NavigationSidebar from './components/NavigationSidebar.vue';
import LineChart from "@/components/LineChart.vue";

const apiService = getApiService();
const tiendas = ref([]);
const tiendaSeleccionada = ref(null);
const tiendaSeleccionadaState = ref(null)
const familias = ref([]);
const familiaSeleccionada = ref(null);
const showSidebar = ref(false);

const chartData = ref({
  labels: [],
  datasets: []
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#fff',
        font: {
          size: 12
        }
      }
    },
    title: {
      display: true,
      text: 'Predicción de Ventas',
      color: '#fff',
      font: {
        size: 16
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff',
        maxRotation: 45,
        minRotation: 45
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff'
      },
      beginAtZero: true
    }
  }
});

provide("tiendas", tiendas);
provide("tiendaSeleccionada", tiendaSeleccionada);
provide("familias", familias);
provide("familiaSeleccionada", familiaSeleccionada);
provide("tiendaSeleccionadaState", tiendaSeleccionadaState);

watch(tiendaSeleccionada, async() => {
  if (tiendaSeleccionada.value == "") {
    tiendaSeleccionada.value = null
    tiendaSeleccionadaState.value = null
    return
  }
  tiendaSeleccionadaState.value = await apiService.getTienda(tiendaSeleccionada.value);
  familias.value = tiendaSeleccionadaState.value.productos;
  familiaSeleccionada.value = ""
})

const enviarDatos = async () => {
  if (!tiendaSeleccionada.value || !tiendaSeleccionada.value) {
    alert('Por favor, seleccione tanto la tienda como la provincia');
    return;
  }
  console.log("Tienda: ", tiendaSeleccionada.value, " Familia: ", familiaSeleccionada.value);
  const data = await apiService.predict(tiendaSeleccionada.value, familiaSeleccionada.value);

  // Crear etiquetas con mes y año
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  // Generar etiquetas para el rango 2019-2025
  const labels = [];
  const totalMeses = data.ventas_anteriores.length;
  const añoInicial = 2019;
  
  for (let i = 0; i < totalMeses; i++) {
    const mes = meses[i % 12];
    const año = añoInicial + Math.floor(i / 12);
    labels.push(`${mes} ${año}`);
  }
  
  chartData.value = {
    labels: labels,
    datasets: [
      {
        label: 'Ventas anteriores',
        data: data.ventas_anteriores,
        borderColor: '#5A6BFF',
        backgroundColor: 'rgba(90, 107, 255, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Predicciones',
        data: data.prediccion_mensual,
        borderColor: '#45FF9A',
        backgroundColor: 'rgba(69, 255, 154, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  }


};

watchEffect(() => {
  console.log("Tienda: ", tiendaSeleccionada.value);
  console.log("Familia: ", familiaSeleccionada.value);
})

onMounted(async () => {
  tiendas.value = await apiService.getTiendas();
});

function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}
</script>

<template>
  <div class="dashboard-root">
    <NavigationSidebar @toggle-sidebar="toggleSidebar" />
    <transition name="drawer">
      <aside v-if="showSidebar" class="drawer-sidebar">
        <Sidebar>
          <div style="min-height: 120px; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
            <button :disabled="tiendaSeleccionada == null || familiaSeleccionada == ''"
              @click="enviarDatos"
              class="btn-enviar">
              Enviar selección
            </button>
            <div v-if="tiendaSeleccionada == null || familiaSeleccionada == ''" style="margin-top: 1rem; color: #aaa; text-align: center;">
              Selecciona una tienda y una familia para continuar.
            </div>
          </div>
        </Sidebar>
      </aside>
    </transition>
    <div class="main-content">
      <div class="dashboard-panel-row">
        <div class="dashboard-panel dashboard-panel-lg"></div>
        <div class="dashboard-panel dashboard-panel-lg"></div>
      </div>
      <div class="dashboard-panel dashboard-panel-xl">
        <LineChart :chart-data="chartData" :chart-options="chartOptions"></LineChart>
      </div>
    </div>
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

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-left: 0.5rem;
  height: 100%;
  justify-content: space-between;
}

.dashboard-panel-row {
  display: flex;
  gap: 1.2rem;
  height: 38%;
}

.dashboard-panel {
  /* Efecto glass y fondo */
  background: rgba(40, 42, 65, 0.7);
  border-radius: 18px;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18), 0 1.5px 8px 0 rgba(90,107,255,0.08);
  padding: 1.1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.08);
}

.dashboard-panel-lg {
  flex: 1;
  height: 100%;
  min-height: 0;
}

.dashboard-panel-xl {
  height: 48%;
  flex: 1;
  width: 100%;
  min-height: 0;
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