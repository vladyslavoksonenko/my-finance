import {onMounted, ref} from "vue";
import getTime from "../utils/clock.plugin";

export const useExRates = () => {
  const currencies = ref([])
  const isLoadingCurrencies = ref(true)
  const { date } = getTime()

  const fetching = async () => {
    try {
      const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date.value.replace(/\s/g, '')}&json`;
      const response = await fetch(url);
      const data = await response.json();
      const currenciesNameArr = ["USD", "PLN", "EUR"];
      data.forEach((element) => {
        currenciesNameArr.forEach((cc) => {
          if (element.cc === cc) {
            currencies.value.push(element)
          }
        })
      })
      isLoadingCurrencies.value = false
    } catch (e) {
      alert(e)
    }
  }

  onMounted(fetching)

  return { currencies, isLoadingCurrencies }

}


