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
              v-model="name"
          >
          <label for="name">Название</label>
          <span v-if="v.name.$error" class="helper-text invalid">Введите название</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model="limited"
          >
          <label for="limit">Лимит</label>
          <span v-if="v.limited.$error" class="helper-text invalid">Минимальная величина</span>
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

import { getValidateCategoriesForm } from "../use/useValidateCategoriesForm";

export default {
  name: "AddCategories",
  async setup() {
    const stateCategoriesForm = {
      name: "",
      limited: ""
    }
    const { v } = getValidateCategoriesForm(stateCategoriesForm.name, stateCategoriesForm.limited)

    const addCategory = () => {
      if (v.value.$invalid) {
        v.value.$touch()
      }
      const result = await createCategory()
    }

    return { v, addCategory }
  }

}
</script>

<style scoped>

</style>