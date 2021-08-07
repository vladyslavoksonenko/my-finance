<template>
  <canvas ref="line" id="pie" width="400" height="400"></canvas>
</template>
<script>
import {onMounted, reactive, ref} from 'vue'
import { Chart, registerables } from 'chart.js';

export default {
  name: "ChartPie",
  setup () {
    const line = ref(null);
    const labels = [
      'Eating',
      'Drinking',
      'Sleeping',
      'Designing',
      'Coding',
      'Cycling',
      'Running'
    ]
    const config = reactive({
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {

      }
    })
    onMounted(() => {
      Chart.register(...registerables);
      line.value = new Chart(line.value, config)
    })
    return { line }
  },
}
</script>

<style scoped>

</style>