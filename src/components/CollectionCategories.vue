<template>
  <div class="row">
    <ul class="collection">
      <template v-for="category in categories" :key="category.id">
        <li class="collection-item row">
          <h6 class="col s11">{{ category.title }}</h6>
          <a @click="dCategory(category)" class="waves-effect col s1 waves-light btn-small right"><i class="material-icons center">deleted</i></a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import {computed, onMounted, ref, watch} from "vue";
import {getCategories, deletedCategories} from "../firebase";

export default {
  name: "CollectionCategories",
  setup () {
    const categories = ref(null)

    const gCategories = async () => {
      categories.value = await getCategories()
    }

    const dCategory = async (category) => {
      console.log("click Deleted")
      console.log(category)
      categories.value = categories.value.filter((itemCategory) => itemCategory.id !== category.id)
      await deletedCategories(category.id)
    }

    onMounted(gCategories)

    computed(() => dCategory)

    watch(categories)

    // watch(getCategories, gCategories)

    return { categories, dCategory }
  }

}
</script>

<style scoped>

</style>