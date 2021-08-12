<template>
  <div class="app-page">
    <div>
      <div>
        <div class="page-title">
          <h3>История</h3>
        </div>
        <template v-if="isLoadingOperations">
          <Loader />
        </template>
        <template v-else-if="operations === null || !operations.length">
          <div class="row center">
            Сначала <router-link to="/new-entry">создайте запись!</router-link>
          </div>
        </template>
        <div v-else class="history-table">
          <div class="history-chart">
<!--            <ChartPie :chartData="chartData" />-->
          </div>
          <table class="highlight responsive-table">
            <thead>
            <tr>
              <th v-for="item in typeSorting" :key="item">
                <span @click="sort(item)" class="history-table__title waves-effect">{{ item.title }}</span>
                <i v-if="item.status ==='down'" class="material-icons icon-filter-history">arrow_drop_down</i>
                <i v-else-if="item.status ==='up'" class="material-icons icon-filter-history">arrow_drop_up</i>
                <i v-else></i>
              </th>
            </tr>
            </thead>
            <tBody class="history-table__body">
                <tr v-for="(operation) in paginatedData" :key="operation.id">
                  <td>{{ operation.category.title }}</td>
                  <td>{{ operation.description }}</td>
                  <td>
                    <template v-if="operation.type === 'outcome'">
                      <span class="badge red lighten-1">Расход</span>
                    </template>
                    <template v-else-if="operation.type === 'income'">
                      <span class="badge green lighten-1">Доход</span>
                    </template>
                  </td>
                  <td>{{ operation.date }}</td>
                  <td>{{ convertMoney(operation.sum) }} ₴</td>
                </tr>
            </tBody>
          </table>
          <div class="row">
            <div class="input-field col s6">
              <select class="select-size browser-default" ref="selectTable"  v-model="pageSize">
                <option
                  v-for="(item, index) in selectList"
                  :key="item"
                  :selected="index === 0"
                >
                  {{ item }}
                </option>
              </select>
            </div>
            <ul class="pagination col s6">
              <li
                :disabled="pageNumber === 0"
                :class="pageNumber === 0 ? 'disabled' : ''"
              >
                <a @click="prevPage(index)">
                  <i class="material-icons">chevron_left</i>
                </a>
              </li>
              <li
                v-for="item in pageAmount"
                :class="item === pageNumber ? 'active' : ''"
                :key="item"
              >
                <a @click="pageNumber = item">
                  {{`${item + 1}`}}
                </a>
              </li>
              <li :disabled="pageNumber === pageAmount.length - 1" :class="pageNumber === pageAmount.length - 1 ? 'disabled' : ''" class="waves-effect">
                <a @click="nextPage" >
                  <i class="material-icons">chevron_right</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {watch, ref} from "vue";
import {firebaseEntries} from "../firebase";
import Loader from "../components/Loader";
// import ChartPie from "../components/ChartPie";
import { paginated } from "../use/usePaginated";
import { convertMoney } from "../use/useConvertStringToMoney";
import useSortOperations from "../use/useSortOperations";


export default {
  name: "History",
  components: {
    // ChartPie,
    Loader
  },
  setup () {
    // const selectTable = ref(null)
    // const { categories, isLoadingCategories } = getCategories();
    const { operations, isLoadingOperations } = firebaseEntries()
    const { typeSorting, toggleSort, resultSortOperations } = useSortOperations()
    const { nextPage, prevPage, selectList, paginatedData, pageNumber, pageAmount, editPageSize, getPaginated } = paginated()
    const pageSize = ref(10)

    watch(operations,() => {
      if (operations !== null) {
        toggleSort(operations, typeSorting.date)
        getPaginated(resultSortOperations)
      }
    })

    watch(pageSize, () => {
      editPageSize(pageSize)
    })

    const sort = (item) => {
      toggleSort(operations, item)
      getPaginated(resultSortOperations)
    }





      // calculateChartData(categories)

    // const initMSelect = () => {
    //   // eslint-disable-next-line no-undef
    //   selectTable.value = M.FormSelect.init(selectTable.value);
    // }
    // onMounted(initMSelect)

    // Graph data

    // const chartData = reactive({
    //   labels: [],
    //   data: []
    // })
    //
    // const calculateChartData = (categories) => {
    //   categories.map((category) => {
    //     const spand = operations.value.filter((op) => category.id === op.category.id)
    //         .filter(op => op.type === "outcome")
    //         .reduce((accumulator, current) => {
    //           const acc = Number(accumulator)
    //           const curr = Number(current.sum)
    //           return acc + curr
    //         }, 0)
    //     chartData.labels.push(category.title)
    //     chartData.data.push(spand)
    //   })
    //   console.log(chartData)
    //
    // }


    return {
      isLoadingOperations,
      // isLoadingCategories,
      // selectTable,
      pageSize,
      // groupsOperation,
      nextPage,
      prevPage,
      paginatedData,
      pageNumber,
      pageAmount,
      selectList,
      typeSorting,
      operations,
      convertMoney,
      sort
      // chartData
    }
  }
}
</script>

<style scoped>

.badge {
  color: white;
  border-radius: 2px;
}

a {
  cursor: pointer;
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;

}

.pagination {
  display: flex;
  justify-content: center;
}

.select-size {
  max-width: 100px;
}

.icon-filter-history {
  position: absolute;
}

.history-table__title {
  cursor: pointer;
}

/*.listOperations-item {*/
/*  display: inline-block;*/
/*  margin-right: 10px;*/
/*}*/
/*.listOperations-enter-active, .listOperations-leave-active {*/
/*  transition: all .1s;*/
/*}*/
/*.listOperations-enter, .listOperations-leave-to !* .listOperations-leave-active до версии 2.1.8 *! {*/
/*  opacity: 0;*/
/*  transform: translateX(10px);*/
/*}*/
</style>