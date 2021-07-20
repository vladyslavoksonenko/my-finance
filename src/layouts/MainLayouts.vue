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
import { useAuth } from "../firebase"
import {onMounted} from "vue";

export default {
  name: "mainLayouts",
  components: {Sidebar, Navbar},
  emits: ["toggle-sidebar"],
  setup () {
    const { user, isLogin } = useAuth()

   const getUser = async () => {
      if (isLogin) {
        await console.log(user.value)
      }

   }

   onMounted(getUser)
    setTimeout(() => {
      console.log(user.value)
    }, 2000)

    return { user }
  },
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