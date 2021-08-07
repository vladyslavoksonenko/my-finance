<template>
  <div class="col s12 m12 l4">
    <div class="card bill-card indigo darken-3">
      <div class="card-content white-text">
        <!-- // * 1 недоступно свойство объекта при передаче через пропс, userInfo.bill-->
        <span class="card-title">У вас ₴{{ billUser }}</span>
        <p v-for="value in currencyValueArr" :key="value" class="currency-line">
          <span>{{ value }}</span>
        </p>
       </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomeBill",
  props: {
    currencyValueArr: Array,
    billUser: Number
  },
}
</script>

<style scoped>

</style>