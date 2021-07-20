<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a @click.prevent="toggleSidebar" href="#">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ newDate }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              ref="dropDown"
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
          >
            USER NAME
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


export default {
  name: "Navbar",
  setup () {
    const { user, signOut } = useAuth()

    return { user, signOut }
  },
  methods: {
    data () {
      return {
        date: null,
        interval: null,
        dropdown: null
      }
    },
    toggleSidebar () {
      this.$emit('toggle-sidebar')
    },
    async logout () {
      await console.log(this.user)
      await this.signOut()
      await this.$router.push('/login?message=logout')
      await console.log(this.user)
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)

    // eslint-disable-next-line no-undef
   this.dropdown = M.Dropdown.init(this.$refs.dropDown)
  },
  beforeUnmount() {
    console.log("beforeUnmount")
    clearInterval(this.interval)
    if (this.interval && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  computed: {
    newDate() {
      const option = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: 'numeric', minute: 'numeric', second: 'numeric',
      }
      console.log(new Intl.DateTimeFormat('ua-UA', option).format(this.date))
      return new Intl.DateTimeFormat('ua-UA', option).format(this.date)
    }
  },
  method: {
  }
}
</script>
<style scoped>

</style>