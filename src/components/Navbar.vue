<template>
  <nav class="navbar navbar-fixed indigo darken-3">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a data-target="sidenav" class="sidenav-trigger left" href="#">
          <i class="material-icons white-text">dehaze</i>
        </a>
        <span class="white-text">{{ dateTime }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              ref="dropDown"
              class="dropdown-trigger white-text"
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
import getTime from '../utils/clock.plugin'


export default {
  name: "Navbar",
  props: {
    userName: String
  },
  setup () {
    const { signOut, isLogin } = useAuth()
    const { dateTime } = getTime()




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