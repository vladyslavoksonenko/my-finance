<template>
  <div class="app-page">
    <div>
      <div>
        <div class="page-title">
          <h3>История</h3>
        </div>
        <template v-if="loading">
          <Loader />
        </template>
        <template v-else-if="operations === null || !operations.length">
          <div class="row center">
            Сначала <router-link to="/new-entry">создайте запись!</router-link>
          </div>
        </template>
        <div v-else class="history-table">
          <div class="history-chart">
            <ChartPie :chartData="chartData" />
          </div>
          <table class="highlight responsive-table">
            <thead>
            <tr>
              <th v-for="item in typeSorting" :key="item" @click="toggleSort(item)">
                <span class="history-table__title waves-effect">{{ item.title }}</span>
                <i v-if="item.status ==='down'" class="material-icons icon-filter-history">arrow_drop_down</i>
                <i v-else-if="item.status ==='up'" class="material-icons icon-filter-history">arrow_drop_up</i>
              </th>
            </tr>
            </thead>
            <transition-group name="listOperations" tag="tBody" class="history-table__body">
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
                  <td>{{ operation.sum }} ₴</td>
                </tr>
            </transition-group>
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
import {onMounted, ref, watch, reactive} from "vue";
import {getEntries, getCategories} from "../firebase";
import Loader from "../components/Loader";
import ChartPie from "../components/ChartPie";


export default {
  name: "History",
  components: {
    ChartPie,
    Loader
  },
  setup () {
    const loading = ref(true)
    const selectTable = ref(null)
    const operations = ref(null)
    const pageSize = ref(10)
    const groupsOperation = ref([])
    const pageNumber = ref(0)
    const paginatedData = ref(null)
    const pageCount = ref(null)
    const pageAmount = ref([])
    const selectList = ref([])



    const gOperations = async () => {
      operations.value = await getEntries()
      const categories = await getCategories();
      loading.value = false
      initSortOperations()
      getPageAmount()
      getSelectList()
      toggleSort()
      calculateChartData(categories)
    }
    onMounted(gOperations)

    const initSortOperations = () => {
      initPaginated()
    }

    const nextPage = () => {
      pageNumber.value++
    }
    const prevPage = () => {
      pageNumber.value--
    }
    const getPageAmount = () => {
      pageAmount.value = []
      const result = operations.value.length / pageSize.value
      for (let i = 0; i < result; i++) {
        pageAmount.value.push(i)
      }
    }
    const initPaginated = () => {
      let start = pageNumber.value * pageSize.value
      let end = start + pageSize.value

      paginatedData.value = operations.value.slice(start, end);
      getPageCount()
    }
    const getPageCount = () => {
      let l = paginatedData.value.length
      let s = pageSize.value
      const result = l / Number(s)
      pageCount.value = result
      return result
    }

    watch(pageNumber, initPaginated)
    watch(pageSize, initPaginated)

    const getSelectList = () => {
      if (operations.value.length / 10 >= 1) {
        selectList.value.push(10)
      }
      if (operations.value.length / 50 >= 1) {
        selectList.value.push(50)
      }
      if (operations.value.length / 100 >= 1) {
        selectList.value.push(100)
      }
      selectList.value.push(operations.value.length)
    }

    watch(pageSize, getPageAmount)

    // Sorting

    const typeSorting = reactive({
      categories: {
        title: "Категории",
        status: "none",
      },
      description: {
        title: "Описание",
        status: "none",
      },
      type: {
        title: "Тип",
        status: "none",
      },
      date: {
        title: "Дата",
        status: "up",
      },
      sum: {
        title: "Сумма",
        status: "none",
      }
    })

    const toggleSort = (item = typeSorting.date) => {
      for (let key in typeSorting) {
        if (typeSorting[key] === item && typeSorting[key].title !== "Категории" && typeSorting[key].title !== "Описание" ) {
          switch (item.status) {
            case "none":
              item.status = "down"
              chooseSortTable(item)
              break;
            case "down":
              item.status = "up"
              chooseSortTable(item)
              break;
            case "up":
              item.status = "down"
              chooseSortTable(item)
              break;
          }
        } else {
          typeSorting[key].status = "none"
        }
      }
    }

    const chooseSortTable = (item) => {
      if (item.title === "Тип") {
        sortType(item.status)
      }
      if (item.title === "Дата") {
        sortDate(item.status)
      }
      if (item.title === "Сумма") {
        sortSum(item.status)
      }
    }

    const sortType = (status) => {
      if (status === "down") {
        operations.value.sort((a, b) => {
          if (a.type > b.type) {
            return 1
          }
          if (a.type < b.type) {
            return -1
          }
          return 0
        })
      }
      if (status === "up") {
        operations.value.sort((a, b) => {
          if (a.type < b.type) {
            return 1
          }
          if (a.type > b.type) {
            return -1
          }
          return 0
        })
      }

    }

    const sortDate = (status) => {
      if (status === "down") {
        operations.value.sort((a, b) => {
          const dateA = a.date.replace(/-/g, "")
          const dateB = b.date.replace(/-/g, "")
          if (dateA < dateB) {
            return 1
          }
          if (dateA > dateB) {
            return -1
          }
          return 0
        })
      }
      if (status === "up") {
        operations.value.sort((a, b) => {
          const dateA = a.date.replace(/-/g, "")
          const dateB = b.date.replace(/-/g, "")
          if (dateA < dateB) {
            return -1
          }
          if (dateB > dateB) {
            return 1
          }
          return 0
        })
      }

    }

    const sortSum = (status) => {
      if (status === "down") {
        operations.value.sort((a, b) => {
          const dateA = parseInt(a.sum)
          const dateB = parseInt(b.sum)
          if (dateA < dateB) {
            return 1
          }
          if (dateA > dateB) {
            return -1
          }
          return 0
        })
      }
      if (status === "up") {
        operations.value.sort((a, b) => {
          const dateA = parseInt(a.sum)
          const dateB = parseInt(b.sum)
          if (dateA < dateB) {
            return -1
          }
          if (dateB > dateB) {
            return 1
          }
          return 0
        })
      }

    }

    watch(typeSorting, initSortOperations)

    const initMSelect = () => {
      // eslint-disable-next-line no-undef
      selectTable.value = M.FormSelect.init(selectTable.value);
    }
    onMounted(initMSelect)

    // Graph data

    const chartData = reactive({
      labels: [],
      data: []
    })

    const calculateChartData = (categories) => {
      categories.map((category) => {
        const spand = operations.value.filter((op) => category.id === op.category.id)
            .filter(op => op.type === "outcome")
            .reduce((accumulator, current) => {
              const acc = Number(accumulator)
              const curr = Number(current.sum)
              return acc + curr
            }, 0)
        chartData.labels.push(category.title)
        chartData.data.push(spand)
      })
      console.log(chartData)

    }


    return {
      loading,
      selectTable,
      pageSize,
      groupsOperation,
      nextPage,
      prevPage,
      paginatedData,
      pageCount,
      pageNumber,
      pageAmount,
      selectList,
      typeSorting,
      toggleSort,
      operations,
      chartData
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

.listOperations-item {
  display: inline-block;
  margin-right: 10px;
}
.listOperations-enter-active, .listOperations-leave-active {
  transition: all .1s;
}
.listOperations-enter, .listOperations-leave-to /* .listOperations-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}
</style>