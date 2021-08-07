<template>
  <div class="app-page">
    <div class="page-title">
      <h3>Счет</h3>
<!--      <button @click="getCurrencyValue" class="btn waves-effect waves-light btn-small">-->
<!--        <i class="material-icons">refresh</i>-->
<!--      </button>-->
    </div>
    <div class="row">
      <template v-if="isLoadingCurrencies">
        <Loader />
      </template>
      <template v-else>
      <HomeBill :currencyValueArr="currencyValue" :billUser="billUser" />
      <div class="col s12 m12 l4">
        <ChartPie :chartData="chartData" />
      </div>
      <HomeCurrency :currencies="currencies" />
     </template>
    </div>
<!--    <ChartLine />-->
  </div>
</template>

<script>

import HomeCurrency from "../components/HomeCurrency";
import HomeBill from "../components/HomeBill";
import ChartPie from "../components/ChartPie";
// import ChartLine from "../components/ChartLine"
import { useExRates } from "../use/useExRates";
import {getUserData, getCategories, getEntries} from "../firebase";
import Loader from "../components/Loader";
import {onMounted, reactive, ref} from "vue";

export default {
  name: 'Home',
  components: {
    ChartPie,
    Loader,
    HomeBill,
    HomeCurrency,
    // ChartLine
  },
  setup() {
    let billUser = ref(0)
    const currencyValue = ref([])
    const currencies = ref([])
    const isLoadingCurrencies = ref(true)
    const operations = ref(null)

    const getAsyncInfo = async () => {
        const userData = await getUserData()
        billUser.value = userData.bill

      const categories = await getCategories()
      operations.value = await getEntries()

      currencies.value = await useExRates()

      getCurrencyValue()
      calculateChartData(categories)

    }

    // Graph

    const chartData = reactive({
      labels: [],
      data: []
    })

    const calculateChartData = (categories) => {
      categories.map((category) => {
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
    }

    // end Graph

    const getCurrencyValue = () => {
      const res = []
      currencies.value.forEach((element) => {
        res.push((billUser.value / element.rate).toFixed(2) + " " + element.cc)
      })
      currencyValue.value = res
      isLoadingCurrencies.value = false
      return currencyValue
    }

    onMounted(getAsyncInfo)


    return { currencies, billUser, currencyValue, isLoadingCurrencies, getCurrencyValue, chartData}

  }
}
</script>
