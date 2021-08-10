<template>
    <canvas ref="pie" id="pie" width="100%"></canvas>
</template>
<script>
import {onMounted, reactive, ref} from 'vue'
import { Chart, registerables } from 'chart.js';

export default {
  name: "ChartPie",
  props: {
    chartData: Object
  },
  setup (props) {
    const pie = ref(null);
    const config = reactive({
      type: 'pie',
      data: {
        labels: props.chartData.labels,
        datasets: [{
          label: 'My First Dataset',
          data: props.chartData.data,
          backgroundColor: [],
          hoverOffset: props.chartData.labels.length - 1
        }]
      },
      options: {

      }
  })

    const RandomColor = () => {
      const max = 255
      const min = 0
      const color = {
        r: 0,
        g: 0,
        b: 0
      }
      for (const key in color) {
        color[key] = Math.round(((Math.random() * (max - min)) + min));
      }
      return `rgb(${color.r}, ${color.g}, ${color.b})`

    }
    const getArrBackColor = (length) => {
      const arr = []
      for (let i = 0; i <= length; i++) {
        arr.push(RandomColor())
      }
      return arr
    }

  onMounted(() => {
    config.value = config.data.datasets.map(el => el.backgroundColor = getArrBackColor(props.chartData.labels.length))
    Chart.register(...registerables);
    pie.value = new Chart(pie.value, config)
  })
    return { pie }
  },
}
</script>

<style scoped>

</style>