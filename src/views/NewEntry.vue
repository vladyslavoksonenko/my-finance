<template>
  <div class="app-page">

    <div>
      <div class="page-title">
        <h3>Новая запись</h3>
      </div>
      <template v-if="loading">
        <Loader />
      </template>
      <div class="row center" v-else-if="categories === null || !categories.length">
        Сначала <router-link to="/categories">создайте категорию!</router-link>
      </div>
      <form v-else @submit.prevent.stop="onSubmit" class="form z-depth-1">
        <label>Выберите категорию</label>
        <div class="input-field">
          <select
              class="browser-default"
              ref="selectCategories"
              v-model="stateOperationForm.category"
          >
            <option value="" disabled selected>Выберите категорию</option>
            <option
                v-for="category in categories"
                v-bind:value="category"
                v-bind:key="category.id"
            >{{ category.title }}</option>
          </select>
        </div>

        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="income"
                v-model="stateOperationForm.type"
            />
            <span>Доход</span>
          </label>
        </p>

        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="outcome"
                v-model="stateOperationForm.type"
            />
            <span>Расход</span>
          </label>
        </p>

        <div class="input-field">
          <input
              id="amount"
              type="number"
              v-model.trim.number="stateOperationForm.sum"
          >
          <label for="amount">Сумма</label>
          <span v-if="v$.sum.$error" class="helper-text invalid">Введите сумму</span>
        </div>

        <div class="input-field">
          <input
              id="description"
              type="text"
              v-model="stateOperationForm.description"
          >
          <label for="description">Описание</label>
          <span v-if="v$.description.$error" class="helper-text invalid">Введите описание</span>
        </div>
        <div class="input-field">
          <input type="date"
                 class="datepicker"
                 ref="datepicker"
                 v-model="stateOperationForm.date"
          >
          <label for="description">Дата</label>
          <span v-if="v$.date.$error" class="helper-text invalid">Нужно выбрать дату</span>
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
import {onMounted, reactive, ref} from "vue";
import {getCategories, getUserData, newEntry} from "../firebase";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import getTime from "../utils/clock.plugin";
import { message$ } from "../utils/message.plugin";
import messages from "../utils/messages";
import Loader from "../components/Loader";



export default {
  name: "NewEntry",
  components: {
    Loader,
  },
  setup () {
    const loading = ref(true)
    const datepicker = ref(null)
    const selectCategories = ref(null)
    const currentIdCategory = ref(null)
    const categories = ref(null)
    const { yearMonthDay } = getTime()
    const stateOperationForm = reactive({
      category: null,
      type: "outcome",
      sum: null,
      description: null,
      date: yearMonthDay,
    })

    const rules = {
      sum: { required },
      description: { required },
      date: { required }
    }

    const v$ = useVuelidate(rules, stateOperationForm)

    onMounted(() => {

    })

    const gCategories = async () => {
      categories.value = await getCategories()

      loading.value = false;

      // eslint-disable-next-line no-undef
      selectCategories.value = M.FormSelect.init(selectCategories);
      // eslint-disable-next-line no-undef
      datepicker.value = M.Datepicker.init(datepicker.value, {
        format: 'yyyy mm dd',
        autoClose: true
      });

    }

    onMounted(gCategories)


    const onSubmit = async () => {
      const userInfo = await getUserData()
      if (v$.value.$invalid) {
        v$.value.$touch()
        return
      }
      // stateOperationForm.date = dateTime.value

      if (stateOperationForm.type === "outcome") {
        const resultOperation = Number(userInfo.bill) - Number(stateOperationForm.sum);
        await newEntry(stateOperationForm, resultOperation)
        message$(`${messages["addEntry-outcome"]} ${stateOperationForm.sum} UAH`)
        setTimeout(() => {clearStateOperationForm()}, 500)
      }

      if (stateOperationForm.type === "income") {
        const resultOperation = Number(userInfo.bill) + Number(stateOperationForm.sum);
        await newEntry(stateOperationForm, resultOperation)
        message$(`${messages["addEntry-income"]} ${stateOperationForm.sum} UAH`)
        setTimeout(() => {clearStateOperationForm()}, 500)
      }

    }

    const clearStateOperationForm = () => {
      for (const key in stateOperationForm ) {
        if (key === "date") {
          stateOperationForm[key] = yearMonthDay
        }
        stateOperationForm[key] = null
      }
    }

    return { datepicker, selectCategories, currentIdCategory, categories, stateOperationForm, v$, onSubmit, loading }
  }
}
</script>

<style scoped>
.form {
  margin: auto;
  border: 1px solid #e6e6e6;
  padding: 20px 15px;
}
</style>