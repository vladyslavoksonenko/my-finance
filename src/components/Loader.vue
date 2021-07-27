<template>
  <div class="preloader-wrapper big active col center m12 s12">
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


export default {
  name: "Loader",
}
</script>

<style scoped>
.preloader-wrapper {
  width: 204px;
  height: 204px;
}
</style>