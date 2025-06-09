<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement ,Filler} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement,Filler)

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    chartData: {
      type: Object,
      required: true,
      validator: (value) => {
        return value && value.labels && Array.isArray(value.labels) && 
               value.datasets && Array.isArray(value.datasets)
      }
    },
    chartOptions: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false
      })
    }
  },
  computed: {
    isDataValid() {
      return this.chartData && 
             this.chartData.labels && 
             Array.isArray(this.chartData.labels) && 
             this.chartData.datasets && 
             Array.isArray(this.chartData.datasets) &&
             this.chartData.datasets.length > 0
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <Line 
      id="my-chart-id" 
      :data="chartData" 
      :options="chartOptions" 
    />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 100%;
  width: 95%;
}
</style>