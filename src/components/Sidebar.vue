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
        { title: 'Счет', url: '/', exact: true},
        { title: 'История', url: '/history' },
        { title: 'Планирование', url: '/planning' },
        { title: 'Новая запись', url: '/new-entry' },
        { title: 'Категории', url: '/categories' },
      ],
    }
  },
}
</script>

<style scoped>

</style>