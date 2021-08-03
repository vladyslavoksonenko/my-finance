<template>
  <div class="app-page">


    <div>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{ `${billUser} UAH `}}</h4>
        <div>
          <input type="month" v-model="currentDateMonth">
        </div>
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
            {{category.spend}} из {{ category.limit }}
          </p>
          <div class="progress">
            <div
              class="determinate"
              :class="category.lineColor"
              :style="`width:${category.lineWidth}%`"
            ></div>
          </div>
        </div>
      </section>
    </div>

  </div>
</template>

<script>
import {getUserData, getEntries, getCategories} from "../firebase";
import {onMounted, ref, watch} from "vue";
import getTime from "../utils/clock.plugin";
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
    const { yearMonth } = getTime()
    const currentDateMonth = ref(null)

    currentDateMonth.value = yearMonth

    const getUserBill = async () => {
      const userData = await getUserData()

      billUser.value = userData.bill
      operations.value = await getEntries()
      categories.value = await getCategories()

      operations.value = operations.value.filter(op => {
        const dateMonth = op.date.toString().slice(0, -3)
        if (dateMonth === currentDateMonth.value) {
          return op
        }
      })

      getLine();

      loading.value = false

    }
    const getLine = () => {
      categories.value = categories.value.map((category) => {
        const spend = operations.value.filter(op => category.id === op.category.id)
            .filter(op => op.type === "outcome")
            .reduce((accumulator, current) => {
              const acc = Number(accumulator)
              const curr = Number(current.sum)
              return acc + curr
            }, 0)

        const lineWidth = Number(spend) / Number(category.limit) * 100

        let lineColor = ''
        if (lineWidth >= 100) {
          lineColor = 'red'
        } else if (lineWidth > 60) {
          lineColor = 'yellow'
        } else {
          lineColor = 'green'
        }

        return {...category, spend, lineWidth, lineColor}
      })
    }

    onMounted(getUserBill)
    watch(currentDateMonth, () => {
      getUserBill()
    })

    return {
      loading,
      billUser,
      categories,
      resultPlaning,
      operations,
      currentDateMonth
    }
  }
}
</script>

<style scoped>

</style>