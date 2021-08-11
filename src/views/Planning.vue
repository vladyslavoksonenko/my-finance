<template>
  <div class="app-page">


    <div>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{ `${userData.bill} UAH `}}</h4>
        <div>
          <input type="month" v-model="currentMonth">
        </div>
      </div>
      <template v-if="isLoadingUserData && isLoadingOperations && isLoadingCategories">
        <Loader />
      </template>
      <div class="row center" v-else-if="categories === null || !categories.length">
        Сначала <router-link to="/categories">создайте категорию!</router-link>
      </div>
      <section v-else>
        <div :key="category.id" v-for="category in resultLinesCategories">
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
import {computed, ref} from "vue";
import getTime from "../utils/clock.plugin";
import Loader from "../components/Loader";

export default {
  name: "Planning",
  components: {
    Loader
  },
  setup() {
    const { userData, isLoadingUserData } = getUserData()
    const { operations, isLoadingOperations } = getEntries()
    const { categories, isLoadingCategories } = getCategories()
    const { yearMonth } = getTime()
    const currentMonth = ref(null)

    currentMonth.value = yearMonth

    const resultLinesCategories = computed(() => {
      let resultFilterOperation = []
       if (operations !== null && categories !== null) {
          resultFilterOperation = operations.value.filter(op => {
            const dateMonth = op.date.toString().slice(0, -3)
            if (dateMonth === currentMonth.value) {
              return op
            }
          })
        }
      return getLine(resultFilterOperation);
    })

    const getLine = (resultFilterOperation) => {
      return categories.value.map((category) => {
        const spend = resultFilterOperation.filter(op => category.id === op.category.id)
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

    return {
      isLoadingUserData,
      isLoadingOperations,
      isLoadingCategories,
      userData,
      categories,
      currentMonth,
      resultLinesCategories
    }
  }
}
</script>

<style scoped>

</style>