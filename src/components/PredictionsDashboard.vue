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
      text: 'Predición de Vendas por Mes',
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
      text: 'Total Vendas por Ano',
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
  const meses = ['Xaneiro', 'Febreiro', 'Marzo', 'Abril', 'Maio', 'Xuño', 'Xullo', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Decembro'];
    
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
        label: 'Vendas anteriores',
        data: props.ventasAnteriores,
        borderColor: '#5A6BFF',
        backgroundColor: 'rgba(90, 107, 255, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Predicións',
        data: {"2025-02": 35, "2025-03": 73, "2025-04": 50, "2025-05": 51, "2025-06": 101, "2025-07": 77, "2025-08": 29, "2025-09": 60, "2025-10": 67, "2025-11": 56, "2025-12": 81, "2026-01": 135},
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
        label: 'Vendas por Ano',
        data,
        backgroundColor: 'rgba(90, 107, 255, 0.6)',
        borderColor: '#5A6BFF',
        borderWidth: 1
      },
      {
        label: 'Predición Anual Total',
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
          <div>
            <div class="data-item">
              <span class="data-label">Produto:</span>
              <span class="data-value">{{ productoData }}</span>
            </div>
            <div class="data-item">
              <span class="data-label">Predición Anual Total:</span>
              <span class="data-value highlight">{{ prediccionAnualTotal }} Unidades</span>
            </div>
          </div>

          <div>
            <h3>Estatísticas de Predición Anual</h3>
            <div class="data-item">
              <span class="data-label">APB:</span>
              <span class="data-value highlight">{{ tapb.toFixed(2) }}%</span>
            </div>
            <div class="data-item">
              <span class="data-label">Tendencia Estimación:</span>
              <span :class="['data-value', tendenciaEstimacion === 'subestimación' ? 'trend-down' : 'trend-up']">{{ capitalize(tendenciaEstimacion) }}</span>
            </div>
            <div class="data-item">
              <span class="data-label">Fiabilidade:</span>
              <span class="data-value highlight">{{ capitalize(confiabilidad) }}</span>
            </div>
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
  height: 96vh;
}

.dashboard-panel-row {
  display: flex;
  gap: 1.2rem;
  height: 45%;
}

.dashboard-panel {
  /* Efecto glass y fondo */
  background: var(--color-panel);
  border-radius: 18px;
  padding: 1.1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-border);
}

.dashboard-panel-lg {
  flex: 1;
  height: 100%;
  min-height: 0;
}

.dashboard-panel-xl {
  height: 55%;
  flex: 1;
  width: 100%;
}

.data-item {
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.data-label {
  font-size: 1rem;
  color: var(--color-contrast-secondary);
  font-weight: 400;
}

.data-value {
  font-size: 1.1rem;
  font-weight: 600;
}

.data-value.highlight {
  color: var(--color-accent-light-green); /* Color llamativo para valores importantes */
  font-size: 1.4rem;
}

.trend-up {
  color: var(--color-accent-light-green); /* Color verde para tendencia positiva */
}

.trend-down {
  color: var(--color-accent-red); /* Color rojo para tendencia negativa */
}

@media screen and (max-width: 1890px) {
  .dashboard-panel-xl, .chart-container {
    height: 55vh;
  }
  .dashboard-panel-row {
    height: 25vh;
  }
  .dashboard-panel-lg {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .dashboard-panel-lg > div {
    width: 50%;
  }
  .dashboard-panel-lg > div:first-of-type {
    height: fit-content;
    margin-right: 1.5rem;
  }
}
</style>