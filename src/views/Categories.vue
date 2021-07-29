<template>
  <div class="app-page">

    <div>
      <div class="page-title">
        <h3>Категории</h3>
      </div>
      <section>
        <div class="row">
          <AddCategories />
          <EditCategories />
        </div>
        <CollectionCategories />
      </section>
    </div>

  </div>
</template>

<script>
import AddCategories from "../components/AddCategories";
import EditCategories from "../components/EditCategories";
import CollectionCategories from "../components/CollectionCategories";

export default {
  name: "Categories",
  components: {
    CollectionCategories,
    EditCategories,
    AddCategories
  }
}

</script>

<style scoped>

</style>