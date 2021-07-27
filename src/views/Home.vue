<template>
  <div class="app-page">
    <div class="page-title">
      <h3>Счет</h3>
<!--      <button @click="refreshHome" class="btn waves-effect waves-light btn-small">-->
<!--        <i class="material-icons">refresh</i>-->
<!--      </button>-->
    </div>
    <div class="row">
      <template v-if="!isLoadingCurrencies">
<!--       :userInfo="userInfo.bill" *1-->
      <HomeBill :currencyValueArr="currencyValueArr" :billUser="billUser" />
      <HomeCurrency :currencies="currencies" />
     </template>
      <template v-else-if="isLoadingCurrencies">
        <Loader />
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
import {useCurrencyValue} from "../use/useCurrencyValue";
import {ref, watch} from "vue";

export default {
  name: 'Home',
  components: {
    Loader,
    HomeBill,
    HomeCurrency,
  },
  setup() {
    const { currencies, isLoadingCurrencies } = useExRates()
    const { userInfo } = getUserData()
    const { currencyValueArr, getCurrencyValue } = useCurrencyValue(currencies, userInfo)
    let billUser = ref(0)


    const getUserBill = () => {
      billUser = userInfo.value.bill
    }

    watch(userInfo, getUserBill)
    watch(userInfo, getCurrencyValue)


    return { currencies, userInfo, isLoadingCurrencies, currencyValueArr, billUser}

  }
}
</script>
