<template>
  <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
      <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'


export default {
  name: "Loader",
  setup () {
    const urlApiNbu = ref('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20210722&json')


    console.log(urlApiNbu)
  }
}
</script>

<style scoped>

</style>