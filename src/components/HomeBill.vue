<template>
  <div class="col s12 m12 l4">
    <div class="card bill-card indigo darken-3">
      <div class="card-content white-text">
        <span class="card-title">У вас ₴ {{ money }}</span>
        <p v-for="value in currencyValueArr" :key="value" class="currency-line">
          <span>{{ value }}</span>
        </p>
       </div>
    </div>
  </div>
</template>

<script>

import { convertMoney } from "../use/useConvertStringToMoney";

export default {
  name: "HomeBill",
  props: {
    currencyValueArr: Array,
    billUser: Number
  },
  setup (props) {
    console.log(props.billUser)
    const money = convertMoney(props.billUser)

    return { money }
  }
}
</script>