import {ref} from "vue"


export const useCurrencyValue = (currencies, user) => {
  const currencyValueArr = ref([])

  const getCurrencyValue = function () {
   return currencies.value.map((element) => {
      return currencyValueArr.value.push((user.value.bill / element.rate).toFixed(2) + " " + element.cc)
    })
  }

  return {
    currencyValueArr,
    getCurrencyValue,
  }

}