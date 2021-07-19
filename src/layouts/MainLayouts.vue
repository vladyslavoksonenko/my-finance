<template>
  <div class="app-main-layout">

    <Navbar v-on:toggle-sidebar="toggleSidebar"></Navbar>

     <Sidebar :isToggleSidebar="isToggleSidebar"></Sidebar>

    <main
        class="app-content"
        :class="{'full':!isToggleSidebar}"
    >
      <router-view></router-view>
    </main>

    <div class="fixed-action-btn">
      <router-link
      to="/new-entry"
      >
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default {
  name: "mainLayouts",
  components: {Sidebar, Navbar},
  emits: ["toggle-sidebar"],
  data () {
    return {
      isToggleSidebar: false
    }
  },
  methods: {
    toggleSidebar () {
      this.isToggleSidebar = !this.isToggleSidebar
    }
  }
}
</script>

<style scoped>

</style>