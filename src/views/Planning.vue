<template>
  <div class="app-page">


    <div>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{ `${billUser} UAH `}}</h4>
      </div>
      <template v-if="loading">
        <Loader />
      </template>
      <div class="row center" v-else-if="categories === null || !categories.length">
        Сначала <router-link to="/categories">создайте категорию!</router-link>
      </div>
      <section v-else>
        <div :key="category.id" v-for="category in categories">
          <p>
            <strong>{{category.title}}:</strong>
            12 122 из {{ category.limit }}
          </p>
          <div class="progress">
            <div
              class="determinate green"
              style="width:40%"
            ></div>
          </div>
        </div>
      </section>
    </div>

  </div>
</template>

<script>
import {getUserData, getEntries, getCategories} from "../firebase";
import {onMounted, ref} from "vue";
import Loader from "../components/Loader";


export default {
  name: "Planning",
  components: {
    Loader
  },
  setup() {
    const loading = ref(true)
    const billUser = ref(null)
    const operations = ref(null)
    const categories = ref(null)
    const resultPlaning = ref([])

    const getUserBill = async () => {
      const userData = await getUserData()

      billUser.value = userData.bill
      operations.value = await getEntries()
      categories.value = await getCategories()

      loading.value = false

      categories.value = categories.value.map((category) => {
        let result = null
        const spend = operations.value.filter(op => category.id === op.category.id)
            .filter(op => op.type === "outcome")
            .reduce((accumulator, current) => {
              result = Number(accumulator) + Number(current)
              console.log(result)
              return Number(accumulator.sum) + Number(current.sum)
            }, 0)
        return {...category, spend }
      })
      await console.log(categories.value)
    }
    onMounted(getUserBill)

    // const gAll = async () => {
    //
    // }
    // onMounted(gAll)

    return {
      loading,
      billUser,
      categories,
      resultPlaning,
      operations
    }
  }
}
</script>

<style scoped>

</style>