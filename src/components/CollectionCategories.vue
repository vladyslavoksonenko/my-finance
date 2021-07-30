<template>
  <div class="row">
    <table class="highlight centered">
      <thead>
      <tr>
        <th>Имя</th>
        <th>Лимит</th>
        <th>Редактировать</th>
        <th>Удалить</th>
      </tr>
      </thead>

      <tbody>
      <template v-for="category in categories" :key="category.id">
        <tr>
          <td>{{ category.title }}</td>
          <td>{{ category.limit }}</td>
          <td>
            <a @click="$emit('open-edit-category', true, category.id)" class="waves-effect waves-yellow btn-small">Edit</a>
          </td>
          <td>
            <a @click="$emit('open-deleted-category', category.id)" class="waves-effect waves-red btn-small">Deleted</a>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>


export default {
  name: "CollectionCategories",
  props: {
    categories: Array
  },
  setup () {



    return {  }
  }

}
</script>

<style scoped>

</style>