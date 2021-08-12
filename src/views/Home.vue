<template>
  <div class="app-page">
    <div class="page-title">
      <h3>Счет</h3>
    </div>
    <div class="row">
      <template v-if="isLoadingUserData || isLoadingCategories || isLoadingOperations || isLoadingCurrencies">
        <Loader />
      </template>
      <template v-else>
      <HomeBill :currencyValueArr="getCurrencyValue" :billUser="userData.bill" />
      <div class="col s12 m12 l4">
        <ChartPie :chartData="calculate" />
      </div>
      <HomeCurrency :currencies="currencies" />
     </template>
    </div>
  </div>
</template>

<script>

import HomeCurrency from "../components/HomeCurrency";
import HomeBill from "../components/HomeBill";
import ChartPie from "../components/ChartPie";
import { useExRates } from "../use/useExRates";
import {getUserData, firebaseCategories, firebaseEntries} from "../firebase";
import Loader from "../components/Loader";
import {computed} from "vue";
import {calculateChartData} from "../use/useGetChartDataCategory";

export default {
  name: 'Home',
  components: {
    ChartPie,
    Loader,
    HomeBill,
    HomeCurrency,
  },
  setup() {
    const { currencies, isLoadingCurrencies } = useExRates()
    const { userData, isLoadingUserData } = getUserData()
    const { categories, isLoadingCategories } = firebaseCategories()
    const { operations, isLoadingOperations } = firebaseEntries()
    const { calculate } = calculateChartData(categories, operations)

    const getCurrencyValue = computed(() => {
      const res = []
      currencies.value.forEach((element) => {
        res.push((userData.value.bill / element.rate).toFixed(2) + " " + element.cc)
      })
      return res
    })

    return {
      currencies,
      userData,
      calculate,
      isLoadingCurrencies,
      isLoadingUserData,
      isLoadingCategories,
      isLoadingOperations,
      getCurrencyValue
    }

  }
}
</script>
