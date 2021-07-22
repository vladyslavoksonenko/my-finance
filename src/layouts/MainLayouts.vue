<template>
  <Suspense>
    <template #default>
  <div class="app-main-layout">

    <Navbar
        :userName="userName"
        v-on:toggle-sidebar="toggleSidebar"></Navbar>

     <Sidebar
         :isToggleSidebar="isToggleSidebar"></Sidebar>

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
    <template #fallback>
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
  </Suspense>
</template>

<script>
import {defineAsyncComponent, onMounted, ref} from "vue";
import { useAuth } from "../firebase"



export default {
  name: "mainLayouts",
  components: {
    Navbar: defineAsyncComponent(() => import('../components/Navbar.vue')),
    Sidebar: defineAsyncComponent(() => import('../components/Sidebar'))
  },
  emits: ["toggle-sidebar"],

  setup () {
    const { user, isLogin, getUid, getUserData, userData } = useAuth()
    const userName = ref('name')
    onMounted(async () => {
        await getUid()
        await getUserData()
        userName.value = userData.value.name
        console.log("user.value ")
        console.log(typeof user.value)
        console.log(user.value)
        console.log("getUserData() ")
        console.log(typeof getUserData)
        console.log(getUserData())
        console.log("UserData: ")
        console.log(typeof userData.value)
        console.log(userName.value)

    })

    return { user, isLogin, getUid, getUserData, userData, userName }
  },
  data () {
    return {
      isToggleSidebar: false,
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

.preloader-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}

</style>