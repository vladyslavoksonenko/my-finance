import {ref, onMounted, watch} from "vue";
import getTime from "../utils/clock.plugin";


export const useExRates = () => {

  const currencies = ref([])
  const isLoadingCurrencies = ref(true)

  const getExRates = async () => {

  const { date } = await getTime()

  const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date.value.replace(/\s/g, '')}&json`;
  const response = await fetch(url);
  const data = await response.json();
  const currenciesNameArr = ["USD", "RUB", "EUR"];
  isLoadingCurrencies.value = false
  data.forEach((element) => {
    currenciesNameArr.forEach((cc) => {
      if (element.cc === cc) {
        currencies.value.push(element)
      }
    })
  })

  }

  onMounted(getExRates)
  watch(currencies, getExRates)


  return { currencies, isLoadingCurrencies }

}


