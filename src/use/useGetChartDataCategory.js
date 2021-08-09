import {computed, reactive} from 'vue';

export const calculateChartData = (categories, operations) => {
  const chartData = reactive({
    labels: [],
    data: []
  })
  // Graph
  const calculate = computed (() => {
    categories.value.map((category) => {
      const spand = operations.value.filter((op) => category.id === op.category.id)
        .filter(op => op.type === "outcome")
        .reduce((accumulator, current) => {
          const acc = Number(accumulator)
          const curr = Number(current.sum)
          return acc + curr
        }, 0)
      chartData.labels.push(category.title)
      chartData.data.push(spand)
    })
    return chartData
  })


  return { calculate }
}