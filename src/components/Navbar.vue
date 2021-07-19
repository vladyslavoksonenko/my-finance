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
export default {
  name: "Navbar",
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
    logout () {
      console.log("Logout")
      this.$router.push('/login?message=logout')
    }
  },
  created() {
     console.log("mounted")
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
  watch: {
    date() {

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