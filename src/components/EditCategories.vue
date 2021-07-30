<template>
  <div class="col s12">
    <div class="z-depth-2 category-block">
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="edCategory">
<!--        <label>Выберите категорию</label>-->
<!--        <div class="input-field" >-->
<!--          <select-->
<!--              class="browser-default"-->
<!--              ref="selectCategories"-->
<!--              v-model="currentIdCategory"-->
<!--          >-->
<!--            <option value="" disabled selected>Выберите категорию</option>-->
<!--            <option v-for="category in categories" v-bind:value="category.id" v-bind:key="category.id">{{ category.title }}</option>-->
<!--          </select>-->
<!--        </div>-->
<!--        <template v-if="isShowInputs">-->
        <div class="input-field">
          <input
              type="text"
              id="name-edit"
              v-model="stateCategoriesForm.name"
          />
<!--          <label for="name-edit">Новое название</label>-->
          <span v-if="v$.name.$error" class="helper-text invalid">Введите имя</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model="stateCategoriesForm.limited"
          >
<!--          <label for="limit">Лимит</label>-->
          <span
              v-if="v$.limited.$error"
              class="helper-text invalid"
          >Введите лимит</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
<!--          </template>-->
      </form>
    </div>
  </div>
</template>

<script>
import {editCategory} from "../firebase";
import {onMounted, reactive, ref, watch} from "vue";
import {minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {message$} from "../utils/message.plugin";
import message from "../utils/messages";

export default {
  name: "EditCategories",
  props: {
    editCategoryId: Number,
    categories: Array
  },
  setup(props, { emit }) {
    const currentIdCategory = ref(props.editCategoryId)
    const stateCategoriesForm = reactive({
      name: "",
      limited: ""
    })
    const rules = {
      name: { required },
      limited: { minLength: minLength(1) }
    }
    const v$ = useVuelidate(rules, stateCategoriesForm)

    const edCategory = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch()
        return
      }
      await editCategory(currentIdCategory.value, stateCategoriesForm.name, stateCategoriesForm.limited)
      emit('close-edit-category', false)
      message$(message["editCategory"])
    }

    const updateForm = () => {
      props.categories.forEach((category) => {
        if (category.id === currentIdCategory.value) {
          stateCategoriesForm.name = category.title
          stateCategoriesForm.limited = category.limit
        }
      })
    }
    onMounted(updateForm)
    watch(currentIdCategory, updateForm)


    return { v$, stateCategoriesForm, edCategory, currentIdCategory }

  }

}
</script>

<style scoped>
.category-block {
  padding: 30px 20px;
  min-height: 300px;
}

</style>