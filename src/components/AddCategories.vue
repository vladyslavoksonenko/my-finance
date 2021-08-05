<template>
  <div class="col s12">
    <div class="z-depth-2 category-block">
      <div class="page-subtitle modal-categories">
        <h4>Создать</h4>
        <i @click="closeModal" class="material-icons close-modal waves-effect">close</i>
      </div>

      <form @submit.prevent="addCategory">
        <div class="input-field">
        </div>
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="stateCategoriesForm.name"
          >
          <label for="name">Название</label>
          <span v-if="v$.name.$error" class="helper-text invalid">Введите название</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model="stateCategoriesForm.limited"
          >
          <label for="limit">Лимит</label>
          <span v-if="v$.limited.$error" class="helper-text invalid">Минимальная величина</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
    <br>
  </div>
</template>

<script>
import { createCategory } from "../firebase";
import {reactive} from "vue";
import {minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import message from "../utils/messages"
import {message$} from "../utils/message.plugin";

export default {
  name: "AddCategories",
  setup(props, { emit }) {
    const stateCategoriesForm = reactive({
      name: "",
      limited: ""
    })
    const rules = {
      name: { required },
      limited: { minLength: minLength(1) }
    }

    const v$ = useVuelidate(rules, stateCategoriesForm)

    const addCategory = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch()
        return
      }
      try {
      const result = await createCategory(stateCategoriesForm.name, stateCategoriesForm.limited)
      console.log(result)
        message$(message["createCategory"])
      } catch (e) {
        alert(e)
      } finally {
        stateCategoriesForm.name = ""
        stateCategoriesForm.limited = ""
        emit('close-create-category', false)
      }
    }

    const closeModal = () => {
      emit('close-create-category', false)
    }

    return { v$, addCategory, closeModal, stateCategoriesForm }
  }

}
</script>

<style scoped>
.category-block {
  padding: 20px;
  min-height: 282px;
}
</style>