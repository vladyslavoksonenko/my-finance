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
      <transition-group name="listOperations" tag="tbody">
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.title }}</td>
          <td>{{ category.limit }}</td>
          <td>
            <a @click="$emit('open-edit-category', true, category.id)" class="waves-effect waves-yellow btn-small">Edit</a>
          </td>
          <td>
            <a @click="$emit('open-deleted-category', category.id)" class="waves-effect waves-red btn-small">Deleted</a>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>


export default {
  name: "CollectionCategories",
  props: {
    categories: Array
  },
}
</script>

<style scoped>

/*.listCategories-item {*/
/*  display: inline-block;*/
/*  margin-right: 10px;*/
/*}*/
.listCategories-enter-active,
.listCategories-leave-active {
  transition: all .5s ease;
}
.listCategories-enter,
.listCategories-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

</style>