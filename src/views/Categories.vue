<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Категории</h3>
        <a v-if="!isOpenCreateCategory" class="btn-floating btn-large waves-effect waves-light right tooltipped pulse"
           data-position="left"
           data-tooltip="Создать категорию"
           ref="openCreateCategory"
           @click="openTooltip"
        >
          <i class="material-icons">add</i>
        </a>
      </div>
      <template v-if="loading">
        <Loader />
      </template>
      <section v-else>
        <div class="row">
          <transition name="categoryCreate">
            <template v-if="isOpenCreateCategory">
              <AddCategories
                  @close-create-category="toggleCreateCategory"
              />
            </template>
          </transition>
          <template v-if="categories !== null">
            <transition name="categoryCreate">
              <template v-if="isOpenEditCategory">
                <EditCategories
                    v-if="categories"
                    :categories="categories"
                    :editCategoryId="editCategoryId"
                    @close-edit-category="toggleEditCategory"
                />
              </template>
            </transition>
          </template>
        </div>
          <template v-if="categories === null || !categories.length">
            <div class="row center">
              Создайте категорию!
            </div>
          </template>
          <CollectionCategories
              v-else
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
import Loader from "../components/Loader";
import {message$} from "../utils/message.plugin";
import messages from "../utils/messages";

export default {
  name: "Categories",
  components: {
    Loader,
    CollectionCategories,
    EditCategories,
    AddCategories
  },
  setup () {

    // Show

    const loading = ref(true)
    const isOpenCreateCategory = ref(false)
    const isOpenEditCategory = ref(false)
    const editCategoryId = ref(null)
    const openCreateCategory = ref(null)
    const categories = ref(null)

    const openTooltip = () => {
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
      if (!categories.value.length || categories.value === null) {
        isOpenCreateCategory.value = true
      }
      loading.value = false
    }

    const dCategory = async (categoryId) => {
      categories.value = categories.value.filter((itemCategory) => itemCategory.id !== categoryId)
      await deletedCategories(categoryId)
      message$(messages["deletedCategory"])
    }

    onMounted(gCategories)


    computed(() => dCategory)

    watch(categories, gCategories)


    return {
      isOpenCreateCategory,
      isOpenEditCategory,
      editCategoryId,
      openCreateCategory,
      openTooltip,
      toggleEditCategory,
      toggleCreateCategory,
      categories,
      dCategory,
      loading
    }
  }

}

</script>

<style scoped>

.categoryCreate-enter-active, .categoryCreate-leave-active {
  transition: all .5s ease-out;
}
.categoryCreate-enter, .categoryCreate-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  transform: translateY(20px);
  opacity: 0;
}

</style>