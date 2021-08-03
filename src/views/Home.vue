<template>
  <div class="app-page">
    <div class="page-title">
      <h3>Счет</h3>
      <button @click="getCurrencyValue" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <div class="row">
      <template v-if="isLoadingCurrencies">
        <Loader />
      </template>
      <template v-else>
<!--       :userInfo="userInfo.bill" *1-->
      <HomeBill :currencyValueArr="currencyValue" :billUser="billUser" />
      <HomeCurrency :currencies="currencies" />
     </template>
    </div>
  </div>
</template>

<script>

import HomeCurrency from "../components/HomeCurrency";
import HomeBill from "../components/HomeBill";
import { useExRates } from "../use/useExRates";
import { getUserData } from "../firebase";
import Loader from "../components/Loader";
import {onMounted, ref, watch} from "vue";

export default {
  name: 'Home',
  components: {
    Loader,
    HomeBill,
    HomeCurrency,
  },
  setup() {
    let billUser = ref(0)
    const currencyValue = ref([])
    const currencies = ref([])
    const isLoadingCurrencies = ref(true)

    const getUserBill = async () => {
        const userData = await getUserData()
        billUser.value = userData.bill
    }

    const getCurrencies = async () => {
      currencies.value = await useExRates()
      return currencies
    }

    const getCurrencyValue = () => {
      const res = []
      currencies.value.forEach((element) => {
        res.push((billUser.value / element.rate).toFixed(2) + " " + element.cc)
      })
      currencyValue.value = res
      isLoadingCurrencies.value = false
      return currencyValue
    }

    onMounted(getUserBill)
    onMounted(getCurrencies)
    watch(getCurrencyValue)



    return { currencies, billUser, currencyValue, isLoadingCurrencies}

  }
}
</script>
