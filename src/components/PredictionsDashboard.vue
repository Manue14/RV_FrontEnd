<script setup>
import { ref } from 'vue';
import LineChart from "@/components/LineChart.vue";
import { watch } from 'vue';
import { Bar } from 'vue-chartjs';

const props = defineProps({
  ventasAnteriores: {
    required: true
  },
  prediccionAnual: {
    required: true
  },
  prediccionAnualTotal: {
    required: true
  },
  prediccionMensual: {
    required: true
  },
  productoData: {
    required: true
  },
  tapb: {
    required: true
  },
  tendenciaEstimacion: {
    required: true
  },
  confiabilidad: {
    required: true
  }
});

const chartData = ref({
  labels: [],
  datasets: []
})

const barChartData = ref({
  label: [],
  datasets: []
})

const chartOptions = {
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
      text: 'Predicción de Ventas por Mes',
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
};

const barChartOptions = {
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
      text: 'Total Ventas por Año',
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
      },
      stacked: true
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff'
      },
      beginAtZero: true,
      stacked: true
    }
  }
};

function mountGraph() {
  mountYearlyGraph();
  
  // Crear etiquetas con mes y año
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
  // Generar etiquetas para el rango 2019-2025
  const labels = [];
  const totalMeses = props.ventasAnteriores.length;
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
        data: props.ventasAnteriores,
        borderColor: '#5A6BFF',
        backgroundColor: 'rgba(90, 107, 255, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Predicciones',
        data: props.prediccionMensual,
        borderColor: '#45FF9A',
        backgroundColor: 'rgba(69, 255, 154, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  }
}

function mountYearlyGraph() {
  const ventas_acumuladas = Object.entries(props.ventasAnteriores).reduce((acc, [key, value]) => {
    const year = key.substring(0, 4);
    if (acc[year]) {
      acc[year] += value;
    } else {
      acc[year] = value;
    }
    return acc;
  }, {});

  const labels = Object.keys(ventas_acumuladas);
  const data = Object.values(ventas_acumuladas);
  const predictionBarsData = [];
  for (let i = 0; i <= labels.length - 1; i++) {
    if (i < labels.length - 1) {
      predictionBarsData[i] = 0;
    } else {
      const nextYear = new Date().getFullYear() + 1

      const ventas_anuales_acumuladas = Object.entries(props.prediccionAnual).reduce((acc, [key, value]) => {
        if (key.substring(0, 4) !== nextYear.toString()) {
          acc += parseInt(value);
        }
        return acc;
      }, 0);
      predictionBarsData[i] = parseInt(ventas_anuales_acumuladas);
    }
  }

  barChartData.value = {
    labels,
    datasets: [
      {
        label: 'Ventas por Año',
        data,
        backgroundColor: 'rgba(90, 107, 255, 0.6)',
        borderColor: '#5A6BFF',
        borderWidth: 1
      },
      {
        label: 'Predicción Anual Total',
        data: predictionBarsData,
        borderColor: '#45FF9A',
        backgroundColor: 'rgba(69, 255, 154, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

watch(
  [() => props.productoData, () => props.ventasAnteriores, () => props.prediccionAnual, () => props.prediccionMensual],
  () => {
    mountGraph();
  }
);

mountGraph();
</script>

<template>
  <div class="main-content">
      <div class="dashboard-panel-row">
        <div class="dashboard-panel dashboard-panel-lg">
          <div class="data-item">
            <span class="data-label">Producto:</span>
            <span class="data-value">{{ productoData }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Predicción Anual Total:</span>
            <span class="data-value highlight">{{ prediccionAnualTotal }}</span>
          </div>

          <h3>Estadísticas de Predicción Anual</h3>
          <div class="data-item">
            <span class="data-label">TAPB:</span>
            <span class="data-value highlight">{{ tapb.toFixed(2) }}%</span>
          </div>
          <div class="data-item">
            <span class="data-label">Tendencia Estimación:</span>
            <span :class="['data-value', tendenciaEstimacion === 'subestimación' ? 'trend-down' : 'trend-up']">{{ capitalize(tendenciaEstimacion) }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Confiabilidad:</span>
            <span class="data-value highlight">{{ capitalize(confiabilidad) }}</span>
          </div>

        </div>
        <div class="dashboard-panel dashboard-panel-lg">
          <Bar :data="barChartData" :options="barChartOptions"></Bar>
        </div>
      </div>
      <div class="dashboard-panel dashboard-panel-xl">
        <LineChart :chart-data="chartData" :chart-options="chartOptions"></LineChart>
      </div>
    </div>
</template>

<style scoped>
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

.data-item {
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.data-label {
  font-size: 1rem;
  color: #aaa;
  font-weight: 400;
}

.data-value {
  font-size: 1.1rem;
  color: #fff;
  font-weight: 600;
}

.data-value.highlight {
  color: #45FF9A; /* Color llamativo para valores importantes */
  font-size: 1.4rem;
}

.trend-up {
  color: #45FF9A; /* Color verde para tendencia positiva */
}

.trend-down {
  color: #FF6B6B; /* Color rojo para tendencia negativa */
}
</style>