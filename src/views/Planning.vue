<template>
  <div class="app-page">


    <div>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{ `${billUser} UAH `}}</h4>
      </div>

      <section>
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

export default {
  name: "Planning",
  setup() {
    const loading = ref(true)
    const billUser = ref(null)
    const categories = ref(null)
    const operations = ref(null)

    const getUserBill = async () => {
      const userData = await getUserData()
      billUser.value = userData.bill
    }
    onMounted(getUserBill)

    const gCategories = async () => {
      categories.value = await getCategories()
    }
    onMounted(gCategories)

    const gOperations = async() => {
      operations.value = await getEntries()
    }

    onMounted(gOperations)

    return {
      loading,
      billUser,
      categories,
    }
  }
}
</script>

<style scoped>

</style>