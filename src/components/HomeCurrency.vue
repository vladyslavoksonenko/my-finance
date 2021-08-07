<template>
  <div class="col s12 m12 l4">
    <div class="card amber darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>

          <tbody>
          <template :key="currency" v-for="currency in currencies">
            <tr>
              <td>{{ currency.cc }}</td>
              <td>{{ currency.rate }}</td>
              <td>{{ currency.exchangedate }}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "HomeCurrency",
  props:['currencies']


}
</script>

<style scoped>

</style>