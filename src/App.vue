<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>
<script>
import EmptyLayouts from './layouts/EmptyLayouts'
import MainLayouts from './layouts/MainLayouts'


export default {
  components: {EmptyLayouts, MainLayouts},
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layouts'
    }
  }

}

</script>
<style>

@import '~materialize-css/dist/css/materialize.min.css';
@import './assets/css/index.css';

</style>
