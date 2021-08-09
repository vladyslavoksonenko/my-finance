<template>
  <ul ref="sidenav" id="sidenav" class="sidenav sidenav-fixed app-sidenav"
   :class="{'open': isToggleSidebar}"
  >
    <li class="brand-logo white-text indigo darken-3 center z-depth-2">My-finance</li>
    <li></li>
    <template v-for:="link in links">
      <li>
        <router-link
          active-class="active"
          :to="link.url"
          :key="link.url"
          :exact="link.exact"
          class="waves-effect waves-orange pointer"
        >
          <i
            class="small material-icons">{{ link.icon }}</i>
          {{ link.title }}
        </router-link>
      </li>
    </template>
  </ul>
</template>

<script>
import {onMounted, ref} from "vue";
import M from 'materialize-css/dist/js/materialize.min'

export default {
  name: "Sidebar",
  props: {
    isToggleSidebar: Boolean
  },
  setup () {
    const sidenav = ref(null)

    onMounted(() => {
      sidenav.value = M.Sidenav.init(sidenav.value);
    })

    return { sidenav }
  },
  data () {
    return {
      links: [
        { title: 'Счет', url: '/', icon: 'payment', exact: true},
        { title: 'История', url: '/history', icon: 'history' },
        { title: 'Планирование', url: '/planning', icon: 'event_note' },
        { title: 'Новая запись', url: '/new-entry', icon: 'open_in_new' },
        { title: 'Категории', url: '/categories', icon: 'playlist_add_check' },
      ],
    }
  },
}
</script>

<style scoped>

</style>