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
      </section>
    </div>

  </div>
</template>

<script>
import AddCategories from "../components/AddCategories";
import EditCategories from "../components/EditCategories";

export default {
  name: "Categories",
  components: {
    EditCategories,
    AddCategories
  }
}

</script>

<style scoped>

</style>