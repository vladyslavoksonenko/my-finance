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
          <table class="highlight responsive-table">
            <thead>
            <tr>
              <th v-for="item in typeSorting" :key="item" @click="toggleSort(item)">
                <span class="history-table__title">{{ item.title }}</span>
                <i v-if="item.status ==='down'" class="material-icons icon-filter-history">arrow_drop_down</i>
                <i v-else-if="item.status ==='up'" class="material-icons icon-filter-history">arrow_drop_up</i>
                <i v-else class="material-icons icon-filter-history"></i>
              </th>
            </tr>
            </thead>
            <tbody class="history-table__body">
              <template v-for="(operation) in paginatedData" :key="operation.id">
                <tr>
                  <td>{{ operation.category.title }}</td>
                  <td>{{ operation.description }}</td>
                  <td>
                    <template v-if="operation.type === 'outcome'">
                      <span class="badge red">Расход</span>
                    </template>
                    <template v-else-if="operation.type === 'income'">
                      <span class="badge green">Доход</span>
                    </template>
                  </td>
                  <td>{{ operation.date }}</td>
                  <td>{{ operation.sum }} ₴</td>
                </tr>
              </template>
            </tbody>
          </table>
          <div class="row">
<!--            <div class="input-field col s6">-->
<!--              <select class="select-size browser-default" ref="selectTable"  v-model="pageSize">-->
<!--                <option-->
<!--                  v-for="(item, index) in selectList"-->
<!--                  :key="item"-->
<!--                  :selected="index === 0"-->
<!--                >-->
<!--                  {{ item }}-->
<!--                </option>-->
<!--              </select>-->
<!--            </div>-->
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
              <li :disabled="pageCount < 1" :class="pageCount < 1 ? 'disabled' : ''" class="waves-effect">
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
import {getEntries} from "../firebase";
import Loader from "../components/Loader";


export default {
  name: "History",
  components: {
    Loader
  },
  setup () {
    const loading = ref(true)
    const selectTable = ref(null)
    const operations = ref(null)
    const pageSize = ref(100)
    const groupsOperation = ref([])
    const pageNumber = ref(0)
    const paginatedData = ref(null)
    const pageCount = ref(null)
    const pageAmount = ref([])
    const selectList = ref([])


    const gOperations = async () => {
      operations.value = await getEntries()
      loading.value = false
      initSortOperations()
      // getSelectList()
    }

    const initSortOperations = () => {
      chooseSortTable()
      initPaginated()
      getPageAmount()
    }

    onMounted(gOperations)

    const nextPage = () => {
      pageNumber.value++
    }
    const prevPage = () => {
      pageNumber.value--
    }

    const getPageCount = () => {
      let l = paginatedData.value.length
      let s = pageSize.value
      const result = l / Number(s)
      pageCount.value = result
      return result
    }
    const getPageAmount = () => {
      pageAmount.value = []
      const result = getPageCount()
      for (let i = 0; i < result + 1; i++) {
        pageAmount.value.push(i)
      }
    }

    const initPaginated = () => {
      let start = pageNumber.value * pageSize.value
      let end = start + pageSize.value

      paginatedData.value = operations.value.slice(start, end);
      getPageCount()
    }

    watch(pageNumber, initPaginated)
    watch(pageSize, initPaginated)

    // const getSelectList = () => {
    //   if (operations.value.length / 10 >= 1) {
    //     selectList.value.push(10)
    //   }
    //   if (operations.value.length / 50 >= 1) {
    //     selectList.value.push(50)
    //   }
    //   if (operations.value.length / 100 >= 1) {
    //     selectList.value.push(100)
    //   }
    //   selectList.value.push(operations.value.length)
    //   getPageAmount()
    // }

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
        status: "none",
      },
      sum: {
        title: "Сумма",
        status: "none",
      }
    })

    const toggleSort = (item) => {
      for (let key in typeSorting) {
        if (typeSorting[key] === item) {
          switch (item.status) {
            case "none":
              item.status = "down"
              chooseSortTable()
              break;
            case "down":
              item.status = "up"
              chooseSortTable()
              break;
            case "up":
              item.status = "none"
              chooseSortTable()
              break;
          }
        } else {
          typeSorting[key].status = "none"
        }
      }
    }

    const chooseSortTable = () => {
      for (let key in typeSorting) {
        if (typeSorting[key].status !== "none") {
          const result = typeSorting[key]
          sortTable(result)
        } else {
          // console.log(typeSorting[key])
        }

      }
    }

    const sortTable = (selectedTypeSort) => {
      console.log(selectedTypeSort)
      switch(selectedTypeSort.title) {
        case "Категории":
          console.log(selectedTypeSort.status)
          if (selectedTypeSort.status === "up") {
            operations.value = operations.value.sort((a, b) => {
              const prevTitle = a.category.title.toUpperCase()
              const nextTitle = b.category.title.toUpperCase()
              if (prevTitle > nextTitle) {
                return -1
              }
              if (prevTitle < nextTitle) {
                return 1
              }
              return 0
            })
          } else if (selectedTypeSort === "down") {
            operations.value = operations.value.sort((a, b) => {
              const prevTitle = a.category.title.toUpperCase()
              const nextTitle = b.category.title.toUpperCase()
              if (prevTitle < nextTitle) {
                return -1
              }
              if (prevTitle > nextTitle) {
                return 1
              }
              return 0
            })
          }
          break;
        // case "Сумма":

      }
    }

    watch(typeSorting, chooseSortTable)
    //watch(typeSorting, initSortOperations)

    const initMSelect = () => {
      // eslint-disable-next-line no-undef
      selectTable.value = M.FormSelect.init(selectTable.value);
    }
    onMounted(initMSelect)

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
      operations

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
  margin: auto;
  position: absolute;
}

.history-table__title {
  cursor: pointer;
}
</style>