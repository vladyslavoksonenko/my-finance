<template>
  <div class="app-page">

    <div>
      <div class="page-title">
        <h3>Категории</h3>
        <a v-if="!isOpenCreateCategory" class="btn-floating btn-large waves-effect waves-light right tooltipped pulse"
           data-position="left"
           data-tooltip="Создать категорию"
           ref="openCreateCategory"
           @click="opentTooltip"
        >
          <i class="material-icons">add</i>
        </a>
      </div>
      <section>
        <div class="row">
          <template v-if="isOpenCreateCategory">
            <AddCategories
                @close-create-category="toggleCreateCategory"
            />
          </template>
          <template v-if="isOpenEditCategory">
            <EditCategories
                :categories="categories"
                :editCategoryId="editCategoryId"
                @close-edit-category="toggleEditCategory"
            />
          </template>
        </div>
          <CollectionCategories
              :categories="categories"
              @open-edit-category="toggleEditCategory"
              @open-deleted-category="dCategory"
          />
      </section>
    </div>

  </div>
</template>

<script>
import AddCategories from "../components/AddCategories";
import EditCategories from "../components/EditCategories";
import CollectionCategories from "../components/CollectionCategories";
import {computed, onMounted, ref, watch} from "vue"
import {deletedCategories, getCategories} from "../firebase";

export default {
  name: "Categories",
  components: {
    CollectionCategories,
    EditCategories,
    AddCategories
  },
  setup () {

    // Show

    const isOpenCreateCategory = ref(false)
    const isOpenEditCategory = ref(false)
    const editCategoryId = ref(null)
    const openCreateCategory = ref(null)
    const categories = ref(null)

    const opentTooltip = () => {
      isOpenCreateCategory.value = true
      // eslint-disable-next-line no-undef
      openCreateCategory.value = M.Tooltip.init(openCreateCategory.value);
    }

    const toggleCreateCategory = (bool) => {
      isOpenCreateCategory.value = bool
    }

    const toggleEditCategory = (bool, categoryId) => {
      isOpenEditCategory.value = bool
      editCategoryId.value = categoryId
    }

    // Categories


    const gCategories = async () => {
      categories.value = await getCategories()
    }

    const dCategory = async (categoryId) => {
      categories.value = categories.value.filter((itemCategory) => itemCategory.id !== categoryId)
      await deletedCategories(categoryId)
    }

    onMounted(gCategories)


    computed(() => dCategory)

    watch(categories, gCategories)


    return {
      isOpenCreateCategory,
      isOpenEditCategory,
      editCategoryId,
      openCreateCategory,
      opentTooltip,
      toggleEditCategory,
      toggleCreateCategory,
      categories,
      dCategory
    }
  }

}

</script>

<style scoped>

</style>