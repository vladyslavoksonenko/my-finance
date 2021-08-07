import {ref} from "vue";
import getTime from "../utils/clock.plugin";


export const useExRates = async () => {

  const currencies = []
  const isLoadingCurrencies = ref(true)


  const { date } = await getTime()

  const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date.value.replace(/\s/g, '')}&json`;
  const response = await fetch(url);
  const data = await response.json();
  const currenciesNameArr = ["USD", "PLN", "EUR"];
  isLoadingCurrencies.value = false
  data.forEach((element) => {
    currenciesNameArr.forEach((cc) => {
      if (element.cc === cc) {
        currencies.push(element)
      }
    })
  })


  return currencies

}


