<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="addCategory">
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
  setup() {
    const stateCategoriesForm = reactive({
      name: "",
      limited: ""
    })
    const rules = {
      name: {required},
      limited: {minLength: minLength(1)}
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
      }
    }

    return { v$, addCategory, stateCategoriesForm }
  }

}
</script>

<style scoped>

</style>