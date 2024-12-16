<template>
  <div class="chart-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'BarChart',
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      })
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
}
</style>