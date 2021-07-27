<template>
  <nav class="navbar blue-grey lighten-4">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a @click.prevent="toggleSidebar" href="#">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ dateTime }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              ref="dropDown"
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
          >
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" @click.prevent="logout" class="black-text">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useAuth } from "../firebase";
import { onMounted } from "vue";
import getTime from '../utils/clock.plugin'


export default {
  name: "Navbar",
  props: {
    userName: String
  },
  setup () {
    const { signOut, isLogin } = useAuth()
    const { dateTime } = getTime()


    onMounted(() => {
      return dateTime
    })



    return { signOut, isLogin, dateTime }
  },
  methods: {
    data () {
      return {
        interval: null,
        dropdown: null
      }
    },
    toggleSidebar () {
      this.$emit('toggle-sidebar')
    },
    async logout () {
      await this.signOut()
      await this.$router.push('/login?message=logout')
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(this.$refs.dropDown)

  },
  beforeUnmount() {
    // clearInterval(this.interval)
    if (this.interval && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
}
</script>
<style scoped>

</style>