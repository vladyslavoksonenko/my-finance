<template>
  <ul class="sidenav app-sidenav"
   :class="{'open': isToggleSidebar}"
  >
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
export default {
  name: "Sidebar",
  props: {
    isToggleSidebar: Boolean
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