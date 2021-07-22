<template>
  <div class="app-page">
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <div class="row">
      <HomeBill />
      <HomeCurrency />
    </div>
  </div>
</template>

<script>


import HomeCurrency from "../components/HomeCurrency";
import HomeBill from "../components/HomeBill";
export default {
  name: 'Home',
  components: {
    HomeBill,
    HomeCurrency
  }
}
</script>
