<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="edCategory">
        <label>Выберите категорию</label>
        <div class="input-field" >
          <select
              class="browser-default"
              ref="selectCategories"
              v-model="currentIdCategory"
          >
            <option value="" disabled selected>Выберите категорию</option>
            <option v-for="category in categories" v-bind:value="category.id" v-bind:key="category.id">{{ category.title }}</option>
          </select>
        </div>

        <div class="input-field">
          <input
              type="text"
              id="name"
              v-model="stateCategoriesForm.name"
          />
          <label for="name">Название</label>
          <span
              v-if="v$.name.$error"
              class="helper-text invalid"
          >
            TITLE</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model="stateCategoriesForm.limited"
          >
          <label for="limit">Лимит</label>
          <span
              v-if="v$.limited.$error"
              class="helper-text invalid"
          >
            LIMIT</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {editCategory, getCategories} from "../firebase";
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {message$} from "../utils/message.plugin";
import message from "../utils/messages";

export default {
  name: "EditCategories",
  setup() {
    const categories = ref(null)
    const selectCategories = ref(null)
    const currentIdCategory = ref(null)
    const stateCategoriesForm = reactive({
      name: "",
      limited: ""
    })
    const rules = {
      name: {required},
      limited: {minLength: minLength(1)}
    }
    const v$ = useVuelidate(rules, stateCategoriesForm)

    const edCategory = async () => {
      await editCategory(currentIdCategory.value, stateCategoriesForm.name, stateCategoriesForm.limited)
      gCategories()
      message$(message["editCategory"])
    }

    watch(currentIdCategory, () => {
      categories.value.forEach((category) => {
        if (category.id === currentIdCategory.value) {
          stateCategoriesForm.name = category.title
          stateCategoriesForm.limited = category.limit
        }
      })
    })
    const gCategories = async () => {
      const categoriesPromisses = await getCategories()

      categories.value = categoriesPromisses

      // eslint-disable-next-line no-undef
      selectCategories.value = M.FormSelect.init(selectCategories.value);
    }

    onMounted(gCategories)

    onUnmounted(() => {
      if (selectCategories.value && selectCategories.value.destroy) {
        selectCategories.value.destroy()
      }
    })

    return { categories, selectCategories, v$, stateCategoriesForm, edCategory, currentIdCategory }

  }

}
</script>

<style scoped>

</style>