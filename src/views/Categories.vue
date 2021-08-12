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
      <template v-if="isLoadingCategories">
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
import {computed, ref, watch} from "vue"
import { firebaseCategories } from "../firebase";
import Loader from "../components/Loader";
import {message$} from "../utils/message.plugin";
import messages from "../utils/messages";
// import M from "materialize-css"

export default {
  name: "Categories",
  components: {
    Loader,
    CollectionCategories,
    EditCategories,
    AddCategories
  },
  setup () {
    const isOpenCreateCategory = ref(false)
    const isOpenEditCategory = ref(false)
    const editCategoryId = ref(null)
    const openCreateCategory = ref(null)
    const { categories, isLoadingCategories, deletedCategories, getCategories } = firebaseCategories()
    const openTooltip = () => {
      isOpenCreateCategory.value = true
      // eslint-disable-next-line no-undef
      // openCreateCategory.value = M.Tooltip.init(openCreateCategory.value);
    }
    // onMounted(() => {
    //   M.AutoInit()
    // })

    const toggleCreateCategory = async (bool, isSend) => {
      isOpenCreateCategory.value = bool
      if (isSend) {
        categories.value = await getCategories()
      }
    }

    const toggleEditCategory = async (bool, categoryId, isSend) => {
      isOpenEditCategory.value = bool
      editCategoryId.value = categoryId
      if (isSend) {
        categories.value = await getCategories()
      }
    }

    // Categories
    const isCategoriesNull = () => {
      if (!categories.value.length || categories.value === null) {
        isOpenCreateCategory.value = true
      }
    }
    watch(categories, isCategoriesNull)

    const dCategory = async (categoryId) => {
      // categories.value = categories.value.filter((itemCategory) => itemCategory.id !== categoryId)
      await deletedCategories(categoryId)
      categories.value = await getCategories()
      message$(messages["deletedCategory"])
    }
    computed(() => dCategory)

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
      isLoadingCategories
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